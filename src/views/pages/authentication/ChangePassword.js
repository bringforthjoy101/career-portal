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
import Voki from '../../../assets/images/logo/voki.png'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const tokens = localStorage.getItem('optToken')

const ForgotPassword = () => {
	const history = useHistory()

	// ** Hooks
	const { skin } = useSkin()
	const [password, setPassword] = useState('')
	const [confirm_password, setConfirm_password] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onSubmit = async (event) => {
		event?.preventDefault()

		const body = {
			password,
			confirmPassword: confirm_password,
			token: tokens,
		}
		console.log('body', body)
		try {
			setIsSubmitting(true)
			const response = await axios.post('https://devapi.travoofy.com/admin/change-password', body)
			console.log('mess', response)
			if (response.data.message) {
				swal('Great job!', response.data.message, 'success')
				setIsSubmitting(false)
				setConfirm_password('')
				setPassword('')
				history.push('/')
			} else if (response.status === false) {
				swal('Oops!', response.message, 'error')
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
								Change Password? 🔒
							</CardTitle>
							<CardText className="mb-2">Enter a new pasword to change your password.</CardText>
							<Form className="auth-forgot-password-form mt-2" onSubmit={onSubmit}>
								<div className="mb-1">
									<Label className="form-label" for="password">
										Password
									</Label>
									<Input
										required
										type="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="*****"
										autoFocus
									/>
								</div>
								<div className="mb-1">
									<Label className="form-label" for="confirm_password">
										Confirm Password
									</Label>
									<Input
										required
										type="password"
										id="oconfirm_password"
										value={confirm_password}
										onChange={(e) => setConfirm_password(e.target.value)}
										placeholder="*****"
										autoFocus
									/>
								</div>
								<Button color="primary" block disabled={isSubmitting}>
									{isSubmitting && <Spinner color="white" size="sm" />}
									Change Password
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
