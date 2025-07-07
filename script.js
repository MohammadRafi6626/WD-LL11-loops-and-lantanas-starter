// Initial rendering logic – to be refactored during the lab
// Example using forEach()
function addStationsForEach(stations) {
  stations.reverse().forEach(station => addStationElement(station));
}

// Example using map() (not recommended for side effects, but shown for learning)
//function addStationsMap(stations) {
//  stations.map(station => addStationElement(station));
//}

// 🧪 TEAM FEATURES

// 💌 Wishlist Renderer
function renderWishlist() {
  // Clear existing wishlist items first
  const wishlistContainer = document.querySelector("#wishlist .wishlist-container");
  const existingItems = wishlistContainer.querySelectorAll(".wishlist-item");
  existingItems.forEach(item => item.remove());
  
  // Use forEach to display items in wishlist
  wishlistItems.forEach(item => addWishlistElement(item));
}

// ❌ Search Feedback
function searchStations(query) {
  // Clear any existing feedback
  clearSearchFeedback();
  
  // Convert query to lowercase for case-insensitive search
  const searchQuery = query.toLowerCase();
  
  // Filter stations array based on query
  const filteredStations = stations.filter(station => {
    return (
      station.name.toLowerCase().includes(searchQuery) ||
      station.location.toLowerCase().includes(searchQuery) ||
      station.type.toLowerCase().includes(searchQuery) ||
      station.city.toLowerCase().includes(searchQuery)
    );
  });
  
  // Clear current station list
  const stationList = document.getElementById("station-list");
  const existingStations = stationList.querySelectorAll(".station");
  existingStations.forEach(station => station.remove());
  
  // Display error if none found
  if (filteredStations.length === 0) {
    showSearchFeedback(`No stations found matching "${query}". Try searching by name, location, type, or city.`);
    return;
  }
  
  // Display success message and filtered results
  showSearchFeedback(`Found ${filteredStations.length} station${filteredStations.length !== 1 ? 's' : ''} matching "${query}"`, false);
  
  // Render filtered stations (maintain reverse order)
  filteredStations.reverse().forEach(station => addStationElement(station));
}

// 🌟 Random Featured Station
function pickFeaturedStation() {
  // Use Math.random to select and display a station
  const randomIndex = Math.floor(Math.random() * stations.length);
  const featuredStation = stations[randomIndex];
  
  // Display the randomly selected featured station
  addFeaturedStationElement(featuredStation);
  
  return featuredStation; // Return for potential use elsewhere
}

// 🏙️ Group by City
function groupStationsByCity() {
  // Clear existing grouped content
  const groupedSection = document.getElementById("grouped-stations");
  const existingGroups = groupedSection.querySelectorAll(".city-group");
  existingGroups.forEach(group => group.remove());
  
  // Create an object to group stations by city
  const stationsByCity = {};
  
  // Loop through stations and group under each city
  stations.forEach(station => {
    const city = station.city;
    
    // If this city doesn't exist in our object yet, create an empty array
    if (!stationsByCity[city]) {
      stationsByCity[city] = [];
    }
    
    // Add the station to the appropriate city array
    stationsByCity[city].push(station);
  });
  
  // Loop through each city and render the group
  for (const cityName in stationsByCity) {
    const stationsInCity = stationsByCity[cityName];
    addCityGroupElement(cityName, stationsInCity);
  }
  
  return stationsByCity; // Return for potential use elsewhere
}

// 🔄 Filter Toggle
let showOnlyOpen = false; // Global state to track filter

function toggleFilteredStations() {
  // Toggle the filter state
  showOnlyOpen = !showOnlyOpen;
  
  // Update button text
  const button = document.getElementById("filter-toggle-btn");
  button.textContent = showOnlyOpen ? "Show All Stations" : "Show Open Only";
  
  // Clear current station list
  const stationList = document.getElementById("station-list");
  const existingStations = stationList.querySelectorAll(".station");
  existingStations.forEach(station => station.remove());
  
  // Filter stations based on current state
  let stationsToShow;
  if (showOnlyOpen) {
    // Use filter() to show only open stations
    stationsToShow = stations.filter(station => station.isOpen);
  } else {
    // Show all stations
    stationsToShow = stations;
  }
  
  // Re-render stations with filtered array
  stationsToShow.reverse().forEach(station => addStationElement(station));
}

// Load stations on page start
addStationsForEach(stations);

// Load wishlist items on page start
renderWishlist();

// Pick and display a random featured station
pickFeaturedStation();

// Create the filter toggle button
createToggleButton();

// Group and display stations by city
groupStationsByCity();

// Set up search functionality
createSearchEventListeners();
