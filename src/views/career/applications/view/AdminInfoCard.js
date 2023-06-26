// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Badge } from 'reactstrap'
import { User, Check, Star, Phone } from 'react-feather'
import { Fragment } from 'react'
import moment from 'moment'

const statusColors = {
	approved: 'light-success',
	declined: 'light-danger',
	pending: 'light-warning',
}

const AdminInfoCard = ({ selectedApplication }) => {
	// ** render user img
	const renderUserImg = () => {
		const stateNum = Math.floor(Math.random() * 6),
			states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
			color = states[stateNum]
		return (
			<Avatar
				initials
				color={color}
				className="rounded"
				content={selectedApplication.candidate.names}
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
											<h4 className="mb-1 mt-1">{selectedApplication.candidate.names || 'Venite University Admin'}</h4>
											<p>
												{selectedApplication.candidate.phone} | {selectedApplication.candidate.email}
											</p>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xl="6" lg="12" className="mt-2 mt-xl-0">
							<h4 className="fw-bolder border-bottom pb-50 mb-1">Application Details</h4>
							<div className="info-container">
								<ul className="list-unstyled">
									<li className="mb-75">
										<span className="fw-bolder me-25">Vacancy Title:</span>
										<span>{selectedApplication.vacancy.name}</span>
									</li>
									<li className="mb-75">
										<span className="fw-bolder me-25">Date Applied:</span>
										<span>{moment(selectedApplication.createdAt).format('LLL')}</span>
									</li>
									<li className="mb-75">
										<span className="fw-bolder me-25">Application Status:</span>
										<Badge className="text-capitalize" color={statusColors[selectedApplication.status]}>
											{selectedApplication.status}
										</Badge>
									</li>
								</ul>
							</div>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Fragment>
	)
}

export default AdminInfoCard
