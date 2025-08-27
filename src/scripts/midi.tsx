import { Pedal } from '../data/data';

export interface Messages {
    noteOn: string;
    noteOff: string;
    controlChange: string;
    programChange: string;
}

interface MidiBase {
    init: () => Promise<boolean>;
    onSuccess: (midiAccess: WebMidi.MIDIAccess) => boolean;
    onFailure: () => boolean;
    setMidiChannel: (midiChannel: number) => void;
    sendMidiMessage: (
        type: keyof Messages,
        secondNibble: number,
        thirdNibble?: number
    ) => void;
}

class Midi implements MidiBase {
    inputs: WebMidi.MIDIInputMap | null = null;
    outputs: WebMidi.MIDIOutputMap | null = null;
    initWasSuccessful: boolean;
    messages: Messages;
    midiChannel: number = 0;

    constructor() {
        this.initWasSuccessful = false;
        this.messages = {
            noteOff: '0x8',
            noteOn: '0x9',
            controlChange: '0xb',
            programChange: '0xc',
        };
    }
    init = (): Promise<boolean> => {
        return navigator
            .requestMIDIAccess({ sysex: true, software: false })
            .then(this.onSuccess, this.onFailure);
    };
    onSuccess = (midiAccess: WebMidi.MIDIAccess): boolean => {
        this.inputs = midiAccess.inputs || null;
        this.outputs = midiAccess.outputs || null;
        this.setMidiChannel(1);
        const initWasSuccessful = true;
        return initWasSuccessful;
    };
    onFailure = (): boolean => {
        console.log('Could not access your MIDI devices.');
        const initWasSuccessful = false;
        return initWasSuccessful;
    };
    setMidiChannel = (midiChannel: number) => {
        this.midiChannel = midiChannel;
    };
    sendMidiMessage = (
        type: keyof Messages,
        secondNibble: number,
        thirdNibble?: number
    ) => {
        if (this.outputs) {
            const output = this.outputs.values().next().value;
            const firstNibble = parseInt(
                this.messages[type] + this.midiChannel
            );
            let dataNibbles: number[];
            if (type !== 'programChange' && thirdNibble !== undefined) {
                dataNibbles = [firstNibble, secondNibble, thirdNibble];
            } else {
                dataNibbles = [firstNibble, secondNibble];
            }
            console.log(
                'start midiMessage',
                type,
                dataNibbles,
                performance.now()
            );
            output?.send(dataNibbles);
        }
    };
    sendMidiForFootswitchPedal = (item: Pedal, sendOff?: boolean) => {
        const note = item.note.isActive ? item.note.note : undefined;
        if (sendOff) {
            item.controlChange
                .filter((item) => item.isActive)
                .forEach((controlChange) => {
                    this.sendMidiMessage(
                        'controlChange',
                        controlChange.controlChange,
                        controlChange.off
                    );
                });
            if (note) {
                this.sendMidiMessage('noteOff', note, 127);
            }
            return;
        }
        item.programChange
            .filter((item) => item.isActive)
            .map((item) => item.programChange)
            .forEach((programChange) => {
                this.sendMidiMessage('programChange', programChange, 0);
            });

        item.controlChange
            .filter((item) => item.isActive)
            .forEach((controlChange) => {
                this.sendMidiMessage(
                    'controlChange',
                    controlChange.controlChange,
                    controlChange.on
                );
            });
        if (note) {
            this.sendMidiMessage('noteOn', note, 127);
        }
    };
}

export { Midi };
