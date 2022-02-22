// ** React Imports
import { useEffect, useState } from 'react'
// ** Third Party Components
import { User, Briefcase, Mail, X, Phone, Lock, UserPlus } from 'react-feather'
import { useDispatch } from 'react-redux'
import { getAllAdmins } from '../store/action'
import { selectThemeColors, swal, apiRequest } from '@utils'
// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Form, Spinner, Col } from 'reactstrap'
import Select from 'react-select'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'


const AddNewModal = ({ open, handleModal }) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ** Function to handle form submit
  const onSubmit = async (event) => {
    event?.preventDefault()
    const form = event.target
    const userData = {
      names: form.names.value,
      email: form.email.value,
      phone: form.phone.value,
      role: form.role.value,
      password: form.password.value
    }


    const body = JSON.stringify(userData)
    try {
      setIsSubmitting(true)
      const response = await apiRequest({ url: '/admin/register', method: 'POST', body }, dispatch)
      if (response) {
        console.log("res", response)
        if (response.data.message) {
          swal('Great job!', response.data.message, 'success')
          dispatch(getAllAdmins())
          setIsSubmitting(false)

        } else {
          swal('Oops!', response.data.message, 'error')
        }
      } else {
        swal('Oops!', 'Something went wrong with your network.', 'error')
      }

    } catch (error) {
      console.error({ error })
    }
  }


  useEffect(() => {
    // onSubmit()
    dispatch(getAllAdmins())
  }, [dispatch])


  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const RoleOptions = [
    { value: '', label: 'Select Option' },
    { value: 'support', label: 'Support' },
    { value: 'control', label: 'Control' }
  ]

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>New Admin</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Form onSubmit={onSubmit}>
          <div className='mb-1'>
            <Label className='form-label' for='names'>
              Full Name
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Input id='names' name='names' placeholder='Bruce Wayne' />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='email'>
              Email
            </Label>
            <InputGroup>
              <InputGroupText>
                <Mail size={15} />
              </InputGroupText>
              <Input type='email' id='email' name='email' placeholder='brucewayne@email.com' />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='role'>
              Role
            </Label>
            <InputGroup>
              <InputGroupText>
                <UserPlus size={15} />
              </InputGroupText>
              <div className="react-select form-control p-0">
              <Select
                id='role'
                name='role'
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                options={RoleOptions}
                isClearable={false}
              />
              </div>
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='phone'>
              Phone Number
            </Label>
            <InputGroup>
              <InputGroupText>
                <Phone size={15} />
              </InputGroupText>
              <Input id='phone' name='phone' placeholder='Phone' />
            </InputGroup>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='password'>
              Password
            </Label>
            <InputGroup>
              <InputGroupText>
                <Lock size={15} />
              </InputGroupText>
              <Input type='password' id='password' name='password' placeholder='****' />
            </InputGroup>
          </div>
          <Button className='me-1' color='primary' disabled={isSubmitting}>
            {isSubmitting && <Spinner color='white' size='sm' />}
            Submit
          </Button>
          <Button color='secondary' outline onClick={handleModal}>
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
