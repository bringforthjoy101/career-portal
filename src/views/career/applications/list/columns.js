// ** React Imports
import { Link } from 'react-router-dom'
import moment from 'moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** renders client column
const renderClient = (row) => {
	const stateNum = Math.floor(Math.random() * 6),
		states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
		color = states[stateNum]

	if (row.avatar?.length) {
		return <Avatar className="me-50" img={row.avatar} width="32" height="32" />
	} else {
		return <Avatar color={color} className="me-50" content={row.names ? row.names : 'John Doe'} initials />
	}
}

const statusObj = {
	pending: 'light-warning',
	approved: 'light-success',
	declined: 'light-danger',
}

// ** Table columns
export const columns = [
	{
		name: "Applicant's name",
		sortable: true,
		sortField: 'id',
		minWidth: '300px',
		selector: (row) => row.candidate.names,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row)}
				<div className="d-flex flex-column">
					<Link to={`/application/view/${row.candidate.id}`} className="user-name text-truncate mb-0">
						<span className="font-weight-bold">{row.candidate.names}</span>
					</Link>
					<small className="text-truncate text-muted mb-0">{row.candidate.email}</small>
				</div>
			</div>
		),
	},
	{
		name: 'Vacancy',
		minWidth: '300px',
		selector: (row) => row.createdAt,
		sortable: true,
		cell: (row) => (
			<div className="d-flex flex-column">
				<Link to={`/vacancy/view/${row.vacancy.id}`} className="user-name text-truncate mb-0">
					<span className="font-weight-bold">{row.vacancy.name}</span>
				</Link>
				{/* <small className="text-truncate text-muted mb-0">{moment(row.vacancy.closedAt).format('LLL')}</small> */}
			</div>
		),
	},
	{
		name: 'Date Applied',
		minWidth: '100px',
		selector: (row) => row.closedAt,
		sortable: true,
		cell: (row) => moment(row.createdAt).format('LLL'),
	},
	{
		name: 'Status',
		minWidth: '100px',
		selector: (row) => row.status,
		sortable: true,
		cell: (row) => (
			<Badge className="text-capitalize" color={statusObj[row.status]} pill>
				{row.status}
			</Badge>
		),
	},
	{
		name: 'Actions',
		allowOverflow: true,
		cell: (row) => {
			return (
				<div className="d-flex">
					<Link to={`/application/view/${row.id}`} className="user-name text-truncate mb-0">
						<FileText size={14} className="mr-50" />
					</Link>
					{/* <UncontrolledDropdown>
						<DropdownToggle tag="div" className="btn btn-sm">
							<MoreVertical size={14} className="cursor-pointer" />
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem tag={Link} to={`/application/view/${row.id}`} className="w-100">
								<FileText size={14} className="mr-50" />
								<span className="align-middle">Details</span>
							</DropdownItem>
							<DropdownItem
								tag={Link}
								to={`/product/edit/${row.id}`}
								className="w-100"
								// onClick={() => store.dispatch(getUser(row.id))}
							>
								<Archive size={14} className="mr-50" />
								<span className="align-middle">Edit</span>
							</DropdownItem>
							<DropdownItem className="w-100" onClick={() => handleDelete(row.id)}>
								<Trash2 size={14} className="mr-50" />
								<span className="align-middle">Delete</span>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown> */}
				</div>
			)
		},
	},
]
