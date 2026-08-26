<!-- App.svelte -->
<script lang="ts">
    import { settingsStore } from './stores/settingsStore';
    import DisplayPanel from './components/DisplayPanel.svelte';
    import { calcSunData } from './utils/sunCalc';
    import { getUtcOffset } from './utils/timezone';
    import SettingsPanel from './components/SettingsPanel.svelte';

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