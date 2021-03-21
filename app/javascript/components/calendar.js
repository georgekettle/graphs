// const initCalendar = () => {
//   var calendarEl = document.getElementById('calendar');
//   if (calendarEl) {
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: 'dayGridMonth'
//     });
//     calendar.render();
//   }
// }

// export { initCalendar };

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import customViewPlugin from './calendar-strip-view.js';
import moment from 'moment';

const initCalendar = () => {
  var calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    var calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin ],
      height: "parent",
      initialView: 'dayGridMonth'

    });

    calendar.render();
  }
}

const getSelectedDate = () => {
  let params = new URLSearchParams(document.location.search.substring(1));
  let dateParams = params.get("date");
  var date = dateParams ? moment(dateParams) : moment();
  return date.toDate()
}

const initCalendarStrip = () => {
  let calendarStripEl = document.getElementById('calendar-strip');
  if (calendarStripEl) {
    let calendar = new Calendar(calendarStripEl, {
      plugins: [ customViewPlugin ],
      initialView: 'custom',
      duration: { weeks: 1 },
      initialDate: getSelectedDate(),
      titleFormat: { year: 'numeric', month: 'long' },
      loading: function(isLoading) {
        if (isLoading) {
          alert("loading");
        } else {
          alert("loaded");
        }
      }
    });
    calendar.render();
  }
}

export { initCalendar, initCalendarStrip };
