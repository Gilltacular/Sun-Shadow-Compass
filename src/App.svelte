<!-- App.svelte -->
<script lang="ts">
    import { settingsStore } from './stores/settingsStore';
    import DisplayPanel from './components/DisplayPanel.svelte';
    import { calcSunData } from './utils/sunCalc';
    import { getUtcOffset } from './utils/timezone';
    import SettingsPanel from './components/SettingsPanel.svelte';
    import { getUserLocation } from './utils/geoLocation';
    import ErrorMessage from './components/ErrorMessage.svelte';

    let errorMessage = $state<string | null>(null);

    $effect(() => {
        if ($settingsStore.inputMode === 'auto') {
            console.log("Auto mode active");

            (async () => {
                try {
                    const location = await getUserLocation();
                    console.log("Got location:", location);
                    settingsStore.update(settings => ({
                        ...settings,
                        latitude: location.latitude,
                        longitude: location.longitude
                    }));
                } catch (error) {
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
    });

    const sunData = $derived(calcSunData(
        $settingsStore.dateTime ? new Date($settingsStore.dateTime) : new Date(),
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
    <SettingsPanel close={() => panelOpen = false} />
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