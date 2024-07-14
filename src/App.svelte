<script>
  import { onMount } from 'svelte';
  import { route, navigate } from './router.js';
  import About from './About.svelte';

  let title = '613games';
  let games = [];
  let selectedGame = null;
  let searchTerm = '';
  let iframeElement;
  let isMenuOpen = true;
  let touchStartX = 0;
  let touchEndX = 0;
  let showAbout = false;

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeThreshold = 100; // minimum distance for a swipe
    if (touchStartX - touchEndX > swipeThreshold) {
      isMenuOpen = false;
    }
  }

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

  function selectGame(game) {
    navigate(game.id);
    if (window.innerWidth < 768) {  // 768px is the 'md' breakpoint in Tailwind
      isMenuOpen = false;
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      iframeElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  function goToHome() {
    navigate('');
    selectedGame = null;
    showAbout = false;
  }

  function goToAbout() {
    navigate('about');
  }

  $: filteredGames = games
    .filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));
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
  
  <!-- Game Menu -->
  <div class="w-full md:w-64 bg-white shadow-lg p-4 flex flex-col h-screen fixed left-0 top-0 z-10 menu-slide"
       class:menu-open={isMenuOpen}
       class:md:menu-open={true}
       on:touchstart={handleTouchStart}
       on:touchend={handleTouchEnd}>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-primary">Games</h2>
      {#if isMenuOpen}
        <button
          on:click={() => isMenuOpen = false}
          class="text-primary hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light rounded-full p-1"
        >
          <span class="text-lg">&#x2715;</span> <!-- X symbol -->
        </button>
      {/if}
    </div>
    <input
      type="text"
      placeholder="Search games..."
      bind:value={searchTerm}
      class="w-full p-2 mb-4 border border-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
    />
    <ul class="space-y-2 flex-grow overflow-y-auto">
      {#each filteredGames as game}
        <li>
          <button
            class="w-full text-left p-3 rounded-lg transition-colors duration-200 ease-in-out
                   {selectedGame === game ? 'bg-primary text-white' : 'hover:bg-background-light'}
                   focus:outline-none focus:ring-2 focus:ring-primary-light"
            on:click={() => selectGame(game)}
          >
            <span class="mr-3 text-xl">{game.icon}</span>
            <span class="font-medium">{game.name}</span>
          </button>
        </li>
      {/each}
    </ul>
    <div class="mt-auto pt-4 border-t border-background">
      <button
        on:click={goToAbout}
        class="w-full text-left p-3 rounded-lg transition-colors duration-200 ease-in-out hover:bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light"
      >
        <span class="mr-3 text-xl">ℹ️</span>
        <span class="font-medium">About</span>
      </button>
      <p class="text-sm text-text-light mt-4">&copy; {new Date().getFullYear()} 613games</p>
    </div>
  </div>

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
      <div class="bg-white shadow-lg rounded-lg p-4 md:p-8 mb-8">
        <h3 class="text-xl md:text-2xl font-semibold text-primary mb-4 font-heading">{selectedGame.name}</h3>
        <p class="text-text mb-4">{selectedGame.description}</p>
        <div class="relative">
          <iframe
            bind:this={iframeElement}
            title={selectedGame.name}
            src={selectedGame.embedUrl}
            class="w-full h-[300px] md:h-[600px] border-none"
            frameborder="0"
            allow="gamepad *;"
            allowfullscreen
          ></iframe>
          <button
            on:click={toggleFullscreen}
            class="absolute top-2 right-2 bg-accent text-white px-2 py-1 md:px-3 md:py-1 text-sm md:text-base rounded-lg shadow hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light transition-colors duration-200"
          >
            Fullscreen
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-white shadow-lg rounded-lg p-8 mb-8">
        <p class="text-lg text-text mb-4">Welcome to 613games, your source for safe and appropriate gaming content.</p>
        
        <section class="mb-8">
          <h3 class="text-2xl font-semibold text-primary mb-4 font-heading">About Us</h3>
          <p class="text-text">We provide a curated selection of pre-approved games that are embedded within our application. Our goal is to offer a safe and appropriate gaming environment for our community.</p>
        </section>

        <section>
          <h3 class="text-2xl font-semibold text-primary mb-4 font-heading">Our Features</h3>
          <ul class="list-disc list-inside text-text">
            <li>Carefully selected and vetted games</li>
            <li>Safe and appropriate content</li>
            <li>Easy-to-use interface</li>
            <li>Embedded game experience</li>
          </ul>
        </section>
      </div>
    {/if}

  </div>
</main>
