// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
    <NavItem>
      <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
        <Lock size={18} className='me-50' />
        <span className='fw-bold'>Update Password</span>
      </NavLink>
    </NavItem>
      {/* <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <User size={18} className='me-50' />
          <span className='fw-bold'>Change Password</span>
        </NavLink>
      </NavItem> */}
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('3')}>
          <User size={18} className='me-50' />
          <span className='fw-bold'>Account</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
