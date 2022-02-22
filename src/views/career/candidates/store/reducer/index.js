// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedCandidate: null,
}

const candidate = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_CANDIDATES':
			return { ...state, allData: action.data }
		case 'GET_FILTERED_CANDIDATES_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_CANDIDATE':
			return { ...state, selectedCandidate: action.selectedCandidate }
		default:
			return { ...state }
	}
}
export default candidate
