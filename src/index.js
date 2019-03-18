import axios from "axios";

import { API_URL } from "./utils";
import {
  attachListenersToBookings,
  renderBookings,
  createBookingElement
} from "./interface";

let bookingsData;

export function toggleBooking() {
  const id = this.dataset.id;
  const isCancelled = this.dataset.cancelled === "true" ? true : false;

  axios
    .patch(`${API_URL}/${id}`, {
      cancelled: !isCancelled
    })
    .then(({ data }) => {
      const updatedBookingsData = bookingsData.map(booking => {
        if (booking._id === data._id) {
          return data;
        }

        return booking;
      });

      renderBookings(updatedBookingsData);
      attachListenersToBookings();
      bookingsData = updatedBookingsData;
    });
}

axios.get(API_URL).then(({ data }) => {
  bookingsData = data;

  renderBookings(bookingsData);
  attachListenersToBookings();
});
