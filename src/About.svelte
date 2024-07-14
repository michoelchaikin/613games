<script>
  import { navigate } from './router.js';

  function goBack() {
    navigate('');
  }
</script>

<div class="bg-white shadow-lg rounded-lg p-8 mb-8">
  <h2 class="text-3xl font-semibold text-primary mb-6 font-heading">About 613games</h2>
  
  <p class="text-text mb-4">
    Welcome to 613games, a groundbreaking project that demonstrates the full potential of artificial intelligence in web development.
  </p>
  
  <p class="text-text mb-4">
    <strong>This entire website was built 100% using AI technologies, without a single line of human-written code.</strong> The project utilized:
  </p>
  
  <ul class="list-disc list-inside text-text mb-6">
    <li><strong>aider:</strong> An AI-powered coding assistant that generated and refined all the code for this website.</li>
    <li><strong>Anthropic's Claude (Sonnet 3.5):</strong> An advanced language model that provided guidance, suggestions, and shaped the overall structure and content of the site.</li>
  </ul>
  
  <p class="text-text mb-6">
    From the initial concept to the final implementation, including design decisions, coding, and content creation, every aspect of 613games was created through AI-human collaboration. This project serves as a testament to the incredible capabilities of AI in web development.
  </p>
  
  <p class="text-text mb-6">
    You can explore the source code and development process on our <a href="https://github.com/michoelchaikin/613games" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">GitHub repository</a>.
  </p>
  
  <button
    on:click={goBack}
    class="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-200"
  >
    Back to Home
  </button>
</div>
