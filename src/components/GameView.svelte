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
