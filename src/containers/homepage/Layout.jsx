import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/header";
import Footer from "../../component/footer";
import "./Layout.scss";
import { AuthProvider } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
                <ToastContainer // Add the ToastContainer here
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </>
        </AuthProvider>
    );
};
export default LayOut;
