import { useBoardContext } from "../../contexts/BoardContext"
import { useGameContext } from "../../contexts/GameContext"

export default function Score() {
    const { isWinner, startNewGame, score } = useGameContext()
    const { clearBoard } = useBoardContext()
    const handleClick = () => {
        clearBoard()
        startNewGame()
    }
    return (
        <div className="score__wrapper">
            {isWinner !== -1
                &&
                    <h2 className="score__title">{isWinner === 2 ? "Draw" : <> Player {isWinner} won</>}</h2>
            }
            <div className="score">
                <span className={isWinner === 0 ? "painted" : ""}>{score["0"]}</span>
                <span className={isWinner === 1 ? "painted" : ""}>{score["1"]}</span>
            </div>
            {isWinner !== -1
                &&
                    <button className="score__button" onClick={handleClick}>New Game</button>
            }
        </div>
    )
}