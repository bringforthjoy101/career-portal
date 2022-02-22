// ** Logo
// import logo from '@src/assets/images/logo/logo.png'
import logo from '@src/assets/images/logo/voki.png'

const SpinnerComponent = () => {
	return (
		<div className="fallback-spinner app-loader">
			<img className="fallback-logo" src={logo} style={{ width: '200px' }} alt="logo" />
			<div className="loading">
				<div className="effect-1 effects"></div>
				<div className="effect-2 effects"></div>
				<div className="effect-3 effects"></div>
			</div>
		</div>
	)
}

export default SpinnerComponent
