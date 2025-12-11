export const normalizeUtcDate = (dateString) => {
    let utcString = dateString.trim();
    if (!utcString.endsWith("Z")) {
        utcString += "Z";
    }

    const date = new Date(utcString);

    return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
};

export const convertDateFormat = (date) => {
    const [day, month, year] = date.split(".");
    return `${year}-${month}-${day}`;
};
