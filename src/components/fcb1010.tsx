/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { Fragment, useContext, useState } from 'react';
import { CExpressionPedal } from './expressionPedal';
import { CModal } from './modal';
import { CFootswitchPedal } from './footswitchPedal';
import { CBankPedal } from './bankPedal';
import { MidiMessagesContext } from '../hooks/midiMessagesContext';

const CFcb1010 = (): JSX.Element => {
    const [modalIsVisible, setModalVisibility] = useState<boolean>(false);

    const toggleModalVisibility = () => setModalVisibility(!modalIsVisible);

    const { state, updatePedalsData } = useContext(MidiMessagesContext);

    const toggleBank = (payload: -1 | 1): void => {
        console.log('toggleBank', payload);
        // TODO
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
        <Fragment>
            <h1>FCB1010 Editor/Simulator</h1>
            <button type="button" onClick={toggleModalVisibility}>
                edit MIDI values
            </button>
            <div css={boardStyles}>
                {footswitchNumbers.map((index: number) => {
                    return (
                        <CFootswitchPedal
                            index={index}
                            key={'footswitch' + index}
                        />
                    );
                })}
                <CBankPedal label="UP" toggleBank={toggleBank} payload={1} />
                <CBankPedal label="DOWN" toggleBank={toggleBank} payload={-1} />
                <CExpressionPedal label="A" />
                <CExpressionPedal label="B" />
                <CModal
                    data={state}
                    updateData={updatePedalsData}
                    isVisible={modalIsVisible}
                    toggleVisibility={toggleModalVisibility}
                />
            </div>
        </Fragment>
    );
};

export { CFcb1010 };
