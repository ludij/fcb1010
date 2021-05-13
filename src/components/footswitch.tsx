/** @jsxImportSource @emotion/react */
import { useState, MouseEvent } from "react"
import { css } from "@emotion/react"
import { SCLed } from "./led"

interface FootswitchProps {
  label: string
  isStompBox?: boolean
  hasNoLed?: boolean
  isActive?: boolean
  className?: string
}

const CFootswitch = ({
  label,
  isStompBox = false,
  isActive = false,
  hasNoLed = false,
  className,
}: FootswitchProps): JSX.Element => {
  const [isActiveState, setIsActiveState] = useState<boolean>(isActive)
  const toggleIsActiveState = () => setIsActiveState(!isActiveState)

  const [isPressedState, setIsPressedState] = useState<boolean>(false)
  const toggleIsPressedState = () => {
    setIsPressedState(!isPressedState)
  }

  const preventContextMenu = (event: MouseEvent) => {
    event.preventDefault()
  }

  const sFootswitch = css`
    label: footswitch;
    grid-area: footswitch${label};
    position: relative;
    border: 1px solid #ccc;
    text-align: center;
    padding: 10px;
    background-color: ${isPressedState ? "#222" : "#000"};
    color: #fff;
    font-weight: bold;
    border-radius: 10px;
    transform: ${isPressedState ? "scale(0.98)" : "none"};
    transition: background-color 0.2s;

    p {
      margin: 0;
    }

    small {
      font-weight: normal;
      word-break: break-word;
    }
  `

  const sFootswitchToggle = css`
    label: footswitch__toggle;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.25);
    cursor: pointer;
    font-weight: normal;
    font-size: 14px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  `

  return (
    <div css={sFootswitch} className={className}>
      {hasNoLed ? undefined : <SCLed isActive={isActiveState} />}
      <p>{label}</p>
      <div
        css={sFootswitchToggle}
        onMouseDown={() => {
          toggleIsActiveState()
          toggleIsPressedState()
        }}
        onTouchStart={() => {
          toggleIsActiveState()
          toggleIsPressedState()
        }}
        onMouseUp={
          isStompBox
            ? toggleIsPressedState
            : () => {
                toggleIsActiveState()
                toggleIsPressedState()
              }
        }
        onTouchEnd={() => {
          toggleIsActiveState()
          toggleIsPressedState()
        }}
        onContextMenu={preventContextMenu}
      >
        { isStompBox ? 'toggle' : 'press' }
      </div>
    </div>
  )
}

export { CFootswitch }
