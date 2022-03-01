// ** React Imports
import { useContext, useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { TrendingUp, User, Box } from 'react-feather'
import { apiRequest, swal } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CompanyTable from './CompanyTable'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const EcommerceDashboard = () => {
	// ** Context
	const { colors } = useContext(ThemeColors)

	// ** vars
	const trackBgColor = '#e9ecef'

	const [dashData, setDashData] = useState(null)
	const [userData, setUserData] = useState(null)

	// ** Get all Dashboard Data
	const dashboardData = async () => {
		const response = await apiRequest({ url: '/dashboard', method: 'GET' })
		if (response) {
			if (response?.data?.data && response?.data?.status) {
				await setDashData(response.data.data)
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
	useEffect(() => {}, [])

	// ** Get admin activities
	useEffect(async () => {
		await dashboardData()
		setUserData(JSON.parse(localStorage.getItem('userData')))
	}, [])
	console.log(dashData)
	const data = dashData?.map((data) => {
		return { title: data.value, subtitle: data.name, color: 'light-primary', icon: <Box size={24} /> }
	})

	// const data = [
	// 	{
	// 		title: '230k',
	// 		subtitle: 'Vacancies',
	// 		color: 'light-primary',
	// 		icon: <TrendingUp size={24} />,
	// 	},
	// 	{
	// 		title: '8.549k',
	// 		subtitle: 'Applications',
	// 		color: 'light-info',
	// 		icon: <User size={24} />,
	// 	},
	// 	{
	// 		title: '1.423k',
	// 		subtitle: 'Documents',
	// 		color: 'light-primary',
	// 		icon: <Box size={24} />,
	// 	},
	// ]

	return (
		<div id="dashboard-ecommerce">
			<Row className="match-height">
				<Col xl="12" md="12" xs="12">
					<StatsCard data={data} cols={{ xl: '3', sm: '3' }} />
				</Col>
			</Row>
		</div>
	)
}

export default EcommerceDashboard
