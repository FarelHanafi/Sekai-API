document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "none";
});

document.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "block";
    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, 2000); // waktu loading screen muncul dalam milisecond
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});