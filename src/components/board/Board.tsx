import BoardItem from "./BoardItem";
import { useBoardContext } from "../../contexts/BoardContext";

export default function Board() {
    const {board} = useBoardContext()
    return (
        <div className="board">
            {board.map((rows, keyRow: number) => {
                return rows.map((_, keyCol: number) => {
                    return <BoardItem row={keyRow} col={keyCol} key={keyRow + keyCol}/>
                })
            })}
        </div>
    )
}