<script lang="ts">
	import { afterUpdate } from 'svelte';

	type logType = 'log' | 'warn' | 'error' | 'info' | 'debug';
	type log = {
		type: logType;
		message: any;
		createdAt: Date;
	};

	let rawLogs: log[] = [];
	let consolePanel: HTMLDivElement;
	let follow: boolean = true;

	afterUpdate(() => {
		if ((rawLogs && consolePanel) && follow) {
			consolePanel.scrollTop = consolePanel.scrollHeight;
		}
	});
</script>

<svelte:window
	on:message={(e) => {
		if (e.data.type == 'log') {
			const logData = JSON.parse(e.data.args);
			rawLogs = [
				...rawLogs,
				{
					type: logData.type,
					message: logData.data,
					createdAt: new Date()
				}
			];
		}
	}}
/>

<div class="h-full bg-[#080404] text-white text-xs font-mono overflow-hidden flex flex-col">
	<div class="p-4 h-16 flex justify-between items-center">
		<p>Console</p>
		<div class="flex gap-2">
			<button
				class="px-2 py-1 border transition border-blue-500 text-blue-500"
				class:followActive={follow}
				on:click={() => {
					follow = !follow;
				}}
			>
				Follow
			</button>
			<button
				class="px-2 py-1 border transition border-red-500 text-red-500 hover:bg-red-500 hover:text-[#080404]"
				on:click={() => (rawLogs = [])}>Clear</button
			>
		</div>
	</div>
	<div class="h-full overflow-y-auto" bind:this={consolePanel} on:scroll={() => {
    follow = consolePanel.scrollTop + consolePanel.clientHeight >= consolePanel.scrollHeight;
  }}>
		{#each rawLogs as log}
			<div
				class="p-1"
				class:log={log.type == 'log'}
				class:error={log.type == 'error'}
				class:warn={log.type == 'warn'}
				class:info={log.type == 'info'}
			>
				<pre>{log.createdAt.toLocaleTimeString()} : {log.message.join(` `)}</pre>
			</div>
		{/each}
	</div>
	<div />
</div>

<style lang="postcss">
	.log {
		@apply hover:bg-[#1e1e1e];
	}
	.error {
		@apply text-red-500 hover:bg-[#371414];
	}
	.warn {
		@apply text-yellow-500 hover:bg-[#3a2f1e];
	}
	.info {
		@apply text-blue-500 hover:bg-[#10162e] italic;
	}
	.followActive {
		@apply bg-blue-500 text-[#080404];
	}
</style>
