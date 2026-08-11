/**
 * Compute topocentric zenith and azimuth angles only.
 * Does not compute sunrise, sunset, or solar noon.
 */
declare const SPA_ZA: 0;
/**
 * Compute zenith, azimuth, and incidence angle for a tilted surface.
 * Requires slope and azm_rotation in SpaOptions.
 */
declare const SPA_ZA_INC: 1;
/**
 * Compute sunrise, sunset, and sun transit (solar noon) in addition to
 * zenith and azimuth. This is the default function code.
 */
declare const SPA_ZA_RTS: 2;
/**
 * Compute all outputs: zenith, azimuth, incidence angle, sunrise, sunset,
 * and sun transit. Combines SPA_ZA_INC and SPA_ZA_RTS.
 */
declare const SPA_ALL: 3;
type SpaFunctionCode = typeof SPA_ZA | typeof SPA_ZA_INC | typeof SPA_ZA_RTS | typeof SPA_ALL;
interface SpaOptions {
    /** Observer elevation in meters above sea level. Default: 0. */
    elevation?: number;
    /** Atmospheric pressure in millibars. Default: 1013. */
    pressure?: number;
    /** Temperature in degrees Celsius. Default: 15. */
    temperature?: number;
    /** UT1-UTC correction in seconds. Default: 0. */
    delta_ut1?: number;
    /** TT-UTC difference in seconds. Default: 67. */
    delta_t?: number;
    /** Surface slope in degrees from horizontal. Default: 0. */
    slope?: number;
    /** Surface azimuth rotation in degrees from south. Default: 0. */
    azm_rotation?: number;
    /** Atmospheric refraction at sunrise/sunset in degrees. Default: 0.5667. */
    atmos_refract?: number;
    /** SPA function code. Default: SPA_ZA_RTS (2). */
    function?: SpaFunctionCode;
}
interface SpaResult {
    /** Topocentric zenith angle in degrees. */
    zenith: number;
    /** Topocentric azimuth angle, eastward from north (navigational convention), in degrees. */
    azimuth: number;
    /** Local sunrise time as fractional hours. */
    sunrise: number;
    /** Local sun transit time (solar noon) as fractional hours. */
    solarNoon: number;
    /** Local sunset time as fractional hours. */
    sunset: number;
}
interface SpaFormattedResult {
    /** Topocentric zenith angle in degrees. */
    zenith: number;
    /** Topocentric azimuth angle, eastward from north (navigational convention), in degrees. */
    azimuth: number;
    /** Local sunrise time as HH:MM:SS string. "N/A" during polar day/night. */
    sunrise: string;
    /** Local sun transit time as HH:MM:SS string. "N/A" during polar day/night. */
    solarNoon: string;
    /** Local sunset time as HH:MM:SS string. "N/A" during polar day/night. */
    sunset: string;
}
interface SpaAnglesResult {
    /** Sunrise time for this custom zenith angle. */
    sunrise: number;
    /** Sunset time for this custom zenith angle. */
    sunset: number;
}
interface SpaResultWithAngles extends SpaResult {
    /** Custom angle results, one per angle in the input array. */
    angles: SpaAnglesResult[];
}
interface SpaFormattedAnglesResult {
    /** Sunrise time for this custom zenith angle, formatted as HH:MM:SS. */
    sunrise: string;
    /** Sunset time for this custom zenith angle, formatted as HH:MM:SS. */
    sunset: string;
}
interface SpaFormattedResultWithAngles extends SpaFormattedResult {
    /** Custom angle results with formatted times. */
    angles: SpaFormattedAnglesResult[];
}

/**
 * Format fractional hours to HH:MM:SS string.
 * Returns "N/A" for non-finite or negative values (polar night/day scenarios).
 *
 * @param hours - Fractional hours (e.g., 12.5 for 12:30:00)
 * @returns Formatted time string in HH:MM:SS format, or "N/A"
 */
declare function formatTime(hours: number): string;
/**
 * Compute solar position for the given parameters.
 *
 * @param date - JavaScript Date object (uses UTC components)
 * @param latitude - Observer latitude in degrees (-90 to 90, negative = south)
 * @param longitude - Observer longitude in degrees (-180 to 180, negative = west)
 * @param timezone - Hours from UTC (e.g., -4 for EDT). Default: 0
 * @param options - Optional atmospheric and calculation parameters
 * @returns Solar position result with raw numerical values
 * @throws {TypeError} If date, latitude, longitude, timezone, or options numeric fields are not finite numbers
 * @throws {RangeError} If latitude, longitude, timezone, function code, or angle values are out of range
 */
declare function getSpa(date: Date, latitude: number, longitude: number, timezone?: number | null, options?: SpaOptions | null): SpaResult;
/**
 * Compute solar position and resolve custom zenith angles (e.g., twilight).
 *
 * @param date - JavaScript Date object (uses UTC components)
 * @param latitude - Observer latitude in degrees (-90 to 90, negative = south)
 * @param longitude - Observer longitude in degrees (-180 to 180, negative = west)
 * @param timezone - Hours from UTC (e.g., -4 for EDT). Default: 0
 * @param options - Atmospheric and calculation parameters (pass null for defaults)
 * @param angles - Custom zenith angles in degrees. Common: 96 civil, 102 nautical, 108 astronomical
 * @returns Solar position result including an angles array
 */
declare function getSpa(date: Date, latitude: number, longitude: number, timezone: number | null | undefined, options: SpaOptions | null | undefined, angles: [number, ...number[]]): SpaResultWithAngles;
/**
 * Same as getSpa(), but formats sunrise, solarNoon, and sunset as HH:MM:SS strings.
 * Returns "N/A" for time fields during polar day or polar night.
 *
 * @throws {TypeError} If date, latitude, longitude, timezone, or options numeric fields are not finite numbers
 * @throws {RangeError} If latitude, longitude, timezone, function code, or angle values are out of range
 */
declare function calcSpa(date: Date, latitude: number, longitude: number, timezone?: number | null, options?: SpaOptions | null): SpaFormattedResult;
/**
 * Same as getSpa() with custom angles, but formats all time values as HH:MM:SS strings.
 * Returns "N/A" for time fields during polar day or polar night.
 *
 * @throws {TypeError} If date, latitude, longitude, timezone, or options numeric fields are not finite numbers
 * @throws {RangeError} If latitude, longitude, timezone, function code, or angle values are out of range
 */
declare function calcSpa(date: Date, latitude: number, longitude: number, timezone: number | null | undefined, options: SpaOptions | null | undefined, angles: [number, ...number[]]): SpaFormattedResultWithAngles;

export { SPA_ALL, SPA_ZA, SPA_ZA_INC, SPA_ZA_RTS, type SpaAnglesResult, type SpaFormattedAnglesResult, type SpaFormattedResult, type SpaFormattedResultWithAngles, type SpaFunctionCode, type SpaOptions, type SpaResult, type SpaResultWithAngles, calcSpa, formatTime, getSpa };
