<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="h-full w-full flex justify-center text-white">
	<div class="h-full w-full md:w-96 flex justify-center items-center p-4">
		<div class="w-full flex flex-col items-center gap-4">
			<h1 class="text-6xl">Codide</h1>
			<input
				class="w-full p-2 bg-transparent border rounded-none"
				placeholder="Username"
				type="text"
				name=""
				id=""
			/>
			<input
				class="w-full p-2 bg-transparent border rounded-none"
				placeholder="Password"
				type="password"
				name=""
				id=""
			/>
			<input
				class="w-full p-2 bg-transparent border rounded-none"
				placeholder="Confirm Password"
				type="password"
				name=""
				id=""
			/>
			<button
				class="w-full p-2 transition hover:bg-slate-100 active:bg-slate-200 bg-white text-[#080404] border"
				>Sign Up</button
			>
			<div class="w-full">
				<p class="text-center">
					Already have account? <button
						class="text-blue-500"
						on:click={() => {
							goto('/login', { replaceState: true });
						}}>Login</button
					>
				</p>
			</div>
		</div>
	</div>
</div>
