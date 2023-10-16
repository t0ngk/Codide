<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Project } from '$lib/types/project';
	import type { User } from '$lib/types/user';
	import Icon from '@iconify/svelte';
	import DeleteModal from '../modal/DeleteModal.svelte';
	import { htmlCode, cssCode, jsCode } from '../store/editor';
	import Navbar from './Navbar.svelte';
	let deleteModal = false;
	export let user: User | null;
	export let project: Project | null;
	let name: string = project?.name || '';
	let awaitSave = false;
	let awaitCopy = false;
	let awaitDelete = false;
	const save = async () => {
		if (awaitSave) return;
		awaitSave = true;
		const res = await fetch('/api/project/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				slug: $page.params.id,
				html: $htmlCode,
				css: $cssCode,
				js: $jsCode
			})
		});
		if (res.ok) {
			const { slug, create } = await res.json();
			if (create) {
				window.location.href = `/code/${slug}`;
			}
		} else {
			console.log(await res.json());
		}
		awaitSave = false;
	};
	const cloneProject = async () => {
		const res = await fetch(`/api/project/clone/${$page.params.id}`);
		if (res.ok) {
			const { slug } = await res.json();
			window.location.href = `/code/${slug}`;
		} else {
			console.log(await res.json());
		}
	};
	const deleteProject = async () => {
		if (awaitDelete) {
			return;
		}
		awaitDelete = true;
		const res = await fetch(`/api/project/delete/${$page.params.id}`, {
			method: 'DELETE'
		});
		if (res.ok) {
			window.location.href = '/code/new';
		} else {
			console.log(await res.json());
		}
		awaitDelete = false;
	};
</script>

<DeleteModal bind:open={deleteModal} loading={awaitDelete} confirmDelete={deleteProject} />
<Navbar>
	<div slot="title">
		<div class="">
			<input
				class="bg-transparent"
				type="text"
				bind:value={name}
				disabled={user?.username !== project?.owner?.username}
			/>
			<button
				class="text-xs text-slate-400 flex"
				on:click={() => goto(`/profile/${project?.owner?.username}`)}
			>
				<p>{project?.owner?.displayName || ''}</p>
			</button>
		</div>
	</div>
	<div slot="action">
		<div class="flex gap-2 items-center">
			{#if user?.username === project?.owner?.username}
				{#if project?.slug !== 'new'}
					<button
						class="px-2 py-1 border transition text-red-500 border-red-500 hover:bg-red-500 active:bg-red-600 hover:text-[#080404]"
						on:click={() => (deleteModal = true)}>Delete</button
					>
				{/if}
				{#if user}
					<button
						class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404] flex justify-center items-center gap-1"
						on:click={save}>
						{#if awaitSave}
							<Icon icon="line-md:loading-loop" />
						{/if}
						Save</button
					>
				{/if}
			{/if}
			{#if project?.slug !== 'new' && user}
				<button
					class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404] flex justify-center items-center gap-1"
					on:click={cloneProject}>
					{#if awaitCopy}
						<Icon icon="line-md:loading-loop" />
					{/if}
					Clone</button
				>
			{/if}
			{#if user}
				<button
					class="w-9 h-9 p-0.5 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
					on:click={() => goto('/profile')}
				>
					<div class="aspect-square flex justify-center">
						<img
							src={`https://github.com/identicons/${user?.username}.png`}
							alt="Profile Img"
							class="w-full h-full border border-black"
						/>
					</div>
				</button>
			{:else}
				<button
					class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
					on:click={() => {
						goto(`/login?redirect=/code/${project?.slug}`, { replaceState: true });
					}}>Login</button
				>
			{/if}
		</div>
	</div>
</Navbar>
