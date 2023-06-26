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
	active: 'light-success',
	inactive: 'light-danger',
}

const AdminInfoCard = ({ selectedAdmin }) => {
	// ** render user img

	const renderUserImg = () => {
		if (selectedAdmin !== null && selectedAdmin.avatar) {
			return <img src={selectedAdmin.avatar} alt="user-avatar" className="img-fluid rounded" height="104" width="104" />
		} else {
			const stateNum = Math.floor(Math.random() * 6),
				states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
				color = states[stateNum]
			return (
				<Avatar
					initials
					color={color}
					className="rounded"
					content={selectedAdmin.names}
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
											<h4 className="mb-0">{selectedAdmin !== null ? selectedAdmin.names : 'Venite University Admin'}</h4>
											{selectedAdmin !== null ? (
												<Badge color={roleColors[selectedAdmin.role]} className="text-capitalize">
													{selectedAdmin.role}
												</Badge>
											) : null}
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xl="6" lg="12" className="mt-2 mt-xl-0">
							<h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
							<div className="info-container">
								<ul className="list-unstyled">
									<li className="mb-75">
										<span className="fw-bolder me-25">Username:</span>
										<span>{selectedAdmin.names}</span>
									</li>
									<li className="mb-75">
										<span className="fw-bolder me-25">Admin Email:</span>
										<span>{selectedAdmin.email}</span>
									</li>
									<li className="mb-75">
										<span className="fw-bolder me-25">Admin Status:</span>
										<Badge className="text-capitalize" color={statusColors[selectedAdmin.status]}>
											{selectedAdmin.status}
										</Badge>
									</li>
									<li className="mb-75">
										<span className="fw-bolder me-25">Admin Contact:</span>
										<span>{selectedAdmin.phone}</span>
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
