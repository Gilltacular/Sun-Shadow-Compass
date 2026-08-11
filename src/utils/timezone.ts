// creates new data object and returns UTC offset as a number
export function getUtcOffset(): number {
    return -new Date().getTimezoneOffset() / 60;
}