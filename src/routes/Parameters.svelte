<script lang="ts">
	import type { CostThreshold } from './CostThreshold';
	import type { Params } from './Params';
	let {
		params = $bindable(),
		jsonIo = $bindable()
	}: {
		params: Params;
		jsonIo: string;
	} = $props();

	function addCost(costArr: Array<CostThreshold>) {
		const t = costArr.length === 0 ? 0 : costArr[costArr.length - 1].threshold + 1;
		const c = costArr.length === 0 ? 0 : costArr[costArr.length - 1].cost + 1;
		costArr.push({ threshold: t, cost: c });
	}

	function remCost(costArr: Array<CostThreshold>, i: number) {
		costArr.splice(i, 1);
	}
</script>

<div class="bg-white shadow-lg rounded-sm border border-slate-200 text-right mb-2">
	<table class="table-auto w-full">
		<tbody class="text-sm divide-y divide-slate-200 border-slate-200">
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Schutzfaktor
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" step="0.1" bind:value={params.alpha} class="border-0 w-20" />
				</td>
			</tr>
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Distanz Taxi Direkt
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" step="0.1" bind:value={params.distanceDirectTaxi} class="border-0 w-20" />
				</td>
			</tr>
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Verbesserungsfaktor Taxi Direkt
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input
						type="number"
						step="0.1"
						bind:value={params.improvementFactorDirectTaxi}
						class="border-0 w-20"
					/>
				</td>
			</tr>
			<tr>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">
					Min. Verbesserung Taxi Direkt
				</td>
				<td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
					<input type="number" bind:value={params.minImprovementDirectTaxi} class="border-0 w-20" />
				</td>
			</tr>
		</tbody>
	</table>
	</div>

	<div class="bg-white shadow-lg rounded-sm border border-slate-200 text-center mb-2">
	<table class="table-auto w-full">
		<tbody class="text-sm divide-y divide-slate-200">
			<tr>
				<th colspan="3">Zu Fuß</th>
			</tr>
			<tr class="border-none">
				<th>Ab</th><th>Wert</th>
			</tr>
			{#each params.costWalk as ct, i}
				<tr>
					<td><input type="number" bind:value={ct.threshold} class="border-0 w-16" /></td>
					<td><input type="number" bind:value={ct.cost} class="border-0 w-16" /></td>
					<td
						><button
							class="text-gray font-bold py-2 px-2 my-1 mx-1"
							onclick={() => remCost(params.costWalk, i)}>&#x2715;</button
						></td
					>
				</tr>
			{/each}
			<tr>
				<td colspan="3"
					><button
						class="bg-white hover:bg-slate-50 btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-green-500 w-full mb-2"
						onclick={() => addCost(params.costWalk)}
					>
						+
					</button></td
				>
			</tr>
		</tbody>
	</table>
	</div>
	
	<div class="bg-white shadow-lg rounded-sm border border-slate-200 text-center mb-2">
	<table class="table-auto w-full">
		<tbody class="text-sm divide-y divide-slate-200">
			<tr>
				<th colspan="3">Taxi</th>
			</tr>
			<tr class="border-none">
				<th>Ab</th><th>Wert</th>
			</tr>
			{#each params.costTaxi as ct, i}
				<tr>
					<td><input type="number" bind:value={ct.threshold} class="border-0 w-16" /></td>
					<td><input type="number" bind:value={ct.cost} class="border-0 w-16" /></td>
					<td
						><button
							class="text-gray font-bold py-2 px-2 my-1 mx-1"
							onclick={() => remCost(params.costTaxi, i)}>&#x2715;</button
						></td
					>
				</tr>
			{/each}
			<tr>
				<td colspan="3"
					><button
						class="bg-white hover:bg-slate-50 btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-green-500 w-full mb-2"
						onclick={() => addCost(params.costTaxi)}
					>
						+
					</button></td
				>
			</tr>
		</tbody>
	</table>
</div>
	
<div class="bg-white shadow-lg rounded-sm border border-slate-200 text-center mb-2">
	<table class="table-auto w-full">
		<tbody class="text-sm divide-y divide-slate-200">
			<tr>
				<th colspan="3">Umstiege</th>
			</tr>
			<tr class="border-none">
				<th>Ab</th><th>Wert</th>
			</tr>
			{#each params.costTransfer as ct, i}
				<tr class="text-center">
					<td><input type="number" bind:value={ct.threshold} class="border-0 w-16" /></td>
					<td><input type="number" bind:value={ct.cost} class="border-0 w-16" /></td>
					<td
						><button
							class="text-gray font-bold py-2 px-2 my-1 mx-1"
							onclick={() => remCost(params.costTransfer, i)}>&#x2715;</button
						></td
					>
				</tr>
			{/each}
			<tr>
				<td colspan="3"
					><button
						class="bg-white hover:bg-slate-50 btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-green-500 w-full mb-2"
						onclick={() => addCost(params.costTransfer)}
					>
						+
					</button></td
				>
			</tr>
		</tbody>
	</table>
</div>
	
<div class="bg-white shadow-lg rounded-sm border border-slate-200 text-center">
	<table class="table-auto w-full">
		<tbody class="text-sm divide-y divide-slate-200">
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
			<tr>
				<td colspan="2" class="text-center"
					><span class="bg-red-300 w-8 h-8 m-1 float-left"></span>
					<p>Anforderung nicht erfüllt</p></td
				>
			</tr>
		</tbody>
	</table>
</div>
