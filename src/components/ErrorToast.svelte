<script lang="ts">
	import { slide } from 'svelte/transition';
	import { errorMsg } from '$lib/globals';

	$effect(() => {
		if ($errorMsg) {
			var j = setTimeout(() => {
				errorMsg.set('');
			}, 4000);
		}
		return () => clearTimeout(j);
	});
</script>

{#if $errorMsg}
	<div
		in:slide={{ axis: 'y', duration: 400 }}
		out:slide={{ axis: 'y', duration: 400 }}
		class="toast toast-top toast-center z-50 max-w-screen"
	>
		<div class="alert alert-error max-w-496">
			<span>{$errorMsg}</span>
		</div>
	</div>
{/if}
