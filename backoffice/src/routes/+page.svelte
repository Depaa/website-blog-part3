<script lang="ts">
	import { goto } from '$app/navigation';
	import { authGuard, isLogged } from '$lib/auth/auth';

	let username = '';
	let psw = '';
	let errorMsg = '';

	const signIn = (username: string, password: string) => {
		authGuard()
			.signIn(username, password)
			.then((user) => {
				isLogged.update((state) => true);
				goto('/blog');
			})
			.catch((err) => {
				console.error(err);
				errorMsg = 'authentication failed';
			});
	};
</script>

<div class="login-card">
	<div class="login-container">
		<h1>Login</h1>
		<div>
			<input
				class="login-input"
				type="text"
				placeholder="Enter Username"
				name="uname"
				required
				bind:value={username}
			/>
		</div>
		<div>
			<input
				class="login-input"
				type="password"
				placeholder="Enter Password"
				name="psw"
				required
				bind:value={psw}
			/>
		</div>
		<button class="login-btn" type="submit" on:click={() => signIn(username, psw)}>Login</button>

		{#if errorMsg !== ''}
			<span class="error-message">{errorMsg}</span>
		{/if}
	</div>
</div>
