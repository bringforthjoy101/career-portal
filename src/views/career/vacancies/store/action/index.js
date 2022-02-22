import {
	paginateArray,
	// sortCompare,
	apiRequest,
	swal,
} from '@utils'

// ** Get all Vacancy
export const getAllVacancies = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/vacancies', method: 'GET' }, dispatch)
		if (response) {
			if (response) {
				await dispatch({
					type: 'GET_ALL_VACANCIES',
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

export const getFilteredData = (vacancies, params) => {
	return async (dispatch) => {
		const { q, perPage, page, role, status } = params

		/* eslint-disable  */
		const queryLowered = q.toLowerCase()
		const filteredData = vacancies.filter(
			(vacancy) => vacancy.name.toLowerCase().includes(queryLowered) && vacancy.status === (status || vacancy.status)
		)
		/* eslint-enable  */

		dispatch({
			type: 'GET_FILTERED_VACANCIES_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

// get Vacancy Details
export const getVacancy = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/vacancies/get-details/${id}`, method: 'GET' }, dispatch)
		console.log('res', response)
		if (response) {
			if (response.data.message === 'Vacancy details retrived!') {
				await dispatch({
					type: 'GET_VACANCY',
					selectedVacancy: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

// Change vacancy role
export const updateStatus = (id, status) => {
	return async (dispatch) => {
		const body = JSON.stringify({ status })
		const response = await apiRequest({ url: `/vacancy/update-vacancy-status/${id}`, method: 'POST', body }, dispatch)
		console.log('status', response)
		if (response) {
			if (response.data.success) {
				swal('Good!', `${response.data.message}.`, 'success')
				dispatch(getAllVacancies())
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			console.log(response.error)
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}
