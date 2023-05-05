<script lang="ts">
  export let title: string | undefined;
  export let description: string | undefined;
</script>

<div class="page">
  <slot name="pre-intro" />

  <div class="intro">
    {#if title}
      <h1>{title}</h1>
    {/if}

    {#if description}
      <p>{description}</p>
    {/if}
  </div>

  <slot />
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
    margin-bottom: 3rem;
  }

  .intro {
    width: 70%;
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
