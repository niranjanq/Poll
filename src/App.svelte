<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import PollList from "./components/PollList.svelte";
  import Tabs from "./Shared/Tabs.svelte";
  import PollForm from "./components/PollForm.svelte";

  // Tabs
  let items = ["current polls", "Add new poll"];
  let activeItems = "current polls";
  const tabChange = (e) => {
    activeItems = e.detail;
  };

  const handleAdd = (e) => {
    activeItems = "current polls";
  };
  // const handleVote=(e)=>{

  // }
</script>

<Header />
<main>
  <Tabs {activeItems} {items} on:tabChange={tabChange} />
  {#if activeItems === "current polls"}
    <PollList />
  {:else if activeItems === "Add new poll"}
    <PollForm on:add={handleAdd} />
  {/if}
</main>
<Footer />

<style>
</style>
