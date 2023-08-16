<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<script lang="ts">
    import Connections from "./Connections.svelte";
    import {Connection} from "../types/Connection";


    $: conns1 = [
        new Connection(
            '09:33',
            '11:34',
            0
        )
    ];

    $: conns2 = [
        new Connection(
            '09:33',
            '11:34',
            0
        ),
        new Connection(
            '09:45',
            '12:16',
            2
        )
    ];

    function getImprovement(a: Connection, b: Connection, weights: number[]) {
        const criteriaA = a.getCriteria3();
        const criteriaB = b.getCriteria3();

        let dist = 0.0;
        let improvement = 0.0;

        for (let i = 0; i != weights.length; ++i) {
            const weightedA = criteriaA[i] * weights[i];
            const weightedB = criteriaB[i] * weights[i];
            const criterionDist = weightedA - weightedB;

            dist += Math.pow(criterionDist, 2);
            if (criterionDist < 0) {
                improvement += Math.pow(criterionDist, 2);
            }
        }

        dist = Math.sqrt(dist);
        improvement = Math.sqrt(improvement);

        return {dist, improvement};
    }

    function getMinImprovement(conn: Connection, X: Connection[], weights: number[]) {
        let minImprovement = Number.MAX_VALUE;
        let min = null;

        X.forEach(x => {
            let {dist, improvement} = getImprovement(conn, x, weights);
            if (improvement < minImprovement) {
                minImprovement = improvement;
                min = x;
            }
        });

        return {minImprovement, min};
    }

    function getSetImprovement(A: Connection[], B: Connection[], weights: number[]) {
        if (A.length == 0 && B.length == 0) {
            return 0;
        } else if (A.length == 0) {
            return Number.MIN_VALUE;
        } else if (B.length == 0) {
            return Number.MAX_VALUE;
        }

        let aCopy = [...A];
        let bCopy = [...B];
        let improvement = 0.0;

        while (aCopy.length !== 0) {
            let minImprovementA = Number.MAX_VALUE;
            let minA = null, minB = null;

            aCopy.forEach(a => {
                let {minImprovement, min} = getMinImprovement(a, bCopy, weights);
                if (minImprovement < minImprovementA) {
                    minImprovementA = minImprovement;
                    minA = a;
                    minB = min;
                }
            });

            console.log({aCopy, bCopy, minA, minB, minImprovementA})

            improvement += minImprovementA;
            aCopy.splice(aCopy.indexOf(minA), 1);
            bCopy.push(minA);
        }

        console.log("\n\n\n")

        return improvement;
    }

    function getRating() {
        const LR = getSetImprovement(conns1, conns2, [1, 1, 30]);
        const RL = getSetImprovement(conns2, conns1, [1, 1, 30]);
        return LR - RL;
    }

    function onChangeConnections() {
        conns1 = conns1;
        conns2 = conns2;
        rating = getRating();
    }

    $: rating = getRating();
</script>

<div class="flex justify-center gap-8 py-8 w-full">
    <Connections onChangeConnections={onChangeConnections} connections={conns1} rating={rating}/>
    <Connections onChangeConnections={onChangeConnections} connections={conns2} rating={-rating}/>
</div>