<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<script lang="ts">
    import Connections from "./Connections.svelte";
    import {Connection} from "../types/Connection";

    $: conns1 = [
        new Connection(
            '10:00',
            '12:00',
            3
        ),
        new Connection(
            '11:00',
            '13:00',
            3
        )
    ];

    $: conns2 = [
        new Connection(
            '10:00',
            '12:00',
            3
        ),
        new Connection(
            '11:00',
            '13:00',
            3
        ),
        new Connection(
            '12:00',
            '14:00',
            3
        )
    ];

    // Preference vectors:
    // [travel time weight, transfer weight]
    const C = [
        [1.0, 30.0],
        [1.0, 1.0],
        [0.0, 1.0]
    ];

    function f2(c: number[], x: number[]) {
        return x[0] * c[0] + x[1] * c[1];
    }

    function best(c: number[], conns: Connection[]): Connection {
        let best = null;
        let bestVal = Number.MAX_VALUE;
        conns.forEach(conn => {
            const val = f2(c, conn.getCriteria2());
            if (val < bestVal) {
                bestVal = val;
                best = conn;
            }
        });
        return best;
    }

    function rate(conns: Connection[]) {
        let sum = 0.0;
        for (let c in C) {
            const b = best(C[c], conns);
            sum += f2(C[c], b.getCriteria2());
        }
        return sum;
    }

    function getRelTimeCorrection(a: Connection, b: Connection, ca: number, cb: number) {
        const alpha = 0.5;

        const depA = a.getDeparture();
        const depB = b.getDeparture();
        const arrA = a.getArrival();
        const arrB = b.getArrival();
        console.log("param: ", {ca}, {cb}, {depA}, {depB}, {arrA}, {arrB});

        const omega = a.overtakes(b) ? 0 : Number.MAX_VALUE;
        const distance = Math.min(Math.abs(depA - depB), Math.abs(arrA - arrB), omega);
        console.log({omega}, {distance});

        return alpha * (ca / cb) * distance;
    }

    function getMaxImprovment(A: Connection[], B: Connection[], weights: number[]) {
        let maxImprovement = -1;
        let maxA = null, maxB = null;

        A.forEach(cA => {
            B.forEach(cB => {
                const criteriaA = cA.getCriteria2();
                const criteriaB = cB.getCriteria2();

                let dist = 0.0;
                let improvement = 0.0;

                for (let i = 0; i != weights.length; ++i) {
                    const weightedA = criteriaA[i] * weights[i];
                    const weightedB = criteriaB[i] * weights[i];
                    const correction = getRelTimeCorrection(cA, cB, weightedA, weightedB);
                    const criterionDist = weightedA + correction - weightedB;

                    dist += Math.pow(criterionDist, 2);
                    if (criterionDist < 0) {
                        improvement += Math.pow(criterionDist, 2);
                    }

                    console.log({i}, {weightedA}, {weightedB}, {correction}, {criterionDist});
                }

                dist = Math.sqrt(dist);
                improvement = Math.sqrt(improvement);

                if (improvement >= maxImprovement) {
                    maxImprovement = improvement;
                    maxA = cA;
                    maxB = cB;
                }

                // console.log({cA}, '\n', {cB}, '\n\t', {dist}, {improvement}, '\n\n\n');
            });
        });

        console.assert(maxA != null, "maxA == null");
        console.assert(maxB != null, "maxA == null");

        return {maxImprovement, maxA, maxB};
    }

    function getSetImprovement(A: Connection[], B: Connection[], weights: number[]) {
        if (A.length == 0 && B.length == 0) {
            return 0;
        } else if (A.length == 0) {
            return Number.MIN_VALUE;
        } else if (B.length == 0) {
            return Number.MAX_VALUE;
        }

        let improvement = 0;

        let aCopy = [... A];
        let bCopy = [... B];

        console.log({aCopy, bCopy});

        let i = 0;
        while (aCopy.length !== 0) {
            let {maxImprovement, maxA, maxB} = getMaxImprovment(aCopy, bCopy, weights);
            console.log({maxImprovement, maxA, maxB})
            bCopy.push(maxA);
            aCopy.splice(aCopy.indexOf(maxA), 1);
            console.log({aCopy, bCopy});
            improvement += maxImprovement;
            if (maxImprovement <= 0.1 || ++i > 10) {
                break;
            }
        }

        return improvement;
    }

    function onChangeConnections() {
        conns1 = conns1;
        conns2 = conns2;
    }
</script>

<div class="flex justify-center gap-8 py-8 w-full">
    <Connections onChangeConnections={onChangeConnections} connections={conns1}/>
    <Connections onChangeConnections={onChangeConnections} connections={conns2}/>
</div>

<div class="text-center" style="font-family: monospace;">
    sum1: {rate(conns1)}<br>
    sum2: {rate(conns2)}<br>
    max improvement: {getMaxImprovment(conns1, conns2, [1, 30]).maxImprovement}<br>
    set improvement LR: {getSetImprovement(conns1, conns2, [1, 30])}<br>
    set improvement RL: {getSetImprovement(conns2, conns1, [1, 30])}
</div>