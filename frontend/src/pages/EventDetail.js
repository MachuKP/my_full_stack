import { Suspense } from "react";
import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");

  const loading = <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <Suspense fallback={loading}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={loading}>
        <Await resolve={events}>
          {(loadEvent) => <EventsList events={loadEvent} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadSingleEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch event." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const eventId = params.eventId;

  return defer({
    event: await loadSingleEvent(eventId),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return redirect('/events');
  }
}
