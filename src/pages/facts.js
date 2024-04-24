document.addEventListener('DOMContentLoaded', function() {
    var factsDropdown = document.getElementById('facts');
    var displayLink = document.getElementById('displayLink');
  
    factsDropdown.addEventListener('change', function() {
      var selectedFact = factsDropdown.value;
      switch (selectedFact) {
        case 'Continent':
          displayLink.href = 'facts_continent.html';
          break;
        case 'World':
          displayLink.href = 'facts_world.html';
          break;
        case 'Country':
          displayLink.href = 'facts_country.html';
          break;
        case 'City':
          displayLink.href = 'facts_city.html';
          break;
        default:
          displayLink.href = '#';
      }
    });
});