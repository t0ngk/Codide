<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import SplitPanel from '$lib/components/SplitPanel.svelte';
	import Icon from '@iconify/svelte';

	let rawHTML: string = '';
	let rawCSS: string = '';
	let rawJS: string = '';
	let iframe: HTMLIFrameElement;

	type logType = 'log' | 'warn' | 'error' | 'info' | 'debug';
	type log = {
		type: logType;
		message: string;
		createdAt: Date;
	};

	let rawLogs: log[] = [
		{
			type: 'log',
			message: 'Hello World',
			createdAt: new Date()
		}
	];

	let injectJS: string = '';
	let delay = setTimeout(() => {}, 0);
	let tying: boolean = false;

	$: if (rawJS !== injectJS) {
		console.log('Injecting JS');
		clearTimeout(delay);
		tying = true;
		delay = setTimeout(() => {
			injectJS = rawJS;
			tying = false;
		}, 1500);
	}

	let makeElement = (tag: string, content: string) => {
		return `<${tag}>${content}</${tag}>`;
	};
</script>

<svelte:window
	on:message={(e) => {
		// console.log(e)
		if (e.data.type == 'log') {
			rawLogs = [
				...rawLogs,
				{
					type: 'log',
					message: e.data.args[0],
					createdAt: new Date()
				}
			];
		}
	}}
/>

<SplitPanel
	options={{
		direction: 'vertical',
		minSize: 0
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
		<div class="h-full overflow-hidden bg-white">
			<iframe
				srcdoc={`${makeElement('style', rawCSS)} ${rawHTML} ${makeElement('script', injectJS)}`}
				class="w-full h-full"
				title=""
				bind:this={iframe}
			/>
		</div>
	</div>
</SplitPanel>
