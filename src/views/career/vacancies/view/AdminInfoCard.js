// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Badge } from 'reactstrap'
import { User, Check, Star, Phone } from 'react-feather'
import { Fragment } from 'react'

const roleColors = {
	control: 'light-info',
	support: 'light-success',
}

const statusColors = {
	open: 'light-success',
	closed: 'light-secondary',
}

const AdminInfoCard = ({ selectedVacancy }) => {
	// ** render user img

	const renderUserImg = () => {
		if (selectedVacancy !== null && selectedVacancy.avatar) {
			return <img src={selectedVacancy.avatar} alt="user-avatar" className="img-fluid rounded" height="104" width="104" />
		} else {
			const stateNum = Math.floor(Math.random() * 6),
				states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
				color = states[stateNum]
			return (
				<Avatar
					initials
					color={color}
					className="rounded"
					content={selectedVacancy.name}
					contentStyles={{
						borderRadius: 0,
						fontSize: 'calc(36px)',
						width: '100%',
						height: '100%',
					}}
					style={{
						height: '90px',
						width: '90px',
					}}
				/>
			)
		}
	}

	return (
		<Fragment>
			<Card>
				<CardBody>
					<Row>
						<Col xl="6" lg="12">
							<div className="user-avatar-section">
								<div className="d-flex align-items-center flex-column">
									{renderUserImg()}
									<div className="d-flex flex-column align-items-center text-center">
										<div className="user-info">
											<h4 className="mt-1">{selectedVacancy !== null ? selectedVacancy.name : 'Venite University Vacancy'}</h4>
											<Badge color={statusColors[selectedVacancy.status]} className="text-capitalize">
												{selectedVacancy.status}
											</Badge>
											<p>{selectedVacancy.applications.length} Applicants</p>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xl="6" lg="12" className="mt-2 mt-xl-0">
							<h4 className="fw-bolder border-bottom pb-50 mb-1">Description</h4>
							<div className="info-container">{selectedVacancy.description}</div>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Fragment>
	)
}

export default AdminInfoCard
