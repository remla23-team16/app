<script lang="ts">
  export let value = 0;
  export let min = 0;
  export let max = 5;
  export let step = 1;
  export let id = '';
  export let disabled = false;

  let input: HTMLInputElement;

  // TODO: fix moving thing caused by this
  $: input?.style?.setProperty('--value', String(value));
</script>

<input
  {id}
  {disabled}
  class="rating"
  type="range"
  bind:this={input}
  bind:value
  {max}
  {min}
  {step}
/>

<style>
  /* from https://dev.to/madsstoumann/star-rating-using-a-single-input-i0l */
  .rating {
    background: 0;
    --dir: right;
    --fill: rgb(255, 215, 0, 1);
    --fillbg: rgba(100, 100, 100, 0.15);
    --heart: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.328l-1.453-1.313q-2.484-2.25-3.609-3.328t-2.508-2.672-1.898-2.883-0.516-2.648q0-2.297 1.57-3.891t3.914-1.594q2.719 0 4.5 2.109 1.781-2.109 4.5-2.109 2.344 0 3.914 1.594t1.57 3.891q0 1.828-1.219 3.797t-2.648 3.422-4.664 4.359z"/></svg>');
    --star: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.25l-6.188 3.75 1.641-7.031-5.438-4.734 7.172-0.609 2.813-6.609 2.813 6.609 7.172 0.609-5.438 4.734 1.641 7.031z"/></svg>');
    --stars: 5;
    --starsize: 3rem;
    --symbol: var(--star);
    --value: 0;
    --w: calc(var(--stars) * var(--starsize));
    --x: calc(100% * (var(--value) / var(--stars)));
    block-size: var(--starsize);
    inline-size: var(--w);
    position: relative;
    touch-action: manipulation;
    appearance: none;
  }
  /*[dir='rtl'] .rating {*/
  /*  --dir: left;*/
  /*}*/
  .rating::-moz-range-track {
    background: linear-gradient(to var(--dir), var(--fill) 0 var(--x), var(--fillbg) 0 var(--x));
    block-size: 100%;
    mask: repeat left center/var(--starsize) var(--symbol);
  }
  .rating::-webkit-slider-runnable-track {
    background: linear-gradient(to var(--dir), var(--fill) 0 var(--x), var(--fillbg) 0 var(--x));
    block-size: 100%;
    mask: repeat left center/var(--starsize) var(--symbol);
    -webkit-mask: repeat left center/var(--starsize) var(--symbol);
  }
  .rating::-moz-range-thumb {
    height: var(--starsize);
    opacity: 0;
    width: var(--starsize);
  }
  .rating::-webkit-slider-thumb {
    height: var(--starsize);
    opacity: 0;
    width: var(--starsize);
    appearance: none;
  }

  .rating:enabled:hover {
    cursor: pointer;
  }
</style>
