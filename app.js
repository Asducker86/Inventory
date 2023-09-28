// Define the API endpoint (URL)
const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1LhsBoKPW9jYj3K5aghHSodcBRksrVI8adjAObPPode0/values/DBS%20Vehicle%20Database%20-%20Ancaster?key=YOUR_API_KEY';

// Define Google API key and OAuth client ID
const googleConfig = {
  'apiKey': 'AIzaSyCCvGMyNwWVk6-G6HB9esAFqm775hV07qc', // Your Google API key
  'clientId': '668016298289-o64rt3fb9vuptue6mvp47v67no840ptg.apps.googleusercontent.com', // Your Google OAuth client ID
};

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

  if (data.values.length === 0) {
    resultsDiv.innerHTML += '<p>No results found.</p>';
  } else {
    data.values.forEach((row, index) => {
      // Adjust this based on your sheet's structure
      resultsDiv.innerHTML += `<p>${index + 1}. ${row[0]} ${row[1]} (${row[2]})</p>`;
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
