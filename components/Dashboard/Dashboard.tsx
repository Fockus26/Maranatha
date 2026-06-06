import type { ReactElement } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";

export const Dashboard = (): ReactElement => {
	const dispatch = useDispatch<AppDispatch>();

	function handleLogout() {
		dispatch(logout());
	}

	return (
		<button type="button" onClick={handleLogout}>
			Cerrar Sesion
		</button>
	);
};
