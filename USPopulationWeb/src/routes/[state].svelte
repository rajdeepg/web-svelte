<script context="module">
  import stateNames from "../data/stateNames.js";
  import requests from "../data/requests.js";

  export async function preload(page) {
    const state = page.params["state"];
    if (stateNames.find(s => s.name === state) === undefined) {
      this.error(404, "State Not Found");
      return;
    }

    try {
      const stats = await requests.stateStats(state);
      return { state, stats };
    } catch (e) {
      console.log(e);
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

  export let state;
  export let stats;
</script>

<svelte:head>
  <title>Population - {state}</title>
</svelte:head>

<div class="section header">
  <div class="container">
    <h1>Population - {state}</h1>
  </div>
</div>

<PopulationStat {...stats} />

