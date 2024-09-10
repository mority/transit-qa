<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<script lang="ts">
    import Parameters from "./Parameters.svelte";
    import Connections from "./Connections.svelte";
    import {Connection} from "../types/Connection";

    let alpha = 2.0;
    let cost_taxi = 2.0;
    let cost_transfer = 10.0;

    let conns = [
        new Connection(
            "1",
            'walk',
            13,
            '10:34',
            '12:00',
            0,
            'walk',
            7
        ),
        new Connection(
            "2",
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
        let tau_a = a.getTau(cost_taxi, cost_transfer);
        let tau_b = b.getTau(cost_taxi, cost_transfer);
        let alpha_term = alpha * (tau_a / tau_b) * distance(a,b);
        let res = tau_a + alpha_term < tau_b;

        console.log("%s dominates %s? %d + %d < %d => %o", a.name, b.name, tau_a, alpha_term, tau_b, res);

        return res;
    }

    function onChangeConnections() {
        for(let c of conns) {
            c.dominated = false;
        }

        for(let i in conns) {
            for(let j in conns){
                if(i != j && dominates(conns[i],conns[j])) {
                    conns[j].dominated = true;
                }
            }
        }

        conns = conns;
    }

    onChangeConnections();
</script>

<div class="flex justify-center gap-8 py-8 w-full">
    <Parameters onChangeConnections={onChangeConnections} bind:alpha={alpha} bind:cost_taxi={cost_taxi} bind:cost_transfer={cost_transfer} />
    <Connections onChangeConnections={onChangeConnections} bind:connections={conns}/>    
</div>