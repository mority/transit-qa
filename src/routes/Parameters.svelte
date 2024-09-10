<script lang="ts">
    export let onChangeConnections;
    export let alpha;
    export let cost_taxi;
    export let cost_transfer;
</script>

<div class="basis-1/8 bg-white shadow-lg rounded-sm border border-slate-200">
    <table class=" w-full">
        <tbody class="text-sm divide-y divide-slate-200">
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">alpha</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={alpha} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">cost_taxi</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={cost_taxi} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
            <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500">cost_transfer</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={cost_transfer} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
        </tbody>
    </table>
</div>