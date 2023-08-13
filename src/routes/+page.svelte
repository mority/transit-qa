<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<script lang="ts">
    import Connections from "./Connections.svelte";
    import {Connection} from "../types/Connection";

    let conns1 = [
        new Connection(
            '10:30',
            '12:10',
            3
        ),
        new Connection(
            '10:30',
            '12:00',
            4
        )
    ];

    let conns2 = [
        new Connection(
            '10:30',
            '12:10',
            3
        ),
        new Connection(
            '10:30',
            '12:00',
            4
        )
    ];

    function getImprovement(a: number, b: number) {
        return a < b ? b - a : 0;
    }

    function getConnImprovement(a: Connection, b: Connection) {
        
    }

    function getSetImprovement(s1: [Connection], s2: [Connection]) {
        return 0;
    }
</script>

<div class="flex justify-center gap-8 py-8 w-full">
    <Connections connections={conns1}/>
    <Connections connections={conns2}/>
</div>

<div class="text-center">
    Improvement: {getSetImprovement(conns1, conns2)}
</div>