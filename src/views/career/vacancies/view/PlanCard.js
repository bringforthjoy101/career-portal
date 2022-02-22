// ** Reactstrap
import { Card, CardHeader, CardBody } from 'reactstrap'
import { UpdateStatus } from './UpdateStatus'


const PlanCard = () => {


  return (
    <Card className='d-flex justify-content-between align-items-center border-primary'>
      <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
        <h5 className='mb-0'>Actions</h5>
      </CardHeader>
      <CardBody>
        <UpdateStatus />
      </CardBody>
    </Card>
  ) 
}

export default PlanCard
