// Takes dec num as input. Extracts degrees (whole number). 
// Converts fractional remainder to minutes. Returns three values.

export function dmsConvert(decNum: number): {degrees: number; minutes: number; seconds: number }{
    const posNum = Math.abs(decNum);
    const degrees = Math.trunc(posNum);
    const minutes = Math.trunc((posNum - degrees)*60);
    const seconds = Math.round((((posNum - degrees)*60) - minutes)*60);

    return { degrees, minutes, seconds };
}