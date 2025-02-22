<script>
  const { src, width = 50 } = $props();
</script>

<div class="button">
  <img {src} alt="" {width} />
</div>

<style>
  .button {
    border: none;
    transition: transform 0.1s;
  }
</style>
