<script lang="ts">
	import '../app.css';
	import { user } from '$lib/user';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	let { children } = $props();
	console.log(page.route.id);
</script>

<div class="navbar shadow-sm">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href={base}>Idea Tracker 💡</a>
	</div>
	<div class="flex gap-2">
		{#if $user}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						/>
					</div>
				</div>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
				>
					<li class="text-xl font-semibold">
						<span>{$user.name}</span>
					</li>
					<li>
						<a class="justify-between"> Profile </a>
					</li>
					<li><button onclick={() => user.logout()}>Logout</button></li>
				</ul>
			</div>
		{:else if page.route.id != '/login'}
			<a href={`${base}/login`} class="btn btn-secondary">Login</a>
		{/if}
	</div>
</div>
{@render children()}
