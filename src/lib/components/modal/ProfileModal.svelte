<script lang="ts">
	import type { User } from '$lib/types/user';
	import { slide } from 'svelte/transition';
	import Modal from './Modal.svelte';
	import { z } from 'zod';
	export let open = false;
	export let user: User;
	let errorPasswordForm:any = null;
	let errorDisplayNameForm: any = null;

  $: if (!open) {
    errorDisplayNameForm = null;
    errorDisplayNameForm = null;
  }

	const changePasswordForm = z.object({
		password: z.string().min(8),
		newPassword: z.string().min(8),
		confirmPassword: z.string().min(8)
	});

	const changeDisplayNameForm = z.object({
		displayName: z.string().min(4).max(20)
	});

	const changeDisplayName = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		const validate = changeDisplayNameForm.safeParse(data);
		if (!validate.success) {
			errorDisplayNameForm = validate.error.flatten().fieldErrors;
			return;
		}

		const res = await fetch('/api/displayName', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (res.ok) {
			window.location.reload();
		} else {
			console.log(await res.json());
		}
	};
	const changePassword = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		const validate = changePasswordForm.safeParse(data);
    if (data.newPassword !== data.confirmPassword) {
      errorPasswordForm = { confirmPassword: 'Password not match' };
      return;
    }
		if (!validate.success) {
			errorPasswordForm = validate.error.flatten().fieldErrors;
			return;
		}
    

		const res = await fetch('/api/password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (res.ok) {
      errorPasswordForm = null;
      form.reset();
		} else {
			const { message } = await res.json();
      errorPasswordForm = { message };
		}
	};
</script>

<Modal class="w-[90%] h-[90%]" title="Setting" bind:open>
	<div class="flex flex-col w-full items-center gap-2">
		<div class="w-40 aspect-square flex justify-center">
			<img
				src={`https://github.com/identicons/${user.username}.png`}
				alt="Profile Img"
				class="rounded-md w-full h-full"
			/>
		</div>
		<form class="w-full p-2 border" on:submit|preventDefault={changeDisplayName}>
			<p class="text-start w-full">Display name</p>
			<div class="w-full">
        <div class="flex gap-2">
          <input
            class="flex-1 p-2 bg-transparent border rounded-none"
            placeholder="Display name"
            type="text"
            value={user.displayName}
            name="displayName"
          />
          <button
            class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
            type="submit">Change</button
          >
        </div>
				{#if errorDisplayNameForm?.displayName}
					<p class="text-red-500" transition:slide>{errorDisplayNameForm.displayName}</p>
				{/if}
			</div>
		</form>
		<form class="w-full p-2 border" on:submit={changePassword}>
			<p class="text-start w-full">Password</p>
			<div class="w-full flex flex-col gap-2">
        <div>
          <input
            class="w-full p-2 bg-transparent border rounded-none"
            placeholder="Current Password"
            type="password"
            name="password"
          />
          {#if errorPasswordForm?.password}
            <p class="text-red-500" transition:slide>{errorPasswordForm.password}</p>
          {/if}
        </div>
        <div>
          <input
            class="w-full p-2 bg-transparent border rounded-none"
            placeholder="New Password"
            type="password"
            name="newPassword"
          />
          {#if errorPasswordForm?.newPassword}
            <p class="text-red-500" transition:slide>{errorPasswordForm.newPassword}</p>
          {/if}
        </div>
        <div>
          <input
            class="w-full p-2 bg-transparent border rounded-none"
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
          />
          {#if errorPasswordForm?.confirmPassword}
            <p class="text-red-500" transition:slide>{errorPasswordForm.confirmPassword}</p>
          {/if}
        </div>
				<button
					class="px-2 py-1 border transition hover:bg-white active:bg-slate-200 hover:text-[#080404]"
					type="submit">Change</button
				>
        {#if errorPasswordForm?.message}
          <p class="text-red-500" transition:slide>{errorPasswordForm.message}</p>
        {/if}
			</div>
		</form>
	</div>
</Modal>
