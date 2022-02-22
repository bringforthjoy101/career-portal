// ** React Imports
import { useEffect, useState } from 'react'
import {
	useParams,
	// Link
} from 'react-router-dom'
// import moment from 'moment'

// ** Store & Actions
import { getApplication } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
// import { isUserLoggedIn } from '@utils'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import AdminInfoCard from './AdminInfoCard'
import ListDocuments from './ListDocs'
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const AdminView = () => {
	// ** Vars
	const store = useSelector((state) => state.applications),
		dispatch = useDispatch(),
		{ id } = useParams()
	const [userData, setUserData] = useState(null)

	// ** Get Admin on mount
	useEffect(() => {
		dispatch(getApplication(id))
	}, [dispatch])

	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem('userData')))
		}
	}, [])

	return store.selectedApplication !== null && store.selectedApplication !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col xl="9" lg="8" md="7">
					<AdminInfoCard selectedApplication={store.selectedApplication} />
				</Col>
				<Col xl="3" lg="4" md="5">
					<PlanCard selectedApplication={store.selectedApplication} />
				</Col>
			</Row>
			<Row>
				<Col xl="9" lg="8" md="7">
					<ListDocuments candidate={store.selectedApplication.candidate} documents={store.selectedApplication.candidate.documents} />
				</Col>
			</Row>
		</div>
	) : (
		''
	)
}
export default AdminView
