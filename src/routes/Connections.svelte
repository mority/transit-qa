<script lang="ts">
	import {
		closestToDomination,
		type Connection,
		dominatedBy,
		isValidModeStr,
		parseTime
	} from './Connection';
	import type { Params } from './Params';

	let {
		connections = $bindable(),
		params = $bindable()
	}: {
		connections: Array<Connection>;
		params: Params;
	} = $props();

	let columns = ['Name', 'Abfahrt', 'Ankunft', 'Umstiege', 'Modus', 'Dauer', 'Modus', 'Dauer'];
	let newCon = $state(Array(columns.length).fill(''));

	function addCon() {
		if (parseTime(newCon[1]) === -1) {
			console.log('departure: invalid time format, required HH:MM, provided: ', newCon[1]);
			alert('Abfahrt: ungültiges Format, HH:MM');
			return;
		}
		if (parseTime(newCon[2]) === -1) {
			console.log('arrival: invalid time format, required HH:MM, provided: ', newCon[2]);
			alert('Ankunft: ungültiges Format, HH:MM');
			return;
		}
		if (!/^\d+$/.test(newCon[3])) {
			alert('transfers needs to be a number');
			return;
		}
		if (!isValidModeStr(newCon[4])) {
			alert('invalid start mode, use: walk | taxi');
			return;
		}
		if (!/^\d+$/.test(newCon[5])) {
			console.log('start length needs to be a number, provided: ', newCon[2]);
			alert('start length needs to be a number');
			return;
		}
		if (!isValidModeStr(newCon[6])) {
			alert('invalid end mode, use: walk | taxi');
			return;
		}
		if (!/^\d+$/.test(newCon[7])) {
			alert('end length needs to be a number');
			return;
		}
		connections.push({
			name: newCon[0].trim(),
			departure: newCon[1],
			arrival: newCon[2],
			transfers: parseInt(newCon[3]),
			startMode: newCon[4],
			startLength: parseInt(newCon[5]),
			endMode: newCon[6],
			endLength: parseInt(newCon[7])
		});
	}

	const removeCon = (index: number) => {
		connections.splice(index, 1);
	};
</script>

<div class="basis-1/8 bg-white shadow-lg rounded-sm border border-slate-200">
	<table class="table-auto w-full">
		<!-- Table header -->
		<thead
			class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200"
		>
			<tr>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th colspan="2">
					<div class="font-semibold text-center">Erste Meile</div>
				</th>
				<th colspan="2">
					<div class="font-semibold text-center">Letzte Meile</div>
				</th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr>
				{#each columns as col}
					<th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<div class="font-semibold text-center">{col}</div>
					</th>
				{/each}
				<th class="font-semibold text-center">Dominator</th>
				<th class="font-semibold text-center">Beinahe<br />Dominator</th>
				<th></th>
			</tr>
		</thead>

		<tbody class="text-sm divide-y divide-slate-200">
			{#each connections as c, index}
				{@const closest = closestToDomination(c, connections, params)}
				<tr>
					<td
						contenteditable="true"
						bind:innerHTML={c.name}
						class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
					>
						{c.name}
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
						<input type="time" bind:value={c.departure} />
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
						<input type="time" bind:value={c.arrival} />
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<input type="number" bind:value={c.transfers} class="border-0 w-16" />
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
						<select
							class="appearance-none"
							bind:value={c.startMode}
							name="startMode"
							id="startMode"
						>
							<option value="walk">Zu Fuß</option>
							<option value="taxi">Taxi</option>
						</select>
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<input type="number" bind:value={c.startLength} class="border-0 w-16" />
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
						<select class="appearance-none" bind:value={c.endMode} name="endMode" id="endMode">
							<option value="walk">Zu Fuß</option>
							<option value="taxi">Taxi</option>
						</select>
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<input type="number" bind:value={c.endLength} class="border-0 w-16" />
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						{#each dominatedBy(c, connections, params) as [x, d]}
							[{x.name}, {Math.round(d)}]<br />
						{/each}
					</td>
					<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						{#if closest}
							{closest[0]}, {Math.round(closest[1])}<br />
						{/if}
					</td>
					<td class="px-5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<button
							class="btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-rose-500 mx-auto"
							onclick={() => removeCon(index)}
						>
							Entfernen
						</button>
					</td>
				</tr>
			{/each}

			<tr class="h-full">
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					<input type="text" bind:value={newCon[0]} size="5" placeholder="Name" />
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					<input type="time" bind:value={newCon[1]} />
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					<input type="time" bind:value={newCon[2]} />
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={newCon[3]} placeholder="--" class="border-0 w-16" />
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					<select class="appearance-none" bind:value={newCon[4]}>
						<option value="" disabled selected>Modus</option>
						<option value="walk">Zu Fuß</option>
						<option value="taxi">Taxi</option>
					</select>
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={newCon[5]} placeholder="--" class="border-0 w-16" />
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					<select class="appearance-none" bind:value={newCon[6]}>
						<option value="" disabled selected>Modus</option>
						<option value="walk">Zu Fuß</option>
						<option value="taxi">Taxi</option>
					</select>
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={newCon[7]} placeholder="--" class="border-0 w-16" />
				</td>
				<td></td>
				<td></td>
				<td class="px-5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<button
						class="btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-green-500"
						onclick={addCon}
					>
						Hinzufügen
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	select {
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		background-image: none;
		padding: 2px;
	}
</style>
