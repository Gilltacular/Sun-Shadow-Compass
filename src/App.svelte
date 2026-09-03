<!-- App.svelte -->
<script lang="ts">
    import { settingsStore } from './stores/settingsStore';
    import DisplayPanel from './components/DisplayPanel.svelte';
    import { calcSunData } from './utils/sunCalc';
    import { getUtcOffset } from './utils/timezone';
    import SettingsPanel from './components/SettingsPanel.svelte';
    import { getUserLocation } from './utils/geoLocation';
    import ErrorMessage from './components/ErrorMessage.svelte';
    import { get } from 'svelte/store';
    import type { InputMode } from './types';

    let errorMessage = $state<string | null>(null);
    let geoController: AbortController | null = null;

    if (get(settingsStore).inputMode === 'auto') {
        requestLocation();
    }

    function requestLocation(): void {
        // 1. Kill any request from a previous run
        if (geoController) {
            geoController.abort();
        }

        // 2. New controller becomes the active one
        geoController = new AbortController();

        (async () => {
            try {
                const location = await getUserLocation(geoController!.signal);
                console.log("Got location:", location);
                settingsStore.update(settings => ({
                    ...settings,
                    gpsLatitude: location.latitude,
                    gpsLongitude: location.longitude
                }));
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }
                if (error instanceof GeolocationPositionError) {
                    if (error.code === 1) {
                        errorMessage = "Location permission denied. Switched to manual mode. Enable location access and try again.";
                    } else if (error.code === 2) {
                        errorMessage = "GPS signal unavailable. Switched to manual mode. Check device location settings.";
                    } else if (error.code === 3) {
                        errorMessage = "Location request timed out. Switched to manual mode. Try again.";
                    } else {
                        errorMessage = "Unknown location error. Switched to manual mode.";
                    }
                } else {
                    errorMessage = "Unexpected error. Switched to manual mode.";
                }

                settingsStore.update(settings => ({ ...settings, inputMode: 'manual' }));
            }
        })();
    }

    function resolveCalculationTime(mode: InputMode, stored: string | null): Date {
        if (mode === 'auto') {
            return new Date();
        }
        return stored ? new Date(stored) : new Date();
    }

    const sunData = $derived(calcSunData(
        resolveCalculationTime($settingsStore.inputMode, $settingsStore.dateTime),
        $settingsStore.latitude,
        $settingsStore.longitude,
        getUtcOffset()
    ));

    let panelOpen = $state(false);

    $effect(() => {
        document.documentElement.setAttribute('data-theme', $settingsStore.theme);
    });

</script>

{#if errorMessage !== null}
    <ErrorMessage message={errorMessage} close={() => errorMessage = null} />
{/if}

<DisplayPanel sunData={sunData} />

{#if !panelOpen}
    <button class="settings-btn" onclick={() => panelOpen = !panelOpen}>Settings</button>
{/if}

{#if panelOpen}
    <SettingsPanel close={() => panelOpen = false} onRequestLocation={requestLocation} />
{/if}

<style>

.settings-btn {
    position:   fixed;
    top:        20px;
    right:      20px;
    width:      80px;
    height:     80px;
    z-index:    999;
}

</style>