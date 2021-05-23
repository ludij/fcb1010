/** @jsxImportSource @emotion/react */
import { useState } from "react"
import { css } from "@emotion/react"
import { CFootswitch } from "./components/footswitch"
import { CExpressionPedal } from "./components/expressionPedal"
import { CModal } from "./components/modal"
import "./App.css"
import { data, Pedals } from "./data/data"
import { Midi } from "./scripts/midi"

interface AppProps {
  pedals?: Pedals
}

const midi = new Midi()
let midiSuccess: boolean | Promise<boolean>
let midiSupport: boolean
if ("requestMIDIAccess" in navigator) {
  midiSuccess = midi.init()
  midiSupport = true
} else {
  midiSuccess = false
  midiSupport = false
}

const App = ({ pedals = data }: AppProps): JSX.Element => {
  const [modalIsVisible, setModalVisibility] = useState<boolean>(false)
  const toggleModalVisibility = () => setModalVisibility(!modalIsVisible)

  const getActiveFootswitches = () => {
    const activeItems = pedals
      .filter((item) => item.isActive)
      .map((item) => pedals.indexOf(item))
    return activeItems
  }

  const [activeFootswitches, setActiveFootswitches] = useState(
    getActiveFootswitches()
  )

  const toggleFootswitch = (index: number): void => {
    if (activeFootswitches.includes(index)) {
      setActiveFootswitches(activeFootswitches.filter((item) => item !== index))
      sendMidi(index)
      return
    }
    setActiveFootswitches([...activeFootswitches, index])
    if (midiSuccess) {
      sendMidi(index, true)
    }
    return
  }

  const sendMidi = (index: number, sendOn?: boolean) => {
    const controlChanges = pedals[index].controlChange
      .filter((item) => item.isActive)
      .map((item) => {
        return { controlChange: item.controlChange, on: item.on, off: item.off }
      })
    const note = pedals[index].note.isActive
      ? pedals[index].note.note
      : undefined
    if (sendOn) {
      const programChanges = pedals[index].programChange
        .filter((item) => item.isActive)
        .map((item) => item.programChange)
      for (const programChange of programChanges) {
        midi.sendMidiMessage("programChange", programChange, 0)
      }
      for (const controlChange of controlChanges) {
        midi.sendMidiMessage(
          "controlChange",
          controlChange.controlChange,
          controlChange.on
        )
      }
      if (note) {
        midi.sendMidiMessage("noteOn", note, 127)
      }
    } else {
      for (const controlChange of controlChanges) {
        midi.sendMidiMessage(
          "controlChange",
          controlChange.controlChange,
          controlChange.off
        )
      }
      if (note) {
        midi.sendMidiMessage("noteOff", note, 127)
      }
    }
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

  const sMidiState = css`
    color: ${midiSuccess ? "green" : "red"};
  `

  const sMidiSupport = css`
    color: red;
  `

  const footswitchNumbers = Array.from(Array(10).keys())

  return (
    <div css={sContainer}>
      <div css={sHeader}>
        <h1>FCB1010</h1>
        <p css={sMidiState}>MIDI {midiSuccess ? "" : "dis"}connected</p>
        <p css={sMidiSupport}>
          {midiSuccess
            ? null
            : midiSupport
            ? "Please allow your browser to use MIDI"
            : "Your browser doesn't support MIDI, please use Chrome"}
        </p>
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
