<!-- Header.svelte -->
<script>
  export let title = 'NotesApp';
</script>

<header>
  <a href="/"><h1>{title}</h1></a>
</header>

<style>
  header {
    background-color: #2ecc71;
    padding: 20px 40px; 
    text-align: center;
    position: fixed; 
    width: 100%; 
    top: 0; 
    z-index: 1000; 
  }

  h1 {
    margin: 0; 
    font-size: 36px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s;
  }

  h1:hover {
    color: #ecf0f1;
  }
</style>
