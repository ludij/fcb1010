/** @jsxImportSource @emotion/react */
import "./App.css"
import { css } from "@emotion/react"
import { SCHeader } from "./components/header"
import { CFootswitch } from "./components/footswitch"
import { CExpressionPedal } from "./components/expressionPedal"

function App() {
  const container = css`
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

  return (
    <div css={container}>
      <SCHeader>
        <h1>FCB1010</h1>
      </SCHeader>
      <CFootswitch label="6" />
      <CFootswitch label="7" isStompBox={true} />
      <CFootswitch label="8" isStompBox={true} />
      <CFootswitch label="9" isStompBox={true} />
      <CFootswitch label="10" isStompBox={true} />
      <CFootswitch label="Up" hasNoLed={true} />
      <CExpressionPedal label="A" />
      <CExpressionPedal label="B" />
      <CFootswitch label="1" />
      <CFootswitch label="2" isStompBox={true} />
      <CFootswitch label="3" isStompBox={true} />
      <CFootswitch label="4" isStompBox={true} />
      <CFootswitch label="5" isStompBox={true} />
      <CFootswitch label="Down" hasNoLed={true} />
    </div>
  )
}

export default App
