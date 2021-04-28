const removeLoadingScreen = () => {
  let loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

export { removeLoadingScreen };
