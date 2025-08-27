/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { CFcb1010 } from './components/fcb1010';
import { MidiMessagesProvider } from './hooks/midiMessagesProvider';
import { CHeader } from './components/header';

const App = (): JSX.Element => {
    const containerStyles = css`
        label: container;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
    `;

    return (
        <MidiMessagesProvider>
            <div css={containerStyles}>
                <CHeader />

                <CFcb1010 />
            </div>
        </MidiMessagesProvider>
    );
};

export default App;
