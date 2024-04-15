import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Categorias from "./pages/Categorias.jsx"

export const RoutePaths = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categorias/" element={<Categorias />} />
            </Routes>
        </Router>
    );
}