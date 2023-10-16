<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Close from '../icon/Close.svelte';

	export let open = false;
	export let title = 'Modal';
	export let close = true;
	let c: string = '';
	export { c as class };
</script>

{#if open}
	<button
		on:click={() => (open = false)}
		transition:fade={{ duration: 150 }}
		class="inset-0 fixed bg-black/50 z-[999] cursor-default"
	/>
	<div
		transition:slide={{ duration: 300 }}
		class={`fixed left-[50%] top-[50%] z-[999] translate-x-[-50%] translate-y-[-50%] border overflow-y-auto bg-[#080404]
		p-2 text-white ${c}`}
	>
		<div class="w-full h-[10%] flex justify-between pt-2">
			<h1 class="text-3xl">{title}</h1>
			{#if close}
				<button on:click={() => (open = false)} class="text-3xl self-start"><Close /></button>
			{/if}
		</div>
		<div class="w-full h-[90%] overflow-y-auto">
			<slot />
		</div>
	</div>
{/if}
