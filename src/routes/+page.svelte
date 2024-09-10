<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<script lang="ts">
    import Parameters from "./Parameters.svelte";
    import Connections from "./Connections.svelte";
    import {Connection} from "../types/Connection";

    let alpha = 3.0;
    let factor_taxi = 10.0;
    let base_taxi = 35.0;
    let factor_transfer = 5.0;

    let conns = [
        new Connection(
            "ÖV Takt 1",
            '10:34',
            '12:00',
            2,
            'walk',
            13,
            'walk',
            0
        ),
        new Connection(
            "Takt Taxi",
            '11:00',
            '11:40',
            1,
            'taxi',
            3,
            'walk',
            0
        ),
        new Connection(
            "Weit zu Fuß",
            '11:34',
            '12:14',
            1,
            'walk',
            70,
            'walk',
            0
        ),
        new Connection(
            "Taxi Kurz",
            '11:34',
            '12:14',
            1,
            'taxi',
            3,
            'walk',
            0
        ),
        new Connection(
            "Ersatz für Takt",
            '12:34',
            '13:10',
            1,
            'taxi',
            15,
            'walk',
            0
        ),
        new Connection(
            "ÖV Takt 2",
            '14:34',
            '16:00',
            2,
            'walk',
            13,
            'walk',
            0
        ),
        new Connection(
            "ÖV Takt 3",
            '16:34',
            '18:00',
            2,
            'walk',
            13,
            'walk',
            0
        ),
        new Connection(
            "Spät Schnell",
            '17:40',
            '18:05',
            1,
            'walk',
            5,
            'walk',
            5
        )
    ];

    function distance(a: Connection, b: Connection) {
        if(a.overtakes(b) || b.overtakes(a)) {
            return 0;
        }
        return Math.min(Math.abs(a.getDeparture() - b.getDeparture()),Math.abs(a.getArrival() - b.getArrival()));
    }
    
    function dominates(a: Connection, b: Connection) {
        let tau_a = a.getTau(factor_taxi, factor_transfer);
        let tau_b = b.getTau(factor_taxi, factor_transfer);
        let alpha_term = alpha * (a.getTravelTime() / b.getTravelTime()) * distance(a,b);
        let sum = tau_a + alpha_term
        let res = sum < tau_b;

        console.log("%s dominates %s? distance: %d, %d + %d = %d < %d => %o", a.name, b.name, distance(a,b),tau_a, alpha_term,sum, tau_b, res);

        return tau_b - sum;
    }

    function onChangeConnections() {
        for(let c of conns) {
            c.dominated = [];
        }

        for(let i = 0; i < conns.length; ++i) {
            for(let j = 0; j < conns.length; ++j){
                let res = dominates(conns[i],conns[j]);
                if(i != j) {
                    if(0 < res) {
                    conns[j].dominated.push([conns[i].name,res]);
                    }
                    if(conns[j].closest_to_dominate_res < res) {
                        conns[j].closest_to_dominate_index = i;
                        conns[j].closest_to_dominate_res = res;
                    }
                }
            }
        }

        conns = conns;
    }

    onChangeConnections();
</script>

<div class="flex justify-center gap-8 py-8 w-full">
    <Parameters onChangeConnections={onChangeConnections} bind:alpha={alpha} bind:base_taxi={base_taxi} bind:factor_taxi={factor_taxi} bind:factor_transfer={factor_transfer} />
    <Connections onChangeConnections={onChangeConnections} bind:connections={conns}/>    
</div>