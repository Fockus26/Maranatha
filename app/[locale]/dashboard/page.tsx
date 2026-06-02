"use client";

import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Form } from "@/components/Dashboard/Form";
import type { RootState } from "@/store";

const Page = (): ReactElement => {
    const { user, initialized, checkingAuth } = useSelector((s: RootState) => s.auth);

    if (!initialized || checkingAuth) {
        return <div>Cargando...</div>;
    }

    return <main> {user ? <Dashboard /> : <Form />}</main>;
};

export default Page;
