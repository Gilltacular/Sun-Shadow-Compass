<!-- ErrorMessage.svelte -->
<script lang="ts">

    let { message, close }: { message: string; close: () => void } = $props();

</script>

<div class="error-message-overlay">
    <p class="error-message-text">{message}</p>
    <button class="close_error_button" onclick={() => close()}>X</button>
</div>

<style>

    .error-message-overlay {

        display:            flex;
        align-items:         center;
        justify-content:    space-between;
        position:           fixed;
        top:                0;
        width:              100%;
        padding:            2px;
        z-index:            1001;

        background-color:   rgba(0,0,0,0.5);
    }

    .error-message-text {


        background-color:   var(--bg-color);
        color:              var(--fg-color);
    }

    .close_error_button {

        height: 76px;
        width:  76px;
    }

</style>