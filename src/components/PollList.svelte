<script>
    import PollStore from "../Stores/PollStore.js";
    import PollDetails from "./PollDetails.svelte";
    import {fade, slide, scale} from 'svelte/transition';
    import{flip} from 'svelte/animate';
    export let polls=[];

    PollStore.subscribe(data=>{
        polls=data;
    });
</script>
<div class="poll-list" transition:scale >
    {#each $PollStore as poll (poll.id)}
    <div out:scale animate:flip={{duration:400}}>
        <PollDetails {poll}/>
    </div>
    {/each}
</div>
<style>
    .poll-list{
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         font-size: 20px;
         font-weight: bold;
         text-align: center;
         display: grid;
         grid-template-columns: 1fr 1fr ;
         grid-gap:20px;
    }
</style>