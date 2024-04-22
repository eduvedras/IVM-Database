import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Categorias from "./pages/Categorias.jsx"
import Retalhistas from "./pages/Retalhistas.jsx"
import IVM from "./pages/IVM.jsx"
import SubCat from "./pages/SubCat.jsx"
import InserirCat from "./pages/InserirCat.jsx"
import InserirSubCat from "./pages/InserirSubCat.jsx"
import InserirRet from "./pages/InserirRet.jsx"
import EventosRep from "./pages/EventosRep.jsx"

export const RoutePaths = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Categorias/" element={<Categorias />} />
                <Route path="/SubCat/:cat" element={<SubCat />} />
                <Route path="/InserirCat/" element={<InserirCat />} />
                <Route path="/InserirSubCat/" element={<InserirSubCat />} />
                <Route path="/Retalhistas/" element={<Retalhistas />} />
                <Route path="/InserirRet/" element={<InserirRet/>} />
                <Route path="/IVM's/" element={<IVM />} />
                <Route path="/EventosRep/:IVM" element={<EventosRep />} />
            </Routes>
        </Router>
    );
}