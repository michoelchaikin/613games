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

  onMount(async () => {
    const response = await fetch('games.json');
    games = await response.json();

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

  function goToHome() {
    navigate('');
    selectedGame = null;
    showAbout = false;
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
</svelte:head>

<main class="bg-background min-h-screen flex flex-col md:flex-row font-sans">
  <div class="absolute top-2 right-2 text-sm font-bold text-primary text-right pr-2">בס"ד</div>
  
  <!-- Hamburger Menu Button (visible when menu is closed on mobile) -->
  {#if !isMenuOpen}
    <button
      on:click={() => isMenuOpen = true}
      class="fixed top-4 left-4 z-20 bg-primary text-white p-2 w-10 h-10 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light flex items-center justify-center hover:bg-primary-dark transition-colors duration-200 md:hidden"
    >
      <span class="text-xl">&#9776;</span> <!-- Hamburger menu symbol -->
    </button>
  {/if}
  
  <GameMenu {games} {selectedGame} bind:isMenuOpen bind:searchTerm />

  <!-- Main Content -->
  <div class="flex-grow p-4 md:p-8 transition-all duration-300 ease-in-out md:ml-64">
    <header class="text-center mb-8 md:mb-12">
      <button on:click={goToHome} class="focus:outline-none focus:ring-2 focus:ring-primary-light rounded-lg">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-2 font-heading hover:text-primary-dark transition-colors duration-200">{title}</h1>
      </button>
      <h2 class="text-xl md:text-2xl text-secondary font-heading">Vetted Kosher Games</h2>
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
