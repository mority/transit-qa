<script lang="ts">
    import {Connection} from "../types/Connection";

    export let connections;
    export let onChangeConnections;

    let columns = ["Departure", "Arrival", "Transfers"]
    let newCon = [...columns];

    function addCon() {
        if (Connection.formatTime(newCon[0]) === -1) {
            alert("invalid departure time format, required HH:MM");
            return;
        }
        if (Connection.formatTime(newCon[1]) === -1) {
            alert("invalid arrival time format, required HH:MM");
            return;
        }
        if (!/^\d+$/.test(newCon[2])) {
            alert("transfers need to be a number");
            return;
        }
        connections = [...connections, new Connection(newCon[0], newCon[1], newCon[2])];
        onChangeConnections();
    }

    function removeCon(index) {
        console.log('remove', index);
        connections.splice(index, 1);
        connections = connections;
        onChangeConnections();
    }
</script>

<div class="basis-1/8 bg-white shadow-lg rounded-sm border border-slate-200">
    <table class="table-auto w-full">
        <!-- Table header -->
        <thead class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
        <tr>
            {#each columns as col}
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-right">{ col }</div>
                </th>
            {/each}
            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-right"></div>
            </th>
        </tr>
        </thead>

        <tbody class="text-sm divide-y divide-slate-200">
        {#each connections as c, index}
            <tr>
                <td contenteditable="true" bind:innerHTML={c.departure}
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
                    class:underline={ Connection.parseTime(c.departure) === -1 }
                    on:keyup={onChangeConnections}>
                    { c.departure }
                </td>
                <td contenteditable="true" bind:innerHTML={c.arrival}
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
                    class:underline={ Connection.parseTime(c.arrival) === -1 }
                    on:keyup={onChangeConnections}>
                    { c.arrival }
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={c.transfers} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
                <td class="px-5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <button class="btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-rose-500 mx-auto"
                            on:click={() => removeCon(index)}>
                        Remove
                    </button>
                </td>
            </tr>
        {/each}

        <tr class="h-full">
            {#each newCon as column}
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500" contenteditable="true"
                    bind:innerHTML={column}/>
            {/each}
            <td class="px-5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <button class="btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-green-500"
                        on:click={addCon}>
                    Add
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</div>