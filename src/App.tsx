/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Midi } from './scripts/midi';
import { JSX } from '@emotion/react/jsx-runtime';
import { CFcb1010 } from './components/fcb1010';

const midiSupport: boolean = 'requestMIDIAccess' in navigator;
const midi = new Midi();

const App = (): JSX.Element => {
    const [midiSuccess, setMidiSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (midiSupport) {
            midi.init().then((isSuccessful) => setMidiSuccess(isSuccessful));
        }
    }, []);

    const containerStyles = css`
        label: container;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
    `;

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
        <div css={containerStyles}>
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

            {/* <CFootswitch2 /> */}

            <CFcb1010
                midiSuccess={midiSuccess}
                sendMidiMessage={midi.sendMidiMessage}
            />
        </div>
    );
};

export default App;
