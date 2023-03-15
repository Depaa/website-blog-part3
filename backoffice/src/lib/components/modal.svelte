<script lang="ts">
	export let open: boolean;
	export let title: string;
	export let okLabel: string;
	export let cancelLabel: string;
	export let handleOk: () => void;
	export let handleCancel: () => void;
</script>

{#if open}
	<div class="modal-container">
		<div class="modal-content">
			<p>{title}</p>
			<br />
			<div class="modal-footer">
				<button on:click={handleOk}>
					{okLabel}
				</button>
				<button on:click={handleCancel} class="secondary">
					{cancelLabel}
				</button>
			</div>
		</div>
	</div>
{/if}
