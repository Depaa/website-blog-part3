<script lang="ts">
	import { goto } from '$app/navigation';
	import { authGuard } from '$lib/auth/auth';
	import IconButton from '$lib/components/icon-button.svelte';
	import Tag from '$lib/components/tag.svelte';
	import TextEditor from '$lib/components/text-editor.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import type CreateBlogPost from '$lib/services/interfaces/CreateBlogPost';
	import { createPost } from '$lib/services/posts';
	import { addToast } from '$lib/services/toasts';
	import type { Seo } from '$lib/types/BlogPost';
	import '$lib/types/CustomEvent';

	let openedSection = 'content';

	const newData: CreateBlogPost = {
		title: '',
		description: '',
		tags: [],
		content: '<p><br/></p>',
		featured: 'false',
	};

	const newSeoData: Seo = {
		title: '',
		description: '',
		tags: [],
	};

	const handleContentChange = (event: CustomEvent<{ html: string; text: string }>) => {
		newData.content = event.detail.html;
	};

	const handleSave = async () => {
		try {
			const userToken = await authGuard().getToken();
			if (newSeoData.title && newSeoData.description && newSeoData.tags.length > 0) {
				newData.seo = newSeoData;
			}
			let res = await createPost(fetch, userToken, newData);
			addToast('success', 'Done!');
			goto('/blog/edit/' + res.data.id);
		} catch (error) {
			console.error(error);
			addToast('error', 'Error on post creating');
		}
	};

	const createTag = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (event.key === 'Enter' && event.target) {
			if (newData.tags.length < 5) {
				newData.tags = [...newData.tags, event.target?.value];
				event.target.value = '';
			} else {
				addToast('error', 'Max 5 tags.');
			}
		}
	};

	const createSeoTag = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (event.key === 'Enter' && event.target) {
			if (newSeoData.tags.length < 5) {
				newSeoData.tags = [...newSeoData.tags, event.target?.value];
				event.target.value = '';
			} else {
				addToast('error', 'Max 5 tags.');
			}
		}
	};
</script>

<div class="container">
	<div class="post-header">
		<div class="post-tabs">
			<button
				class={openedSection === 'content' ? 'tab tab-active' : 'tab'}
				on:click={() => (openedSection = 'content')}>Content</button
			>
			<button
				class={openedSection === 'seo' ? 'tab tab-active' : 'tab'}
				on:click={() => (openedSection = 'seo')}>SEO</button
			>
		</div>
	</div>
	<div class="post-body">
		{#if openedSection === 'content'}
			<div class="content-section">
				<div class="post-input-container">
					<p class="caption">Title:</p>
					<input
						class="post-input post-title"
						type="text"
						value={newData.title}
						on:change={(event) => (newData.title = event?.currentTarget?.value)}
					/>
				</div>
				<div class="post-input-container">
					<p class="caption">Description:</p>
					<textarea
						rows="3"
						class="post-textarea"
						value={newData.description}
						on:change={(event) => (newData.description = event?.currentTarget?.value)}
					/>
				</div>
				<div class="post-input-container">
					<p class="caption">Tags:</p>
					<div class="post-tags">
						{#each newData.tags as tag}
							<Tag>
								{tag}
								<IconButton
									isButton
									icon="fa fa-times"
									handleClick={() => (newData.tags = newData.tags.filter((t) => t !== tag))}
								/>
							</Tag>
						{/each}
					</div>
					<input class="post-input" type="text" on:keypress={createTag} />
				</div>
				<div class="post-input-container">
					<p class="caption">Featured:</p>
					<Toggle
						value={newData.featured === 'true'}
						onChangeValue={() => (newData.featured === 'true' ? 'false' : 'true')}
					/>
				</div>
				<div class="post-input-container">
					<p class="caption">Content:</p>
					<TextEditor content={newData.content} on:change={handleContentChange} />
				</div>
			</div>
		{/if}
		{#if openedSection === 'seo'}
			<div class="content-section">
				<div class="post-input-container">
					<p class="caption">Title:</p>
					<input
						class="post-input post-title"
						type="text"
						value={newData.title}
						on:change={(event) => (newSeoData.title = event?.currentTarget?.value)}
					/>
				</div>
				<div class="post-input-container">
					<p class="caption">Description:</p>
					<textarea
						rows="3"
						class="post-textarea"
						value={newData.description}
						on:change={(event) => (newSeoData.description = event?.currentTarget?.value)}
					/>
				</div>
				<div class="post-input-container">
					<p class="caption">Tags:</p>
					<div class="post-tags">
						{#each newSeoData?.tags as tag}
							<Tag
								>{tag}
								<IconButton
									isButton
									icon="fa fa-times"
									handleClick={() => (newSeoData.tags = newSeoData.tags.filter((t) => t !== tag))}
								/></Tag
							>
						{/each}
					</div>
					<input class="post-input" type="text" on:keypress={createSeoTag} />
				</div>
			</div>
		{/if}
	</div>

	<div class="post-footer">
		<button on:click={handleSave}><i class="fa fa-save" /> Save</button>
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.bubble.css';
</style>
