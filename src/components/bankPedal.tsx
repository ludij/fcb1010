/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { useState } from 'react';

type BankPedalProps = {
    label: string;
    toggleBank: (payload: -1 | 1) => void;
    payload: -1 | 1;
};

const CBankPedal = ({
    label,
    toggleBank,
    payload,
}: BankPedalProps): JSX.Element => {
    const [isPedalDown, setIsPedalDown] = useState<boolean>(false);

    const preventContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const toggleActive = () => {
        toggleBank(payload);
    };

    const onPedalDown = () => {
        setIsPedalDown(true);
        toggleActive();
    };

    const onPedalUp = () => {
        setIsPedalDown(false);
    };

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
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2%;
    `;

    const footswitchHeaderBottomStyles = css`
        label: footswitch-header-bottom;
        grid-column: span 2 / span 2;
        font-size: 20cqw;
        font-weight: bold;
        text-align: center;
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
                    <div css={footswitchHeaderBottomStyles}>{label}</div>
                </div>
            </div>
        </div>
    );
};

export { CBankPedal };
