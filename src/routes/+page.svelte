<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { addIdea, deleteIdea, getIdeas } from '$lib/ideas';
	import { user } from '$lib/user';
	import type { FormEventHandler } from 'svelte/elements';
	import { slide } from 'svelte/transition';
	import { z } from 'zod';
	import ErrorToast from '../components/ErrorToast.svelte';
	import { errorMsg } from '$lib/globals';
	import { base } from '$app/paths';

	let loading = $state(false);
	let { data } = $props();

	const ideaSchema = z.object({
		title: z
			.string()
			.min(4, { message: 'Title must be at least 4 characters long.' })
			.max(100, { message: 'Title must be shorter than 100 characters! 🥺' }),
		description: z.string().min(0).max(1000).optional()
	});

	const add: FormEventHandler<HTMLFormElement> = async (e) => {
		loading = true;
		if (!$user) return;
		e.preventDefault();
		const formEle = e.currentTarget;
		const formData = new FormData(e.currentTarget);
		const result = ideaSchema.safeParse(Object.fromEntries(formData.entries()));
		if (!result.success) {
			errorMsg.set(result.error.issues[0].message);
			loading = false;
		} else {
			await addIdea($user.$id, result.data?.title, result.data?.description)
				.catch((e) => {
					errorMsg.set(e.message);
				})
				.finally(() => {
					loading = false;
				});
			formEle.reset();
			invalidateAll().catch((e) => {
				errorMsg.set(e.message);
			});
		}
	};

	const remove = async (id: string) => {
		loading = true;
		await deleteIdea(id).then(() => (loading = false));
		invalidateAll();
	};
</script>

<ErrorToast />
<main class="">
	<section class="grid min-h-36 items-center p-4 md:p-8">
		{#if $user}
			<div class="card w-full p-8">
				<div class="card-body">
					<h2 class="mx-auto my-8 text-xl font-bold">Submit an Idea</h2>
					<fieldset class="">
						<form class="flex flex-col items-center gap-6" action="" onsubmit={add}>
							<label for="title" class="w-full">
								<input class="input" type="text" name="title" id="" placeholder="Title" required />
							</label>
							<label for="description" class="min-h-64 w-full">
								<textarea
									class="textarea h-full w-full resize-none"
									name="description"
									placeholder="My awesome new idea 💡"
									id=""
								></textarea>
							</label>
							{#if loading}
								<button disabled class="btn">
									<span class="loading loading-dots loading-lg"></span>
								</button>
							{:else}
								<button class="btn btn-primary" type="submit">Submit</button>
							{/if}
						</form>
					</fieldset>
				</div>
			</div>
		{:else}
			<div class="card bg-secondary">
				<div class="card-body">
					<p class="text-secondary-content mx-auto flex w-fit items-center gap-4 font-semibold">
						<a class="font-bold text-emerald-300" href={`${base}/login`}>Login </a> to submit an idea!💡
					</p>
				</div>
			</div>
		{/if}
	</section>

	<section class="grid items-center">
		<div class="m-8 flex items-center justify-between">
			<h2 class="text-3xl font-bold">Latest Ideas</h2>
			{#await data.ideas}
				<div class="skeleton h-32 w-32"></div>
			{:then ideas}
				{#if ideas.total == 0}
					<p class="mx-auto">No ideas yet.</p>
				{:else}
					<div class="stats shadow">
						<div class="stat">
							<div class="stat-title">Thoughts</div>
							<div class="stat-value text-secondary justify-self-end">{ideas.total}</div>
							<div class="stat-desc">total thoughts</div>
						</div>
					</div>
				{/if}
			{/await}
		</div>
		<ul>
			{#each data.ideas.documents as idea}
				<li class="flex flex-col p-4">
					<div in:slide={{ axis: 'x', duration: 400 }} class="card bg-primary text-primary-content">
						<div class="card-body">
							<h4 class="card-title">
								{idea.title}
							</h4>
							{#if idea.description}
								<p class="text-slate-300">
									{idea.description}
								</p>
							{/if}
							{#if $user && idea.userId == $user.$id}
								<div class="card-actions justify-end">
									{#if loading}
										<button disabled class="btn self-end"
											><span class="loading loading-dots loading-lg"></span></button
										>
									{:else}
										<button class="btn btn-error self-end" onclick={() => remove(idea.$id)}
											><svg
												viewBox="0 0 24 24"
												fill="none"
												class="h-6 w-6"
												xmlns="http://www.w3.org/2000/svg"
												><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
													id="SVGRepo_tracerCarrier"
													stroke-linecap="round"
													stroke-linejoin="round"
												></g><g id="SVGRepo_iconCarrier">
													<path
														d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
														stroke="#000000"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
												</g></svg
											>
										</button>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</section>
</main>
