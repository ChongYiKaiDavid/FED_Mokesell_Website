document.addEventListener('DOMContentLoaded', function () {
    const fetchButton = document.getElementById('fetchButton');
    const resultContainer = document.getElementById('resultContainer');
  
    // Event listener for the button
    fetchButton.addEventListener('click', fetchData);
  
    async function fetchData() {
      resultContainer.innerHTML = '<p>Loading...</p>';
  
      try {
        // Fetching data from a placeholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        
        // Display the data
        displayData(data);
      } catch (error) {
        resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    }
  
    function displayData(data) {
      resultContainer.innerHTML = '';
      data.slice(0, 5).forEach((item) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        `;
        resultContainer.appendChild(postDiv);
      });
    }
  });
  