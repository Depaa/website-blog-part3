<script>
	import GitHubIcon from '$lib/svg/github.svelte';
	import LinkedInIcon from '$lib/svg/linkedin.svelte';
</script>

<div class="socials">
	<a
		href="https://github.com/Depaa"
		target="_blank" 
		rel="noreferrer"
		title="See my GitHub profile"
	>
		<GitHubIcon />
	</a>
	<a
		href="https://www.linkedin.com/in/matteo-depascale-337297183/"
		target="_blank"
		rel="noreferrer"
		title="Connect on LinkedIn"
	>
		<LinkedInIcon />
	</a>

</div>

<style lang="scss">
	@import '../scss/breakpoints.scss';
	.socials {
		display: flex;
		align-items: center;
		gap: 20px;

		a {
			width: 24px;
			color: var(--text-color);
			fill: var(--text-color);

			&:hover {
				color: var(--link-highlight-color);
				fill: var(--link-highlight-color);
			}
		}
	}
</style>
