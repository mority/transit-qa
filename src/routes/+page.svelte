<script lang="ts">
	import Parameters from './Parameters.svelte';
	import Connections from './Connections.svelte';
	import { type Connection } from './Connection';
	import type { Params } from './Params';

	let params = $state<Params>({
		alpha: 3.0,
		factorTaxi: 10.0,
		baseTaxi: 35.0,
		factorTransfer: 5.0
	});

	let conSets = $state<Array<Array<Connection>>>([
		[
			{
				name: 'ÖV Takt 1',
				departure: '10:34',
				arrival: '12:00',
				transfers: 2,
				startMode: 'walk',
				startLength: 13,
				endMode: 'walk',
				endLength: 0
			},
			{
				name: 'Takt Taxi',
				departure: '11:00',
				arrival: '11:40',
				transfers: 1,
				startMode: 'taxi',
				startLength: 3,
				endMode: 'walk',
				endLength: 0
			},
			{
				name: 'Weit zu Fuß',
				departure: '11:34',
				arrival: '12:14',
				transfers: 1,
				startMode: 'walk',
				startLength: 70,
				endMode: 'walk',
				endLength: 0
			},
			{
				name: 'Taxi Kurz',
				departure: '11:34',
				arrival: '12:14',
				transfers: 1,
				startMode: 'taxi',
				startLength: 3,
				endMode: 'walk',
				endLength: 0
			},
			{
				name: 'Ersatz für Takt',
				departure: '12:34',
				arrival: '13:10',
				transfers: 1,
				startMode: 'taxi',
				startLength: 15,
				endMode: 'walk',
				endLength: 0
			},
			{
				name: 'ÖV Takt 2',
				departure: '14:34',
				arrival: '16:00',
				transfers: 2,
				startMode: 'walk',
				startLength: 13,
				endMode: 'walk',
				endLength: 0
			},
			{
				name: 'ÖV Takt 3',
				departure: '16:34',
				arrival: '18:00',
				transfers: 2,
				startMode: 'walk',
				startLength: 13,
				endMode: 'walk',
				endLength: 0
			},
			{
				name: 'Spät Schnell',
				departure: '17:40',
				arrival: '18:05',
				transfers: 1,
				startMode: 'walk',
				startLength: 5,
				endMode: 'walk',
				endLength: 5
			}
		]
	]);

	let conSetNames = $state<Array<string>>(['Verbindungsmenge 1']);

	function addConSet() {
		conSets.push([]);
		conSetNames.push('Neue Verbindungsmenge');
	}

	function remConSet(i: number) {
		conSets.splice(i, 1);
		conSetNames.splice(i, 1);
	}

	let jsonIo = $state('');

	$effect(() => {
		jsonIo =
			'{"params":' +
			JSON.stringify(params) +
			',"conSets":' +
			JSON.stringify(conSets) +
			',"conSetNames":' +
			JSON.stringify(conSetNames) +
			'}';
	});

	$effect(() => {
		const parsed = JSON.parse(jsonIo);
		params = parsed['params'];
		conSets = parsed['conSets'];
		conSetNames = parsed['conSetNames'];
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex justify-center gap-8 py-8 w-full">
	<Parameters bind:params bind:jsonIo />
	<div>
		{#each conSets as cons, i}
			<div class="mb-2">
				<div>
					<p class="py-2 px-4 my-1 mx-1 float-left" bind:innerHTML={conSetNames[i]} contenteditable>
						{conSetNames[i]}
					</p>
					<button
						class="text-gray font-bold py-2 px-2 my-1 mx-1 rounded float-right"
						onclick={() => remConSet(i)}
					>&#x2715;</button>
				</div>
				<Connections bind:connections={conSets[i]} {params} />
			</div>
		{/each}
		<button
			class="bg-white btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-green-500 w-full"
			onclick={addConSet}
		>
			Neue Verbindungsmenge hinzufügen
		</button>
	</div>
</div>
