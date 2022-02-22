import { Users } from 'react-feather'

export default [
	{
		id: 'admins',
		title: 'Admins',
		icon: <Users size={20} />,
		navLink: '/admin/list',
	},
	{
		id: 'candidates',
		title: 'Candidates',
		icon: <Users size={20} />,
		navLink: '/candidate/list',
	},
	{
		id: 'vacancies',
		title: 'Vacancies',
		icon: <Users size={20} />,
		navLink: '/vacancy/list',
	},
	{
		id: 'applications',
		title: 'Applications',
		icon: <Users size={20} />,
		navLink: '/application/list',
	},
]
