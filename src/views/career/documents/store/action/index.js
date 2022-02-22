import { paginateArray, 
  // sortCompare, 
  apiRequest, swal } from '@utils'


// ** Get all Admin
export const getAllAdmins = () => {
  return async dispatch => {
    const response = await apiRequest({ url: '/admin/get-admins', method: 'GET' }, dispatch)
    if (response) {
      if (response) {
        await dispatch({
          type: 'GET_ALL_ADMIN',
          data: response.data.data
        })
      } else {
        console.log(response.error)
      }
    } else {
      swal('Oops!', 'Somthing went wrong with your network.', 'error')
    }

  }
}

export const getFilteredData = (admins, params) => {
  return async dispatch => {
    const { q, perPage, page, role, status  } = params

    /* eslint-disable  */
    const queryLowered = q.toLowerCase()
    const filteredData = admins.filter(
      admin =>
        (admin.email.toLowerCase().includes(queryLowered) || admin.names.toLowerCase().includes(queryLowered)) &&
        admin.role === (role || admin.role) &&
        admin.status === (status || admin.status)
    )
    /* eslint-enable  */


    dispatch({
      type: 'GET_FILTERED_ADMIN_DATA',
      data: paginateArray(filteredData, perPage, page),
      totalPages: filteredData.length,
      params
    })
  }
}

  // get Admin Details
export const getAdmin = (id) => {
  return async dispatch => {
    const response = await apiRequest({ url: `/admin/get-admin-details/${id}`, method: 'GET' }, dispatch)
    console.log("res", response)
    if (response) {
      if (response.data.message === "Admin details retrived!") {
        await dispatch({
          type: 'GET_ADMIN',
          selectedAdmin: response.data.data
        })
      } else {
        console.log(response.error)
      }
    } else {
      swal('Oops!', 'Somthing went wrong with your network.', 'error')
    }

  }
}

// Change admin role
export const updateStatus = (id, status) => {
  return async dispatch => {
    const body = JSON.stringify({status})
    const response = await apiRequest({ url: `/admin/update-admin-status/${id}`, method: 'POST', body }, dispatch)
    console.log("status", response)
    if (response) {
      if (response.data.success) {
        swal('Good!', `${response.data.message}.`, 'success')
        dispatch(getAllAdmins())
      } else {
        swal('Oops!', `${response.data.message}.`, 'error')
      }
    } else {
      console.log(response.error)
      swal('Oops!', 'Somthing went wrong with your network.', 'error')
    }

  }
}