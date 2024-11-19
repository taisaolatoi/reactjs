import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/header";
import Footer from "../../component/footer";
import './Layout.scss'

const LayOut = () => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
export default LayOut;