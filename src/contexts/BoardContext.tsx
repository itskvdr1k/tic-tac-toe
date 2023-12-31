import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useGameContext } from "./GameContext";
import { BoardItemInterface } from "../interfaces";
import { mockBoard } from "../utils";

export interface BoardContextInterface {
    board: BoardItemInterface[][],
    setBoard: Dispatch<SetStateAction<BoardItemInterface[][]>>,
    changeBoard: (row: number, col: number) => void,
    clearBoard: () => void,
    isDraw: () => void
}

const BoardContext = createContext({} as BoardContextInterface)

export const useBoardContext = () => {
    return useContext(BoardContext)
} 

export const BoardContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [board, setBoard] = useState(mockBoard as BoardItemInterface[][])
    const {player, togglePlayer, setIsWinner, isWinner, setScore} = useGameContext()

    const changeBoard = useCallback((row: number, col: number) => {
        if (board[row][col].value === -1) {
            setBoard(prev => {
                return prev.map((array, rowIndex: number) => {
                    if (row === rowIndex) {
                        return array.map((cols, colIndex: number) => {
                            if (colIndex === col) {
                                return {value: player, isPainted: false}
                            }
                            return cols
                        })
                    }
                    return array
                })
            }) 
        }
    }, [setBoard, player, isWinner])

    useEffect(() => {
        togglePlayer()
        checkForWin()
        isDraw()
    }, [board])

    const clearBoard = useCallback(() => {
        setBoard(mockBoard)
    }, [setBoard])

    const paintBoardRow = useCallback((rowIndex: number) => {
        for (let i = 0; i < 3; i++)
            setBoard(() => {
                board[rowIndex][i] = {
                    ...board[rowIndex][i],
                    isPainted: true
                }
                return board
            })
    }, [board])

    const paintBoardColumn = useCallback((columnIndex: number) => {
        for (let i = 0; i < 3; i++)
            setBoard(() => {
                board[i][columnIndex] = {
                    ...board[i][columnIndex],
                    isPainted: true
                }
                return board
            })
    }, [board])

    const paintBoardMainDiagonal = useCallback(() => {
        for (let i = 0; i < 3; i++)
            setBoard(() => {
                board[i][i] = {
                    ...board[i][i],
                    isPainted: true
                }
                return board
            })
    }, [board])

    const paintBoardNonMainDiagonal = useCallback(() => {
        for (let i = 0; i < 3; i++)
            setBoard(() => {
                board[i][2 - i] = {
                    ...board[i][2 - i],
                    isPainted: true
                }
                return board
            })
    }, [board])

    const checkForWin = useCallback(() => {
        // Rows
        for (let i = 0; i < 3; i++) {
            if (checkForWinInRow(i)) {
                setIsWinner(player) 
                setScore((prev: any) => {
                    return {...prev, [player]: prev[player] + 1}
                })
                paintBoardRow(i)
            }
        }

        //Cols
        for (let i = 0; i < 3; i++) {
            if (checkForWinInCol(i)) {
                setIsWinner(player)
                setScore((prev: any) => {
                    return {...prev, [player]: prev[player] + 1}
                }) 
                paintBoardColumn(i)
            } 
        }

        //Diagonal main
        if (checkForWinMainDiagonal()){
            setIsWinner(player) 
            setScore((prev: any) => {
                return {...prev, [player]: prev[player] + 1}
            })
            paintBoardMainDiagonal()
        }

        //Non-main dagonal
        if (checkForWinNonMainDiagonal()) {
            setIsWinner(player) 
            setScore((prev: any) => {
                return {...prev, [player]: prev[player] + 1}
            })
            paintBoardNonMainDiagonal()
        }
    }, [board, player])

    const checkForWinInRow = useCallback((rowIndex: number) => {
        let win = true
        let lastValue = board[rowIndex][0].value
        for (let i = 1; i < 3; i++) 
            if (board[rowIndex][i].value !== lastValue) 
                win = false
        return lastValue !== -1 ? win : false
    }, [board])

    const checkForWinInCol = useCallback((columnIndex: number) => {
        let win = true
        let lastValue = board[0][columnIndex].value
        for (let i = 1; i < 3; i++) 
            if (board[i][columnIndex].value !== lastValue) 
                win = false
        return lastValue !== -1 ? win : false
    }, [board])

    const checkForWinMainDiagonal = useCallback(() => {
        let win = true
        let lastValue = board[0][0].value
        for (let i = 1; i < 3; i++) 
            if (board[i][i].value !== lastValue) 
                win = false
        return lastValue !== -1 ? win : false
    }, [board])

    const checkForWinNonMainDiagonal = useCallback(() => {
        let win = true
        let lastValue = board[0][2].value
        for (let i = 1; i < 3; i++) 
            if (board[i][2 - i].value !== lastValue) 
                win = false
        return lastValue !== -1 ? win : false
    }, [board])

    const countMoves = useCallback(() => {
        let count = 0
        for (let i = 0; i < 3; i++) 
            for (let j = 0; j < 3; j++) 
                if (board[i][j].value === -1) 
                    count++
        return 9 - count
    }, [board])

    const isDraw = useCallback(() => {
        if (countMoves() === 9 && isWinner === -1) {
            setIsWinner(2)
        }
    }, [isWinner, countMoves])

    return (
        <BoardContext.Provider value={{ board, setBoard, changeBoard, clearBoard, isDraw }}>
            {children}
        </BoardContext.Provider>
    )
}