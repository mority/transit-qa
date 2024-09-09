<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<script lang="ts">
    import Connections from "./Connections.svelte";
    import {Connection, Mode} from "../types/Connection";
	import Parameters from "./Parameters.svelte";

    let alpha = 2.0;
    let cost_taxi = 2.0;
    let cost_transfer = 10.0;

    let conns = [
        new Connection(
            'walk',
            13,
            '10:34',
            '12:00',
            0,
            'walk',
            7
        ),
        new Connection(
            'taxi',
            3,
            '10:34',
            '12:00',
            0,
            'walk',
            7
        )
    ];

    function distance(a: Connection, b: Connection) {
        if(a.overtakes(b) || b.overtakes(a)) {
            return 0;
        }
        return Math.min(Math.abs(a.getDeparture() - b.getDeparture()),Math.abs(a.getArrival() - b.getArrival()));
    }
    
    function dominates(a: Connection, b: Connection) {
        var tau_a = a.getTau(cost_taxi, cost_transfer);
        var tau_b = b.getTau(cost_taxi, cost_transfer);

        return tau_a + alpha * (tau_a / tau_b) * distance(a,b) < tau_b;
    }

    function onChangeConnections() {
        for(let c of conns) {
            c.setDominated(false);
        }

        for(let i in conns) {
            for(let j in conns){
                if(i != j && !conns[i].isDominated() && dominates(conns[i],conns[j])) {
                 conns[j].setDominated(true);  
                }
            }
        }

        alpha = alpha;
        cost_taxi = cost_taxi;
        cost_transfer = cost_transfer;
        conns = conns;
    }
</script>

<div class="flex justify-center gap-8 py-8 w-full">
    <Parameters onChangeConnections={onChangeConnections} alpha={alpha} cost_taxi={cost_taxi} cost_transfer={cost_transfer}/>
    <Connections onChangeConnections={onChangeConnections} connections={conns}/>
</div>