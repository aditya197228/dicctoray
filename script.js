async function searchWord() {
    const word = document.getElementById('search').value.trim().toLowerCase();
    const output = document.getElementById('output');
  
    if (!word) {
      output.innerHTML = '<p>Please enter a word to search.</p>';
      return;
    }
  
    output.innerHTML = '<p>Searching...</p>';
  
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
  
      const data = await response.json();
  
      const meanings = data[0]?.meanings || [];
      if (meanings.length === 0) {
        output.innerHTML = `<p>No meanings found for <strong>${word}</strong>.</p>`;
        return;
      }
  
      const definitionList = meanings
        .map(meaning => `<li><strong>${meaning.partOfSpeech}:</strong> ${meaning.definitions[0].definition}</li>`)
        .join('');
  
      output.innerHTML = `
        <h2>${data[0]?.word}</h2>
        <ul>${definitionList}</ul>
      `;
    } catch (error) {
      output.innerHTML = `<p>Error: ${error.message}</p>`;
      console.error(error);
    }
  }
  