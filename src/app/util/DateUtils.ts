export function endOfDay(inputDate: Date): Date {
    let result: Date = new Date(inputDate);
    result.setHours(23,59,59,999);
    return result;
}
export function startOfDay(inputDate: Date): Date {
    let result: Date = new Date(inputDate);
    result.setHours(0,0,0,0);
    return result;
}