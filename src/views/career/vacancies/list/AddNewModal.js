// ** React Imports
import { useEffect, useState } from 'react'
// ** Third Party Components
import { User, Briefcase, Mail, X, Phone, Lock, UserPlus } from 'react-feather'
import { useDispatch } from 'react-redux'
import Flatpickr from 'react-flatpickr'
import { getAllVacancies } from '../store/action'
import { selectThemeColors, swal, apiRequest } from '@utils'
// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Form, Spinner, Col } from 'reactstrap'
import Select from 'react-select'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal }) => {
	const dispatch = useDispatch()
	const [isSubmitting, setIsSubmitting] = useState(false)

	// ** Function to handle form submit
	const onSubmit = async (event) => {
		event?.preventDefault()
		const form = event.target
		const vacancyData = {
			name: form.name.value,
			description: form.description.value,
			closedAt: form.closedAt.value,
		}

		const body = JSON.stringify(vacancyData)
		try {
			setIsSubmitting(true)
			const response = await apiRequest({ url: '/vacancies/create', method: 'POST', body }, dispatch)
			if (response) {
				console.log('res', response)
				if (response.data.status) {
					swal('Great job!', response.data.message, 'success')
					dispatch(getAllAdmins())
					setIsSubmitting(false)
				} else {
					swal('Oops!', response.data.message, 'error')
				}
			} else {
				swal('Oops!', 'Something went wrong with your network.', 'error')
			}
		} catch (error) {
			console.error({ error })
		}
	}

	useEffect(() => {
		// onSubmit()
		dispatch(getAllVacancies())
	}, [dispatch])

	// ** Custom close btn
	const CloseBtn = <X className="cursor-pointer" size={15} onClick={handleModal} />

	const [picker, setPicker] = useState(new Date())

	return (
		<Modal isOpen={open} toggle={handleModal} className="sidebar-sm" modalClassName="modal-slide-in" contentClassName="pt-0">
			<ModalHeader className="mb-1" toggle={handleModal} close={CloseBtn} tag="div">
				<h5 className="modal-title">New Vacancy</h5>
			</ModalHeader>
			<ModalBody className="flex-grow-1">
				<Form onSubmit={onSubmit}>
					<div className="mb-1">
						<Label className="form-label" for="names">
							Vacancy Title
						</Label>
						<InputGroup>
							<InputGroupText>
								<User size={15} />
							</InputGroupText>
							<Input id="names" name="names" placeholder="Bruce Wayne" />
						</InputGroup>
					</div>
					<div className="mb-1">
						<Label className="form-label" for="email">
							Description
						</Label>
						<InputGroup>
							<InputGroupText>
								<Mail size={15} />
							</InputGroupText>
							<Input type="textarea" id="description" name="description" placeholder="brucewayne@email.com" />
						</InputGroup>
					</div>
					<div className="mb-1">
						<Label className="form-label" for="role">
							Closing Date
						</Label>
						<InputGroup>
							<InputGroupText>
								<UserPlus size={15} />
							</InputGroupText>
							<div className="react-select form-control p-0">
								<Flatpickr
									value={picker}
									data-enable-time
									id="date-time-picker"
									name="closedAt"
									className="form-control"
									onChange={(date) => setPicker(date)}
								/>
							</div>
						</InputGroup>
					</div>
					<Button className="me-1" color="primary" disabled={isSubmitting}>
						{isSubmitting && <Spinner color="white" size="sm" />}
						Submit
					</Button>
					<Button color="secondary" outline onClick={handleModal}>
						Cancel
					</Button>
				</Form>
			</ModalBody>
		</Modal>
	)
}

export default AddNewModal
