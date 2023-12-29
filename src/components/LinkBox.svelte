<!-- LinkBox.svelte -->
<script>
  export let href;
  export let text;
</script>

<div class="link-box-container">
  <a href={href} class="link-box">
    {text}
  </a>
</div>

<style>
  .link-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .link-box {
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 20px 20px;
    margin: 10px;
    text-decoration: none;
    font-size: 18px;
    transition: background-color 0.3s, transform 0.3s;
    cursor: pointer;
    max-width: 200px;
    width: 100%;
  }

  .link-box:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
</style>
