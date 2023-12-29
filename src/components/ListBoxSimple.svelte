<!-- ListBoxSimple.svelte -->
<script>
  export let note_text;
</script>

<div class="simple-list-box">
  <div class="simple-text-box">{note_text}</div>
</div>

<style>
  .simple-list-box {
      background-color: #fff;
      border-radius: 10px;
      margin: 20px;
      padding: 20px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
      transition: box-shadow 0.3s, transform 0.3s;
      position: relative;
  }

  .simple-list-box:hover {
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
      transform: scale(1.02);
  }

  .simple-text-box {
      margin-top: 20px;
      color: #333;
  }
</style>
