import {
	useState,
	// useEffect
} from 'react'
// ** React Imports
import { Link, Redirect, useHistory } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, Spinner } from 'reactstrap'
import axios from 'axios'
// ** Utils
import { isUserLoggedIn, swal } from '@utils'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import Venite from '../../../assets/images/logo/venite-logo-colored.png'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ForgotPassword = () => {
	const history = useHistory()
	// ** Hooks
	const { skin } = useSkin()
	const [otp, setOtp] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const tokens = localStorage.getItem('optToken')
	const email = localStorage.getItem('client')

	const onSubmit = async (event) => {
		event?.preventDefault()
		console.log('res', event)

		const body = {
			otp,
			token: tokens,
			client: email,
			type: 'reset',
		}
		console.log('body', body)
		try {
			setIsSubmitting(true)
			const response = await axios.post('https://devapi.travoofy.com/verify-otp', body)
			if (response.data.message) {
				swal('Great job!', response.data.message, 'success')
				setIsSubmitting(false)
				setOtp('')
				history.push('/pages/change-password')
			} else {
				swal('Oops!', response.data.message, 'error')
			}
		} catch (error) {
			console.error({ error })
		}
	}

	const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
		source = require(`@src/assets/images/pages/${illustration}`).default

	if (!isUserLoggedIn()) {
		return (
			<div className="auth-wrapper auth-cover">
				<Row className="auth-inner m-0">
					<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
						<img src={Venite} style={{ width: '100px' }} alt="logo" />
					</Link>
					<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
						<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
							<img className="img-fluid" src={source} alt="Login Cover" />
						</div>
					</Col>
					<Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
						<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
							<CardTitle tag="h2" className="fw-bold mb-1">
								Verify OTP? 🔒
							</CardTitle>
							<CardText className="mb-2">Enter the OTP sent to your mail to continue.</CardText>
							<Form className="auth-forgot-password-form mt-2" onSubmit={onSubmit}>
								<div className="mb-1">
									<Label className="form-label" for="otp">
										OTP
									</Label>
									<Input required type="number" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="12345" autoFocus />
								</div>
								<Button color="primary" block disabled={isSubmitting}>
									{isSubmitting && <Spinner color="white" size="sm" />}
									Verify Otp
								</Button>
							</Form>
							<p className="text-center mt-2">
								<Link to="/login">
									<ChevronLeft className="rotate-rtl me-25" size={14} />
									<span className="align-middle">Back to login</span>
								</Link>
							</p>
						</Col>
					</Col>
				</Row>
			</div>
		)
	} else {
		return <Redirect to="/" />
	}
}

export default ForgotPassword
