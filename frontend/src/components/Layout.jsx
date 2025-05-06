import React from 'react'
import {Outlet} from 'react-router-dom'
import { NavbarComp } from './NavbarComp'

export const Layout = () => {
  return (
    <>
      <NavbarComp/>

      <Outlet/>

    </>
  )
}
