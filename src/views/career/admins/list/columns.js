// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'

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
	active: 'light-success',
	inactive: 'light-danger',
}

// ** Table columns
export const columns = [
	{
		name: 'Admin',
		sortable: true,
		sortField: 'id',
		minWidth: '300px',
		selector: (row) => row.names,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row)}
				<div className="d-flex flex-column">
					<Link to={`/admin/view/${row.id}`} className="user-name text-truncate mb-0">
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
		cell: (row) => <span>{row.phone === null ? 'No Number' : row.phone}</span>,
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
]
