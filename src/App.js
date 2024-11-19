import Header from "./containers/Header";
import Footer from "./containers/Footer";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <div className="Header">
                <Header />
            </div>
            <div className="Outlet">
                <Outlet />
            </div>
            <div className="Footer">
                <Footer />
            </div>
        </div>
    );
}

export default App;
