// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartsRoutes from './Charts'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import CareerRoutes from './Career'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
	...DashboardRoutes,
	...AppRoutes,
	...PagesRoutes,
	...UiElementRoutes,
	...ExtensionsRoutes,
	...PageLayoutsRoutes,
	...FormRoutes,
	...TablesRoutes,
	...ChartsRoutes,
	...CareerRoutes,
]

export { DefaultRoute, TemplateTitle, Routes }
