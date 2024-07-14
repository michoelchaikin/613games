<script>
  import { navigate } from '../router.js';

  export let games = [];
  export let selectedGame = null;
  export let isMenuOpen = true;
  export let searchTerm = '';

  let touchStartX = 0;
  let touchEndX = 0;

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

  function selectGame(game) {
    navigate(game.id);
    if (window.innerWidth < 768) {  // 768px is the 'md' breakpoint in Tailwind
      isMenuOpen = false;
    }
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
  <ul class="space-y-2 flex-grow overflow-y-auto games-list px-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    {#each filteredGames as game}
      <li>
        <button
          class="w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ease-in-out
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
