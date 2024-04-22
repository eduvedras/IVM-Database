import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";
import URL from "../components/URL.jsx";

function Row({ serie, fabricante, navigate }) {
	return (
		<tr className="row">
			<td>{serie}</td>
			<td>{fabricante}</td>
			<td className="cursor-pointer">
				<a
					className="underliner"
					onClick={() => navigate("/EventosRep/" + serie)}
				>
					Selecionar
				</a>
			</td>
		</tr>
	);
}

export default function IVM() {
	const [data, setData] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		let ignore = false;

		async function startFetching() {
			fetch(URL.url + "/api/IVM")
				.then((res) => res.json())
				.then((data) => {
					if (!ignore) {
						const rows = [];
						for (let i = 0; i < data.length; i++) {
							rows.push(
								<Row
									key={data[i][0]}
									serie={data[i][0]}
									fabricante={data[i][1]}
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

	return (
		<div className="background-container">
			<h1 className="page-title">Tabela de IVM's</h1>
			<HomeButton />
			<div className="table-wrapper">
				<table className="table">
					<thead className="head">
						<tr>
							<th>NºSérie</th>
							<th>Fabricante</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{data}</tbody>
				</table>
			</div>
		</div>
	);
}
