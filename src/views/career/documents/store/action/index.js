import {
	paginateArray,
	// sortCompare,
	apiRequest,
	swal,
} from '@utils'

// ** Get all Document
export const getAllDocuments = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/documents', method: 'GET' }, dispatch)
		if (response) {
			if (response) {
				await dispatch({
					type: 'GET_ALL_DOCUMENT',
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

export const getFilteredData = (documents, params) => {
	return async (dispatch) => {
		const { q, perPage, page, role, status } = params

		/* eslint-disable  */
		const queryLowered = q.toLowerCase()
		const filteredData = documents.filter((document) => document.name.toLowerCase().includes(queryLowered))
		/* eslint-enable  */

		dispatch({
			type: 'GET_FILTERED_DOCUMENT_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

// get Document Details
export const getDocument = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/documents/get-details/${id}`, method: 'GET' }, dispatch)
		console.log('res', response)
		if (response) {
			if (response.data.message === 'Document details retrived!') {
				await dispatch({
					type: 'GET_DOCUMENT',
					selectedDocument: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

// Change document role
export const updateStatus = (id, status) => {
	return async (dispatch) => {
		const body = JSON.stringify({ status })
		const response = await apiRequest({ url: `/document/update-document-status/${id}`, method: 'POST', body }, dispatch)
		console.log('status', response)
		if (response) {
			if (response.data.success) {
				swal('Good!', `${response.data.message}.`, 'success')
				dispatch(getAllDocuments())
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			console.log(response.error)
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}
