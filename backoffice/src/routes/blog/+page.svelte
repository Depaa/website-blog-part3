<script lang="ts">
	import { authGuard, isLogged } from '$lib/auth/auth';
	import BlogGrid from '$lib/components/1-2-3-grid.svelte';
	import BlogPostCard from '$lib/components/blog-post-card.svelte';
	import Modal from '$lib/components/modal.svelte';
	import Section from '$lib/components/section.svelte';
	import { deletePost, listPosts, listPostsAdmin } from '$lib/services/posts';
	import { addToast } from '$lib/services/toasts';
	import { inview, type Options } from 'svelte-inview';

	export let data;
	const isLoggedIn = $isLogged;

	let { items, nextToken } = data;
	let hasMore = Boolean(nextToken);
	const options: Options = {
		rootMargin: '0%', // 80% to do some sort of prefetch
	};

	const fetchNewData = async () => {
		try {
			if (hasMore) {
				let response;
				if (isLoggedIn) {
					const token = await authGuard().getToken();
					response = await listPostsAdmin(fetch, token, nextToken);
				} else {
					response = await listPosts(nextToken);
				}
				nextToken = response.nextToken;
				hasMore = !!nextToken;
				items = [...items, ...response.items];
			}
		} catch (error) {
			console.error(error);
			console.error('Error fetching more posts in index');
		}
	};

	let openModal: boolean = false;
	let postIdToDelete: string = '';
	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		if (detail.inView && hasMore) fetchNewData();
	};

	const onConfirm = async () => {
		const token = await authGuard().getToken();
		try {
			await deletePost(fetch, token, postIdToDelete);
			openModal = false;
			addToast('success', 'Item deleted!');
			setTimeout(() => location.reload(), 2000);
		} catch (error) {
			console.error(error);
			addToast('error', 'Error on delete post.');
		}
	};
</script>

<section id="blog">
	<Section
		align="top"
		title="All posts"
		buttonText="New post"
		buttonUrl="/blog/create"
		isAdmin={isLoggedIn}
	>
		<div class="container">
			<BlogGrid>
				{#each items as post}
					<BlogPostCard
						{post}
						isAdmin={isLoggedIn}
						onDelete={(id) => {
							postIdToDelete = id;
							openModal = true;
						}}
					/>
				{/each}
				<div use:inview={options} on:change={handleChange} />
				{#if !hasMore}
					<!-- <p>🎉🎉 the road ends here captain! 🎉🎉</p> -->
				{/if}
			</BlogGrid>
		</div>
	</Section>
</section>

<Modal
	title="Do you want to delete post?"
	open={openModal}
	okLabel="Confirm"
	cancelLabel="Cancel"
	handleCancel={() => {
		openModal = false;
	}}
	handleOk={onConfirm}
/>
