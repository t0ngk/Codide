<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { User } from '$lib/types/user';
	import ProfileDropdown from '../dropdown/ProfileDropdown.svelte';
	import ProfileModal from '../modal/ProfileModal.svelte';
	import Navbar from './Navbar.svelte';
	let openModal = false;
	export let user: User;
	const profileUsername = $page.params.id;
</script>

<ProfileModal bind:open={openModal} user={user} />
<Navbar>
	<div slot="action">
		<div class="flex gap-2 items-center">
			<button
				on:click={() => goto('/code')}
				class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
				>Start Coding</button
			>
			{#if user}
				<ProfileDropdown bind:openModal />
			{:else}
				<button
					on:click={() => goto(`/login?redirect=/profile/${profileUsername}`)}
					class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
					>Login</button
				>
			{/if}
		</div>
	</div>
</Navbar>
