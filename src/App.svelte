<script>
  import { onMount } from 'svelte';
  import { route, navigate } from './router.js';
  import About from './About.svelte';
  import GameMenu from './components/GameMenu.svelte';
  import GameView from './components/GameView.svelte';
  import HomeView from './components/HomeView.svelte';

  let title = '613games';
  let games = [];
  let selectedGame = null;
  let searchTerm = '';
  let isMenuOpen = true;
  let showAbout = false;
  let favorites = [];

  onMount(async () => {
    const response = await fetch('games.json');
    games = await response.json();

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }

    route.subscribe(value => {
      if (value === 'about') {
        showAbout = true;
        selectedGame = null;
      } else if (value) {
        selectedGame = games.find(game => game.id === value);
        showAbout = false;
      } else {
        selectedGame = null;
        showAbout = false;
      }
    });
  });

  function toggleFavorite(gameId) {
    if (favorites.includes(gameId)) {
      favorites = favorites.filter(id => id !== gameId);
    } else {
      favorites = [...favorites, gameId];
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  function goToHome() {
    navigate('');
    selectedGame = null;
    showAbout = false;
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>

<main class="bg-background min-h-screen flex flex-col md:flex-row font-body">
  <div class="absolute top-2 right-2 text-sm font-bold text-primary text-right pr-2">בס"ד</div>
  
  <!-- Hamburger Menu Button (visible when menu is closed) -->
  {#if !isMenuOpen}
    <button
      on:click={() => isMenuOpen = true}
      class="fixed top-4 left-4 z-20 bg-primary text-white p-2 w-10 h-10 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
    >
      <span class="text-xl">&#9776;</span> <!-- Hamburger menu symbol -->
    </button>
  {/if}
  
  <GameMenu {games} {selectedGame} bind:isMenuOpen bind:searchTerm {favorites} {toggleFavorite} />

  <!-- Main Content -->
  <div class="flex-grow p-4 md:p-8 transition-all duration-300 ease-in-out" class:md:ml-64={isMenuOpen}>
    <header class="mb-8 md:mb-12 flex justify-center items-center">
      <button on:click={goToHome} class="focus:outline-none focus:ring-2 focus:ring-primary-light rounded-lg flex items-center">
        <img src="logo.png" alt="613 Games Logo" class="h-20 md:h-24 mr-4">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-primary font-heading hover:text-primary-dark transition-colors duration-200">{title}</h1>
          <h2 class="text-xl md:text-2xl text-secondary font-heading mt-1">Vetted Kosher Games</h2>
        </div>
      </button>
    </header>

    {#if showAbout}
      <About />
    {:else if selectedGame}
      <GameView {selectedGame} />
    {:else}
      <HomeView />
    {/if}
  </div>
</main>
