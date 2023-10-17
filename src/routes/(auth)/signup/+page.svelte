<script lang="ts">
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { z } from 'zod';
	import Icon from '@iconify/svelte';

	const schema = z.object({
		username: z.string().min(4).max(20),
		password: z.string().min(8),
		confirmPassword: z.string().min(8)
	});
	const usernameRules = /^[a-zA-Z0-9_]{4,20}$/;
	let errorForm: any = null;
	let loadingForm: boolean = false;

	const signup = async (e: Event) => {
		if (loadingForm) return;
		loadingForm = true;
		const form = e.target as HTMLFormElement;
		const body = new FormData(form);
		const data = Object.fromEntries(body.entries());
		const validate = schema.safeParse(data);
		if (!validate.success) {
			errorForm = validate.error.flatten().fieldErrors;
			loadingForm = false;
			return;
		}
		if (!usernameRules.test(data.username as string)) {
			errorForm = {
				username:
					'Username must be 4-20 characters and only contain letters, numbers, and underscores'
			};
			loadingForm = false;
			return;
		}
		if (data.password !== data.confirmPassword) {
			errorForm = { confirmPassword: 'Password not match' };
			loadingForm = false;
			return;
		}

		const res = await fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (res.ok) {
			goto('/login', { replaceState: true });
		} else {
			const { message } = await res.json();
			errorForm = { message };
		}
		loadingForm = false;
	};
</script>

<div class="h-full w-full flex justify-center text-white">
	<div class="h-full w-full md:w-96 flex justify-center items-center p-4">
		<form on:submit|preventDefault={signup} class="w-full flex flex-col items-center gap-4">
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
			<div class="w-full">
				<input
					class="w-full p-2 bg-transparent border rounded-none"
					placeholder="Confirm Password"
					type="password"
					name="confirmPassword"
				/>
				{#if errorForm?.confirmPassword}
					<p class="text-red-500" transition:slide>{errorForm.confirmPassword}</p>
				{/if}
			</div>
			<div class="w-full">
				<button
					type="submit"
					class="w-full p-2 transition hover:bg-slate-100 active:bg-slate-200 bg-white text-[#080404] border flex items-center justify-center gap-2"
				>
					{#if loadingForm}
						<span>
							<Icon icon="line-md:loading-loop" />
						</span>
					{/if}
					Sign Up
				</button>
				{#if errorForm?.message}
					<p class="text-red-500" transition:slide>{errorForm.message}</p>
				{/if}
			</div>
			<div class="w-full">
				<p class="text-center">
					Already have account? <button
						class="text-blue-500"
						type="button"
						on:click={() => {
							goto('/login', { replaceState: true });
						}}
					>
						Login
					</button>
				</p>
			</div>
		</form>
	</div>
</div>
