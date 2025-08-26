/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import {
    INITIAL_PEDALS_DATA,
    Pedals,
    UpdatePedals,
    UpdatePedalsParams,
} from '../data/data';
import { useState } from 'react';
import { Messages } from '../scripts/midi';
import { CExpressionPedal } from './expressionPedal';
import { CModal } from './modal';
import { CFootswitchPedal } from './footswitchPedal';
import { CBankPedal } from './bankPedal';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const CFcb1010 = ({
    midiSuccess,
    sendMidiMessage,
}: {
    midiSuccess: boolean;
    sendMidiMessage: (
        type: keyof Messages,
        secondNibble: number,
        thirdNibble?: number
    ) => void;
}): JSX.Element => {
    const [modalIsVisible, setModalVisibility] = useState<boolean>(false);

    const toggleModalVisibility = () => setModalVisibility(!modalIsVisible);

    const [pedalsData, setPedalsData] = useState<Pedals>(INITIAL_PEDALS_DATA);

    const updatePedalsData: UpdatePedals = ({
        newValue,
        pedalsDataIndex,
        pedalsDataKey,
    }: UpdatePedalsParams) => {
        const newPedalsData: Pedals = [...pedalsData];
        newPedalsData[pedalsDataIndex] = {
            ...newPedalsData[pedalsDataIndex],
            [pedalsDataKey]: newValue,
        };
        setPedalsData(newPedalsData);
    };

    const getActiveFootswitches = () => {
        const activeItems = pedalsData
            .filter((item) => item.isActive)
            .map((item) => pedalsData.indexOf(item));
        return activeItems;
    };

    const [activeFootswitches, setActiveFootswitches] = useState(
        getActiveFootswitches()
    );

    const toggleFootswitch = (index: number): void => {
        let sendOn = true;
        if (activeFootswitches.includes(index)) {
            setActiveFootswitches(
                activeFootswitches.filter((item) => item !== index)
            );
            sendOn = false;
        } else {
            setActiveFootswitches([...activeFootswitches, index]);
        }
        if (midiSuccess) {
            sendMidi(index, sendOn);
        }
    };

    const toggleBank = (payload: -1 | 1): void => {
        console.log('toggleBank', payload);
        // TODO
    };

    const sendMidi = (index: number, sendOn?: boolean) => {
        const controlChanges = pedalsData[index].controlChange
            .filter((item) => item.isActive)
            .map((item) => {
                return {
                    controlChange: item.controlChange,
                    on: item.on,
                    off: item.off,
                };
            });
        const note = pedalsData[index].note.isActive
            ? pedalsData[index].note.note
            : undefined;
        if (sendOn) {
            const programChanges = pedalsData[index].programChange
                .filter((item) => item.isActive)
                .map((item) => item.programChange);
            for (const programChange of programChanges) {
                sendMidiMessage('programChange', programChange, 0);
            }
            for (const controlChange of controlChanges) {
                sendMidiMessage(
                    'controlChange',
                    controlChange.controlChange,
                    controlChange.on
                );
            }
            if (note) {
                sendMidiMessage('noteOn', note, 127);
            }
        } else {
            for (const controlChange of controlChanges) {
                sendMidiMessage(
                    'controlChange',
                    controlChange.controlChange,
                    controlChange.off
                );
            }
            if (note) {
                sendMidiMessage('noteOff', note, 127);
            }
        }
    };

    const boardStyles = css`
        label: board;
        display: grid;
        grid-template-columns: repeat(18, calc((100% - 10px) / 18));
        grid-template-rows: 1fr 1fr;
        gap: 5px 0px;
        grid-template-areas:
            '. footswitch-6 . footswitch-7 . footswitch-8 . footswitch-9 . footswitch-10 . footswitch-up . expression-pedal-a expression-pedal-a . expression-pedal-b expression-pedal-b'
            'footswitch-1 . footswitch-2 . footswitch-3 . footswitch-4 . footswitch-5 . . footswitch-down . expression-pedal-a expression-pedal-a . expression-pedal-b expression-pedal-b';
        background-color: #eee;
        aspect-ratio: 4/1;
    `;

    const footswitchNumbers = Array.from(Array(10).keys());

    return (
        <div>
            <h1>FCB1010 Editor/Simulator</h1>
            <button type="button" onClick={toggleModalVisibility}>
                edit MIDI values
            </button>
            <div css={boardStyles}>
                {footswitchNumbers.map((index: number) => {
                    return (
                        <CFootswitchPedal
                            index={index}
                            data={pedalsData[index]}
                            isActive={activeFootswitches.includes(index)}
                            toggleFootswitch={toggleFootswitch}
                            key={'footswitch' + index}
                        />
                    );
                })}
                <CBankPedal label="UP" toggleBank={toggleBank} payload={1} />
                <CBankPedal label="DOWN" toggleBank={toggleBank} payload={-1} />
                <CExpressionPedal label="A" />
                <CExpressionPedal label="B" />
                <CModal
                    data={pedalsData}
                    updateData={updatePedalsData}
                    isVisible={modalIsVisible}
                    toggleVisibility={toggleModalVisibility}
                />
            </div>
        </div>
    );
};

export { CFcb1010 };
