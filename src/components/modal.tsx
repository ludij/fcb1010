/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
    Pedals,
    UpdatePedals,
    UpdatePedalsParams,
    ProgramChange,
    ControlChange,
    Note,
    ExpressionPedal,
} from '../data/data';
import { JSX } from '@emotion/react/jsx-runtime';

interface ModalProps {
    data: Pedals;
    updateData: UpdatePedals;
    isVisible: boolean;
    toggleVisibility: () => void;
}

const CModal = ({
    data,
    updateData,
    isVisible = false,
    toggleVisibility,
}: ModalProps): JSX.Element => {
    const modalStyles = css`
        label: modal;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        background-color: #fff;
        transform: ${isVisible ? 'none' : 'translateY(-100%)'};
        opacity: ${isVisible ? '1' : '0'};
        overflow: auto;

        table {
            border-collapse: collapse;
            margin: 0 auto;
        }

        tbody > tr:nth-of-type(odd) {
            background-color: #eee;
        }

        th,
        td {
            border: 1px solid black;
            text-align: left;
            padding: 5px;
            vertical-align: top;
        }

        label {
            display: block;
        }

        ol {
            margin: 0;
            padding-left: 20px;
        }
    `;

    return (
        <div css={modalStyles}>
            <button type="button" onClick={toggleVisibility}>
                stop editing
            </button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Label</th>
                        <th>Mode</th>
                        <th>Program Change</th>
                        <th>Control Change</th>
                        <th>Note</th>
                        <th>Expression Pedal A</th>
                        <th>Expression Pedal B</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={'tablerow' + index}>
                                <td>{index + 1}</td>

                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(event) => {
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            event.target.value,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey: 'label',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Label
                                    </label>
                                </td>

                                <td>
                                    <label>
                                        <input
                                            type="radio"
                                            name={'mode' + index}
                                            value="toggle"
                                            checked={item.mode === 'toggle'}
                                            onChange={(event) => {
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            event.target.value,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey: 'mode',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Toggle
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={'mode' + index}
                                            value="momentary"
                                            checked={item.mode === 'momentary'}
                                            onChange={(event) => {
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            event.target.value,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey: 'mode',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Momentary
                                    </label>
                                </td>

                                <td>
                                    <ol>
                                        {item.programChange.map(
                                            (
                                                programChange,
                                                programChangeIndex
                                            ) => {
                                                return (
                                                    <li
                                                        key={
                                                            'programchange' +
                                                            programChangeIndex
                                                        }
                                                    >
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    programChange.isActive
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    const newProgramChange: ProgramChange =
                                                                        [
                                                                            ...item.programChange,
                                                                        ];
                                                                    newProgramChange[
                                                                        programChangeIndex
                                                                    ] = {
                                                                        ...newProgramChange[
                                                                            programChangeIndex
                                                                        ],
                                                                        isActive:
                                                                            event
                                                                                .target
                                                                                .checked,
                                                                    };
                                                                    const args: UpdatePedalsParams =
                                                                        {
                                                                            newValue:
                                                                                newProgramChange,
                                                                            pedalsDataIndex:
                                                                                index,
                                                                            pedalsDataKey:
                                                                                'programChange',
                                                                        };
                                                                    updateData(
                                                                        args
                                                                    );
                                                                }}
                                                            />
                                                            Active
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="number"
                                                                value={
                                                                    programChange.programChange
                                                                }
                                                                min="0"
                                                                max="127"
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    const newProgramChange: ProgramChange =
                                                                        [
                                                                            ...item.programChange,
                                                                        ];
                                                                    newProgramChange[
                                                                        programChangeIndex
                                                                    ] = {
                                                                        ...newProgramChange[
                                                                            programChangeIndex
                                                                        ],
                                                                        programChange:
                                                                            parseInt(
                                                                                event
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                    };
                                                                    const args: UpdatePedalsParams =
                                                                        {
                                                                            newValue:
                                                                                newProgramChange,
                                                                            pedalsDataIndex:
                                                                                index,
                                                                            pedalsDataKey:
                                                                                'programChange',
                                                                        };
                                                                    updateData(
                                                                        args
                                                                    );
                                                                }}
                                                            />
                                                            Number
                                                        </label>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ol>
                                </td>

                                <td>
                                    <ol>
                                        {item.controlChange.map(
                                            (
                                                controlChange,
                                                controlChangeIndex
                                            ) => {
                                                return (
                                                    <li
                                                        key={
                                                            'controlchange' +
                                                            controlChangeIndex
                                                        }
                                                    >
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    controlChange.isActive
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    const newControlChange: ControlChange =
                                                                        [
                                                                            ...item.controlChange,
                                                                        ];
                                                                    newControlChange[
                                                                        controlChangeIndex
                                                                    ] = {
                                                                        ...newControlChange[
                                                                            controlChangeIndex
                                                                        ],
                                                                        isActive:
                                                                            event
                                                                                .target
                                                                                .checked,
                                                                    };
                                                                    const args: UpdatePedalsParams =
                                                                        {
                                                                            newValue:
                                                                                newControlChange,
                                                                            pedalsDataIndex:
                                                                                index,
                                                                            pedalsDataKey:
                                                                                'controlChange',
                                                                        };
                                                                    updateData(
                                                                        args
                                                                    );
                                                                }}
                                                            />
                                                            Active
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="number"
                                                                value={
                                                                    controlChange.controlChange
                                                                }
                                                                min="0"
                                                                max="127"
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    const newControlChange: ControlChange =
                                                                        [
                                                                            ...item.controlChange,
                                                                        ];
                                                                    newControlChange[
                                                                        controlChangeIndex
                                                                    ] = {
                                                                        ...newControlChange[
                                                                            controlChangeIndex
                                                                        ],
                                                                        controlChange:
                                                                            parseInt(
                                                                                event
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                    };
                                                                    const args: UpdatePedalsParams =
                                                                        {
                                                                            newValue:
                                                                                newControlChange,
                                                                            pedalsDataIndex:
                                                                                index,
                                                                            pedalsDataKey:
                                                                                'controlChange',
                                                                        };
                                                                    updateData(
                                                                        args
                                                                    );
                                                                }}
                                                            />
                                                            Number
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="number"
                                                                value={
                                                                    controlChange.on
                                                                }
                                                                min="0"
                                                                max="127"
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    const newControlChange: ControlChange =
                                                                        [
                                                                            ...item.controlChange,
                                                                        ];
                                                                    newControlChange[
                                                                        controlChangeIndex
                                                                    ] = {
                                                                        ...newControlChange[
                                                                            controlChangeIndex
                                                                        ],
                                                                        on: parseInt(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        ),
                                                                    };
                                                                    const args: UpdatePedalsParams =
                                                                        {
                                                                            newValue:
                                                                                newControlChange,
                                                                            pedalsDataIndex:
                                                                                index,
                                                                            pedalsDataKey:
                                                                                'controlChange',
                                                                        };
                                                                    updateData(
                                                                        args
                                                                    );
                                                                }}
                                                            />
                                                            Value
                                                        </label>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ol>
                                </td>

                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={item.note.isActive}
                                            onChange={(event) => {
                                                const newNote: Note = {
                                                    ...item.note,
                                                    isActive:
                                                        event.target.checked,
                                                };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue: newNote,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey: 'note',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Active
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            value={item.note.note}
                                            min="0"
                                            max="127"
                                            onChange={(event) => {
                                                const newNote: Note = {
                                                    ...item.note,
                                                    note: parseInt(
                                                        event.target.value
                                                    ),
                                                };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue: newNote,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey: 'note',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Number
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={
                                                item.expressionPedalA.isActive
                                            }
                                            onChange={(event) => {
                                                const newExpressionPedalA: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalA,
                                                        isActive:
                                                            event.target
                                                                .checked,
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalA,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalA',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Active
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            value={
                                                item.expressionPedalA
                                                    .controlChange
                                            }
                                            min="0"
                                            max="127"
                                            onChange={(event) => {
                                                const newExpressionPedalA: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalA,
                                                        controlChange: parseInt(
                                                            event.target.value
                                                        ),
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalA,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalA',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Control Change Number
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            value={item.expressionPedalA.off}
                                            min="0"
                                            max="127"
                                            onChange={(event) => {
                                                const newExpressionPedalA: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalA,
                                                        off: parseInt(
                                                            event.target.value
                                                        ),
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalA,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalA',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Minimum Value
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            value={item.expressionPedalA.on}
                                            min="0"
                                            max="127"
                                            onChange={(event) => {
                                                const newExpressionPedalA: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalA,
                                                        on: parseInt(
                                                            event.target.value
                                                        ),
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalA,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalA',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Maximum Value
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={
                                                item.expressionPedalB.isActive
                                            }
                                            onChange={(event) => {
                                                const newExpressionPedalB: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalB,
                                                        isActive:
                                                            event.target
                                                                .checked,
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalB,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalB',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Active
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            value={
                                                item.expressionPedalB
                                                    .controlChange
                                            }
                                            min="0"
                                            max="127"
                                            onChange={(event) => {
                                                const newExpressionPedalB: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalB,
                                                        controlChange: parseInt(
                                                            event.target.value
                                                        ),
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalB,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalB',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Control Change Number
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            value={item.expressionPedalB.off}
                                            min="0"
                                            max="127"
                                            onChange={(event) => {
                                                const newExpressionPedalB: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalB,
                                                        off: parseInt(
                                                            event.target.value
                                                        ),
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalB,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalB',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Minimum Value
                                    </label>
                                    <label>
                                        <input
                                            type="number"
                                            value={item.expressionPedalB.on}
                                            min="0"
                                            max="127"
                                            onChange={(event) => {
                                                const newExpressionPedalB: ExpressionPedal =
                                                    {
                                                        ...item.expressionPedalB,
                                                        on: parseInt(
                                                            event.target.value
                                                        ),
                                                    };
                                                const args: UpdatePedalsParams =
                                                    {
                                                        newValue:
                                                            newExpressionPedalB,
                                                        pedalsDataIndex: index,
                                                        pedalsDataKey:
                                                            'expressionPedalB',
                                                    };
                                                updateData(args);
                                            }}
                                        />
                                        Maximum Value
                                    </label>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export { CModal };
