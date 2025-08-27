/** @jsxImportSource @emotion/react */
import { ReactNode, useState } from 'react';
import {
    INITIAL_PEDALS_DATA,
    Pedals,
    UpdatePedals,
    UpdatePedalsParams,
} from '../data/data';
import { MidiMessagesContext } from '../hooks/midiMessagesContext';
import { JSX } from '@emotion/react/jsx-runtime';
import { Midi } from '../scripts/midi';

const MidiMessagesProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [state, setState] = useState(INITIAL_PEDALS_DATA);

    // const [midiApi, setMidiApi] = useState<Midi>(new Midi());
    const midiApi = new Midi();

    const updatePedalsData: UpdatePedals = ({
        newValue,
        pedalsDataIndex,
        pedalsDataKey,
    }: UpdatePedalsParams) => {
        const newPedalsData: Pedals = [...state];
        newPedalsData[pedalsDataIndex] = {
            ...newPedalsData[pedalsDataIndex],
            [pedalsDataKey]: newValue,
        };
        setState(newPedalsData);
    };

    return (
        <MidiMessagesContext.Provider
            value={{
                state,
                midiApi,
                updatePedalsData,
            }}
        >
            {children}
        </MidiMessagesContext.Provider>
    );
};

export { MidiMessagesProvider };
