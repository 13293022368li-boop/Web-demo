
// js/detail.js
// 详情页控制器：根据 URL 中 id 显示对应电影信息（Netflix 风格升级版）

const trailerMap = {
  1: "https://www.youtube.com/embed/ByXuk9QqQkk",        // Spirited Away
  2: "https://www.youtube.com/embed/xU47nhruN-Q",        // Your Name
  3: "https://www.youtube.com/embed/YoHD9XEInc0",        // Inception
  4: "https://www.youtube.com/embed/zSWdZVtXT7E",        // Interstellar
  5: "https://www.youtube.com/embed/EXeTwQWrcwY",        // The Dark Knight
  6: "https://www.youtube.com/embed/bFwdl2PDAFM",        // Mugen Train
  7: "https://www.youtube.com/embed/TcMBFSGVi1c",        // Endgame
  8: "https://www.youtube.com/embed/Q6iK6DjV_iE",        // Weathering With You
  9: "https://www.youtube.com/embed/5xH0HfJHsaY",        // Parasite
  10:"https://www.youtube.com/embed/q0d5IvCkGFU"         // Your Lie in April
};

function saveContinueWatching(movieId) {
  let history = JSON.parse(localStorage.getItem("continueWatching") || "[]");

  // remove existing entry if duplicated
  history = history.filter(id => id !== movieId);

  // add newest at front
  history.unshift(movieId);

  // keep max 10 items
  if (history.length > 10) history.pop();

  localStorage.setItem("continueWatching", JSON.stringify(history));
}

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function renderDetail() {
  const movieId = getQueryId();
  const movie = movies.find(m => m.id === movieId);

  const container = document.getElementById("movieDetail");

  if (!movie || !container) {
    // record viewing history
    saveContinueWatching(movieId);
    if (container) {
      container.innerHTML = "<p>Movie not found.</p>";
    }
    return;
  }

  // record viewing history
  saveContinueWatching(movieId);

  container.innerHTML = `
    <div class="detail-card enhanced-detail-card">
      
      <img class="detail-poster-large" src="${movie.imageUrl}" alt="${movie.title}">
      
      <div class="detail-content enhanced-detail-content">

        <h2 class="detail-title">${movie.title}</h2>

        <div class="movie-meta enhanced-meta">
          <span>${movie.year}</span> · 
          <span>${movie.genre}</span> · 
          <span>Rating: ${movie.rating}</span>
        </div>

        <div class="rating-stars">
          ${"★".repeat(Math.floor(movie.rating))}
          ${"☆".repeat(10 - Math.floor(movie.rating))}
        </div>

        <div class="movie-tags">
          <span class="tag">${movie.genre}</span>
          ${movie.rating >= 8.5 ? `<span class="tag top-rated">Top Rated</span>` : ""}
        </div>

        <p class="movie-desc enhanced-desc">${movie.description}</p>

        <a class="btn detail-back-btn" href="../pages/movies.html">← Back to List</a>

      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderDetail);

document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playTrailerBtn");
  const trailerBox = document.getElementById("trailerContainer");
  const movieId = getQueryId();

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      const url = trailerMap[movieId];
      if (!url) {
        trailerBox.innerHTML = "<p>No trailer available.</p>";
        return;
      }
      trailerBox.innerHTML = `
        <iframe width="100%" height="400"
          src="${url}" 
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
    });
  }
});