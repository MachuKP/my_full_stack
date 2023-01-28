import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  const loading = (
    <p style={{textAlign: 'center'}}>Loading...</p>
  )
  return (
    <Suspense fallback={loading}>
      <Await resolve={events}>
        {(loaderEvent) => <EventsList events={loaderEvent} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage;

const EventLoader = async() => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' },
      { status: 500 }
    )
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: EventLoader()
  })
}
