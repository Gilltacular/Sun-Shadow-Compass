<script lang="ts">
    import type { SunData } from '../types';

    let { sunData }: { sunData: SunData } = $props();

    const tier = $derived(sunData.solarAltitude > 0 ? 1 : sunData.solarAltitude > -18 ? 2 : 3);
</script>

{#if tier === 1 }
    <div class="mainElement">
        <h1 class="angleMessage">{ sunData.shadowAngle }°</h1>
        <!-- no message -->
    </div>
{:else if tier === 2 }
    <div class="mainElement">
        <h1 class="angleMessage dimmed">{ sunData.shadowAngle }°</h1>
        <p class="messages">Sun below horizon — theoretical bearing</p>
    </div>
{:else}
    <div class="mainElement">
        <p class="messages">Astronomical darkness — no usable bearing</p>
    </div>
{/if}

<style>
    .mainElement {
        display:            flex;
        flex-direction:     column;
        justify-content:    center;
        align-items:        center;
        min-height:         100vh;

        background-color:   var(--bg-color);
        color:              var(--fg-color);
    }

    .angleMessage {
        font-family:        'Source Code Pro', 'Courier New', monospace;
        font-weight:        900;
        font-size:          4rem;
    }

    .messages {
        font-family:        'Roboto';
        font-weight:         400;
        font-size:           1rem;
    }

    .dimmed {
        opacity: 0.4;
    }
</style>