<script lang="ts">
	export let value: boolean;
	export let onChangeValue: () => void;
</script>

<label class="switch">
	<input type="checkbox" checked={value} on:change={onChangeValue} />
	<span class="slider round" />
</label>
