import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useState } from "react";
import { ScoreInterface } from "../interfaces";

export interface GameContextInterface {
    player: number,
    setPlayer: Dispatch<SetStateAction<number>>,
    isWinner: number,
    setIsWinner: Dispatch<SetStateAction<number>>,
    togglePlayer: () => void,
    startNewGame: () => void,
    score: ScoreInterface,
    setScore: Dispatch<SetStateAction<ScoreInterface>>
}

const GameContext = createContext({} as GameContextInterface)

export const useGameContext = () => {
    return useContext(GameContext)
}

export const GameContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [player, setPlayer] = useState(1)
    const [isWinner, setIsWinner] = useState(-1)

    const [score, setScore] = useState({0: 0, 1: 0})

    const togglePlayer = useCallback(() => {
        setPlayer(prev => {
            return prev === 0 ? 1 : 0
        })
    }, [setPlayer])

    const startNewGame = useCallback(() => {
        togglePlayer()
        setIsWinner(-1)
    }, [togglePlayer, setIsWinner])

    return (
        <GameContext.Provider value={{ player, setPlayer, togglePlayer, isWinner, setIsWinner, startNewGame, score, setScore }}>  
            {children}
        </GameContext.Provider>
    )
}