require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
// import "bootstrap";
// Tailwind
import "stylesheets/application";

// Internal imports, e.g:
import { removeLoadingScreen } from '../config/initial_load'
import { initCalendar, initCalendarStrip } from '../components/calendar'
import { initToastNotifications } from '../components/toast_notifications'
import { initLoaders } from '../components/loaders'
import { initFlatpickr } from '../components/flatpickr'
import { initTurbolinksAnimate } from '../components/turbolinks_animate'

document.addEventListener('turbolinks:load', (e) => {
  // initial load only
  if (!event.data.timing.visitStart) {
    removeLoadingScreen()
  }

  initTurbolinksAnimate();
  initLoaders();
  initToastNotifications();
  initFlatpickr();
  initCalendar();
  initCalendarStrip();
});

import 'controllers'
