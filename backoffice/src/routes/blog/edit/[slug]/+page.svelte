<script lang="ts">
	import { authGuard } from '$lib/auth/auth';
	import IconButton from '$lib/components/icon-button.svelte';
	import Modal from '$lib/components/modal.svelte';
	import Tag from '$lib/components/tag.svelte';
	import TextEditor from '$lib/components/text-editor.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { uploadFile } from '$lib/services/image';
	import type UpdateBlogPost from '$lib/services/interfaces/UpdateBlogPost';
	import { createPresignedUrl, publishPost, updatePost } from '$lib/services/posts';
	import { addToast } from '$lib/services/toasts';
	import type { Seo } from '$lib/types/BlogPost';
	import '$lib/types/CustomEvent';
	import type Data from '$lib/types/Data';

	export let data: Data;

	let content = data.post.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	let fileInput: HTMLInputElement;
	let files: File;
	let isSubmitting = false;

	let openedSection = 'content';
	let openModal = false;

	const newData: UpdateBlogPost = {
		title: data.post.title,
		description: data.post.description,
		tags: data.post.tags || [],
		content,
		featured: data.post.featured,
	};

	const newSeoData: Seo = {
		title: data.post.seo?.title || '',
		description: data.post.seo?.description || '',
		tags: data.post.seo?.tags || [],
	};

	const handleContentChange = (event: CustomEvent<{ html: string; text: string }>) => {
		newData.content = event.detail.html;
	};

	const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	};

	const uploadImage = async (event: CustomEvent<ObserverEventDetails>) => {
		isSubmitting = true;
		const token = await authGuard().getToken();
		const file = event.target?.files[0];
		const reader = new FileReader();
		const { signedUrl } = await createPresignedUrl(fetch, token, data.post.id, { type: file.type });

		reader.readAsArrayBuffer(file);
		reader.onloadend = async () => {
			try {
				data.post.image =
					'data:' + file.type + ';base64,' + arrayBufferToBase64(reader.result as ArrayBuffer);
				await uploadFile(fetch, signedUrl, reader.result as ArrayBuffer, file.type);
				isSubmitting = false;
				addToast('success', 'Image uploaded correctly!');
			} catch (error) {
				console.error(error);
				addToast('error', 'Error on image uploading');
			}
		};
	};

	const handleSave = async () => {
		try {
			const userToken = await authGuard().getToken();
			if (newSeoData.title && newSeoData.description && newSeoData.tags.length > 0) {
				newData.seo = newSeoData;
			}
			await updatePost(fetch, userToken, data.post.id, newData);
			addToast('success', 'Post uploaded correctly!');
		} catch (error) {
			console.error(error);
			addToast('error', 'Error on post uploading');
		}
	};

	const onConfirm = async () => {
		const token = await authGuard().getToken();
		try {
			await publishPost(fetch, token, data.post.id);
			openModal = false;
			addToast('success', 'Done!');
		} catch (error) {
			console.error(error);
			addToast('error', 'Error.');
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
				class={openedSection === 'images' ? 'tab tab-active' : 'tab'}
				on:click={() => (openedSection = 'images')}>Images</button
			>
			<button
				class={openedSection === 'seo' ? 'tab tab-active' : 'tab'}
				on:click={() => (openedSection = 'seo')}>SEO</button
			>
		</div>
		{#if data.post.state !== 'PUBLIC'}
			<div class="post-publish-button">
				<button on:click={() => (openModal = true)}><i class="fa fa-share" /> Publish</button>
			</div>
		{/if}
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
					<TextEditor {content} on:change={handleContentChange} />
				</div>
			</div>
		{/if}
		{#if openedSection === 'images'}
			<div class="images-section">
				<div class="post-upload-container">
					<p class="caption">Image:</p>
					<input
						class="hidden"
						id="file-to-upload"
						type="file"
						accept=".png,.jpg,.jpeg,.svg"
						bind:files
						bind:this={fileInput}
						on:change={(e) => uploadImage(e)}
					/>
					<button class="upload-btn" disabled={isSubmitting} on:click={() => fileInput.click()}
						>Upload</button
					>
				</div>
				<div class="image-preview">
					<img alt="Cover Image" src={data.post.image} />
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
						value={newSeoData.title}
						on:change={(event) => (newSeoData.title = event?.currentTarget?.value)}
					/>
				</div>
				<div class="post-input-container">
					<p class="caption">Description:</p>
					<textarea
						rows="3"
						class="post-textarea"
						value={newSeoData.description}
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
<Modal
	title="Do you want to publish the post?"
	open={openModal}
	okLabel="Confirm"
	cancelLabel="Cancel"
	handleCancel={() => {
		openModal = false;
	}}
	handleOk={onConfirm}
/>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.bubble.css';
</style>
