<!-- SettingsPanel.svelte -->
<script lang="ts">
    import { settingsStore } from '../stores/settingsStore';

    let dtInput: HTMLInputElement | undefined = $state();
    let dateTimeValid = $state(true);
    let { close, onRequestLocation }: { close: () => void; onRequestLocation: () => void } = $props();
</script>

<div 
    class="backdrop" 
    role="button"
    tabindex="0"
    onclick={() => {
        if (dtInput && !dtInput.validity.valid) {
            dateTimeValid = false;
            return;
        }
        close();
    }}
    onkeydown={(e) => {
        if (e.key === 'Escape') {
            if (dtInput && !dtInput.validity.valid) {
                dateTimeValid = false;
                return;
            }
            close();
        }
    }}
>
    <div 
        class="slide" 
        role="presentation"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
    >

        <!-- Close Button -->
        <button onclick={() => {
            if (dtInput && !dtInput.validity.valid) {
                dateTimeValid = false;
                return;
            }
            close();
        }}>✕</button>

        <!-- Theme Modes -->
        <p>THEMES</p>
        <div class="theme-button">
            <button onclick={() => settingsStore.update(settings => ({...settings, theme: 'dark'}))}>DARK</button>
            <button onclick={() => settingsStore.update(settings => ({...settings, theme: 'daylight'}))}>DAY</button>
            <button onclick={() => settingsStore.update(settings => ({...settings, theme: 'redlight'}))}>RED</button>
        </div>

        <!-- Two column grid layout -->
        <div class="columns">

            <!-- Left column --->
            <div class="left-column">
                
                <!-- Decimal/DMS selection -->
                <p>DECIMAL / DMS TOGGLE</p>
                <button onclick={() => settingsStore.update(settings => ({ ...settings, units: settings.units === 'decimal' ? 'dms' : 'decimal' }))}>{$settingsStore.units === 'decimal' ? 'DECIMAL' : 'DMS' }</button>
                <i>(TOGGLES DECIMAL ↔ DMS)</i>

                <!-- Precision selection -->
                <p>PRECISION TOGGLE</p>
                <button onclick={() => settingsStore.update(settings => ({  ...settings, decimalPrecision: (settings.decimalPrecision + 1) % 4 as 0 | 1 | 2 | 3 }))}>{$settingsStore.decimalPrecision}</button>
                <i>CYCLES: 0 → 1 → 2 → 3 → 0</i>
            </div>

            <!-- Right column --->
            <div class="right-column">

                <!-- Auto/Manual Mode Toggle -->
                <p>AUTO / MANUAL TOGGLE</p>
                <button onclick={() => {
                    const newMode = $settingsStore.inputMode === 'auto' ? 'manual' : 'auto';
                    settingsStore.update(settings => ({ ...settings, inputMode: newMode }));
                    if (newMode === 'auto') {
                        onRequestLocation();
                    }
                }}>{$settingsStore.inputMode === 'auto' ? 'AUTO' : 'MANUAL' }</button>
                <i>(TOGGLES AUTO ↔ MANUAL)</i>
        
                <!-- Show input boxes if toggled "Manual" -->
                {#if $settingsStore.inputMode === 'manual'}

                    <p>LATITUDE</p>
                    <input 
                        type="number" 
                        value={$settingsStore.latitude} 
                        oninput={(e) => settingsStore.update(settings => ({ ...settings, latitude: parseFloat(e.currentTarget.value) || 0 }))}
                    />

                    <p>LONGITUDE</p>
                    <input 
                        type="number" 
                        value={$settingsStore.longitude} 
                        oninput={(e) => settingsStore.update(settings => ({ ...settings, longitude: parseFloat(e.currentTarget.value) || 0 }))}
                    />

                    <p>DATE/TIME</p>
                    <input 
                        bind:this={dtInput}
                        type="datetime-local" 
                        value={$settingsStore.dateTime ?? ''} 
                        oninput={(e) => {
                            dateTimeValid = e.currentTarget.validity.valid;
                            settingsStore.update(settings => ({ 
                                ...settings, 
                                dateTime: e.currentTarget.value || null 
                            }));
                        }}
                    />
                    {#if !dateTimeValid}
                        <p class="input-error">Please complete or clear the date and time</p>
                    {/if}
                    <i>(FOR FUTURE OR PAST CALCULATIONS)</i>
                    
                <!-- Else show disabled boxes with Auto Mode inputs -->
                {:else}
                    <p>LATITUDE</p>
                    <input 
                        type="number" 
                        value={$settingsStore.gpsLatitude ?? ''} 
                        disabled
                    />

                    <p>LONGITUDE</p>
                    <input 
                        type="number" 
                        value={$settingsStore.gpsLongitude ?? ''}
                        disabled
                    />
                {/if}
            </div>
        </div>
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

.columns {
    display:        grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap:            12px;
}

.input-error {
    color: #ffffff;
    background-color: #cc3300;
    font-size: 0.875rem;
    font-style: italic;
    padding: 8px;
    border-radius: 4px;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    text-align: center;
}

.left-column > * + *,
.right-column > * + * {
    margin-top: 12px;
}

.slide {
    display:        flex;
    flex-direction: column;
    right:          0;
    width:          75%;
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

.theme-button {
    display:            flex;
    gap:                12px;
    justify-content:    center;
}

.theme-button button {
    width:  76px;
}

</style>