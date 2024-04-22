import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";
import URL from "../components/URL.jsx";

function Row({ ean, nro, num_serie, fabricante, instante, unidades, tin }) {
	return (
		<tr className="row">
			<td>{ean}</td>
			<td>{nro}</td>
			<td>{num_serie}</td>
			<td>{fabricante}</td>
			<td>{instante}</td>
			<td>{unidades}</td>
			<td>{tin}</td>
		</tr>
	);
}

export default function EventosRep() {
	const { IVM } = useParams();

	const [data, setData] = useState([]);

	useEffect(() => {
		let ignore = false;

		function startFetching() {
			fetch(URL.url + "/api/IVM/select?IVM=" + IVM)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (!ignore) {
						console.log(data);
						const rows = [];
						for (let i = 0; i < data.length; i++) {
							if (data[i][1] !== IVM) {
								rows.push(
									<Row
										key={data[i][4]}
										ean={data[i][0]}
										nro={data[i][1]}
										num_serie={data[i][2]}
										fabricante={data[i][3]}
										instante={data[i][4]}
										unidades={data[i][5]}
										tin={data[i][6]}
									/>
								);
							}
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
			<h1 className="page-title">
				Tabela de eventos de reposição para a IVM com nºsérie {IVM}
			</h1>
			<HomeButton />
			<div className="table-wrapper">
				<table className="table">
					<thead className="head">
						<tr>
							<th>ean</th>
							<th>nro</th>
							<th>nºsérie</th>
							<th>fabricante</th>
							<th>instante</th>
							<th>unidades</th>
							<th>tin</th>
						</tr>
					</thead>
					<tbody>{data}</tbody>
				</table>
			</div>
		</div>
	);
}
