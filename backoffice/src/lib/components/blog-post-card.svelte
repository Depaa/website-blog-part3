<!-- 
- Author: Matt Fantinel
-	https://github.com/matfantinel
-->
<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import Image from '$lib/components/image.svelte';
	import type { Post } from '$lib/types/BlogPost';
	import Iconbutton from './icon-button.svelte';
	import Tag from './tag.svelte';

	export let post: Post;
	export let showImage = true;
	export let isAdmin = false;
	export let onDelete: (postID: string) => void;
</script>

{#if post}
	<Card url="/blog/{post.slug}">
		<div slot="image">
			{#if showImage}
				<Image path={post.image} filename="cover" alt="Cover Image" />
			{/if}
		</div>
		<div slot="content">
			<div class="title">{post.title}</div>
			<div class="note">{`~ ${post.readingTime ?? 0} minutes`}</div>
			<div class="text">{post.description}</div>
		</div>
		<div slot="footer">
			{#if post.tags}
				<div class="tags">
					{#each post.tags.slice(0, 2) as tag}
						<Tag>{tag}</Tag>
					{/each}
				</div>
			{/if}
			{#if isAdmin}
				<div class="admin-info-container">
					{#if isAdmin && post.state}
						<div>
							<Tag>{post.state.toUpperCase()}</Tag>
						</div>
					{/if}
					<br />
					<div>
						<Iconbutton icon="fa fa-pencil" url="/blog/edit/{post.id}" />
						&nbsp;
						<Iconbutton isButton={true} handleClick={() => onDelete(post.id)} icon="fa fa-trash" />
					</div>
				</div>
			{/if}
		</div>
	</Card>
{/if}
