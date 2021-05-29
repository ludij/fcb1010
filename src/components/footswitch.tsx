/** @jsxImportSource @emotion/react */
import { useState, MouseEvent } from "react"
import { css } from "@emotion/react"
import { SCLed } from "./led"
import { Pedal } from "../data/data"

type FootswitchProps =
  | {
      label: string
      data: Pedal
      isActive: boolean
      toggleFootswitch: (index: number) => void
    }
  | {
      label: string
      data?: Pedal
      isActive?: boolean
      toggleFootswitch?: (index: number) => void
    }

const CFootswitch = ({
  label,
  data,
  isActive,
  toggleFootswitch,
}: FootswitchProps): JSX.Element => {
  const [isPressed, setPressed] = useState<boolean>(false)
  const togglePressed = () => {
    setPressed(!isPressed)
  }

  const preventContextMenu = (event: MouseEvent) => {
    event.preventDefault()
  }

  const footswitchIndex = parseInt(label) - 1

  const toggleActive = () => {
    if (toggleFootswitch) {
      toggleFootswitch(footswitchIndex)
    }
  }

  const sFootswitch = css`
    label: footswitch;
    grid-area: ${"footswitch" + label};
    position: relative;
    border: 1px solid #ccc;
    text-align: center;
    padding: 10px;
    background-color: ${isPressed ? "#222" : "#000"};
    color: #fff;
    font-weight: bold;
    border-radius: 10px;
    transform: ${isPressed ? "scale(0.98)" : "none"};
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
    align-items: flex-end;
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
    <div css={sFootswitch}>
      {data ? <SCLed isActive={!!isActive} /> : null}
      <p>{label}</p>
      <div
        css={sFootswitchToggle}
        onMouseDown={() => {
          toggleActive()
          togglePressed()
        }}
        onTouchStart={() => {
          toggleActive()
          togglePressed()
        }}
        onMouseUp={
          data && data.mode === "toggle"
            ? togglePressed
            : () => {
                toggleActive()
                togglePressed()
              }
        }
        onTouchEnd={() => {
          toggleActive()
          togglePressed()
        }}
        onContextMenu={preventContextMenu}
      >
        {data && data.mode}
      </div>
    </div>
  )
}

export { CFootswitch }
