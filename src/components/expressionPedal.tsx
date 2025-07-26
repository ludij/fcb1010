/** @jsxImportSource @emotion/react */
import { useRef, useState, MouseEvent, useEffect } from "react"
import { css } from "@emotion/react"
import { JSX } from '@emotion/react/jsx-runtime'

interface ExpressionPedalProps {
  label: string
}

const CExpressionPedal = ({
  label,
}: ExpressionPedalProps): JSX.Element => {
  const sliderContainer = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLInputElement>(null)

  const [sliderDimensions, setSliderDimensions] = useState<{
    width: string
    height: string
  }>({ width: "100%", height: "100%" })

  const [isPressed, setPressed] = useState<boolean>(false)
  const togglePressed = () => setPressed(!isPressed)

  const preventContextMenu = (event: MouseEvent) => {
    event.preventDefault()
  }

  useEffect(() => {
    const width = sliderContainer.current
      ? sliderContainer.current.offsetHeight + "px"
      : "100%"
    const height = sliderContainer.current
      ? sliderContainer.current.offsetWidth + "px"
      : "100%"
    setSliderDimensions({ height, width })
  }, [])

  const sExpressionPedal = css`
    label: expression-pedal;
    border: 1px solid #ccc;
    grid-area: expressionPedal${label};
    text-align: center;
    background-color: ${isPressed ? "#222" : "#000"};
    color: #fff;
    font-weight: bold;
    border-radius: 10px;
    transform: ${isPressed ? "scale(0.98)" : "none"};
    transition: background-color 0.2s;
    position: relative;
    padding: 10px 10px 10px calc(50% + 10px);

    p {
      margin: 0;
    }

    small {
      font-weight: normal;
      word-break: break-word;
    }
  `

  const sExpressionPedalSliderContainer = css`
    label: expression-pedal__slider-container;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 50%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.25);
    font-weight: normal;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    label {
      position: absolute;
      bottom: 10px;
      user-select: none;
    }

    input[type="range"]::-webkit-slider-thumb,
    input[type="range"]::-moz-range-thumb,
    input[type="range"]::-ms-thumb {
      box-shadow: none;
      appearance: none;
      height: 300px;
      width: 2px;
      background: #fff;
      border: none;
    }
  `

  const sExpressionPedalSlider = css`
    label: expression-pedal__slider;
    cursor: pointer;
    flex: 0 0 calc(${sliderDimensions.width} - 4px);
    height: ${sliderDimensions.height};
    transform: rotate(-90deg);
    appearance: none;
    margin: 0;
    background: transparent;
    -webkit-tap-highlight-color: transparent;
    margin: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::-webkit-slider-thumb,
    &::-moz-range-thumb,
    &::-ms-thumb {
      box-shadow: none;
      appearance: none;
      height: 300px;
      width: 2px;
      background: #fff;
      border: none;
    }
  `

  return (
    <div css={sExpressionPedal}>
      <p>{label}</p>

      <div
        css={sExpressionPedalSliderContainer}
        onMouseDown={togglePressed}
        onTouchStart={togglePressed}
        onMouseUp={togglePressed}
        onTouchEnd={togglePressed}
        onContextMenu={preventContextMenu}
        ref={sliderContainer}
      >
        <label htmlFor="slide">slide</label>
        <input
          css={sExpressionPedalSlider}
          name="slide"
          type="range"
          min="0"
          max="127"
          ref={slider}
        />
      </div>
    </div>
  )
}

export { CExpressionPedal }
