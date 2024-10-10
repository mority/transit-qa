<script lang="ts">
	import Parameters from './Parameters.svelte';
	import Connections from './Connections.svelte';
	import { type Connection } from './Connection';
	import type { Params } from './Params';
	import { page } from '$app/stores';

	let params = $state<Params>({
		alpha: 3.0,
		factorTaxi: 10.0,
		baseTaxi: 35.0,
		factorTransfer: 5.0
	});

	let conSets = $state<Array<Array<Connection>>>([[]]);
	let conSetNames = $state<Array<string>>([]);

	function addConSet() {
		conSets.push([]);
		conSetNames.push('Neue Verbindungsmenge');
		setTimeout(() => {
			window.scrollTo(0, document.body.scrollHeight);
		}, 0);
	}

	function remConSet(i: number) {
		conSets.splice(i, 1);
		conSetNames.splice(i, 1);
	}

	let jsonIo = $state(
		'{"params":{"alpha":3,"factorTaxi":10,"baseTaxi":35,"factorTransfer":5},"conSets":[[{"name":"ÖV Takt 1","departure":"10:17","arrival":"11:00","transfers":0,"startMode":"walk","startLength":30,"endMode":"walk","endLength":0},{"name":"Taxi+ÖV","departure":"10:42","arrival":"11:00","transfers":1,"startMode":"taxi","startLength":3,"endMode":"walk","endLength":0},{"name":"Taxi Direkt 1","departure":"14:10","arrival":"14:20","transfers":0,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":0},{"name":"ÖV Takt 2","departure":"12:17","arrival":"13:00","transfers":0,"startMode":"walk","startLength":30,"endMode":"walk","endLength":0},{"name":"ÖV Takt 3","departure":"14:17","arrival":"15:00","transfers":0,"startMode":"walk","startLength":30,"endMode":"walk","endLength":0},{"name":"Taxi Direkt 2","departure":"14:20","arrival":"14:30","transfers":0,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":0}],[{"name":"ÖV Kreba 1","departure":"15:22","arrival":"16:53","transfers":0,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0},{"name":"ÖV Kreba 2","departure":"16:22","arrival":"17:53","transfers":0,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0},{"name":"ÖV Kreba 3","departure":"18:22","arrival":"19:53","transfers":0,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0},{"name":"ÖV Klitten 1","departure":"15:26","arrival":"16:53","transfers":1,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0},{"name":"ÖV Klitten 2","departure":"16:26","arrival":"17:53","transfers":1,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0},{"name":"ÖV Klitten 3","departure":"18:26","arrival":"19:53","transfers":1,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0},{"name":"ÖV+Tx Kreba 1","departure":"16:01","arrival":"16:53","transfers":1,"startMode":"taxi","startLength":4,"endMode":"walk","endLength":0},{"name":"ÖV+Tx Klitten 1","departure":"16:04","arrival":"16:53","transfers":2,"startMode":"taxi","startLength":5,"endMode":"walk","endLength":0},{"name":"ÖV+Tx Rietschen 1","departure":"15:52","arrival":"16:20","transfers":1,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":0},{"name":"ÖV+Tx Rietschen 2","departure":"16:52","arrival":"17:20","transfers":1,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":0},{"name":"ÖV+Tx Rietschen 3","departure":"17:52","arrival":"18:20","transfers":1,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":0},{"name":"ÖV+Tx Kreba 2","departure":"17:01","arrival":"17:53","transfers":1,"startMode":"taxi","startLength":4,"endMode":"walk","endLength":0},{"name":"ÖV+Tx Kreba 3","departure":"19:01","arrival":"19:53","transfers":1,"startMode":"taxi","startLength":4,"endMode":"walk","endLength":0}]],"conSetNames":["Zwei Taxi-Direktfahrten","Verbindung 1"]}'
	);

	$effect(() => {
		const parsed = JSON.parse(jsonIo);
		console.log(parsed);
		params = parsed['params'];
		conSets = parsed['conSets'];
		conSetNames = parsed['conSetNames'];
	});

	$effect(() => {
		jsonIo = JSON.stringify({params,conSets,conSetNames});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="3xl:container 3xl:mx-auto">
	<div class="flex flex-row">
		<aside class="p-2">
			<div class="sticky top-2">
				<Parameters bind:params bind:jsonIo />
			</div>
		</aside>
		<main class="p-2">
			{#each conSets as cons, i}
				<div class="mb-2">
					<div>
						<p
							class="py-2 px-4 my-1 mx-1 float-left"
							bind:innerHTML={conSetNames[i]}
							contenteditable
						>
							{conSetNames[i]}
						</p>
						<button
							class="text-gray font-bold py-2 px-2 my-1 mx-1 rounded float-right"
							onclick={() => remConSet(i)}>&#x2715;</button
						>
					</div>
					<Connections bind:connections={conSets[i]} {params} />
				</div>
			{/each}
			<button
				class="bg-white hover:bg-slate-50 btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-green-500 w-full mb-2"
				onclick={addConSet}
			>
				Neue Verbindungsmenge hinzufügen
			</button>
		</main>
	</div>
</div>
