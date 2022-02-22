// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedVacancy: null,
}

const vacancy = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_VACANCIES':
			return { ...state, allData: action.data }
		case 'GET_FILTERED_VACANCIES_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_VACANCY':
			return { ...state, selectedVacancy: action.selectedVacancy }
		default:
			return { ...state }
	}
}
export default vacancy
