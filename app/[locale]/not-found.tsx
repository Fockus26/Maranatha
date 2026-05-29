import type { ReactElement } from "react";

import classes from "./not-found.module.scss";

const NotFound = (): ReactElement => {
    return (
        <main className={classes.notFound}>
            <h2>404 - Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        </main>
    );
};

export default NotFound;
