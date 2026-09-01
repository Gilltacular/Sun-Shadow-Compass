import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getUserLocation } from '../src/utils/geoLocation';

const controller = new AbortController();

describe('getUserLocation(controller.signal)', () => {
    beforeEach(() => {
        // Reset the mock before each test
        vi.restoreAllMocks();
    });

    it('should resolve with latitude and longitude on success', async () => {
        // Create a fake geolocation object
        const mockGeolocation = {
            getCurrentPosition: vi.fn((successCallback) => {
                successCallback({
                    coords: {
                        latitude: 40.7128,
                        longitude: -74.0060
                    }
                });
            })
        };

        // Attach it to the global navigator
        Object.defineProperty(globalThis.navigator, 'geolocation', {
            value: mockGeolocation,
            configurable: true
        });

        const result = await getUserLocation(controller.signal);

        expect(result).toEqual({
            latitude: 40.7128,
            longitude: -74.0060
        });
    });

    it('should reject on geolocation error', async () => {
        const mockError = { code: 1, message: 'Permission denied' };

        const mockGeolocation = {
            getCurrentPosition: vi.fn((successCallback, errorCallback) => {
                errorCallback(mockError);
            })
        };

        Object.defineProperty(globalThis.navigator, 'geolocation', {
            value: mockGeolocation,
            configurable: true
        });

        await expect(getUserLocation(controller.signal)).rejects.toEqual(mockError);
    });

    it('should reject with AbortError when the signal is aborted', async () => {
        const mockError = { code: 1, message: 'Permission denied' };

        const mockGeolocation = {
            getCurrentPosition: vi.fn()
        };

        // Attach it to the global navigator
        Object.defineProperty(globalThis.navigator, 'geolocation', {
            value: mockGeolocation,
            configurable: true
        });

        const controller = new AbortController();
        const locationPromise = getUserLocation(controller.signal);
        controller.abort();
        await expect(locationPromise).rejects.toMatchObject({ name: 'AbortError' });
    });
});