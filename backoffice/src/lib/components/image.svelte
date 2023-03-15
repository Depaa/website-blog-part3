<!-- 
- Author: Matt Fantinel
-	https://github.com/matfantinel
-->
<script lang="ts">
	import logo from '$lib/images/svelte-logo.svg';
	export let alt: string | null;
	export let path: string | null;
	export let figcaption: string | null = null;
	export let filename: string | null = null;

	let imageSrc: string | null = null;

	$: imageSrc = path;

	const handleImageError = (
		e: Event & {
			currentTarget: EventTarget & Element;
		}
	) => {
		if (e.target && e.target.src) e.target.src = logo;
	};
</script>

<picture>
	<!-- <source srcset="{imageSrc}.avif" type="image/avif" />
	<source srcset="{imageSrc}.webp" type="image/webp" /> -->
	{#if imageSrc}
		<img
			src={imageSrc}
			on:error={(e) => handleImageError(e)}
			{alt}
			loading="lazy"
			decoding="async"
		/>
	{/if}
	{#if !imageSrc}
		<img src={logo} {alt} loading="lazy" decoding="async" />
	{/if}
	{#if figcaption}
		<!-- svelte-ignore a11y-structure -->
		<figcaption>{@html figcaption}</figcaption>
	{/if}
</picture>

<style lang="scss">
	picture {
		position: relative;
		width: 100%;
		height: 100%;

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
