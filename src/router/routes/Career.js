import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const userData = JSON.parse(localStorage.getItem('userData'))

const AdminRoutes = [
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

const CandidateRoutes = [
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
		path: '/document/list',
		component: lazy(() => import('../../views/career/documents/list')),
	},
	{
		path: '/document/view',
		exact: true,
		component: () => <Redirect to="/career/documents/view/1" />,
	},
	{
		path: '/document/view/:id',
		component: lazy(() => import('../../views/career/documents/view')),
		meta: {
			navLink: '/document/view',
		},
	},
]

export default userData?.type === 'admin' ? AdminRoutes : CandidateRoutes
