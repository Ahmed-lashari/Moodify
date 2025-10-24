document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progress-bar");
  const dashboard = document.getElementById("dashboard");

  if (progressBar && dashboard) {
    setTimeout(() => {
      progressBar.style.width = "100%";
      setTimeout(() => {
        dashboard.style.display = "block";
      }, 2000);
    }, 1000);
  }
});
