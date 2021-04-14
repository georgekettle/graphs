import flatpickr from "flatpickr";

const initFlatpickr = () => {
  flatpickr("#flatpickr-date", {});
  flatpickr("#flatpickr-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  });
}

export { initFlatpickr }
