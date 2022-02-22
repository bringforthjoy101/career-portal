import {
	useState,
	// useEffect
} from 'react'
// ** React Imports
import { Link, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, Spinner } from 'reactstrap'

// ** Utils
import { isUserLoggedIn, swal } from '@utils'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import Voki from '../../../assets/images/logo/voki.png'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ForgotPassword = () => {
	const history = useHistory()

	// ** Hooks
	const { skin } = useSkin()
	const [email, setEmail] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onSubmit = async (event) => {
		event?.preventDefault()

		const body = {
			email,
		}
		try {
			setIsSubmitting(true)
			const response = await axios.post('https://devapi.travoofy.com/admin/reset-password', body)
			localStorage.setItem('optToken', response.data.data)
			localStorage.setItem('client', email)
			if (response.data.message) {
				swal('Great job!', response.data.message, 'success')
				setIsSubmitting(false)
				setEmail('')
				history.push('/pages/verify-otp')
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
						<img src={Voki} style={{ width: '100px' }} alt="logo" />
					</Link>
					<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
						<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
							<img className="img-fluid" src={source} alt="Login Cover" />
						</div>
					</Col>
					<Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
						<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
							<CardTitle tag="h2" className="fw-bold mb-1">
								Forgot Password? 🔒
							</CardTitle>
							<CardText className="mb-2">Enter your email and we'll send you instructions to reset your password</CardText>
							<Form className="auth-forgot-password-form mt-2" onSubmit={onSubmit}>
								<div className="mb-1">
									<Label className="form-label" for="login-email">
										Email
									</Label>
									<Input
										required
										type="email"
										id="login-email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="john@example.com"
										autoFocus
									/>
								</div>
								<Button color="primary" block disabled={isSubmitting}>
									{isSubmitting && <Spinner color="white" size="sm" />}
									Send reset link
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
