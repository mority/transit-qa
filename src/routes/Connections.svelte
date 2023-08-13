<script lang="ts">
    import {Connection} from "../types/Connection";

    export let connections;

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
        connections = [...connections, new Connection(newCon[0], newCon[1], newCon[2])]
    }

    function removeCon(index) {
        connections.splice(index, 1);
        connections = connections;
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
        {#each connections as c}
            <tr>
                <td contenteditable="true" bind:innerHTML={c.departure}
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
                    class:underline={ Connection.parseTime(c.departure) === -1 }>
                    { c.departure }
                </td>
                <td contenteditable="true" bind:innerHTML={c.arrival}
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
                    class:underline={ Connection.parseTime(c.arrival) === -1 }>
                    { c.arrival }
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={c.transfers} class="border-0 w-16">
                </td>
                <td class="px-5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <button class="btn-sm border-slate-200 hover:border-slate-300 shadow-sm text-rose-500 mx-auto"
                            on:click={removeCon(c)}>
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