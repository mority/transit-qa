<script lang="ts">
	import type { Params } from './Params';
	let {
		params = $bindable(),
		jsonIo = $bindable()
	}: {
		params: Params;
		jsonIo: string;
	} = $props();
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
					<textarea id="json-io" class="w-full h-[200px]" bind:value={jsonIo}></textarea>
				</td>
			</tr>
		</tbody>
	</table>
</div>
