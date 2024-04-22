import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";

function Row({ record }) {
	return (
		<tr className="row">
			<td>{record}</td>
		</tr>
	);
}

export default function SubCat() {
	const { cat } = useParams();

	const [data, setData] = useState([]);

	useEffect(() => {
		let ignore = false;

		function startFetching() {
			fetch("/api/categorias/select?cat=" + cat)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (!ignore) {
						const rows = [];
						for (let i = 0; i < data.length; i++) {
							if (data[i][1] !== cat) {
								rows.push(
									<Row key={data[i][1]} record={data[i][1]} />
								);
							}
						}
						setData(rows);
						console.log(rows);
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
			<h1 className="page-title">Tabela de SubCategorias de {cat}</h1>
			<HomeButton />
			<div className="table-wrapper">
				<table className="table">
					<thead className="head">
						<tr>
							<th>SubCategorias</th>
						</tr>
					</thead>
					<tbody>{data}</tbody>
				</table>
			</div>
		</div>
	);
}
