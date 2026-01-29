const videos = document.querySelectorAll(".video");

videos.forEach(video => {
  const container = video.parentElement;
  const playBtn = container.querySelector(".play-btn");

  function pauseAllExcept(current) {
    videos.forEach(v => {
      if (v !== current) {
        v.pause();
        const btn = v.parentElement.querySelector(".play-btn");
        if (btn) btn.style.opacity = "1";
      }
    });
  }

  function togglePlay() {
    if (video.paused) {
      pauseAllExcept(video);
      video.play();
      playBtn.style.opacity = "0";
      playBtn.style.pointerEvents = "none";
    } else {
      video.pause();
      playBtn.style.opacity = "1";
      playBtn.style.pointerEvents = "auto";
    }
  }

  function goFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    }
  }

  playBtn.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);

  // DOUBLE CLICK = FULLSCREEN
  video.addEventListener("dblclick", goFullscreen);
});

