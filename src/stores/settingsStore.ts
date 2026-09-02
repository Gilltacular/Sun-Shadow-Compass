import { writable } from 'svelte/store';

import type { Theme, Units, InputMode } from '../types/index';

export interface Settings {
    inputMode:          InputMode;
    latitude:           number;
    longitude:          number;
    gpsLatitude:        number | null;
    gpsLongitude:       number | null;
    dateTime:           string | null;
    theme:              Theme;
    units:              Units;
    decimalPrecision:   0 | 1 | 2 | 3;
}

const defaultSettings: Settings = {
    inputMode:          'auto',
    latitude:           0,
    longitude:          0,
    gpsLatitude:        null,
    gpsLongitude:       null,
    dateTime:           null,
    theme:              'daylight',
    units:              'decimal',
    decimalPrecision:   3
};

export function loadSettings(): Settings {
    try {
        const savedSettings = localStorage.getItem("sun-shadow-compass-settings");

        if (savedSettings){
            const parsedSettings = JSON.parse(savedSettings);
            const merged = { ...defaultSettings, ...parsedSettings };
            merged.dateTime = parsedSettings.dateTime || null;  // Normalize empty strings to null
            return merged;
        } else {
            return defaultSettings;
        }
    } catch {
        return defaultSettings;
    }
}


export const settingsStore = writable(loadSettings());

settingsStore.subscribe((value) => {
    localStorage.setItem("sun-shadow-compass-settings", JSON.stringify(value));
});