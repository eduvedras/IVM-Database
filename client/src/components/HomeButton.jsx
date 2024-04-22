import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function HomeButton() {
	const navigate = useNavigate();
	return (
		<button
			className="button absolute top-14 right-20"
			onClick={() => navigate("/")}
		>
			<FaHome />
		</button>
	);
}
