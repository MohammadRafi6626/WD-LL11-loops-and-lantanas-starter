function addStationElement(station) {
    const list = document.getElementById("station-list");
    const div = document.createElement("div");
    div.className = `station ${station.isOpen ? 'open' : 'closed'}`;
    const statusText = station.isOpen ? '🟢 Open' : '🔴 Closed';
    div.innerHTML = `
      <h3>${station.name}</h3>
      <p><strong>Location:</strong> ${station.location}</p>
      <p><strong>Type:</strong> ${station.type}</p>
      <p><strong>Status:</strong> ${statusText}</p>
    `;
    list.appendChild(div);
  }

function addWishlistElement(item) {
    const container = document.querySelector("#wishlist .wishlist-container");
    const div = document.createElement("div");
    
    // Add priority class for styling
    const priorityClass = `priority-${item.priority.toLowerCase()}`;
    div.className = `wishlist-item ${priorityClass}`;
    
    // Add category icons
    const categoryIcons = {
      'Shade': '☂️',
      'Comfort': '🛋️',
      'Hydration': '💧',
      'Cooling': '❄️',
      'Protection': '🛡️'
    };
    
    const icon = categoryIcons[item.category] || '📦';
    
    div.innerHTML = `
      <h4><span class="category-icon">${icon}</span> ${item.name}</h4>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Priority:</strong> <span class="priority-badge">${item.priority}</span></p>
    `;
    container.appendChild(div);
  }

function addFeaturedStationElement(station) {
    const featuredSection = document.getElementById("featured-station");
    
    // Clear any existing featured station
    const existingFeatured = featuredSection.querySelectorAll(".featured-station-content");
    existingFeatured.forEach(item => item.remove());
    
    const div = document.createElement("div");
    div.className = "featured-station-content";
    div.innerHTML = `
      <div class="featured-highlight">
        <h3>⭐ ${station.name}</h3>
        <p><strong>Location:</strong> ${station.location}</p>
        <p><strong>Type:</strong> ${station.type}</p>
        <p class="featured-badge">Featured Station</p>
      </div>
    `;
    featuredSection.appendChild(div);
  }

function createToggleButton() {
    const toggleSection = document.getElementById("toggle-controls");
    
    // Clear existing button if any
    toggleSection.innerHTML = '';
    
    const button = document.createElement("button");
    button.id = "filter-toggle-btn";
    button.className = "toggle-button";
    button.textContent = "Show Open Only";
    button.addEventListener("click", toggleFilteredStations);
    
    toggleSection.appendChild(button);
  }

function addCityGroupElement(cityName, stationsInCity) {
    const groupedSection = document.getElementById("grouped-stations");
    
    const cityDiv = document.createElement("div");
    cityDiv.className = "city-group";
    
    // City icons for different cities
    const cityIcons = {
      'Riverside': '🏞️',
      'San Bernardino': '🏔️',
      'Redlands': '🌳',
      'Ontario': '🏙️',
      'Fontana': '🌆'
    };
    
    const icon = cityIcons[cityName] || '🏘️';
    
    cityDiv.innerHTML = `
      <h3 class="city-header">
        ${icon} ${cityName}
        <span class="city-count">${stationsInCity.length} station${stationsInCity.length !== 1 ? 's' : ''}</span>
      </h3>
      <div class="city-stations"></div>
    `;
    
    groupedSection.appendChild(cityDiv);
    
    // Add each station to this city group
    const cityStationsContainer = cityDiv.querySelector('.city-stations');
    stationsInCity.forEach(station => {
      const stationDiv = document.createElement("div");
      stationDiv.className = `station ${station.isOpen ? 'open' : 'closed'}`;
      const statusText = station.isOpen ? '🟢 Open' : '🔴 Closed';
      stationDiv.innerHTML = `
        <h4>${station.name}</h4>
        <p><strong>Location:</strong> ${station.location}</p>
        <p><strong>Type:</strong> ${station.type}</p>
        <p><strong>Status:</strong> ${statusText}</p>
      `;
      cityStationsContainer.appendChild(stationDiv);
    });
  }

function showSearchFeedback(message, isError = true) {
    const feedbackSection = document.getElementById("search-feedback");
    
    // Clear existing feedback
    feedbackSection.innerHTML = '';
    
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = isError ? "search-error" : "search-success";
    
    if (isError) {
      feedbackDiv.innerHTML = `
        <span>🔍</span>
        <span>${message}</span>
      `;
    } else {
      feedbackDiv.textContent = message;
    }
    
    feedbackSection.appendChild(feedbackDiv);
  }

function clearSearchFeedback() {
    const feedbackSection = document.getElementById("search-feedback");
    feedbackSection.innerHTML = '';
  }

function createSearchEventListeners() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const clearBtn = document.getElementById("clear-search-btn");
    
    // Search button click
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        searchStations(query);
      }
    });
    
    // Enter key in search input
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          searchStations(query);
        }
      }
    });
    
    // Clear button click
    clearBtn.addEventListener("click", () => {
      searchInput.value = '';
      clearSearchFeedback();
      // Reset to show all stations
      const stationList = document.getElementById("station-list");
      const existingStations = stationList.querySelectorAll(".station");
      existingStations.forEach(station => station.remove());
      addStationsForEach(stations);
    });
  }
