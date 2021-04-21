import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "parent", "child" ]
  static values = {
    filters: Array,
    inclusiveFilters: Array,
  }

  connect() {
    this.initButtons(); // initialize click eventListeners for buttons (those with data-filter)
  }

  initButtons() {
    // this could be simplified
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        let filter = btn.dataset.filter;
        this.toggleFilter(filter);
        btn.classList.toggle('active');
      })
    })

    const inclusiveFilterButtons = document.querySelectorAll('[data-inclusive-filter]');
    inclusiveFilterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        let filter = btn.dataset.inclusiveFilter;
        this.toggleInclusiveFilter(filter);
        btn.classList.toggle('active');
      })
    })
  }

  toggleFilter(value) {
    this.filtersValue = this.filtersValue.includes(value) ? this.filtersValue.filter(i => i !== value) : [ ...this.filtersValue, value ];
    this.applyFilters();
  }

  toggleInclusiveFilter(value) {
    this.inclusiveFiltersValue = this.inclusiveFiltersValue.includes(value) ? this.inclusiveFiltersValue.filter(i => i !== value) : [ ...this.inclusiveFiltersValue, value ];
    this.applyFilters();
  }

  hideElements(elems) {
    elems.forEach((item) => {
      item.classList.add('animated','fadeOutShrink');
      item.classList.remove('fadeInExpand');
    })
  }

  showElements(elems) {
    elems.forEach((item) => {
      if (item.classList.contains('fadeOutShrink')) {
        item.classList.add('animated','fadeInExpand');
        item.classList.remove('fadeOutShrink');
      }
    })
  }

  applyFilters() {
    const filterClasses = this.filtersValue.length ? this.filtersValue.join('') : '*';
    const selectFilterClasses = this.inclusiveFiltersValue.length ? this.inclusiveFiltersValue.map(inclusiveFilter => `:scope > ${filterClasses}${inclusiveFilter}`).join(',') : filterClasses;
    const deselectFilterClasses = this.inclusiveFiltersValue.length ? this.inclusiveFiltersValue.map(inclusiveFilter => `:scope > div:not(${filterClasses}${inclusiveFilter})`).join(',') : `:scope > div:not(${filterClasses})`;

    if (deselectFilterClasses.length) {
      let deselected = this.parentTarget.querySelectorAll(deselectFilterClasses);
      this.hideElements(deselected);
    }

    if (selectFilterClasses.length) {
      let selected = this.parentTarget.querySelectorAll(selectFilterClasses);
      this.showElements(selected);
    }
  }

  applyFilter(e) {
    e.preventDefault();
    this.buttonTarget.dataset.action = 'click->filter#removeFilter';
  }

  removeFilter(e) {
    e.preventDefault();
    this.buttonTarget.dataset.action = 'click->filter#applyFilter';
  }
}
