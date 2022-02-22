// ** React Imports
import { Link, useRouteMatch } from 'react-router-dom'
import { Fragment } from 'react'
import { ChevronsLeft, Menu } from 'react-feather'

// ** Reactstrap Imports
import { NavItem,  NavLink } from 'reactstrap'

const NavbarBookmarks = props => {
  const route = useRouteMatch()

  // ** Props
  const { setMenuVisibility } = props

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      {" "}
      {route && route.url === "/travoofy/admin/list" ? (
        <h2 style={{marginTop: "0.6rem", marginLeft: "0.5rem"}}>Admin List</h2>
      ) : route && route.url === "/travoofy/admin/view" ? (
        <div className="d-flex justify-content-space-between">
          <Link to='/travoofy/admin/list'>
            <ChevronsLeft size={30} />
          </Link>
          <h2 style={{marginTop: "0.6rem", marginLeft: "0.5rem"}}>Admin Details</h2>
        </div>
      )  : (
        <h2 style={{marginTop: "0.6rem", marginLeft: "0.5rem"}}>Dashboard Analytics</h2>
      )}
    </Fragment>
  )
}

export default NavbarBookmarks
