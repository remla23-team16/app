<script lang="ts">
  import { restaurants } from '../../../data/restaurants';
  import type { Restaurant } from '../../../data/restaurants';
  import { page } from '$app/stores';
  import Page from '../../../lib/structure/Page.svelte';
  import StarRangeInput from '../../../lib/StarRangeInput.svelte';

  let restaurant: Restaurant;
  $: restaurant = restaurants[$page.params.id];

  let restaurantRating: number = 4;
  $: restaurantRating =
    restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.reviews.length;

  let name = '';
  let review = '';
  let starRating = 4;

  let sentiment: 'positive' | 'negative' = 'positive';

  $: sentiment = starRating >= 4 ? 'positive' : 'negative';

  $: sentimentImg =
    sentiment === 'positive'
      ? restaurant.positiveSentimentImage
      : restaurant.negativeSentimentImage;

  function handleSubmit() {
    restaurant.reviews = [
      ...restaurant.reviews,
      {
        name,
        rating: starRating,
        comment: review
      }
    ];
  }
</script>

<Page title={restaurant.name} description={restaurant.description}>
  <img src={restaurant.image} alt="{restaurant.name} image" slot="pre-intro" />
  <div class="rating">
    <StarRangeInput disabled id="rating" min={1} max={5} step={1} value={restaurantRating} />
    <span>{restaurantRating.toFixed(1)} / 5.0</span>
  </div>

  <h2>Reviews</h2>
  <div class="reviews">
    {#each restaurant.reviews as review}
      <div class="review">
        <div class="info">
          <h3>{review.name}</h3>
          <p>{review.comment}</p>
        </div>
        <StarRangeInput disabled id="rating" min={1} max={5} step={1} value={review.rating} />
      </div>
    {/each}
  </div>
  <h2>Write a review</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" bind:value={name} />
    <label for="rating">Stars</label>
    <StarRangeInput id="rating" min={1} max={5} step={1} bind:value={starRating} />
    <label for="review">Review</label>
    <textarea id="review" name="review" bind:value={review} />
    <p class="sentiment">Sentiment</p>
    <span>
      {#if sentiment}
        <img class="sentimentImg" src={sentimentImg} alt="{sentiment} sentiment" />
      {:else}
        unknown
      {/if}
    </span>
    <button type="submit">Submit</button>
  </form>
</Page>

<style>
  img {
    height: 200px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
  }

  label,
  .sentiment {
    font-weight: bold;
  }

  input,
  textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  input[type='range'] {
    border: 0;
  }

  button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #eee;
    cursor: pointer;
  }

  button:hover {
    background-color: #ddd;
  }

  button:active {
    background-color: #ccc;
  }

  .reviews {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 70%;
  }

  .review {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .review .info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .review .info h3 {
    margin-bottom: 0;
  }

  .review:nth-child(even) {
    background-color: #f5f5f5;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .rating span {
    font-weight: bold;
    font-size: 1.5rem;
  }
</style>
