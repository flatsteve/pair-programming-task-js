import axios from "axios";

import { API_URL } from "./utils";
import {
  attachListenersToBookings,
  renderBookings,
  createBookingElement
} from "./interface";

axios.get(API_URL).then(({ data }) => {
  renderBookings(data);
  attachListenersToBookings();
});
