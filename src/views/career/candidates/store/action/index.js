import {
	paginateArray,
	// sortCompare,
	apiRequest,
	swal,
} from '@utils'

// ** Get all Candidate
export const getAllCandidates = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/admin/get-candidates', method: 'GET' }, dispatch)
		if (response) {
			if (response) {
				await dispatch({
					type: 'GET_ALL_CANDIDATES',
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

export const getFilteredData = (candidates, params) => {
	return async (dispatch) => {
		const { q, perPage, page, role, status } = params

		/* eslint-disable  */
		const queryLowered = q.toLowerCase()
		const filteredData = candidates.filter(
			(candidate) => candidate.name.toLowerCase().includes(queryLowered) && candidate.status === (status || candidate.status)
		)
		/* eslint-enable  */

		dispatch({
			type: 'GET_FILTERED_CANDIDATES_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

// get Candidate Details
export const getCandidate = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/admin/get-candidate-details/${id}`, method: 'GET' }, dispatch)
		console.log('res', response)
		if (response) {
			if (response.data.message === 'Candidate details retrived!') {
				await dispatch({
					type: 'GET_CANDIDATE',
					selectedCandidate: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

// Change candidate role
export const updateStatus = (id, status) => {
	return async (dispatch) => {
		const body = JSON.stringify({ status })
		const response = await apiRequest({ url: `/candidate/update-candidate-status/${id}`, method: 'POST', body }, dispatch)
		console.log('status', response)
		if (response) {
			if (response.data.success) {
				swal('Good!', `${response.data.message}.`, 'success')
				dispatch(getAllCandidates())
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			console.log(response.error)
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}
