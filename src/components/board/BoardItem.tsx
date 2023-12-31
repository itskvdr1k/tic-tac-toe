import { useBoardContext } from "../../contexts/BoardContext"
import { useGameContext } from "../../contexts/GameContext"

interface BoardItemPropsInterface {
    row: number,
    col: number
}

export default function BoardItem({ row, col }: BoardItemPropsInterface) {
    const { board, changeBoard } = useBoardContext()
    const { isWinner } = useGameContext()
    const handleClick = () => {
        isWinner === -1 && changeBoard(row, col)
    }
    return (
        <div 
            className={
                `board__item ${board[row][col].value === 0 ? "zero" : 
                (board[row][col].value === 1 ? "cross" : "")} 
                ${board[row][col].isPainted ? "painted" : ""}
                ${isWinner !== -1 ? "disabled" : ""}
            `} 
            onClick={handleClick} 
            aria-disabled={isWinner !== -1}
        />
    )
}