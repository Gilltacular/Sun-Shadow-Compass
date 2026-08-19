import { describe, it, expect } from 'vitest';
import { calcSunData } from '../src/utils/sunCalc';

describe('calcSunData()', () => {
    it('should return solar azimuth, shadow angle, and solar altitude', () => {
        const date = new Date('2024-06-21T12:00:00Z'); // Summer solstice noon UTC
        const latitude = 40.7128; // New York
        const longitude = -74.0060;
        const utcOffset = -4; // EDT
        
        const result = calcSunData(date, latitude, longitude, utcOffset);
        
        expect(result).toHaveProperty('solarAzimuth');
        expect(result).toHaveProperty('shadowAngle');
        expect(result).toHaveProperty('solarAltitude');
        expect(typeof result.solarAzimuth).toBe('number');
        expect(typeof result.shadowAngle).toBe('number');
        expect(typeof result.solarAltitude).toBe('number');
    });
});