<script lang="ts">
  import { restaurants } from '../../data/restaurants';
  import Page from '../../lib/structure/Page.svelte';
  console.log(restaurants);
</script>

<Page title="Restaurants" description="Browse our curated list of restaurants in the area">
  {#each restaurants as restaurant, i}
    <a class="restaurant" href="/restaurants/{i}">
      <div class="image">
        <img src={restaurant.image} alt="{restaurant.name} image" />
      </div>
      <div class="info">
        <h2>{restaurant.name}</h2>
        <p>{restaurant.description}</p>
      </div>
    </a>
  {/each}
</Page>

<style>
  .restaurant {
    margin-bottom: 2rem;
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    color: inherit;
  }

  .restaurant:nth-child(even) {
    background-color: #f5f5f5;
  }

  .restaurant:hover {
    background-color: #e5e5e5;
    transform: scale(1.01);
  }

  .restaurant .image {
    width: 120px;
    height: 120px;
    margin-right: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .restaurant .image img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
