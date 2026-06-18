"use client";

import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Dashboard } from "@/components/dashboard/dashboard";
import { Form } from "@/components/dashboard/form/form";
import { Loader } from "@/components/ui/loader/loader";
import type { RootState } from "@/store";

const Page = (): ReactElement => {
	const { user, initialized, checkingAuth } = useSelector((s: RootState) => s.auth);

	const content =
		!initialized || checkingAuth ? (
			<Loader label="Verificando Sesión" />
		) : user ? (
			<Dashboard />
		) : (
			<Form />
		);

	return content;
};

export default Page;
