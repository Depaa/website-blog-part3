<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authGuard, isLogged } from '$lib/auth/auth';

	export let isLoggedIn: boolean;

	function handleLogout() {
		authGuard()
			.logout()
			.then((res) => {
				isLogged.update((state) => false);
				goto('/');
			})
			.catch((err) => console.error(err));
	}
</script>

<header>
	<div>
		<a class={$page.url.pathname === '/blog' ? 'active-page' : ''} href="/blog">Blog</a>
	</div>
	<div>
		{#if isLoggedIn === false}
			<a href="/">Login</a>
		{/if}
		{#if isLoggedIn}
			<button on:click={handleLogout}>Logout</button>
		{/if}
	</div>
</header>

<style>
	header {
		height: 10vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 50px;
	}

	a:hover,
	a.active-page {
		color: var(--color-theme-1);
	}
</style>
