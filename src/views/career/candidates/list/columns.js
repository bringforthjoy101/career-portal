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
	inactive: 'light-warning',
	active: 'light-success',
	declined: 'light-danger',
}

// ** Table columns
export const columns = [
	{
		name: 'Name',
		sortable: true,
		sortField: 'id',
		minWidth: '300px',
		selector: (row) => row.names,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row)}
				<div className="d-flex flex-column">
					<Link to={`/candidate/view/${row.id}`} className="user-name text-truncate mb-0">
						<span className="font-weight-bold">{row.names}</span>
					</Link>
					<small className="text-truncate text-muted mb-0">{row.email}</small>
				</div>
			</div>
		),
	},
	{
		name: 'Email',
		minWidth: '300px',
		selector: (row) => row.email,
		sortable: true,
		cell: (row) => row.email,
	},
	{
		name: 'Phone',
		minWidth: '100px',
		selector: (row) => row.phone,
		sortable: true,
		cell: (row) => row.phone,
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
					<Link to={`/candidate/view/${row.id}`} className="user-name text-truncate mb-0">
						<FileText size={14} className="mr-50" />
					</Link>
					{/* <UncontrolledDropdown>
						<DropdownToggle tag="div" className="btn btn-sm">
							<MoreVertical size={14} className="cursor-pointer" />
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem tag={Link} to={`/candidate/view/${row.id}`} className="w-100">
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
