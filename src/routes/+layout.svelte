<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';

	onMount(async() => {
		let monaco = (await import('$lib/components/monaco/monaco')).default;
		// @ts-ignore
		window.emmetMonaco.emmetHTML(monaco);
		// @ts-ignore
		window.emmetMonaco.emmetCSS(monaco);
	});
</script>

<svelte:head>
	<script src="https://unpkg.com/emmet-monaco-es/dist/emmet-monaco.min.js"></script>
	<title>Codide</title>
</svelte:head>

<div class="w-full h-[100dvh] flex flex-col bg-[#080404]">
	<slot />
</div>
