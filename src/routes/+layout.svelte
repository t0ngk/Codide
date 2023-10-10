<script>
	import { onMount } from 'svelte';
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';

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
</svelte:head>

<div class="w-full h-[100dvh] flex flex-col bg-[#080404]">
	<Navbar />
	<div class="h-[90%]">
		<slot />
	</div>
</div>
