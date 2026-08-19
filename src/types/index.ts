// src/types/index.ts
// Shared type definitions for the Sun Shadow Compass project

// ============================================================================
// SUN DATA
// ============================================================================
// returns azimuth, shadowAngle, and solarAltitude

export interface SunData {
    solarAzimuth: number;
    shadowAngle: number;
    solarAltitude: number;
}

// ============================================================================
// DMS (Degrees, Minutes, Seconds)
// ============================================================================

export interface DMS {
    degrees: number;
    minutes: number;
    seconds: number;
}

// ============================================================================
// THEME (Union Type)
// ============================================================================
// This describes the theme setting. Look at settingsStore.ts for info

export type Theme = 'daylight' | 'dark' | 'redlight';

// ============================================================================
// UNITS (Union Type)
// ============================================================================
// This describes the units setting in settingsStore.ts
// Values: 'decimal' or 'dms'

export type Units = 'decimal' | 'dms';

// ============================================================================
// INPUT MODE (Union Type)
// ============================================================================
// This describes the input mode setting in settingsStore.ts
// Values: 'auto' or 'manual'

export type InputMode = 'auto' | 'manual';

// ============================================================================
// SETTINGS
// ============================================================================
// You have two choices here:

export type { Settings } from '../stores/settingsStore';

// ============================================================================
// EXPORT SUMMARY
// ============================================================================
// Anything with 'export' above can be imported elsewhere:
//
// import { SunData, DMS, Theme, Units, InputMode, Settings } from './types';