import React from "react";
import { BrowserRouter } from "react-router-dom";
import router from "./routes/clientRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>{router}</BrowserRouter>;
        </AuthProvider>
    );
}

export default App;
