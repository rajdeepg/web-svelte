<script>
  export let idNation;
  export let nation;
  export let idYear;
  export let year;
  export let population;
  export let slugNation;
</script>

<style>
  .columns {
    border: solid 1px black;
  }
</style>

<div class="section">
  <div class="container">
    <div class="columns">
      <h2 class="is-2 column"><b>ID Nation:</b> {idNation}</h2>
      <h2 class="is-2 column"><b>Nation:</b> {nation}</h2>
      <h2 class="is-2 column"><b>ID Year:</b> {idYear}</h2>
      <h2 class="is-2 column"><b>Year:</b> {year}</h2>
      <h2 class="is-2 column"><b>Population:</b> {population}</h2>
      <h2 class="is-2 column"><b>Slug Nation:</b> {slugNation}</h2>
    </div>
  </div>
</div>
