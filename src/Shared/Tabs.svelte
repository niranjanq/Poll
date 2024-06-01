<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch= createEventDispatcher();

    export let items;
    export let activeItems;

</script>
<div class="Tabs">
    <ul>
        {#each items as items }
        <li on:click={()=> dispatch('tabChange', items)}>
            <div class:active={items===activeItems}>{items}</div>
        </li>
            
        {/each}
    </ul>
</div>
<style>
.Tabs{
    margin-bottom: 40px;
}
ul{
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
}
li{
    margin: 0 16px;
    font-size: 18px;
    color:#555;
    cursor: pointer;
}
.active{
    color:#555;
    border-bottom: 2px solid #d91b42;
    padding-bottom: 8px; 
}
</style>