<script lang="ts">
	import Console from '$lib/components/Console.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import SplitPanel from '$lib/components/SplitPanel.svelte';
	import Icon from '@iconify/svelte';
	import * as Prism from 'prismjs';

	let rawHTML: string = '';
	let rawCSS: string = '';
	let rawJS: string = '';

	let injectJS: string = '';
	let delay = setTimeout(() => {}, 0);
	let tying: boolean = false;

	$: if (rawJS !== injectJS) {
		clearTimeout(delay);
		tying = true;
		delay = setTimeout(() => {
			injectJS = `try { ${rawJS} } catch (e) { console.error(e.name + ': ' + e.message) }`;
			tying = false;
		}, 1500);
	}
	type attribute = {
		name: string;
		value: string;
	};

	let makeElement = (tag: string, content: string, attribute?: attribute[]) => {
		return `<${tag} ${attribute?.map((att) => {
			return `${att.name}="${att.value}" `;
		})}>${content}</${tag}>`;
	};
</script>

<SplitPanel
	options={{
		direction: 'vertical',
		minSize: 0,
		sizes: [50, 50, 0]
	}}
	class="w-full h-full"
>
	<SplitPanel options={{ direction: 'horizontal', minSize: 0 }} class="w-full flex px-2">
		<Editor icon="mdi:language-html5" title="HTML" language="html" bind:value={rawHTML} />
		<Editor icon="mdi:language-css3" title="CSS" language="css" bind:value={rawCSS} />
		<Editor
			icon="mdi:language-javascript"
			title="Javascript"
			language="javascript"
			bind:value={rawJS}
		>
			<div slot="actions">
				{#if tying}
					<Icon icon="line-md:loading-loop" />
				{:else}
					<Icon icon="line-md:confirm" />
				{/if}
			</div>
		</Editor>
	</SplitPanel>
	<div class="h-full overflow-hidden">
		<iframe
			srcdoc={`${makeElement('script', '', [
				{
					name: 'src',
					value: '/consoleLogger.js'
				}
			])} ${makeElement('style', rawCSS)} ${rawHTML} ${makeElement('script', injectJS)}`}
			class="w-full h-full bg-white"
			title=""
			on:messageerror={(e) => {
				console.log(e);
			}}
		/>
	</div>
	<div class="h-full overflow-hidden">
		<Console />
	</div>
</SplitPanel>
