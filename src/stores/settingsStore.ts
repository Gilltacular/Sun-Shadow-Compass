import { writable } from 'svelte/store';

import type { Theme, Units, InputMode } from '../types/index';

export interface Settings {
    inputMode:  InputMode;
    latitude:   number;
    longitude:  number;
    dateTime:   string | null;
    theme:      Theme;
    units:      Units;
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


export const settingsStore = writable(loadSettings());

settingsStore.subscribe((value) => {
    localStorage.setItem("sun-shadow-compass-settings", JSON.stringify(value));
});