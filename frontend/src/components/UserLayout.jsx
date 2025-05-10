import React from 'react'
import {Outlet} from 'react-router-dom'
import { NavbarUser } from './NavbarUser'

export const UserLayout = () => {
  return (
    <>
      <NavbarUser/>

      <Outlet/>

    </>
  )
}
