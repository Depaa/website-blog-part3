<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import Tag from '$lib/components/tag.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export const dateOptions: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};
</script>

<article id="markdown-content">
	<div class="header">
		<h1 class="post-title">{data.title}</h1>
		<div class="note">
			Published on {new Date(data.publishedAt ?? data.createdAt).toLocaleDateString(
				'en-UK',
				dateOptions
			)}
		</div>
		<div class="note">{`~ ${data.readingTime ?? 0} min read`}</div>
		<div class="tags">
			{#if data.tags}
				{#each data.tags as tag}
					<Tag>{tag}</Tag>
				{/each}
			{/if}
		</div>
	</div>
	<div class="cover-image">
		<Image path={data.image} filename="cover" alt="Cover Image" />
	</div>
	<div class="content">
		{@html data.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>')}
	</div>
</article>
