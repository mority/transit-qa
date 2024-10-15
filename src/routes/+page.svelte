<script lang="ts">
	import Parameters from './Parameters.svelte';
	import Connections from './Connections.svelte';
	import { type Connection } from './Connection';
	import type { Params } from './Params';
	import { page } from '$app/stores';

	let params = $state<Params>({
		alpha: 3.0,
		costWalk: [{ threshold: 0, cost: 1 }],
		costTaxi: [{ threshold: 0, cost: 1 }],
		costTransfer: [{ threshold: 0, cost: 1 }]
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
		'{"params":{"alpha":1,"costWalk":[{"threshold":0,"cost":1},{"threshold":15,"cost":10}],"costTaxi":[{"threshold":0,"cost":35},{"threshold":1,"cost":10}],"costTransfer":[{"threshold":0,"cost":5}]},"conSets":[[{"name":"ÖV","departure":"10:17","arrival":"11:00","transfers":0,"startMode":"walk","startLength":30,"endMode":"walk","endLength":0,"toDom":""},{"name":"ÖV+Taxi","departure":"10:43","arrival":"11:00","transfers":0,"startMode":"taxi","startLength":4,"endMode":"walk","endLength":0,"toDom":""},{"name":"Direkt-Taxi Überholt 1","departure":"10:17","arrival":"10:27","transfers":0,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":0,"toDom":true},{"name":"Direkt-Taxi Überholt 2","departure":"10:43","arrival":"10:53","transfers":0,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":0,"toDom":true},{"name":"Direkt-Taxi Überholt 3","departure":"10:50","arrival":"11:00","transfers":0,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":0,"toDom":true},{"name":"Direkt-Taxi 1","departure":"10:00","arrival":"10:10","transfers":0,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":0,"toDom":true},{"name":"Direkt-Taxi 2","departure":"11:00","arrival":"11:10","transfers":0,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":0,"toDom":true}],[{"name":"ÖV","departure":"10:00","arrival":"11:00","transfers":3,"startMode":"walk","startLength":5,"endMode":"walk","endLength":5,"toDom":""},{"name":"ÖV+Taxi 1","departure":"10:14","arrival":"11:00","transfers":2,"startMode":"taxi","startLength":6,"endMode":"walk","endLength":5,"toDom":true},{"name":"ÖV+Taxi 2","departure":"10:20","arrival":"11:00","transfers":1,"startMode":"taxi","startLength":10,"endMode":"walk","endLength":5,"toDom":true},{"name":"ÖV+Taxi 3","departure":"10:30","arrival":"11:00","transfers":0,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":5,"toDom":true}],[{"name":"ÖV1","departure":"10:00","arrival":"11:00","transfers":0,"startMode":"walk","startLength":10,"endMode":"walk","endLength":10,"toDom":""},{"name":"ÖV2","departure":"12:00","arrival":"13:00","transfers":0,"startMode":"walk","startLength":10,"endMode":"walk","endLength":10,"toDom":""},{"name":"Taxi","departure":"14:00","arrival":"14:20","transfers":0,"startMode":"taxi","startLength":20,"endMode":"walk","endLength":0,"toDom":""},{"name":"ÖV3","departure":"16:00","arrival":"17:00","transfers":0,"startMode":"walk","startLength":10,"endMode":"walk","endLength":10,"toDom":""}],[{"name":"ÖV Kreba 1","departure":"15:22","arrival":"16:53","transfers":0,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV Kreba 2","departure":"16:22","arrival":"17:53","transfers":0,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV Kreba 3","departure":"18:22","arrival":"19:53","transfers":0,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV Klitten 1","departure":"15:26","arrival":"16:53","transfers":1,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV Klitten 2","departure":"16:26","arrival":"17:53","transfers":1,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV Klitten 3","departure":"18:26","arrival":"19:53","transfers":1,"startMode":"walk","startLength":46,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Kreba 1","departure":"16:01","arrival":"16:53","transfers":0,"startMode":"taxi","startLength":4,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Klitten 1","departure":"16:04","arrival":"16:53","transfers":1,"startMode":"taxi","startLength":5,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Rietschen 1","departure":"15:52","arrival":"16:20","transfers":0,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Rietschen 2","departure":"16:52","arrival":"17:20","transfers":0,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Rietschen 3","departure":"17:52","arrival":"18:20","transfers":0,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Kreba 2","departure":"17:01","arrival":"17:53","transfers":0,"startMode":"taxi","startLength":4,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Kreba 3","departure":"19:01","arrival":"19:53","transfers":0,"startMode":"taxi","startLength":4,"endMode":"walk","endLength":0,"toDom":false}],[{"name":"ÖV 0","departure":"14:32","arrival":"15:43","transfers":2,"startMode":"walk","startLength":0,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV 1","departure":"15:22","arrival":"16:28","transfers":1,"startMode":"walk","startLength":0,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV 2","departure":"15:32","arrival":"17:10","transfers":3,"startMode":"walk","startLength":0,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV 3","departure":"17:50","arrival":"18:28","transfers":1,"startMode":"walk","startLength":0,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV 4","departure":"18:32","arrival":"20:10","transfers":3,"startMode":"walk","startLength":0,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV 5","departure":"19:22","arrival":"20:45","transfers":1,"startMode":"walk","startLength":0,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Wk 1","departure":"15:01","arrival":"15:28","transfers":1,"startMode":"taxi","startLength":12,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Wk 2","departure":"16:01","arrival":"16:28","transfers":1,"startMode":"taxi","startLength":12,"endMode":"walk","endLength":0,"toDom":false},{"name":"ÖV+Tx Wk 3","departure":"18:01","arrival":"18:28","transfers":1,"startMode":"taxi","startLength":12,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi direkt 1","departure":"15:00","arrival":"15:22","transfers":0,"startMode":"taxi","startLength":22,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi direkt 2","departure":"16:00","arrival":"16:22","transfers":0,"startMode":"taxi","startLength":22,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi direkt 3","departure":"17:00","arrival":"17:22","transfers":0,"startMode":"taxi","startLength":22,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi direkt 4","departure":"18:00","arrival":"18:22","transfers":0,"startMode":"taxi","startLength":22,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi direkt 5","departure":"19:00","arrival":"19:22","transfers":0,"startMode":"taxi","startLength":22,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi direkt 6","departure":"20:00","arrival":"20:22","transfers":0,"startMode":"taxi","startLength":22,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi direkt 7","departure":"21:00","arrival":"21:22","transfers":0,"startMode":"taxi","startLength":22,"endMode":"walk","endLength":0,"toDom":false}],[{"name":"ÖV Takt 1","departure":"05:17","arrival":"06:02","transfers":1,"startMode":"walk","startLength":3,"endMode":"walk","endLength":4,"toDom":false},{"name":"ÖV Takt 2","departure":"07:17","arrival":"08:02","transfers":1,"startMode":"walk","startLength":3,"endMode":"walk","endLength":4,"toDom":false},{"name":"Zu Fuß","departure":"04:56","arrival":"07:00","transfers":0,"startMode":"walk","startLength":124,"endMode":"walk","endLength":0,"toDom":false},{"name":"Nur Taxi","departure":"06:45","arrival":"07:00","transfers":0,"startMode":"taxi","startLength":15,"endMode":"walk","endLength":0,"toDom":false},{"name":"Taxi+ÖV","departure":"06:40","arrival":"07:09","transfers":1,"startMode":"taxi","startLength":7,"endMode":"walk","endLength":13,"toDom":false}],[{"name":"ÖV A1","departure":"10:34","arrival":"12:00","transfers":2,"startMode":"walk","startLength":13,"endMode":"walk","endLength":0,"toDom":""},{"name":"Taxi -&gt; ÖV A1","departure":"11:00","arrival":"12:00","transfers":1,"startMode":"taxi","startLength":3,"endMode":"walk","endLength":0,"toDom":true},{"name":"ÖV B","departure":"10:29","arrival":"12:14","transfers":1,"startMode":"walk","startLength":70,"endMode":"walk","endLength":0,"toDom":""},{"name":"Taxi -&gt; ÖV B","departure":"11:34","arrival":"12:14","transfers":1,"startMode":"taxi","startLength":7,"endMode":"walk","endLength":0,"toDom":""},{"name":"Taxi ÖV A Lücke","departure":"12:34","arrival":"13:00","transfers":0,"startMode":"taxi","startLength":26,"endMode":"walk","endLength":0,"toDom":""},{"name":"ÖV A2","departure":"14:34","arrival":"16:00","transfers":2,"startMode":"walk","startLength":13,"endMode":"walk","endLength":0,"toDom":""},{"name":"ÖV A3","departure":"16:34","arrival":"18:00","transfers":2,"startMode":"walk","startLength":13,"endMode":"walk","endLength":0,"toDom":""},{"name":"ÖV C","departure":"17:40","arrival":"18:05","transfers":1,"startMode":"walk","startLength":5,"endMode":"walk","endLength":5,"toDom":""}]],"conSetNames":["ÖV+Taxi anbieten, kein Direkt-Taxi","Taxi spart Umstiege","Taxi-Direktfahrt als Ersatz für Takt","Klein Radisch – Weißwasser (Bhf.)","Pechern - Rietschen","Kringesldorf – Uhyst","Taktlücke und mehrere ÖV-Verbindungen"]}'
	);

	$effect(() => {
		const parsed = JSON.parse(jsonIo);
		params = parsed['params'];
		conSets = parsed['conSets'];
		conSetNames = parsed['conSetNames'];
	});

	$effect(() => {
		jsonIo = JSON.stringify({ params, conSets, conSetNames });
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
