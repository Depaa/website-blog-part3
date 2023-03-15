<!-- 
- Author: Matt Fantinel
-	https://github.com/matfantinel
-->

<div class="grid-container">
	<slot />
</div>

<style lang="scss">
	@import '../scss/breakpoints.scss';

	.grid-container {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-gap: 20px;

		@include for-tablet-portrait-down {
			grid-template-columns: 1fr;
		}

		@include for-tablet-landscape-up {
			// Select every 6 elements, starting from position 1
			// And make it take up 6 columns
			> :global(:nth-child(1)) {
				grid-column: span 6;
				flex-direction: row;
			}
			> :global(:nth-child(1) > :nth-child(1)) {
				height: 100%;
			}
			// Select every 6 elements, starting from position 2
			// And make it take up 3 columns
			> :global(:nth-child(2)) {
				grid-column: span 3;
			}
			// Select every 6 elements, starting from position 3
			// And make it take up 3 columns
			> :global(:nth-child(3)) {
				grid-column: span 3;
			}
			// Select every 6 elements, starting from position 4, 5 and 6
			// And make it take up 2 columns
			> :global(:nth-child(3n + 4)),
			:global(:nth-child(3n + 5)),
			:global(:nth-child(3n + 6)) {
				grid-column: span 2;
			}
		}
	}
</style>
