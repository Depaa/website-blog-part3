<script lang="ts">
	export let icon: string;
	export let url: string = '';
	export let isButton: boolean = false;
	export let handleClick: () => void = () => undefined;
</script>

{#if isButton}
	<a href="#" on:click={handleClick}>
		<i class={icon} />
	</a>
{/if}

{#if !isButton}
	<a href={url}>
		<i class={icon} />
	</a>
{/if}
