import { toggleBooking } from "./index";

function createBookingTemplate(booking) {
  return `
    <div class="booking" data-id="${booking._id}" data-cancelled="${
    booking.cancelled
  }">
      <p>${booking.name}</p>
      <p>${booking.date}</p>
      <img src="${booking.image_url}" alt="Profile"/>
      <button>${booking.cancelled ? "Accept" : "Cancel"}</button>
    </div>
  `;
}

export function renderBookings(bookings) {
  const $bookingsContainer = document.getElementById("bookings");
  const $emptyAlert = document.querySelector(".empty-alert");

  $bookingsContainer.innerHTML = "";

  const sortedBookings = bookings.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  sortedBookings.forEach(booking => {
    $bookingsContainer.insertAdjacentHTML(
      "beforeend",
      createBookingTemplate(booking)
    );
  });

  if ($emptyAlert) {
    $emptyAlert.remove();
  }
}

export function attachListenersToBookings() {
  const $bookingElement = ".booking";

  document.querySelectorAll($bookingElement).forEach(bookingElement => {
    bookingElement.addEventListener("click", toggleBooking);
  });
}
