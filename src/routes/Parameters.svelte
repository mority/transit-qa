<script lang="ts">
    export let onChangeConnections;
    export let alpha;
    export let base_taxi;
    export let factor_taxi;
    export let factor_transfer;
</script>

<div class="relative basis-1/8 bg-white shadow-lg rounded-sm border border-slate-200">
    <table class="table-auto w-full">
        <tbody class="text-sm divide-y divide-slate-200">
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">Schutzfaktor</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={alpha} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">Basis Taxi</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={base_taxi} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">Faktor Taxi</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={factor_taxi} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">Faktor Umstieg</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={factor_transfer} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
        </tbody>
    </table>
</div>