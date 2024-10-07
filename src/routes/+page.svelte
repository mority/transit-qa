<script lang="ts">
	import Parameters from './Parameters.svelte';
	import Connections from './Connections.svelte';
	import { type Connection } from './Connection';
	import type { Params } from './Params';

	let params = $state<Params>({
		alpha: 3.0,
		beta: 3.0,
		baseTaxi: 37.0,
		factorTaxi: 12.0,
		factorTransfer: 5.0
	});

	let connections = $state<Array<Connection>>([
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
	]);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex justify-center gap-8 py-8 w-full">
	<Parameters bind:params bind:connections />
	<Connections bind:connections {params} />
</div>
