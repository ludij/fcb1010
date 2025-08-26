type Mode = "toggle" | "momentary";

type ProgramChangeItem = {
  isActive: boolean;
  programChange: number;
};

export type ProgramChange = [
  ProgramChangeItem,
  ProgramChangeItem,
  ProgramChangeItem,
  ProgramChangeItem,
  ProgramChangeItem,
];

export type ControlChangeItem = {
  isActive: boolean;
  controlChange: number;
  off: number;
  on: number;
};

export type ControlChange = [ControlChangeItem, ControlChangeItem];

export type Note = {
  isActive: boolean;
  note: number;
};

export type ExpressionPedal = {
  isActive: boolean;
  controlChange: number;
  off: number;
  on: number;
};

export interface Pedal {
  label: string;
  shortcutKey: string;
  mode: Mode;
  isActive: boolean;
  programChange: ProgramChange;
  controlChange: ControlChange;
  note: Note;
  expressionPedalA: ExpressionPedal;
  expressionPedalB: ExpressionPedal;
}

export type Pedals = Pedal[];

export interface UpdatePedalsParams {
  newValue: Pedal[keyof Pedal];
  pedalsDataIndex: number;
  pedalsDataKey: keyof Pedal;
}

export type UpdatePedals = (params: UpdatePedalsParams) => void;

export interface UseKeyboardShortcuts {
  key: string;
  onKeyDownHandler: () => void;
  onKeyUpHandler: () => void;
}

const PEDAL_DATA_ITEM: Pedal = {
  label: '',
  shortcutKey: '',
  mode: 'momentary',
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
};

export const INITIAL_PEDALS_DATA: Pedals = Array.from(
  { length: 10 },
  () => PEDAL_DATA_ITEM,
).map((item, index) => {
  const extendedItem = { ...item };
  extendedItem.label = index === 1 ? "Test label" : item.label;
  extendedItem.shortcutKey = index === 9 ? '0' : (index + 1).toString();
  extendedItem.mode = index % 3 ? "toggle" : "momentary";
  extendedItem.programChange =
    index === 2
      ? [
        { isActive: true, programChange: 1 },
        { isActive: false, programChange: 0 },
        { isActive: false, programChange: 0 },
        { isActive: false, programChange: 0 },
        { isActive: false, programChange: 0 },
      ]
      : item.programChange;
  extendedItem.controlChange = [
    { isActive: true, controlChange: index, off: 0, on: 127 },
    { isActive: false, controlChange: 0, off: 0, on: 0 },
  ];
  extendedItem.note = {
    isActive: true,
    note: 55 + index,
  };
  return extendedItem;
});
