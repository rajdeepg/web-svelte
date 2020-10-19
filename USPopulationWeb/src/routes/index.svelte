<script context="module">
  import requests from "../data/requests.js";

  export async function preload() {
    try {
      const usStats = await requests.usStats();
      return { usStats };
    } catch (e) {
      this.error(
        500,
        "There was an error in calling the api, please try again in 5 minutes."
      );
      return;
    }
  }
</script>

<script>
  import PopulationStat from "../components/PopulationStat.svelte";

  import TableContainer from "../components/TableContainer.svelte";

  export let usStats;
</script>

<svelte:head>
  <title>Population - US</title>
</svelte:head>

<div class="section header">
  <div class="container">
    <h1>Population - US</h1>
  </div>
</div>

<PopulationStat {...usStats} />

<TableContainer />
