import { sliceEvents, createPlugin } from '@fullcalendar/core';
import moment from 'moment';
import anime from 'animejs/lib/anime.es.js';

const enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    var date = currDate;
    while(date.diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
        date.add(1, 'days');
    }

    return dates;
};

const getToday = () => {
  return moment();
}

const getSelectedDate = () => {
  let params = new URLSearchParams(document.location.search.substring(1));
  let dateParams = params.get("date");
  var date = dateParams ? moment(dateParams) : getToday();
  return date
}

const renderDates = (dates, segs) => {
  var selectedDate = getSelectedDate();
  var html = '';
  dates.forEach((date) => {
    let mDate = moment(date);
    if (mDate.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')) {
      html += `<a href="/tasks?date=${mDate.format('YYYY-MM-DD')}" class="date selected" id="date-${mDate.format('YYYY-MM-DD')}"><div class="date-card"><h4>${mDate.format('D')}</h4></div></a>`
    } else if (mDate.format('YYYY-MM-DD') === getToday().format('YYYY-MM-DD')) {
      html += `<a href="/tasks?date=${mDate.format('YYYY-MM-DD')}" class="date today" id="date-${mDate.format('YYYY-MM-DD')}"><div class="date-card"><h4>${mDate.format('D')}</h4></div></a>`
    } else {
      html += `<a href="/tasks?date=${mDate.format('YYYY-MM-DD')}" class="date" id="date-${mDate.format('YYYY-MM-DD')}"><div class="date-card"><h4>${mDate.format('D')}</h4></div></a>`
    }
  })
  return html
}

const renderWeekDays = (dates, segs) => {
  var html = '';
  dates.forEach((date) => {
    let mDate = moment(date);
    html += `<div class="weekday">${mDate.format('ddd')}</div>`
  })
  return html
}

const CustomViewConfig = {

  classNames: [ 'custom-view' ],

  content: function(props) {
    let segs = sliceEvents(props, true); // allDay=true
    let dates = enumerateDaysBetweenDates(props.dateProfile.currentRange.start, props.dateProfile.currentRange.end);
    let html = `<div class="week-dates-container"><div class="calendar-strip-week">${renderWeekDays(dates, segs)}</div><div class="calendar-strip-dates">${renderDates(dates, segs)}</div></div>`;

    return { html: html }
  }

}

export default createPlugin({
  views: {
    custom: CustomViewConfig
  }
});
