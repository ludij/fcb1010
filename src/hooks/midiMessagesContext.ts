import { createContext } from 'react';
import { INITIAL_PEDALS_DATA, Pedals, UpdatePedalsParams } from '../data/data';
import { Midi } from '../scripts/midi';

export const MidiMessagesContext = createContext<{
    state: Pedals;
    midiApi: Midi;
    updatePedalsData: (param: UpdatePedalsParams) => void;
}>({
    state: INITIAL_PEDALS_DATA,
    midiApi: new Midi(),
    updatePedalsData: () => { },
});
