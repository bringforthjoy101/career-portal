// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'
import moment from 'moment'

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
		name: 'Title',
		sortable: true,
		sortField: 'id',
		minWidth: '300px',
		selector: (row) => row.name,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				<div className="d-flex flex-column">
					<Link to={`/document/view/${row.id}`} className="user-name text-truncate mb-0">
						<span className="font-weight-bold">{row.name}</span>
					</Link>
				</div>
			</div>
		),
	},
	{
		name: 'File',
		minWidth: '300px',
		selector: (row) => row.file,
		sortable: true,
		cell: (row) => row.file,
	},

	{
		name: 'Time Uploaded',
		minWidth: '100px',
		selector: (row) => row.createdAt,
		sortable: true,
		cell: (row) => moment(row.createdAt).format('LLL'),
	},
]
