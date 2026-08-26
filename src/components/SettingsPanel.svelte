<!-- SettingsPanel.svelte -->
<script lang="ts">
    import { settingsStore } from '../stores/settingsStore';

    let { close }: { close: () => void } = $props();
</script>

<div class="backdrop" onclick={() => close()}>
    <div class="slide" onclick={(e) => e.stopPropagation()}>
        <!-- Close Button -->
        <button onclick={() => close()}>X</button>
        
        <!-- Theme Modes -->
        <button onclick={() => settingsStore.update(settings => ({...settings, theme: 'dark'}))}>DARK MODE</button>
        <button onclick={() => settingsStore.update(settings => ({...settings, theme: 'daylight'}))}>DAY MODE</button>
        <button onclick={() => settingsStore.update(settings => ({...settings, theme: 'redlight'}))}>REDLIGHT MODE</button>

        <!-- Auto/Manual Mode Toggle -->
        <button onclick={() => settingsStore.update(settings => ({ ...settings, inputMode: settings.inputMode === 'auto' ? 'manual' : 'auto' }))}>AUTO/MANUAL</button>
        <!-- Show if toggled "Manual" -->
        {#if $settingsStore.inputMode === 'manual'}
            <p>LATITUDE:</p>
            <input 
                type="number" 
                value={$settingsStore.latitude} 
                oninput={(e) => settingsStore.update(settings => ({ ...settings, latitude: parseFloat(e.currentTarget.value) }))}
            />
            <p>LONGITUDE:</p>
            <input 
                type="number" 
                value={$settingsStore.longitude} 
                oninput={(e) => settingsStore.update(settings => ({ ...settings, longitude: parseFloat(e.currentTarget.value) }))}
            />
            <p>DATE/TIME:</p>
            <input 
                type="datetime-local" 
                value={$settingsStore.dateTime ?? ''} 
                oninput={(e) => settingsStore.update(settings => ({ ...settings, dateTime: e.currentTarget.value }))}
            />
        {/if}

        <!-- Decimal/DMS selection -->
        <button onclick={() => settingsStore.update(settings => ({ ...settings, units: settings.units === 'decimal' ? 'dms' : 'decimal' }))}>Decimal/DMS</button>
    </div>
</div>

<style>

.backdrop {
    position:   fixed;
    top:        0;
    left:       0;
    width:      100%;
    height:     100%;
    z-index:    1000;

    background-color:   rgba(0,0,0,0.5);
}

.slide {
    display:        flex;
    flex-direction: column;
    right:          0;
    width:          300px;
    height:         100%;
    padding:        2px;
    position:       fixed;

    background-color:   var(--bg-color);
    color:              var(--fg-color);
}

.slide > * + * {
    margin-top: 12px;
}

.slide button,
.slide input {
    height:     76px;
    width:      100%;
}

</style>