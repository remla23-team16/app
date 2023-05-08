<script lang="ts">
  import { restaurants } from '../../../data/restaurants';
  import type { Restaurant } from '../../../data/restaurants';
  import { page } from '$app/stores';
  import Page from '../../../lib/structure/Page.svelte';
  import StarRangeInput from '../../../lib/StarRangeInput.svelte';
  import { PUBLIC_BACKEND_URL } from '$env/static/public';

  let restaurant: Restaurant;
  $: {
    const id = Number($page.params.id);
    if (!Number.isNaN(id)) {
      restaurant = restaurants[id];
    }
  }

  let restaurantRating = 4;
  let name = '';
  let review = '';
  let starRating = 4;

  let sentiment: 'positive' | 'negative' | undefined = undefined;
  let sentimentImg = '';

  $: {
    console.log('updating code with sentiment', sentiment);
    if (restaurant) {
      restaurantRating =
        restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) /
        restaurant.reviews.length;
      sentimentImg =
        sentiment === 'positive'
          ? restaurant.positiveSentimentImage
          : restaurant.negativeSentimentImage;
    }
  }

  async function updateSentiment() {
    try {
      sentiment = await getSentiment(review);
    } catch (err) {
      console.error('Error getting sentiment', err);
      sentiment = undefined;
    }
  }

  async function getSentiment(text: string): Promise<'positive' | 'negative'> {
    const endpointUrl = new URL(`/${decodeURIComponent(text)}`, PUBLIC_BACKEND_URL);
    const response = await fetch(endpointUrl.toString(), { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Error getting sentiment: ${response.statusText}`);
    }
    const json = await response.json();

    if (!Array.isArray(json) || json.length !== 1 || typeof json[0] !== 'number') {
      throw new Error(
        'Invalid response from sentiment endpoint. Expected array of length 1, containing a number'
      );
    }

    const [sentiment] = json;

    if (sentiment === 0) {
      return 'negative';
    } else if (sentiment === 1) {
      return 'positive';
    } else {
      throw new Error(`Invalid sentiment value: ${sentiment}`);
    }
  }

  // https://thefrontendteam.com/pills/svelte-input-keyup-stop-writing-custom-event/
  function debounce<A extends unknown[]>(
    inputFunction: (...args: A) => unknown,
    timeToWaitBeforeFiringInMs = 500
  ) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: A) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        inputFunction(...args);
      }, timeToWaitBeforeFiringInMs);
    };
  }

  function updateReviewSentiment(node: HTMLTextAreaElement) {
    const handleKeyup = debounce((event: KeyboardEvent) => {
      // (1) the debounce logic
      if (node.contains(event.target as Node)) {
        // (2) restrict the event to the only referring node
        updateSentiment();
      }
    }, 500);

    // (4) add a generic keyup event
    document.addEventListener('keyup', handleKeyup, true);

    return {
      destroy() {
        // (5) cleanup on destroy
        document.removeEventListener('keyup', handleKeyup, true);
      }
    };
  }

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

{#if restaurant}
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
      <textarea id="review" name="review" bind:value={review} use:updateReviewSentiment />
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
{:else}
  <Page title="Restaurant not found" description="Try another one" />
{/if}

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
