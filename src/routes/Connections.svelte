<script lang="ts">
    import {Connection} from "../types/Connection";

    export let connections;
    export let onChangeConnections;

    let columns = ["Name","Type","Length","Departure", "Arrival", "Transfers", "Type","Length"]
    let newCon = [...columns];

    function addCon() {
        for(let field of newCon) {
            field = field.trim();
        }

        if (!Connection.isValidModeStr(newCon[1])) {
            alert("invalid start mode, use: walk | taxi");
            return;
        }
        if (!/^\d+$/.test(newCon[2])) {
            console.log("start length needs to be a number, provided: ", newCon[2]);
            alert("start length needs to be a number");
            return;
        }
        if (Connection.parseTime(newCon[3]) === -1) {
            console.log("departure: invalid time format, required HH:MM, provided: ", newCon[3]);
            alert("departure: invalid time format, required HH:MM");
            return;
        }
        if (Connection.parseTime(newCon[4]) === -1) {
            console.log("arrival: invalid time format, required HH:MM, provided: ", newCon[4]);
            alert("arrival: invalid time format, required HH:MM");
            return;
        }
        if (!/^\d+$/.test(newCon[5])) {
            alert("transfers needs to be a number");
            return;
        }
        if (!Connection.isValidModeStr(newCon[6])) {
            alert("invalid end mode, use: walk | taxi");
            return;
        }
        if (!/^\d+$/.test(newCon[7])) {
            alert("end length needs to be a number");
            return;
        }
        connections.push(new Connection(newCon[0], newCon[1].trim().toLocaleLowerCase(), parseInt(newCon[2]), newCon[3], newCon[4], parseInt(newCon[5]), newCon[6].trim().toLocaleLowerCase(), parseInt(newCon[7])));
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
            <th></th>
            <th colspan="2">
                <div class="font-semibold text-center">Start Leg</div>
            </th>
            <th colspan="3">
                <div class="font-semibold text-center">Public Transit</div>
            </th>
            <th colspan="2">
                <div class="font-semibold text-center">End Leg</div>
            </th>
            <th></th>
            <th></th>
        </tr>
        <tr>
            {#each columns as col}
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-center">{ col }</div>
                </th>
            {/each}
            <th class="font-semibold text-center">Dominated</th>
            <th></th>
        </tr>
        </thead>

        <tbody class="text-sm divide-y divide-slate-200">
        {#each connections as c, index}
            <tr>
                <td contenteditable="true" bind:innerHTML={c.name}
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
                    on:keyup={onChangeConnections}>
                    { c.name }
                </td>
                <td contenteditable="true" bind:innerHTML={c.start_mode}
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
                    on:keyup={onChangeConnections}>
                    { c.start_mode }
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={c.start_length} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
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
                <td contenteditable="true" bind:innerHTML={c.end_mode}
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap decoration-pink-500"
                    on:keyup={onChangeConnections}>
                    { c.end_mode }
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <input type="number" bind:value={c.end_length} class="border-0 w-16"
                           on:change={onChangeConnections}>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    {c.dominated}
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
            <td></td>
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