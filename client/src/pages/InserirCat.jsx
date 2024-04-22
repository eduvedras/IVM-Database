import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";
import URL from "../components/URL.jsx";

export default function InserirCat() {
	const [category, setCategory] = useState("");
	const navigate = useNavigate();

	async function insertCategory(category) {
		fetch(URL.url + "/api/categorias/execute_insert?nome=" + category)
			.then((res) => {
				return res.json();
			})
			.then(navigate("/Categorias/"));
	}

	return (
		<div className="background-container">
			<h1 className="page-title">Insira o nome da nova categoria</h1>
			<HomeButton />
			<form
				className="grid grid-cols-1 m-auto h-1/3 w-2/3"
				onSubmit={() => {
					insertCategory(category);
				}}
			>
				<textarea
					className="text-area"
					placeholder="New Category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
				<button className="button w-32 h-12 m-auto" type="submit">
					Inserir
				</button>
			</form>
		</div>
	);
}
