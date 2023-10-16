<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>404 :( - Codide</title>
	<meta name="title" content={`404 :( - Codide`} />
	<meta property="twitter:title" content={`404 :( - Codide`} />
</svelte:head>

<div class="w-full h-full flex flex-col justify-center items-center gap-2 text-white bg-[#080404]">
	<p>404 Not found.</p>
	<button
		class="px-2 py-1 border"
		on:click={() => {
			goto('/code/new');
		}}>Code something</button
	>
</div>
