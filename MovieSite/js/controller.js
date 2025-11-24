// js/controller.js
// Controller：负责控制视图与模型的交互（Search / Filter / Sort / Paging）

let filteredMovies = [...movies]; 
let currentPage = 1;
const pageSize = 6;

function getSelectedGenre() {
  const genreSelect = document.getElementById("genreFilter");
  return genreSelect ? genreSelect.value : "All";
}

function getSearchKeyword() {
  const searchInput = document.getElementById("searchInput");
  return searchInput ? searchInput.value.trim().toLowerCase() : "";
}

function getSortOption() {
  const sortSelect = document.getElementById("sortSelect");
  return sortSelect ? sortSelect.value : "none";
}

function applyFilters() {
  const keyword = getSearchKeyword();
  const genre = getSelectedGenre();
  const ratingValue = document.getElementById("ratingFilter").value;

  filteredMovies = movies.filter(m => {
    const matchTitle = m.title.toLowerCase().includes(keyword);
    const matchGenre = (genre === "All" || m.genre === genre);
    return matchTitle && matchGenre;
  });
filteredMovies = movies.filter(m => {
  const matchTitle = m.title.toLowerCase().includes(keyword);
  const matchGenre = (genre === "All" || m.genre === genre);

  // Rating Filter
  let matchRating = true;
  if (ratingValue === "9") matchRating = m.rating >= 9.0;
  if (ratingValue === "8") matchRating = m.rating >= 8.0 && m.rating < 9.0;
  if (ratingValue === "7") matchRating = m.rating >= 7.0 && m.rating < 8.0;

  // Year Filter
  const yearValue = document.getElementById("yearFilter").value;
  let matchYear = true;

  if (yearValue === "2015+") matchYear = m.year >= 2015;
  else if (yearValue === "2010") matchYear = m.year >= 2010 && m.year <= 2014;
  else if (yearValue === "2000") matchYear = m.year >= 2000 && m.year <= 2009;
  else matchYear = true;

  return matchTitle && matchGenre && matchRating && matchYear;
});
  applySorting();
}

function applySorting() {
  const sortOption = getSortOption();

  if (sortOption === "yearAsc") {
    filteredMovies.sort((a, b) => a.year - b.year);
  } else if (sortOption === "yearDesc") {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortOption === "ratingDesc") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "ratingAsc") {
    filteredMovies.sort((a, b) => a.rating - b.rating);
  }

  currentPage = 1;
  renderMovies();
}

function renderMovies() {
  const container = document.getElementById("movieList");
  const pageInfo = document.getElementById("pageInfo");
  if (!container) return;

  container.innerHTML = "";

  const totalItems = filteredMovies.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = filteredMovies.slice(startIndex, endIndex);

  pageItems.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.dataset.title = movie.title;
    card.dataset.genre = movie.genre;
    card.dataset.rating = movie.rating;
    card.dataset.year = movie.year;

    card.innerHTML = `
      <img src="${movie.imageUrl}" alt="${movie.title}">
      <div class="movie-content">
        <h3>${movie.title}</h3>
        <p class="movie-meta">
          <span>${movie.year}</span> · 
          <span>${movie.genre}</span> · 
          <span>Rating: ${movie.rating}</span>
        </p>
        <p class="movie-desc">${movie.description}</p>
        <a class="btn" href="../pages/detail.html?id=${movie.id}">View Details</a>
      </div>
    `;
    container.appendChild(card);
  });

  if (pageInfo) {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function nextPage() {
  currentPage++;
  renderMovies();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderMovies();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  let selectedIndex = -1; // for keyboard navigation

  // Auto Suggestion container
  let suggestionBox = document.createElement("div");
  suggestionBox.id = "suggestionBox";
  suggestionBox.style.position = "absolute";
  suggestionBox.style.background = "#1f2937";
  suggestionBox.style.border = "1px solid #4b5563";
  suggestionBox.style.width = "200px";
  suggestionBox.style.maxHeight = "200px";
  suggestionBox.style.overflowY = "auto";
  suggestionBox.style.display = "none";
  suggestionBox.style.zIndex = "1000";
  document.body.appendChild(suggestionBox);

  function updateSuggestionPosition() {
    if (!searchInput) return;
    const rect = searchInput.getBoundingClientRect();
    suggestionBox.style.left = rect.left + "px";
    suggestionBox.style.top = rect.bottom + "px";
  }

  const genreFilter = document.getElementById("genreFilter");
  const sortSelect = document.getElementById("sortSelect");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const yearFilter = document.getElementById("yearFilter"); 
  const resetBtn = document.getElementById("resetFilters");
  const gotoPageInput = document.getElementById("gotoPageInput");
  const gotoPageBtn = document.getElementById("gotoPageBtn");
  const ratingFilter = document.getElementById("ratingFilter");

  if (searchInput) searchInput.addEventListener("input", () => { 
    applyFilters(); 
    updateSuggestionPosition();

    const text = searchInput.value.toLowerCase();
    if (text.length === 0) {
      suggestionBox.style.display = "none";
      return;
    }

    const suggestions = movies
      .filter(m => m.title.toLowerCase().includes(text))
      .slice(0, 5);

    if (suggestions.length === 0) {
      suggestionBox.style.display = "none";
      return;
    }

    suggestionBox.innerHTML = "";
    suggestions.forEach(movie => {
      const item = document.createElement("div");
      item.className = "suggestion-item";

      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px; padding:6px 10px;">
          <img src="${movie.imageUrl}" style="width:32px; height:45px; object-fit:cover; border-radius:4px;">
          <span>${movie.title}</span>
        </div>
      `;

      item.style.cursor = "pointer";

      item.addEventListener("mouseover", () => {
        item.style.background = "#222";
      });

      item.addEventListener("mouseout", () => {
        item.style.background = "transparent";
      });

      item.addEventListener("click", () => {
        searchInput.value = movie.title;
        suggestionBox.style.display = "none";
        applyFilters();
      });

      suggestionBox.appendChild(item);
    });

    suggestionBox.style.display = "block";
  });

  if (searchInput) searchInput.addEventListener("keydown", (e) => {

    const items = suggestionBox.querySelectorAll(".suggestion-item");
    if (items.length === 0) return;

    // Down arrow
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
    }
    // Up arrow
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    }
    // Enter key
    else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        const text = items[selectedIndex].innerText;
        searchInput.value = text;
        suggestionBox.style.display = "none";
        applyFilters();
      }
      return;
    }

    // Highlight selected item
    items.forEach((item, index) => {
      item.style.background = (index === selectedIndex) ? "#333" : "transparent";
    });
  });

  if (genreFilter) genreFilter.addEventListener("change", () => { applyFilters(); });
  if (sortSelect) sortSelect.addEventListener("change", () => { applySorting(); });
  if (yearFilter) yearFilter.addEventListener("change", () => { applyFilters(); }); // ⭐ 新增
  if (prevBtn) prevBtn.addEventListener("click", prevPage);
  if (nextBtn) nextBtn.addEventListener("click", nextPage);

  
  if (resetBtn) resetBtn.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (genreFilter) genreFilter.value = "All";
    if (ratingFilter) ratingFilter.value = "All";
    if (yearFilter) yearFilter.value = "All";
    if (sortSelect) sortSelect.value = "none";
    currentPage = 1;
    applyFilters();
  });

  
  if (gotoPageBtn && gotoPageInput) {
    gotoPageBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredMovies.length / pageSize) || 1;
      let page = parseInt(gotoPageInput.value, 10);

      if (isNaN(page) || page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      currentPage = page;
      renderMovies();
    });
  }

  applyFilters();

  document.addEventListener("click", (e) => {
    if (e.target !== searchInput) {
      selectedIndex = -1;
      suggestionBox.style.display = "none";
    }
  });
});