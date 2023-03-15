<script lang="ts">
	import type Toast from '$lib/services/interfaces/Toast';

	export let toast: Toast;
</script>

<div class="toast toast-{toast.type}">
	<p>{toast.text}</p>
</div>
