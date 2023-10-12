<script lang="ts">
	import { goto } from '$app/navigation';
	import Navbar from './Navbar.svelte';
</script>

<Navbar>
	<div slot="title">
		<div class="">
			<input class="bg-transparent" type="text" value="New Project">
			<button class="text-xs text-slate-400 flex">
				<p>Username</p>
			</button>
		</div>
	</div>
	<div slot="action">
		<!-- <div class="flex gap-2 items-center">
			<button
				class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
				>Delete</button
			>
			<button
				class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
				>Save</button
			>
			<button
				class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
				>Clone</button
			>
			<button
				class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
				on:click={() => {
					goto('/login', { replaceState: true });
				}}>Login</button
			>
			<button class="w-9 h-9 p-0.5 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]">
				<div class="aspect-square flex justify-center">
					<img
						src="https://github.com/identicons/asddddddddddddddddd.png"
						alt="Profile Img"
						class="w-full h-full border border-black"
					/>
				</div>
			</button>
		</div> -->
	</div>
</Navbar>
