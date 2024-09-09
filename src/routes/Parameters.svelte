<script lang="ts">
export let onChangeConnections;

export let alpha = 2.0;
export let cost_taxi = 2.0;
export let cost_transfer = 10.0;
</script>

<div class="basis-1/8 bg-white shadow-lg rounded-sm border border-slate-200">
    <table class="table-auto w-full">
        <tbody class="text-sm divide-y divide-slate-200">
            <tr>
                <td>alpha</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={alpha} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
            <tr>
                <td>cost taxi</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={cost_taxi} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
            <tr>
                <td>cost transfer</td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={cost_transfer} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
            </tr>
        </tbody>
    </table>
</div>