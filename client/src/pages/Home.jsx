import React from 'react'
import { useNavigate } from "react-router-dom";

function Mybutton({section}){
    const navigate = useNavigate();
    return (
        <button className='button' onClick={() => navigate("/" + section + "/")}>{section}</button>
    );
}

export default function Home() {
    return (
    <div className='background-container'>
        <h1 className='text-5xl absolute top-14'>Intelligent Vending Machines - Base de Dados</h1>
        <div className='grid grid-cols-1 gap-6 m-auto w-72'>
            <Mybutton section='Categorias' />
            <Mybutton section='Retalhistas' />
            <Mybutton section="IVM's" />
        </div>
    </div>
    )
}
