"use client";

import { Dashboard } from "iconoir-react";
import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Form } from "@/components/Dashboard/Form";
import type { RootState } from "@/store";

const Page = (): ReactElement => {
    const user = useSelector((s: RootState) => s.auth.user);

    return (
        <main>
            {!user && <Form />}
            {user && <Dashboard />}
        </main>
    );
};

export default Page;
