/** @jsxImportSource @emotion/react */
import { useState } from "react"
import { css } from "@emotion/react"
import { CFootswitch } from "./components/footswitch"
import { CExpressionPedal } from "./components/expressionPedal"
import { CModal } from "./components/modal"
import "./App.css"
import { data, Pedals } from "./data/data"

interface AppProps {
  modeIsPlay?: boolean
  pedals?: Pedals
}

const App = ({ modeIsPlay = true, pedals = data }: AppProps): JSX.Element => {
  const [modalIsVisible, setModalVisibility] = useState<boolean>(false)
  const toggleModalVisibility = () => setModalVisibility(!modalIsVisible)

  const getActiveFootswitches = () => {
    const activeItems = []
    for (let item of data) {
      if (item.isActive) {
        activeItems.push(data.indexOf(item))
      }
    }
    return activeItems
  }

  const [activeFootswitches, setActiveFootswitches] = useState(getActiveFootswitches())
  const toggleFootswitch = (index: number): void => {
    if (activeFootswitches.includes(index)) {
      setActiveFootswitches(activeFootswitches.filter((item) => item !== index))
      return
    }
    setActiveFootswitches([...activeFootswitches, index])
    return
  }

  const sContainer = css`
    label: container;
    display: grid;
    padding: 5px;
    grid-template-columns: repeat(18, calc((100vh - 10px) / 18));
    grid-template-rows: 0.5fr 1fr 1fr;
    gap: 5px 0px;
    grid-template-areas:
      ". header header header header header header header header header header header header header header header header header"
      ". footswitch6 . footswitch7 . footswitch8 . footswitch9 . footswitch10 . footswitchUp . expressionPedalA expressionPedalA . expressionPedalB expressionPedalB"
      "footswitch1 . footswitch2 . footswitch3 . footswitch4 . footswitch5 . . footswitchDown . expressionPedalA expressionPedalA . expressionPedalB expressionPedalB";
    background-color: #eee;
    height: 100vw;
    overflow: hidden;

    @media (min-width: 568px) {
      grid-template-columns: repeat(18, calc((100vw - 10px) / 18));
      height: 100vh;
      width: 100vw;
    }

    @media (min-width: 1024px) {
      max-height: 40vw;
    }
  `

  const sHeader = css`
    label: header;
    padding: 10px;
    grid-area: header;
  `

  const footswitchNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div css={sContainer}>
      <div css={sHeader}>
        <h1>FCB1010</h1>
        <button type="button" onClick={toggleModalVisibility}>
          open modal
        </button>
      </div>
      {footswitchNumbers.map((index: number) => {
        return (
          <CFootswitch
            label={(index + 1).toString()}
            data={pedals[index]}
            isActive={activeFootswitches.includes(index)}
            toggleFootswitch={toggleFootswitch}
            key={"footswitch" + index}
          />
        )
      })}
      <CFootswitch label="Up" />
      <CFootswitch label="Down" />
      <CExpressionPedal label="A" />
      <CExpressionPedal label="B" />
      <CModal
        isVisible={modalIsVisible}
        toggleVisibility={toggleModalVisibility}
      />
    </div>
  )
}

export default App
