
import { getSpa } from '../vendor/nrel-spa/index.js';
import type { SpaResult, SpaOptions } from '../vendor/nrel-spa/types.d.ts';

export function calcSunData(date: Date, latitude: number, longitude: number, utcOffset: number): { shadowAngle: number; solarAltitude: number } {
    const result = getSpa(date, latitude, longitude, utcOffset);
    const shadowAngle = (result.azimuth + 180) % 360;
    const solarAltitude = 90 - result.zenith;

    return { shadowAngle, solarAltitude };
}
