import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";
import URL from "../components/URL.jsx";

function Row({ tin, nome, handleRemove }) {
	return (
		<tr className="row">
			<td>{tin}</td>
			<td>{nome}</td>
			<td className="cursor-pointer">
				<a className="underliner" onClick={() => handleRemove(tin)}>
					Remover
				</a>
			</td>
		</tr>
	);
}

export default function Retalhistas() {
	const [data, setData] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		let ignore = false;

		async function startFetching() {
			fetch(URL.url + "/api/retalhistas")
				.then((res) => res.json())
				.then((data) => {
					if (!ignore) {
						const rows = [];
						for (let i = 0; i < data.length; i++) {
							rows.push(
								<Row
									key={data[i][0]}
									tin={data[i][0]}
									nome={data[i][1]}
									handleRemove={handleRemove}
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

	async function handleRemove(tin) {
		fetch(URL.url + "/api/retalhistas/remove?tin=" + tin)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const rows = [];
				for (let i = 0; i < data.length; i++) {
					rows.push(
						<Row
							key={data[i][0]}
							tin={data[i][0]}
							nome={data[i][1]}
							handleRemove={handleRemove}
						/>
					);
				}
				setData(rows);
			});
	}

	return (
		<div className="background-container">
			<h1 className="page-title">Tabela de Retalhistas</h1>
			<HomeButton />
			<div className="table-wrapper">
				<table className="table">
					<thead className="head">
						<tr>
							<th>TIN</th>
							<th>Nome</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{data}</tbody>
				</table>
			</div>
			<div className="relative m-auto grid grid-cols-1 gap-4">
				<button
					className="button"
					onClick={() => navigate("/InserirRet/")}
				>
					Inserir Novo Retalhista
				</button>
			</div>
		</div>
	);
}
