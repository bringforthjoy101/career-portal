// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'

// ** Table Data & Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllVacancies, getFilteredData } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus } from 'react-feather'
import Select from 'react-select'

// ** Reactstrap Imports
import { Row, Col, Card, Input, Label, Button, CardTitle, CardHeader, CardBody } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header
const CustomHeader = ({ handleModal }) => {
	const userData = JSON.parse(localStorage.getItem('userData'))

	return (
		<div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
			<Row>
				{/* <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col> */}

				<Col
					xl="12"
					className="d-flex align-items-sm-center justify-content-xl-end justify-content-end align-items-center flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0"
				>
					{userData.type === 'admin' ? (
						<Button className="ms-2" color="primary" onClick={handleModal}>
							<Plus size={15} />
							<span className="align-middle ms-50">Create Vacancy</span>
						</Button>
					) : (
						''
					)}
				</Col>
			</Row>
		</div>
	)
}

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
	<div className="form-check">
		<Input type="checkbox" ref={ref} {...props} />
	</div>
))

const DataTableWithButtons = () => {
	// ** Store Vars
	const dispatch = useDispatch()
	const store = useSelector((state) => state.vacancies)

	// ** States
	const [modal, setModal] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchTerm, setSearchTerm] = useState('')
	const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role', number: 0 })
	const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })

	useEffect(() => {
		dispatch(getAllVacancies())
		dispatch(
			getFilteredData(store.allData, {
				page: currentPage,
				perPage: rowsPerPage,
				role: currentRole.value,
				status: currentStatus.value,
				q: searchTerm,
			})
		)
	}, [dispatch])

	// ** User filter options
	const roleOptions = [
		{ value: '', label: 'Select Role', number: 0 },
		{ value: 'control', label: 'Control Admin', number: 1 },
		{ value: 'support', label: 'Support Admin', number: 2 },
	]

	const statusOptions = [
		{ value: '', label: 'Select Status', number: 0 },
		{ value: 'open', label: 'Open', number: 1 },
		{ value: 'closed', label: 'Closed', number: 2 },
	]

	// ** Function to handle Modal toggle
	const handleModal = () => {
		//   console.log("e", e)
		setModal(!modal)
	}

	// ** Function in get data on page change
	const handlePagination = (page) => {
		dispatch(
			getFilteredData(store.allData, {
				page: page.selected + 1,
				perPage: rowsPerPage,
				role: currentRole.value,
				status: currentStatus.value,
				q: searchTerm,
			})
		)
		setCurrentPage(page.selected + 1)
	}

	// ** Function in get data on rows per page
	const handlePerPage = (e) => {
		const value = parseInt(e.currentTarget.value)
		dispatch(
			getFilteredData(store.allData, {
				page: currentPage,
				perPage: value,
				role: currentRole.value,
				status: currentStatus.value,
				q: searchTerm,
			})
		)
		setRowsPerPage(value)
	}

	// ** Function in get data on search query change
	const handleFilter = (val) => {
		setSearchTerm(val)
		dispatch(
			getFilteredData(store.allData, {
				page: currentPage,
				perPage: rowsPerPage,
				role: currentRole.value,
				status: currentStatus.value,
				q: val,
			})
		)
	}

	const filteredData = store?.allData?.filter((item) => item?.email?.toLowerCase() || item?.names?.toLowerCase())

	// ** Custom Pagination
	const CustomPagination = () => {
		const count = Number(Math.ceil(filteredData.length / rowsPerPage))

		return (
			<ReactPaginate
				previousLabel=""
				nextLabel=""
				forcePage={currentPage !== 0 ? currentPage - 1 : 0}
				onPageChange={(page) => handlePagination(page)}
				pageCount={count || 1}
				breakLabel="..."
				pageRangeDisplayed={2}
				marginPagesDisplayed={2}
				activeClassName="active"
				pageClassName="page-item"
				breakClassName="page-item"
				nextLinkClassName="page-link"
				pageLinkClassName="page-link"
				breakLinkClassName="page-link"
				previousLinkClassName="page-link"
				nextClassName="page-item next-item"
				previousClassName="page-item prev-item"
				containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
			/>
		)
	}

	// ** Table data to render
	const dataToRender = () => {
		const filters = {
			status: currentStatus.value,
			q: searchTerm,
		}

		const isFiltered = Object.keys(filters).some(function (k) {
			return filters[k].length > 0
		})

		if (store.data.length > 0) {
			return store.data
		} else if (store.data.length === 0 && isFiltered) {
			return []
		} else {
			return store.allData
		}
	}

	return (
		<Fragment>
			<Card>
				<CardHeader>
					<CardTitle tag="h4">Filters</CardTitle>
				</CardHeader>
				<CardBody>
					<Row>
						<Col md="6">
							<Label className="me-1" for="search-input">
								Search
							</Label>
							<Input
								className="dataTable-filter mb-50"
								type="text"
								bsSize="sm"
								id="search-input"
								style={{ height: '37px', width: '100%' }}
								value={searchTerm}
								onChange={(e) => handleFilter(e.target.value)}
							/>
						</Col>
						<Col md="6">
							<Label className="me-1" for="select">
								Select Status:{' '}
							</Label>
							<Select
								isClearable={false}
								className="react-select"
								classNamePrefix="select"
								id="select"
								options={statusOptions}
								value={currentStatus}
								onChange={(data) => {
									setCurrentStatus(data)
									dispatch(
										getFilteredData(store.allData, {
											page: currentPage,
											perPage: rowsPerPage,
											status: data.value,
											q: searchTerm,
										})
									)
								}}
							/>
						</Col>
					</Row>
				</CardBody>
			</Card>

			<Card className="overflow-hidden">
				<div className="react-dataTable">
					<DataTable
						noHeader
						subHeader
						pagination
						selectableRows
						columns={columns}
						paginationPerPage={10}
						className="react-dataTable"
						sortIcon={<ChevronDown size={10} />}
						paginationDefaultPage={currentPage}
						paginationComponent={CustomPagination}
						data={dataToRender()}
						selectableRowsComponent={BootstrapCheckbox}
						subHeaderComponent={<CustomHeader handleModal={handleModal} handlePerPage={handlePerPage} rowsPerPage={rowsPerPage} />}
					/>
				</div>
			</Card>
			<AddNewModal open={modal} handleModal={handleModal} />
		</Fragment>
	)
}

export default DataTableWithButtons
