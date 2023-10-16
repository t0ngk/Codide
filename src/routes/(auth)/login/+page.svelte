<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { z } from 'zod';
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	export let data: PageData;

	let errorForm: any = null;
	let isLogin: boolean = false;

	const loginForm = z.object({
		username: z.string().min(4).max(20),
		password: z.string().min(8).max(100)
	});

	const login = async (e: Event) => {
		if (isLogin) {
			return;
		}
		isLogin = true;
		const form = e.target as HTMLFormElement;
		const body = new FormData(form);
		const data = Object.fromEntries(body.entries());
		const validate = loginForm.safeParse(data);
		if (!validate.success) {
			errorForm = validate.error.flatten().fieldErrors;
			isLogin = false;
			return;
		}
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (res.ok) {
			const redirctTo = $page.url.searchParams.get('redirect');
			window.location.href = redirctTo || '/code/new';
		} else {
			console.log(await res.json());
		}
		isLogin = false;
	};
</script>

<div class="h-full w-full flex justify-center text-white">
	<div class="h-full w-full md:w-96 flex justify-center items-center p-4">
		<form on:submit|preventDefault={login} class="w-full flex flex-col items-center gap-4">
			<h1 class="text-6xl">Codide</h1>
			<div class="w-full">
				<input
					class="w-full p-2 bg-transparent border rounded-none"
					placeholder="Username"
					type="text"
					name="username"
				/>
				{#if errorForm?.username}
					<p class="text-red-500" transition:slide>{errorForm.username}</p>
				{/if}
			</div>
			<div class="w-full">
				<input
					class="w-full p-2 bg-transparent border rounded-none"
					placeholder="Password"
					type="password"
					name="password"
				/>
				{#if errorForm?.password}
					<p class="text-red-500" transition:slide>{errorForm.password}</p>
				{/if}
			</div>
			<button
				class="w-full p-2 transition hover:bg-slate-100 active:bg-slate-200 bg-white text-[#080404] border flex justify-center items-center gap-2"
				type="submit"
				>
					{#if isLogin}
					<p class="text-xl">
						<Icon icon="line-md:loading-loop" />
					</p>
					{/if}
					Login
				</button
			>
			<div class="w-full">
				<p class="text-center">
					Don't have an account? <button
						class="text-blue-500"
						type="button"
						on:click={() => {
							goto('/signup', { replaceState: true });
						}}>Sign up</button
					>
				</p>
			</div>
		</form>
	</div>
</div>
