<script lang="ts">
    import ProjectBtn from '$lib/components/ProjectBtn.svelte';
import type { PageData } from './$types';

	export let data: PageData;
    const { profile } = data;
    let card: DOMRectReadOnly;
    let iframeScale: number;
    $: iframeScale = card?.width / 1920;
</script>

<svelte:head>
	<title>{profile?.displayName} - Codide</title>
	<meta name="title" content={`${profile?.displayName} - Codide`} />
	<meta property="twitter:title" content={`${profile?.displayName} - Codide`} />
</svelte:head>

<div class={`w-full h-full flex flex-col items-center text-white gap-2 p-6 bg-[#080404] overflow-y-auto`}>
    <div class="flex flex-col gap-1">
        <div class="w-40 aspect-square">
            <img
                src={`https://github.com/identicons/${profile.username}.png`}
                alt="Profile Img"
                class="rounded-md w-full h-full"
            />
        </div>
        <h1 class="text-3xl text-center w-full truncate">{profile.displayName}</h1>
        <h1 class="text-xl text-center w-full text-slate-400 truncate">@{profile.username}</h1>
    </div>
	<div class="w-full md:w-[90%] flex flex-col">
		<p class="w-full">Project</p>
        {#if profile.project.length == 0}
            <h1 class="text-lg w-full text-center">
                This user has no project.
            </h1>
        {/if}
		<div class="w-full p-2 grid grid-cols-1 md:grid-cols-3 gap-3">
            {#each profile.project as project}                
                <ProjectBtn project={project} />
            {/each}
		</div>
	</div>
</div>
