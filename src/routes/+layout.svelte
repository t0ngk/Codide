<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';

	onMount(async () => {
		let monaco = (await import('$lib/components/monaco/monaco')).default;
		// @ts-ignore
		window.emmetMonaco.emmetHTML(monaco);
		// @ts-ignore
		window.emmetMonaco.emmetCSS(monaco);
	});
</script>

<svelte:head>
	<script src="https://unpkg.com/emmet-monaco-es/dist/emmet-monaco.min.js"></script>
	<!-- Primary Meta Tags -->
	<title>Codide</title>
	<meta name="title" content="Codide" />
	<meta name="description" content="Simple code editor." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://codide.dev/" />
	<meta property="og:title" content="Codide" />
	<meta property="og:description" content="Simple code editor." />
	<meta property="og:image" content="/Codide-Header.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://codide.dev/" />
	<meta property="twitter:title" content="Codide" />
	<meta property="twitter:description" content="Simple code editor." />
	<meta property="twitter:image" content="/Codide-Header.png" />
</svelte:head>

<div class="w-full h-[100dvh] flex flex-col bg-[#080404]">
	<slot />
</div>
