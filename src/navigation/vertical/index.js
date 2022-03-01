// ** Navigation imports
// import apps from './apps'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
import dashboards from './dashboards'
// import uiElements from './ui-elements'
import admins from './admins'
import applications from './applications'
import candidates from './candidates'
import documents from './documents'
import vacancies from './vacancies'

const userData = JSON.parse(localStorage.getItem('userData'))

// ** Merge & Export
export default userData?.type === 'admin'
	? [...dashboards, ...admins, ...applications, ...candidates, ...documents, ...vacancies]
	: [...dashboards, ...vacancies, ...applications, ...documents]
