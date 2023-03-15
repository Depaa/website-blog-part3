<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let editor: string | Element;
	export let content: string;

	let previewContent = '';

	const dispatch = createEventDispatcher();

	function onChange() {
		dispatch('change', {
			html: content,
			text: previewContent,
		});
	}

	export let toolbarOptions = [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['blockquote', 'link', 'image', 'video', 'code-block'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		// [{ script: 'sub' }, { script: 'super' }],
		// [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
		// [{ direction: 'rtl' }], // text direction
		// [{ color: [] }, { background: [] }], // dropdown with defaults from theme
		// ['clean'],
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions,
			},
			theme: 'bubble',
			placeholder: 'No data...',
		});

		quill.root.innerHTML = content;
		let changes = false;
		quill.on('text-change', () => {
			changes = true;
			content = quill.root.innerHTML;
			previewContent = quill.getText();
			onChange();
		});
	});
</script>

<div class="editor-wrapper">
	<div bind:this={editor} />
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.bubble.css';
</style>
