<script>
  import { navigate } from '../router.js';

  export let games = [];
  export let selectedGame = null;
  export let isMenuOpen = true;
  export let searchTerm = '';
  export let favorites = [];
  export let toggleFavorite;

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
    if (window.innerWidth < 768) {  // 768px is the 'md' breakpoint in Tailwind
      isMenuOpen = false;
    }
  }

  function isNew(dateAdded) {
    if (!dateAdded) return false;
    const threeAgo = new Date();
    threeAgo.setDate(threeAgo.getDate() - 3);
    return new Date(dateAdded) > threeAgo;
  }

  $: filteredGames = games
    .filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return a.name.localeCompare(b.name);
    });
</script>

<div
  class="w-full md:w-72 bg-gray-100 shadow-lg flex flex-col h-screen fixed left-0 top-0 z-10 menu-slide"
  class:menu-open={isMenuOpen}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
>
  <style>
    .menu-slide {
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
    }

    .menu-open {
      transform: translateX(0);
    }

    @media (min-width: 768px) {
      .menu-slide {
        transform: translateX(0);
      }
      .menu-slide:not(.menu-open) {
        transform: translateX(-100%);
      }
    }
  </style>

  <div class="bg-gray-200 text-gray-800 p-4 flex justify-between items-center">
    <h2 class="text-2xl font-bold">🎮 Games</h2>
    <button
      on:click={() => {
        isMenuOpen = false;
      }}
      class="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
    >
      <span class="text-lg">&#x2715;</span>
    </button>
  </div>

  <div class="p-4">
    <input
      type="text"
      placeholder="Search games..."
      bind:value={searchTerm}
      class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div class="flex-grow overflow-y-auto px-4 py-2 space-y-4">
    {#if filteredGames.some(game => favorites.includes(game.id))}
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Pinned Games</h3>
        <ul class="space-y-2">
          {#each filteredGames.filter(game => favorites.includes(game.id)) as game}
            <li>
              <button
                class="w-full flex items-center justify-between p-2 rounded-lg transition-colors duration-200 ease-in-out
                       {selectedGame === game ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}
                       focus:outline-none focus:ring-2 focus:ring-primary"
                on:click={() => selectGame(game)}
              >
                <div class="flex items-center">
                  <span class="mr-3 text-xl">{game.icon}</span>
                  <span class="font-medium">{game.name}</span>
                </div>
                <button
                  on:click|stopPropagation={() => toggleFavorite(game.id)}
                  class="text-lg opacity-75 hover:opacity-100"
                  title="Unpin game"
                >
                  📌
                </button>
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">All Games</h3>
      <ul class="space-y-2">
        {#each filteredGames.filter(game => !favorites.includes(game.id)) as game}
          <li>
            <button
              class="w-full flex items-center justify-between p-2 rounded-lg transition-colors duration-200 ease-in-out
                     {selectedGame === game ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}
                     focus:outline-none focus:ring-2 focus:ring-primary"
              on:click={() => selectGame(game)}
            >
              <div class="flex items-center">
                <span class="mr-3 text-xl">{game.icon}</span>
                <span class="font-medium">{game.name}</span>
              </div>
              <div class="flex items-center">
                {#if isNew(game.dateAdded)}
                  <span class="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">New</span>
                {/if}
                <button
                  on:click|stopPropagation={() => toggleFavorite(game.id)}
                  class="text-lg opacity-0 group-hover:opacity-75 hover:opacity-100 transition-opacity duration-200"
                  title="Pin game"
                >
                  📌
                </button>
              </div>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="mt-auto p-4 border-t border-gray-200">
    <button
      on:click={goToAbout}
      class="w-full text-left p-3 rounded-lg transition-colors duration-200 ease-in-out text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <span class="mr-3 text-xl">ℹ️</span>
      <span class="font-medium">About</span>
    </button>
    <p class="text-sm text-gray-500 mt-4 text-center">&copy; {new Date().getFullYear()} 613games</p>
  </div>
</div>
