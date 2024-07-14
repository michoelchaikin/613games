<script>
  import { onMount } from 'svelte';
  let title = '613games';
  let games = [];
  let selectedGame = null;

  onMount(async () => {
    const response = await fetch('games.json');
    games = await response.json();
  });

  function selectGame(game) {
    selectedGame = game;
  }
</script>

<main class="bg-gray-100 min-h-screen flex">
  <div class="absolute top-2 right-2 text-sm font-bold text-primary text-right pr-2">בס"ד</div>
  
  <!-- Game Menu -->
  <div class="w-64 bg-white shadow-lg p-4 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
    <h2 class="text-2xl font-bold text-primary mb-6">Games</h2>
    <ul class="space-y-2 flex-grow">
      {#each games as game}
        <li>
          <button
            class="w-full text-left p-3 rounded-lg transition-colors duration-200 ease-in-out
                   {selectedGame === game ? 'bg-primary text-white' : 'hover:bg-gray-100'}
                   focus:outline-none focus:ring-2 focus:ring-primary"
            on:click={() => selectGame(game)}
          >
            <span class="mr-3 text-xl">{game.icon}</span>
            <span class="font-medium">{game.name}</span>
          </button>
        </li>
      {/each}
    </ul>
    <div class="mt-auto pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-500">&copy; {new Date().getFullYear()} 613games</p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-grow p-8 ml-64">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold text-primary mb-2">{title}</h1>
      <h2 class="text-2xl text-secondary">Vetted Kosher Games</h2>
    </header>

    {#if selectedGame}
      <div class="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 class="text-2xl font-semibold text-primary mb-4">{selectedGame.name}</h3>
        <p class="text-gray-700 mb-4">{selectedGame.description}</p>
        <iframe
          title={selectedGame.name}
          src={selectedGame.embedUrl}
          class="w-full h-96 border-none"
          allowfullscreen
        ></iframe>
      </div>
    {:else}
      <div class="bg-white shadow-lg rounded-lg p-8 mb-8">
        <p class="text-lg text-gray-700 mb-4">Welcome to 613games, your source for safe and appropriate gaming content.</p>
        
        <section class="mb-8">
          <h3 class="text-2xl font-semibold text-primary mb-4">About Us</h3>
          <p class="text-gray-700">We provide a curated selection of pre-approved games that are embedded within our application. Our goal is to offer a safe and appropriate gaming environment for our community.</p>
        </section>

        <section>
          <h3 class="text-2xl font-semibold text-primary mb-4">Our Features</h3>
          <ul class="list-disc list-inside text-gray-700">
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
