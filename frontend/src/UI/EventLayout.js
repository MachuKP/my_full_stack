import React from 'react'
import { Outlet } from 'react-router-dom'
import EventsNavigation from '../components/EventsNavigation'

const EventLayout = () => {
  return (
    <div>
        <EventsNavigation />
        <Outlet />
    </div>
  )
}

export default EventLayout