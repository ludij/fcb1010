/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { useContext, useEffect, useState } from 'react';
import { MidiMessagesContext } from '../hooks/midiMessagesContext';
import { Midi } from '../scripts/midi';

const midiSupport: boolean = 'requestMIDIAccess' in navigator;

const CHeader = (): JSX.Element => {
    const [midiSuccess, setMidiSuccess] = useState<boolean>(false);

    const { midiApi } = useContext(MidiMessagesContext);

    if (midiSupport) {
        midiApi?.init().then((isSuccessful) => {
            setMidiSuccess(isSuccessful);
        });
    }

    const headerStyles = css`
        label: header;
        padding-bottom: 10px;
    `;

    const midiStateStyles = css`
        label: midi-state;
        color: ${midiSuccess ? 'green' : 'red'};
    `;

    const midiSupportStyles = css`
        label: midi-support;
        color: red;
    `;

    return (
        <div css={headerStyles}>
            <p css={midiStateStyles}>
                MIDI {midiSuccess ? '' : 'dis'}connected
            </p>
            <p css={midiSupportStyles}>
                {midiSuccess
                    ? null
                    : midiSupport
                    ? 'Please allow your browser to use MIDI'
                    : "Your browser doesn't seem to support MIDI, please use Chrome"}
            </p>
        </div>
    );
};

export { CHeader };
