import axios from "axios";

import { API_URL } from "./utils";

function getActionButtonText(cancelled) {
  return cancelled ? "Accept" : "Cancel";
}

function toggleBooking() {
  const id = this.dataset.id;
  const isCancelled = this.dataset.cancelled === "true" ? true : false;

  axios
    .patch(`${API_URL}/${id}`, { cancelled: !isCancelled })
    .then(({ data }) => {
      this.dataset.cancelled = data.cancelled;

      data.cancelled
        ? this.classList.add("booking--cancelled")
        : this.classList.remove("booking--cancelled");

      this.querySelector("button").innerHTML = getActionButtonText(
        data.cancelled
      );
    });
}

function createBookingTemplate(booking) {
  return `
    <div class="booking ${
      booking.cancelled ? "booking--cancelled" : ""
    }" data-id="${booking._id}" data-cancelled="${booking.cancelled}"
    >
      <img src="${booking.image_url}" alt="Profile"/>
      <p>${booking.name}</p>
      <p>${new Date(booking.date).toLocaleString()}</p>
      <button>${getActionButtonText(booking.cancelled)}</button>
    </div>
  `;
}

export function renderBookings(bookings) {
  const $bookingsContainer = document.getElementById("bookings");
  const $emptyAlert = document.querySelector(".empty-alert");

  const sortedBookings = bookings.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  sortedBookings.forEach(booking => {
    $bookingsContainer.insertAdjacentHTML(
      "beforeend",
      createBookingTemplate(booking)
    );
  });

  $emptyAlert.remove();
}

export function attachListenersToBookings() {
  const $bookingElement = ".booking";

  document.querySelectorAll($bookingElement).forEach(bookingElement => {
    bookingElement.addEventListener("click", toggleBooking);
  });
}
