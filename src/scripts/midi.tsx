interface Messages {
  noteOn: string
  noteOff: string
  controlChange: string
  programChange: string
}

interface MidiBase {
  init: () => Promise<boolean>
  onSuccess: (midiAccess: WebMidi.MIDIAccess) => boolean
  onFailure: () => boolean
  setMidiChannel: (midiChannel: number) => void
  sendMidiMessage: (
    type: keyof Messages,
    secondNibble: number,
    thirdNibble?: number
  ) => void
}

class Midi implements MidiBase {
  inputs: WebMidi.MIDIInputMap | null = null
  outputs: WebMidi.MIDIOutputMap | null = null
  inputKeys: { [key: string]: number | string }
  initWasSuccessful: boolean
  messages: Messages
  midiChannel: number = 0

  constructor() {
    this.initWasSuccessful = false
    this.inputKeys = {
      a: 0,
      s: 1,
      d: 2,
      f: 3,
      g: 4,
      w: 5,
      e: 6,
      r: 7,
      t: 8,
      y: 9,
      j: "down",
      u: "up",
      i: "aUp",
      k: "aDown",
      o: "bUp",
      l: "bDown",
    }
    this.messages = {
      noteOff: "0x8",
      noteOn: "0x9",
      controlChange: "0xb",
      programChange: "0xc",
    }
  }
  init = (): Promise<boolean> => {
    return navigator
      .requestMIDIAccess({ sysex: true })
      .then(this.onSuccess, this.onFailure)
  }
  onSuccess = (midiAccess: WebMidi.MIDIAccess): boolean => {
    this.inputs = midiAccess.inputs || null
    this.outputs = midiAccess.outputs || null
    this.setMidiChannel(1)
    const initWasSuccessful = true
    return initWasSuccessful
  }
  onFailure = (): boolean => {
    console.log("Could not access your MIDI devices.")
    const initWasSuccessful = false
    return initWasSuccessful
  }
  setMidiChannel = (midiChannel: number) => {
    this.midiChannel = midiChannel
  }
  sendMidiMessage = (
    type: keyof Messages,
    secondNibble: number,
    thirdNibble?: number
  ) => {
    if (this.outputs) {
      const output = this.outputs.values().next().value
      const firstNibble = parseInt(this.messages[type] + this.midiChannel)
      console.log("firstNibble", firstNibble)
      // const dataNibbles = thirdNibble
      //   ? [firstNibble, secondNibble, thirdNibble]
      //   : [firstNibble, secondNibble]
      const dataNibbles = [firstNibble, secondNibble, thirdNibble]
      console.log("dataNibbles for", type, dataNibbles)
      output.send(dataNibbles)
    }
  }
}

export { Midi }
