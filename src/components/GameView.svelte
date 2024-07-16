<script>
  export let selectedGame;
  let iframeElement;

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      iframeElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }
</script>

<div class="bg-white shadow-lg rounded-lg p-4 md:p-8 mb-8">
  <h3 class="text-xl md:text-2xl font-semibold text-primary mb-4 font-heading">{selectedGame.name}</h3>
  <p class="text-text mb-4">{selectedGame.description}</p>
  <div class="relative">
    {#if selectedGame.noEmbed}
      <div class="w-full h-[300px] md:h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <a 
          href={selectedGame.embedUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex items-center justify-center px-6 py-3 bg-accent text-white text-lg font-semibold rounded-lg shadow-md hover:bg-accent-dark transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Play {selectedGame.name}
        </a>
      </div>
    {:else}
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
        class="absolute top-2 right-2 bg-accent text-white px-2 py-1 text-sm rounded-lg shadow hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light transition-colors duration-200"
      >
        Fullscreen
      </button>
    {/if}
  </div>
</div>
