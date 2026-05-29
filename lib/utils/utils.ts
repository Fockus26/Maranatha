export const isValidDateRange = (start: string, end: string) => {
    return (
        Temporal.Instant.from(end).epochMilliseconds >
        Temporal.Instant.from(start).epochMilliseconds
    );
};

export const dateNow = () => Temporal.Now.instant().toString();

export const formatDateES = (iso: string) => {
    const instant = Temporal.Instant.from(iso);
    const date = instant.toZonedDateTimeISO("Europe/Madrid");

    return date.toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};
