<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { project } = data;
	let makeElement = (tag: string, content: string) => {
		return `<${tag}>${content}</${tag}>`;
	};
</script>

<svelte:head>
	<title>{project?.name} - Codide</title>
	<meta name="title" content={`${project?.name} - Codide`} />
	<meta property="twitter:title" content={`${project?.name} - Codide`} />
</svelte:head>

<iframe
	class="w-full h-full bg-white"
	title="preview"
	srcdoc={`${makeElement('style', project?.css || '')}${project?.html || ''}${makeElement(
		'script',
		project?.js || ''
	)}`}
/>
