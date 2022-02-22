import {
	paginateArray,
	// sortCompare,
	apiRequest,
	swal,
} from '@utils'

// ** Get all Application
export const getAllApplications = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/applications', method: 'GET' }, dispatch)
		if (response) {
			if (response) {
				await dispatch({
					type: 'GET_ALL_APPLICATIONS',
					data: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

export const getFilteredData = (applications, params) => {
	return async (dispatch) => {
		const { q, perPage, page, role, status } = params

		/* eslint-disable  */
		const queryLowered = q.toLowerCase()
		const filteredData = applications.filter(
			(application) => application.name.toLowerCase().includes(queryLowered) && application.status === (status || application.status)
		)
		/* eslint-enable  */

		dispatch({
			type: 'GET_FILTERED_APPLICATIONS_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

// get Application Details
export const getApplication = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/applications/get-details/${id}`, method: 'GET' }, dispatch)
		console.log('res', response)
		if (response) {
			if (response.data.message === 'Application details retrived!') {
				await dispatch({
					type: 'GET_APPLICATION',
					selectedApplication: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

// Change application role
export const updateStatus = (id, status) => {
	return async (dispatch) => {
		const body = JSON.stringify({ status })
		const response = await apiRequest({ url: `/application/update-application-status/${id}`, method: 'POST', body }, dispatch)
		console.log('status', response)
		if (response) {
			if (response.data.success) {
				swal('Good!', `${response.data.message}.`, 'success')
				dispatch(getAllApplications())
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			console.log(response.error)
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}
