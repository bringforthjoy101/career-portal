// ** React Imports
import { useEffect, useState } from 'react'
import {
	useParams,
	// Link
} from 'react-router-dom'
// import moment from 'moment'

// ** Store & Actions
import { getVacancy } from '../store/action'
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
	const store = useSelector((state) => state.vacancies),
		dispatch = useDispatch(),
		{ id } = useParams()
	const [userData, setUserData] = useState(null)

	// ** Get Admin on mount
	useEffect(() => {
		dispatch(getVacancy(id))
	}, [dispatch])

	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem('userData')))
		}
	}, [])

	return store.selectedVacancy !== null && store.selectedVacancy !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col xl="9" lg="8" md="7">
					<AdminInfoCard selectedVacancy={store.selectedVacancy} />
				</Col>
				{/* {userData?.type === 'admin' ? ( */}
				<Col xl="3" lg="4" md="5">
					<PlanCard selectedVacancy={store.selectedVacancy} />
				</Col>
				{/* // ) : (
				// 	''
				// )} */}
			</Row>
		</div>
	) : (
		''
	)
}
export default AdminView
