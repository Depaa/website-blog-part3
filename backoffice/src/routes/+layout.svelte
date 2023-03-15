<script lang="ts">
	import { isLogged } from '$lib/auth/auth';
	import Toast from '$lib/components/toast.svelte';
	import '$lib/scss/styles.scss';
	import { toasts } from '$lib/services/toasts';
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header isLoggedIn={$isLogged} />
	<main>
		<slot />
	</main>
	<footer>
		<p>
			<a href="https://it.linkedin.com/in/matteo-depascale" target="_blank" rel="noreferrer">
				Visit my linkedIn profile
			</a>
		</p>
	</footer>
	{#each $toasts as toast}
		<Toast {toast} />
	{/each}
</div>
