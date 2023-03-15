<!-- 
- Author: Matt Fantinel
-	https://github.com/matfantinel
-->

<div class="tag">
	<slot />
</div>

<style lang="scss">
	.tag {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		padding: 5px 15px;
		border-radius: 10px;
		font-weight: 500;
		font-size: 0.85rem;
		width: fit-content;
		white-space: nowrap;
		background-color: var(--primary-lightest-color);
		color: var(--primary-color);
	}
</style>
