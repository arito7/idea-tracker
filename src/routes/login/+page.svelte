<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import { user } from '$lib/user';
	import type { FormEventHandler } from 'svelte/elements';
	import { z } from 'zod';
	let loading = $state(false);

	const loginSchema = z.object({
		email: z.string().email(),
		password: z.string()
	});

	const registerSchema = z
		.object({
			name: z.string().max(100).min(4)
		})
		.merge(loginSchema);

	const login: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		loading = true;
		const formData = new FormData(e.currentTarget);
		const result = loginSchema.safeParse(formData);
		if (result.success) {
			await user.login(result.data.email, result.data.password);
		}
	};

	const register: FormEventHandler<HTMLFormElement> = async (e) => {
		loading = true;
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const result = registerSchema.safeParse(formData);
		if (result.success) {
			await user.register(result.data.email, result.data.password, result.data.name);
		}
	};
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
		</div>
		<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
			<div class="card-body">
				<fieldset class="fieldset">
					<form action="" onsubmit={login}>
						<label class="fieldset-label" for="email">Email</label>
						<input name="email" type="email" class="input" placeholder="Email" />
						<label class="fieldset-label" for="password">Password</label>
						<input name="password" type="password" class="input" placeholder="Password" />
						<div><a class="link link-hover">Forgot password?</a></div>
						{#if loading}
							<button disabled class="btn">
								<span class="loading loading-dots loading-lg"></span>
							</button>
						{:else}
							<button type="submit" class="btn btn-neutral mt-4">Login</button>
						{/if}
					</form>
				</fieldset>
			</div>
		</div>
	</div>
</div>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Register now!</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
		</div>
		<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
			<div class="card-body">
				<fieldset class="fieldset">
					<form class="flex flex-col gap-4" action="" onsubmit={register}>
						<div class="div">
							<label class="fieldset-label">Name</label>
							<input type="text" class="input" placeholder="Name" name="name" />
						</div>
						<div>
							<label class="fieldset-label">Email</label>
							<input type="email" class="input" placeholder="Email" name="email" />
						</div>
						<div>
							<label class="fieldset-label">Password</label>
							<input type="password" class="input" placeholder="Password" name="password" />
						</div>
						{#if loading}
							<button class="btn" disabled>
								<span class="loading loading-dots loading-lg"></span>
							</button>
						{:else}
							<button type="submit" class="btn btn-neutral mt-4">Register</button>
						{/if}
					</form>
				</fieldset>
			</div>
		</div>
	</div>
</div>
