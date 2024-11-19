import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/header";
import Footer from "../../component/footer";
import "./Layout.scss";
import { AuthProvider } from "../../contexts/AuthContext";

const LayOut = () => {
    return (
        <AuthProvider>
            <>
                <header>
                    <Header />
                </header>
                <main>
                    <Outlet />
                </main>
                <footer>
                    <Footer />
                </footer>
            </>
        </AuthProvider>
    );
};
export default LayOut;
