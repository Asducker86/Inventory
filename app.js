// Define the API endpoint (URL)
const apiUrl = 'https://script.google.com/macros/s/AKfycbxNS3BnLG40A4L2Fi5Zd8Jt759ht5JQXBL9C0Y7hdQ/dev';

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to display data on the page
function displayData(data) {
  // Replace this part with your logic to display the data on your webpage
  // For example, you can update the DOM with the retrieved data
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<h2>Vehicle Inventory</h2>';

  if (data.length === 0) {
    resultsDiv.innerHTML += '<p>No results found.</p>';
  } else {
    data.forEach((item, index) => {
      resultsDiv.innerHTML += `<p>${index + 1}. ${item.make} ${item.model} (${item.year})</p>`;
    });
  }
}

// Fetch data when the page loads
window.addEventListener('load', () => {
  fetchData()
    .then(displayData)
    .catch((error) => {
      // Handle errors
      console.error('An error occurred:', error);
    });
});
