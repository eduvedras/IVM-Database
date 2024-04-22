import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";
import URL from "../components/URL.jsx";

function Row({ record, handleRemove, navigate }) {
	return (
		<tr className="row">
			<td>{record}</td>
			<td className="cursor-pointer">
				<a
					className="underliner"
					onClick={() => navigate("/SubCat/" + record)}
				>
					Selecionar
				</a>
			</td>
			<td className="cursor-pointer">
				<a className="underliner" onClick={() => handleRemove(record)}>
					Remover
				</a>
			</td>
		</tr>
	);
}

export default function Categorias() {
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		let ignore = false;

		async function startFetching() {
			fetch(URL.url + "/api/categorias")
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (!ignore) {
						const rows = [];
						for (let i = 0; i < data.length; i++) {
							rows.push(
								<Row
									key={data[i][0]}
									record={data[i][0]}
									handleRemove={handleRemove}
									navigate={navigate}
								/>
							);
						}
						setData(rows);
					}
				});
		}

		startFetching();

		return () => {
			ignore = true;
		};
	}, []);

	async function handleRemove(record) {
		fetch(URL.url + "/api/categorias/remove?cat=" + record)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const rows = [];
				for (let i = 0; i < data.length; i++) {
					rows.push(
						<Row
							key={data[i][0]}
							record={data[i][0]}
							handleRemove={handleRemove}
							navigate={navigate}
						/>
					);
				}
				setData(rows);
				console.log(rows);
			});
	}

	return (
		<div className="background-container">
			<h1 className="page-title">Tabela de Categorias</h1>
			<HomeButton />
			<div className="table-wrapper">
				<table className="table">
					<thead className="head">
						<tr>
							<th>Nome</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>{data}</tbody>
				</table>
			</div>
			<div className="relative m-auto grid grid-cols-1 gap-4">
				<button
					className="button"
					onClick={() => navigate("/InserirCat/")}
				>
					Inserir Categoria
				</button>
				<button
					className="button"
					onClick={() => navigate("/InserirSubCat/")}
				>
					Inserir SubCategoria
				</button>
			</div>
		</div>
	);
}
