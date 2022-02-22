// ** React Imports
import { useContext, Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { Coffee } from 'react-feather'
// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
import Voki from '../../../assets/images/logo/voki.png'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Button, CardText, CardTitle, UncontrolledTooltip, Spinner } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<Coffee size={12} />} />
				<h6 className="toast-title fw-bold">Welcome, {name}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>You have successfully logged in as an {role} user to VOKI Academy. Now you can start to explore. Enjoy!</span>
		</div>
	</Fragment>
)

const ToastError = ({ message }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<Coffee size={12} />} />
				<h6 className="toast-title font-weight-bold">{message}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>Pls, reconfirm login credentials</span>
		</div>
	</Fragment>
)

const defaultValues = {
	password: '',
	loginEmail: '',
}

const Login = () => {
	// ** Hooks
	const { skin } = useSkin()
	const dispatch = useDispatch()
	const history = useHistory()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const ability = useContext(AbilityContext)
	const {
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues })
	const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
		source = require(`@src/assets/images/pages/${illustration}`).default

	const onSubmit = (data) => {
		if (Object.values(data).every((field) => field.length > 0)) {
			setIsSubmitting(true)
			useJwt
				.login({
					email: data.loginEmail,
					password: data.password,
				})
				.then((res) => {
					if (res.data.message === 'Login successfull' && res.data.data.admin.status === 'active') {
						const data = {
							...res.data.data.admin,
							accessToken: res.data.data.token,
							ability: [{ action: 'manage', subject: 'all' }],
						}
						dispatch(handleLogin(data))
						ability.update(data.ability)
						history.push(getHomeRouteForLoggedInUser(data.role))
						toast.success(<ToastContent name={data.names || 'John Doe'} role={data.role || 'admin'} />, {
							icon: false,
							transition: Slide,
							hideProgressBar: true,
							autoClose: 2000,
						})
					} else if (res.data.message === 'Login successfull' && res.data.data.admin.status === 'inactive') {
						const data = {
							...res.data.data.admin,
							accessToken: res.data.data.token,
							ability: [{ action: 'manage', subject: 'all' }],
						}
						dispatch(handleLogin(data))
						ability.update(data.ability)
						history.push('pages/account-settings')
						toast.success(<ToastContent name={data.names || 'John Doe'} role={data.role || 'admin'} />, {
							icon: false,
							transition: Slide,
							hideProgressBar: true,
							autoClose: 2000,
						})
					} else {
						console.log('res')
						toast.error(<ToastError message={`${res.data.message}` || 'Invalid Login'} />, {
							icon: false,
							transition: Slide,
							hideProgressBar: true,
							autoClose: 2000,
						})
					}
				})
				.catch((err) => {
					console.log(err)
					setIsSubmitting(false)
				})
		} else {
			for (const key in data) {
				if (data[key].length === 0) {
					setError(key, {
						type: 'manual',
					})
				}
			}
		}
	}

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
							Welcome to VOKI Academy! 👋
						</CardTitle>
						<CardText className="mb-2">Please sign-in to your account and start the adventure</CardText>
						<Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-1">
								<Label className="form-label" for="login-email">
									Email
								</Label>
								<Controller
									id="loginEmail"
									name="loginEmail"
									control={control}
									render={({ field }) => (
										<Input autoFocus type="email" placeholder="john@example.com" invalid={errors.loginEmail && true} {...field} />
									)}
								/>
							</div>
							<div className="mb-1">
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="login-password">
										Password
									</Label>
									<Link to="/forgot-password">
										<small>Forgot Password?</small>
									</Link>
								</div>
								<Controller
									id="password"
									name="password"
									control={control}
									render={({ field }) => <InputPasswordToggle className="input-group-merge" invalid={errors.password && true} {...field} />}
								/>
							</div>
							<div className="form-check mb-1">
								<Input type="checkbox" id="remember-me" />
								<Label className="form-check-label" for="remember-me">
									Remember Me
								</Label>
							</div>
							<Button type="submit" color="primary" block disabled={isSubmitting}>
								{isSubmitting && <Spinner color="white" size="sm" />}
								Sign in
							</Button>
						</Form>
					</Col>
				</Col>
			</Row>
		</div>
	)
}

export default Login
