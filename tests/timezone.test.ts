import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getUtcOffset } from '../src/utils/timezone';

describe('getUtcOffset()', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should return negative offset for timezone west of UTC', () => {
        // getTimezoneOffset returns +300 for UTC-5 (sign is inverted)
        vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(300);
        
        const result = getUtcOffset();
        
        expect(result).toBe(-5);
    });

    it('should return positive offset for timezone east of UTC', () => {
        // getTimezoneOffset returns -60 for UTC+1 (sign is inverted)
        vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(-60);
        
        const result = getUtcOffset();
        
        expect(result).toBe(1);
    });

    it('should return zero for UTC', () => {
        vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(0);
        
        const result = getUtcOffset();
        
        expect(result).toBe(0);
    });
});