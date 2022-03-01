// ** Reactstrap
import { useState } from 'react'
import { Button, Card, CardHeader, CardBody, Spinner } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { swal, apiRequest } from '@utils'
import { UpdateStatus } from './UpdateStatus'
import { getVacancy } from '../store/action'

const PlanCard = ({ selectedVacancy }) => {
	const user = JSON.parse(localStorage.getItem('userData'))
	const dispatch = useDispatch()
	const { id } = useParams()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const applied = selectedVacancy.applications.find((application) => {
		return application.candidateId === Number(user.id) ? true : false
	})
		? true
		: false
	const applyForJob = async () => {
		setIsSubmitting(true)
		const body = JSON.stringify({ vacancyId: id })
		const response = await apiRequest({ url: `/applications/create`, method: 'POST', body }, dispatch)
		if (response) {
			console.log('res', response)
			if (response.data.status) {
				swal('Great job!', response.data.message, 'success')
				dispatch(getVacancy(id))
				setIsSubmitting(false)
			} else {
				swal('Oops!', response.data.message, 'error')
			}
		} else {
			swal('Oops!', 'Something went wrong with your network.', 'error')
		}
	}
	return (
		<Card className="d-flex justify-content-between align-items-center border-primary">
			<CardHeader className="d-flex justify-content-between align-items-center pt-75 pb-1">
				<h5 className="mb-0">Actions</h5>
			</CardHeader>
			<CardBody>
				{user.type === 'admin' ? <UpdateStatus /> : ''}
				{user.type === 'candidate' ? (
					<Button className="mt-1" color="info" onClick={applyForJob} outline disabled={isSubmitting || applied}>
						{isSubmitting && <Spinner color="white" size="sm" />}
						{applied ? 'Applied' : 'Apply'}
					</Button>
				) : (
					''
				)}
			</CardBody>
		</Card>
	)
}

export default PlanCard
