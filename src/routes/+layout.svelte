<!-- layout.svelte -->

<script>
  import Header from '../components/Header.svelte';
  import "@fontsource/roboto";
</script>

<style>
  :global(body) {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    padding: 0;
  }

  main {
    max-width: 900px;
    width: 90vw;
    flex-grow: 1;
    overflow-y: auto;
    margin: 90px 0;
    padding: 20px;
  }

  @media screen and (max-width: 600px) {
    :global(body) {
      margin: 60px 0;
    }
  }

  @media screen and (max-width: 400px) {
    :global(body) {
      margin: 30px 0;
    }
  }
</style>

<Header />

<main>
  <slot />
</main>
