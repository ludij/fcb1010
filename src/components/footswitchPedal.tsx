/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { SCLed } from './led';
import { Pedal } from '../data/data';
import { useState } from 'react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

type FootswitchProps = {
    index: number;
    data: Pedal;
    isActive: boolean;
    toggleFootswitch: (index: number) => void;
};

const CFootswitchPedal = ({
    index,
    data,
    isActive,
    toggleFootswitch,
}: FootswitchProps): JSX.Element => {
    const label: string = (index + 1).toString();

    const [isPedalDown, setIsPedalDown] = useState<boolean>(false);

    const toggleActive = () => {
        if (toggleFootswitch) {
            toggleFootswitch(index);
        }
    };

    const onPedalDown = () => {
        setIsPedalDown(true);
        toggleActive();
    };

    const onPedalUp = () => {
        if (data.mode === 'momentary') {
            toggleActive();
        }
        setIsPedalDown(false);
    };

    const preventContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    useKeyboardShortcuts({
        key: data.shortcutKey,
        onKeyDownHandler: onPedalDown,
        onKeyUpHandler: onPedalUp,
    });

    const footswitchContainerStyles = css`
        label: footswitch-container;
        grid-area: ${'footswitch-' + label.toLowerCase()};
        aspect-ratio: 1/2;
        width: 100%;
        position: relative;
        container-type: size;
    `;

    const footswitchPedalStyles = css`
        label: footswitch-pedal;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 1%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom,
            var(--board-pedal-color-light) 67%,
            var(--board-pedal-color-lighter) 100%
        );
        color: var(--board-pedal-color);
        background-size: 100% 200%;
        background-position: ${isPedalDown ? '0 75%' : 'top'};
        border-right: 10cqw solid var(--board-pedal-color-dark);
        border-bottom: 5cqh solid var(--board-pedal-color-lighter);
        border-left: 10cqw solid var(--board-pedal-color-darker);
        border-radius: 5%;
        opacity: ${isPedalDown ? '0.9' : '1'};
        transition: all 0.2s ease;
    `;

    const footswitchHeaderStyles = css`
        label: footswitch-top;
        position: absolute;
        top: 0;
        left: 0;
        height: 33%;
        width: 100%;
        clip-path: polygon(10% 100%, 90% 100%, 100% 0, 0 0);
        background: linear-gradient(
            to bottom,
            var(--board-pedal-color-dark),
            var(--board-pedal-color-lighter)
        );
        border-top-left-radius: 10%;
        border-top-right-radius: 10%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2%;
    `;

    const footswitchHeaderTopLeftStyles = css`
        label: footswitch-header-top-left;
        display: flex;
        justify-content: flex-end;
    `;
    const footswitchHeaderBottomStyles = css`
        label: footswitch-header-bottom;
        grid-column: span 2 / span 2;
        font-size: 25cqw;
        font-weight: bold;
        text-align: center;
    `;

    const footswitchLabelStyles = css`
        label: footswitch-label;
        background-color: var(--board-pedal-color);
        color: var(--board-pedal-color-darker);
        font-size: 15cqw;
        padding: 3cqw;
        width: 100%;
        max-width: 100%;
        text-align: center;
        pointer-events: none;
        user-select: none;
        font-weight: 600;
    `;

    return (
        <div
            css={footswitchContainerStyles}
            onMouseDown={onPedalDown}
            onTouchStart={onPedalDown}
            onMouseUp={onPedalUp}
            onTouchEnd={onPedalUp}
            onContextMenu={preventContextMenu}
        >
            <div css={footswitchPedalStyles}>
                <div css={footswitchHeaderStyles}>
                    <div css={footswitchHeaderTopLeftStyles}>
                        <SCLed isActive={isActive || false} />
                    </div>
                    <div css={footswitchHeaderBottomStyles}>{label}</div>
                </div>

                {!!data.label && (
                    <div css={footswitchLabelStyles}>{data.label}</div>
                )}
                {data.mode === 'toggle' && (
                    <div css={footswitchLabelStyles}>{data.mode}</div>
                )}
            </div>
        </div>
    );
};

export { CFootswitchPedal };
