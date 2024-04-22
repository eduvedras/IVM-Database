import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";
import URL from "../components/URL.jsx";

export default function InserirSubCat() {
	const [category, setCategory] = useState("");
	const [supercategory, setSupercategory] = useState("");
	const navigate = useNavigate();

	async function insertSubCategory(category, supercategory) {
		if (supercategory === "" || category === "") {
			alert("Preencha os dois campos!");
		} else {
			fetch(
				URL.url +
					"/api/categorias/execute_insert_sub?nome=" +
					category +
					"," +
					supercategory
			)
				.then((res) => {
					return res.json();
				})
				.then(navigate("/Categorias/"));
		}
	}

	return (
		<div className="background-container">
			<h1 className="page-title">
				Insira o nome da nova sub categoria e da sua super categoria
			</h1>
			<HomeButton />
			<form
				className="grid grid-cols-1 m-auto h-1/3 w-2/3"
				onSubmit={(e) => {
					e.preventDefault();
					insertSubCategory(category, supercategory);
				}}
			>
				<textarea
					className="text-area"
					placeholder="Inserir Categoria"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
				<textarea
					className="text-area"
					placeholder="Inserir Super Categoria"
					value={supercategory}
					onChange={(e) => setSupercategory(e.target.value)}
				/>
				<button className="button w-32 h-12 m-auto" type="submit">
					Inserir
				</button>
			</form>
		</div>
	);
}
