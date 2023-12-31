import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="wrapper">
            <Header/>
            <main className="main">
                {children}
            </main>
        </div>
    )
}