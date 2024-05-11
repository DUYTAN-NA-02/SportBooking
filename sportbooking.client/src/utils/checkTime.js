export const handleCheckDateGreaterThenNow = (date) => {
    const now = new Date();
    const inputDate = new Date(date);
    return inputDate > now ? true : false;
}