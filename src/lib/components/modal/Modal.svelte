<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Close from '../icon/Close.svelte';

	export let open = false;
  export let title = 'Modal';
</script>

{#if open}
	<button
		on:click={() => (open = false)}
		transition:fade={{ duration: 150 }}
		class="inset-0 fixed bg-black/50 z-50 cursor-default"
	/>
	<div
		transition:slide={{ duration: 300 }}
		class="fixed left-[50%] top-[50%] z-50 max-h-[90%] w-full h-full
  max-w-[90%] translate-x-[-50%] translate-y-[-50%] border overflow-y-auto bg-[#080404]
  p-4 text-white"
	>
		<div class="w-full h-[10%] flex justify-between items-center">
			<h1 class="text-3xl">{title}</h1>
			<button on:click={() => (open = false)} class="text-3xl"><Close /></button>
		</div>
    <div class="w-full h-[90%] overflow-y-auto">
      <slot />
    </div>
	</div>
{/if}
