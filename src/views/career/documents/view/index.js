// ** React Imports
import { useEffect, useState } from 'react'
import { useParams
  // Link 
} from 'react-router-dom'
// import moment from 'moment'

// ** Store & Actions
import { getAdmin } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
// import { isUserLoggedIn } from '@utils'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import AdminInfoCard from './AdminInfoCard'
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const AdminView = () => {
  // ** Vars
  const store = useSelector(state => state.travoofyAdmins),
    dispatch = useDispatch(),
    { id } = useParams()
    const [userData, setUserData] = useState(null)

  // ** Get Admin on mount
  useEffect(() => {
    dispatch(getAdmin(id))
  }, [dispatch])


  useEffect(() => {
    if (isUserLoggedIn() !== null) {
     setUserData(JSON.parse(localStorage.getItem('userData')))
   }
 }, [])

  return store.selectedAdmin !== null && store.selectedAdmin !== undefined ? (
    <div className='app-user-view'>
      <Row>
        {userData?.role === "control" ? <Col xl='3' lg='4' md='5'>
          <PlanCard selectedAdmin={store.selectedAdmin} />
        </Col> : ""}
        <Col xl='9' lg='8' md='7'>
          <AdminInfoCard selectedAdmin={store.selectedAdmin} />
        </Col>
      </Row>
    </div>
  ) : ""
}
export default AdminView
