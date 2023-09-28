// Define Google API key and OAuth client ID
const googleConfig = {
  'apiKey': 'AIzaSyCCvGMyNwWVk6-G6HB9esAFqm775hV07qc', // Your Google API key
  'clientId': '668016298289-o64rt3fb9vuptue6mvp47v67no840ptg.apps.googleusercontent.com', // Your Google OAuth client ID
};

// Function to initialize the Google API client
function initClient() {
  gapi.client.init({
    'apiKey': googleConfig.apiKey,
    'clientId': googleConfig.clientId,
    'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

// Function to update UI based on sign-in status
function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    fetchDataFromSheets();
  } else {
    gapi.auth2.getAuthInstance().signIn();
  }
}

// Function to fetch data from Google Sheets
async function fetchDataFromSheets() {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1LhsBoKPW9jYj3K5aghHSodcBRksrVI8adjAObPPode0', // Your Google Sheet ID
      range: 'DBS Vehicle Database - Ancaster', // Replace with your sheet name
    });
    const data = response.result;
    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error.result.error.message);
  }
}

// Function to display data on the page
function displayData(data) {
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

// Load the Google API client and authenticate the user
function loadClient() {
  gapi.load('client', initClient);
}

// Call the function to load the client and authenticate the user when the page loads
window.addEventListener('load', loadClient);
