<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types/project';
	import { slide } from 'svelte/transition';
	export let project: Project;
	let hover: boolean = false;
	let card: DOMRectReadOnly;
	let iframeScale: number;
	$: iframeScale = card?.width / 1920;
</script>

<button
	class="border p-2 flex flex-col gap-2 group transition hover:bg-white"
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
  on:click={() => goto(`/code/${project.slug}`)}
>
	<div class="aspect-video w-full border border-black overflow-hidden">
		<div class="w-full h-full bg-white relative" bind:contentRect={card}>
      {#if hover}
      <div class="absolute top-0 left-0 w-full h-full z-[9999]"></div>
        <iframe
          class="w-[1920px] h-[1080px] origin-top-left"
          style={`scale: ${iframeScale};`}
          title=""
          src={`/preview/${project.slug}`}
          frameborder="0"
        />
        {:else}
        <div transition:slide class="w-full h-full flex justify-center items-center bg-[#1c1c1c]">
          <h1 class="text-lg">Hover for preview.</h1>
        </div>
      {/if}
		</div>
	</div>
	<p class="group-hover:text-[#080404] transition truncate w-full text-start" title="">
		{project.name}
	</p>
</button>
