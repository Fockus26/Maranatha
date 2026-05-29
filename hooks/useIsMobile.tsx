"use client";

import { useEffect, useState } from "react";

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");

        const update = (): void => setIsMobile(mq.matches);

        update();

        mq.addEventListener("change", update);

        return (): void => {
            mq.removeEventListener("change", update);
        };
    }, []);

    return isMobile;
};
