// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedApplication: null,
}

const application = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_APPLICATIONS':
			return { ...state, allData: action.data }
		case 'GET_FILTERED_APPLICATIONS_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_APPLICATION':
			return { ...state, selectedApplication: action.selectedApplication }
		default:
			return { ...state }
	}
}
export default application
