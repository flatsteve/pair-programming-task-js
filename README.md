# Airsorted Pair Programming Task

## Bookings Dashboard

#### Getting started:

1.  Get project: `git clone git@github.com:flatsteve/pair-programming-task.git`
2.  Change directory to project: `cd pair-programming-task`
3.  Install deps: `npm install` or `yarn`
4.  Start the app: `npm start` or `yarn start` - live reloading enabled, no need to refresh on change

#### Tasks

- [ ] Display a list of all bookings
- [ ] Order bookings by arrival time
- [ ] Allow a bookings to be cancelled/activated - change the style of the bookings to make this apparent
- [ ] Write a simple test to show that the list of bookings is rendered if data is returned
- [ ] Time permitting: talk about how this could be improved

#### Notes
* Bookings endpoint http://localhost:8000/bookings (accepts GET & PATCH only)
* GET returns array of all bookings for today (note weird Mongo DB _id instead of id property)
* PATCHING a booking will return the resource that changed
* API follows standard REST patterns e.g. updating a booking `/bookings/${id}` - body: { thing_that_changed: value}


