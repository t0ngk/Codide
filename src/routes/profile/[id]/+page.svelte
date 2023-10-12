<script lang="ts">
    import type { PageData } from './$types';

	export let data: PageData;
    let card: DOMRectReadOnly;
    let iframeScale: number;
    $: iframeScale = card?.width / 1920;

    $: console.log(iframeScale);
</script>

<div class={`w-full h-full flex flex-col items-center text-white gap-2 p-6 bg-[#080404] overflow-y-auto`}>
    <div class="flex flex-col gap-1">
        <div class="w-40 aspect-square">
            <img
                src="https://github.com/identicons/asddddddddddddddddd.png"
                alt="Profile Img"
                class="rounded-md w-full h-full"
            />
        </div>
        <h1 class="text-3xl text-center w-full truncate">Displayname</h1>
        <h1 class="text-xl text-center w-full text-slate-400 truncate">@Username</h1>
    </div>
	<div class="w-full md:w-[90%] flex flex-col">
		<p class="w-full">Project</p>
		<div class="w-full p-2 grid grid-cols-1 md:grid-cols-3 gap-3">
			<button class="border p-2 flex flex-col gap-2 group transition hover:bg-white">
                <div class="aspect-video w-full border border-black overflow-hidden">
                    <div class="w-full h-full bg-white " bind:contentRect={card}>
                        <iframe class="w-[1920px] h-[1080px] origin-top-left" style={`scale: ${iframeScale};`} title="" src="http://localhost:5173/code/new" frameborder="0">
                            
                        </iframe>
                    </div>
                </div>
				<p class="group-hover:text-[#080404] transition truncate w-full text-start" title="">Project Name</p>
			</button>
		</div>
	</div>
</div>
