<script lang="ts">
	import type { Params } from './Params';
	import type { Connection } from './Connection';
	let {
		params = $bindable(),
		connections = $bindable()
	}: {
		params: Params;
		connections: Array<Connection>;
	} = $props();

	let jsonIo = $state('');

	$effect(() => {
		jsonIo =
			'{"params":' + JSON.stringify(params) + ',"connections":' + JSON.stringify(connections) + '}';
	});

	$effect(() => {
		const parsed = JSON.parse(jsonIo);
		params = parsed['params'];
		connections = parsed['connections'];
	});
</script>

<div class="relative basis-1/8 bg-white shadow-lg rounded-sm border border-slate-200">
	<table class="table-auto w-full">
		<tbody class="text-sm divide-y divide-slate-200">
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Schutzfaktor
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={params.alpha} class="border-0 w-16" />
				</td>
			</tr>
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Basis Taxi
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={params.baseTaxi} class="border-0 w-16" />
				</td>
			</tr>
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Faktor Taxi
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={params.factorTaxi} class="border-0 w-16" />
				</td>
			</tr>
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Faktor Umstieg
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={params.factorTransfer} class="border-0 w-16" />
				</td>
			</tr>
			<tr>
				<td
					colspan="2"
					class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
				>
					<label for="json-io">JSON Import/Export</label>
					<br />
					<textarea id="json-io" style="width: 100%; height: 200px;" bind:value={jsonIo}></textarea>
				</td>
			</tr>
		</tbody>
	</table>
</div>
