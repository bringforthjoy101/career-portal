import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const CareerRoutes = [
	{
		path: '/admin/list',
		component: lazy(() => import('../../views/career/admins/list')),
	},
	{
		path: '/admin/view',
		exact: true,
		component: () => <Redirect to="/career/admins/view/1" />,
	},
	{
		path: '/admin/view/:id',
		component: lazy(() => import('../../views/career/admins/view')),
		meta: {
			navLink: '/admin/view',
		},
	},
	{
		path: '/vacancy/list',
		component: lazy(() => import('../../views/career/vacancies/list')),
	},
	{
		path: '/vacancy/view',
		exact: true,
		component: () => <Redirect to="/career/vacancies/view/1" />,
	},
	{
		path: '/vacancy/view/:id',
		component: lazy(() => import('../../views/career/vacancies/view')),
		meta: {
			navLink: '/vacancy/view',
		},
	},
	{
		path: '/application/list',
		component: lazy(() => import('../../views/career/applications/list')),
	},
	{
		path: '/application/view',
		exact: true,
		component: () => <Redirect to="/career/applications/view/1" />,
	},
	{
		path: '/application/view/:id',
		component: lazy(() => import('../../views/career/applications/view')),
		meta: {
			navLink: '/application/view',
		},
	},
	{
		path: '/candidate/list',
		component: lazy(() => import('../../views/career/candidates/list')),
	},
	{
		path: '/candidate/view',
		exact: true,
		component: () => <Redirect to="/career/candidates/view/1" />,
	},
	{
		path: '/candidate/view/:id',
		component: lazy(() => import('../../views/career/candidates/view')),
		meta: {
			navLink: '/candidate/view',
		},
	},
]

export default CareerRoutes
