import { writable } from 'svelte/store';

export interface Settings {
    inputMode:  'auto' | 'manual';
    latitude:   number;
    longitude:  number;
    dateTime:   string | null;
    theme:      'daylight' | 'dark' | 'redlight';
    units:      'decimal' | 'dms';
}

const defaultSettings: Settings = {
    inputMode:  'auto',
    latitude:   0,
    longitude:  0,
    dateTime:   null,
    theme:      'daylight',
    units:      'decimal',
};

export function loadSettings(): Settings {
    try {
        const savedSettings = localStorage.getItem("sun-shadow-compass-settings");

        if (savedSettings){
            return JSON.parse(savedSettings);
        } else {
            return defaultSettings;
        }
    } catch {
        return defaultSettings;
    }
}