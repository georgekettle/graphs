import flatpickr from "flatpickr";

const initFlatpickr = () => {
  flatpickr("#flatpickr-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  });
  flatpickr("#flatpickr-date", {});
}

export { initFlatpickr }
