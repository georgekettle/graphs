require("turbolinks-animate")

const initTurbolinksAnimate = () => {
  TurbolinksAnimate.init({animation: 'fadeIn', duration: '0.9s', delay: 100});
}

export { initTurbolinksAnimate }
