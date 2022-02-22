// ** React Imports
import { Link } from 'react-router-dom'
import moment from 'moment'

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
	open: 'light-success',
	closed: 'light-danger',
}

// ** Table columns
export const columns = [
	{
		name: 'Name',
		sortable: true,
		sortField: 'id',
		minWidth: '300px',
		selector: (row) => row.name,
		cell: (row) => (
			<div className="d-flex flex-column">
				<Link to={`/vacancy/view/${row.id}`} className="user-name text-truncate mb-0">
					<span className="font-weight-bold">{row.name}</span>
				</Link>
			</div>
		),
	},
	{
		name: 'Date Opened',
		minWidth: '300px',
		selector: (row) => row.createdAt,
		sortable: true,
		cell: (row) => moment(row.createdAt).format('LLL'),
	},
	{
		name: 'Closing Date',
		minWidth: '100px',
		selector: (row) => row.closedAt,
		sortable: true,
		cell: (row) => moment(row.closedAt).format('LLL'),
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
