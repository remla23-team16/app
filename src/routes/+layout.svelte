<nav>
  <div class="content">
    <h1>Restaurant Review App</h1>
    <a href="/">Home</a>
    <a href="/restaurants">Restaurants</a>
  </div>
</nav>

<slot />

<style>
  nav {
    background-color: #f2f2f2;
    width: 100%;
  }

  .content {
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 2rem 1rem;
    margin: 0 auto;
    margin-bottom: 2rem;
  }

  nav h1 {
    margin: 0;
    margin-right: auto;
  }

  nav a {
    color: black;
    text-decoration: none;
    margin-left: 1rem;
  }

  nav a:hover {
    text-decoration: underline;
  }

  :global(body) {
    margin: 0;
    font-family: sans-serif;
  }
</style>
