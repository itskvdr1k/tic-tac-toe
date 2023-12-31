import Board from "./components/board/Board";
import Layout from "./components/layout/Layout";
import Score from "./components/score/Score";

export default function App() {
    return (
        <Layout>
            <Board/>
            <Score/>
        </Layout>
    )
}