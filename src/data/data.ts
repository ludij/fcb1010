type ProgramChangeItem = {
  isActive: boolean
  programChange: number
}

type ProgramChange = [
  ProgramChangeItem,
  ProgramChangeItem,
  ProgramChangeItem,
  ProgramChangeItem,
  ProgramChangeItem
]

type ControlChangeItem = {
  isActive: boolean
  controlChange: number
  off: number
  on: number
}

type ControlChange = [ControlChangeItem, ControlChangeItem]

type Note = {
  isActive: boolean
  note: number
}

type ExpressionPedal = {
  isActive: boolean
  controlChange: number
  off: number
  on: number
}

type Pedal = {
  label: string
  isStompBox: boolean
  isActive: boolean
  programChange: ProgramChange
  controlChange: ControlChange
  note: Note
  expressionPedalA: ExpressionPedal
  expressionPedalB: ExpressionPedal
}

// TODO: decide whether Pedals should be of type `tuple` or `array`
// type Pedals = [
//   Pedal,
//   Pedal,
//   Pedal,
//   Pedal,
//   Pedal,
//   Pedal,
//   Pedal,
//   Pedal,
//   Pedal,
//   Pedal
// ]
type Pedals = Pedal[]

const dataItem: Pedal = {
  label: "",
  isStompBox: false,
  isActive: false,
  programChange: [
    { isActive: false, programChange: 0 },
    { isActive: false, programChange: 0 },
    { isActive: false, programChange: 0 },
    { isActive: false, programChange: 0 },
    { isActive: false, programChange: 0 },
  ],
  controlChange: [
    { isActive: false, controlChange: 0, off: 0, on: 0 },
    { isActive: false, controlChange: 0, off: 0, on: 0 },
  ],
  note: { isActive: false, note: 0 },
  expressionPedalA: {
    isActive: false,
    controlChange: 0,
    off: 0,
    on: 0,
  },
  expressionPedalB: {
    isActive: false,
    controlChange: 0,
    off: 0,
    on: 0,
  },
}

const basicData: Pedals = Array.from({ length: 10 }, () => dataItem)

const data: Pedals = basicData.map((item, index) => {
  const extendedItem = {...item}
  extendedItem.label = index === 1 ? "Test label" : item.label
  extendedItem.isStompBox = !!(index % 3)
  extendedItem.programChange =
    index === 2
      ? [
          { isActive: true, programChange: 1 },
          { isActive: false, programChange: 0 },
          { isActive: false, programChange: 0 },
          { isActive: false, programChange: 0 },
          { isActive: false, programChange: 0 },
        ]
      : item.programChange
  extendedItem.controlChange = [
    { isActive: true, controlChange: index, off: 0, on: 127 },
    { isActive: false, controlChange: 0, off: 0, on: 0 },
  ]
  extendedItem.note = {
    isActive: true,
    note: 55 + index,
  }
  return extendedItem
})

export { data }
export type { Pedal, Pedals }
