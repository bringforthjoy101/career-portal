// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedAdmin: null
}

const admins = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ADMIN':
      return { ...state, allData: action.data }
      case 'GET_FILTERED_ADMIN_DATA':
        return {
          ...state,
          data: action.data,
          total: action.totalPages,
          params: action.params
        }
      case 'GET_ADMIN':
        return { ...state, selectedAdmin: action.selectedAdmin }
    default:
      return { ...state }
  }
}
export default admins
