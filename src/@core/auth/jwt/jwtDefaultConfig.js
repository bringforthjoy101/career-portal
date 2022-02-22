// Api Url
export const apiUrl = process.env.REACT_APP_API_ENDPOINT

// ** Auth Endpoints
export default {
	refreshEndpoint: '/jwt/refresh-token',
	logoutEndpoint: '/jwt/logout',
	registerEndpoint: `${apiUrl}/candidate/register`,
	loginEndpoint: `${apiUrl}/candidate/login`,
	adminRegisterEndpoint: `${apiUrl}/admin/register`,
	adminLoginEndpoint: `${apiUrl}/admin/login`,

	// ** This will be prefixed in authorization header with token
	// ? e.g. Authorization: Bearer <token>
	tokenType: 'Bearer',

	// ** Value of this property will be used as key to store JWT token in storage
	storageTokenKeyName: 'accessToken',
	storageRefreshTokenKeyName: 'refreshToken',
}
