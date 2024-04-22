import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";
import URL from "../components/URL.jsx";

export default function InserirRet() {
	const [tin, setTin] = useState("");
	const [nome, setNome] = useState("");
	const navigate = useNavigate();

	async function insertRetalhista(tin, nome) {
		if (tin === "" || nome === "") {
			alert("Preencha os dois campos!");
		} else {
			fetch(
				URL.url +
					"/api/retalhistas/execute_insert?ret=" +
					tin +
					"," +
					nome
			)
				.then((res) => {
					return res.json();
				})
				.then(navigate("/Retalhistas/"));
		}
	}

	return (
		<div className="background-container">
			<h1 className="page-title">Insira o novo retalhista</h1>
			<HomeButton />
			<form
				className="grid grid-cols-1 m-auto h-1/3 w-2/3"
				onSubmit={(e) => {
					e.preventDefault();
					insertRetalhista(tin, nome);
				}}
			>
				<textarea
					className="text-area"
					placeholder="Inserir Tin"
					value={tin}
					onChange={(e) => setTin(e.target.value)}
				/>
				<textarea
					className="text-area"
					placeholder="Inserir Nome"
					value={nome}
					onChange={(e) => setNome(e.target.value)}
				/>
				<button className="button w-32 h-12 m-auto" type="submit">
					Inserir
				</button>
			</form>
		</div>
	);
}
