import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div className='w-full'>
        <ul className='flex justify-center gap-5 pt-5'>
            <li className='text-xl font-semibold  bg-red-300 p-3 rounded-md'>
              <NavLink to="/event-registration-form" activeClassName="active-link">
                Event Registration Form
              </NavLink>
            </li>
            <li className='text-xl font-semibold bg-red-300 p-3 rounded-md'>
              <NavLink to="/job-regsitration-form" activeClassName="active-link">
                Job Registration Form
              </NavLink>
            </li>
            <li className='text-xl font-semibold  bg-red-300 p-3 rounded-md'>
              <NavLink to="/survey-registration-form" activeClassName="active-link">
                Survey Registration Form
              </NavLink>
            </li>
        </ul>
    </div>
  )
}
