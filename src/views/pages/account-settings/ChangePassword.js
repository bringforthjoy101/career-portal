// ** React Imports
import { Fragment, useState } from 'react'
import { apiRequest, swal } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, Spinner, FormFeedback } from 'reactstrap'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import Avatar from '@components/avatar'

// ** Demo Components
import ApiKeysList from './ApiKeysList'
import CreateApiKey from './CreateApikey'
import TwoFactorAuth from './TwoFactorAuth'
import RecentDevices from './RecentDevices'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const defaultValues = {
  password: '',
  confirmPassword: ''
}

const userData = JSON.parse(localStorage.getItem('userData'))

const SecurityTabContent = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

const SignupSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, obj => showErrors('Password', obj.value.length, obj.min))
      .required(),
    confirmPassword: yup
      .string()
      .min(6, obj => showErrors('Retype New Password', obj.value.length, obj.min))
      .required()
      .oneOf([yup.ref(`confirmPassword`), null], 'Passwords must match')
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async (data) => {
    if (Object.values(data).every(field => field.length > 0)) {
      const body = JSON.stringify({
        token: userData.accessToken,
        password: data.password,
        confirmPassword: data.confirmPassword
      })
      try {
      setIsSubmitting(true)
      const response = await apiRequest({url:'/admin/change-password', method:'POST', body})
        console.log("responseeee", response)
        if (response.data.message === "Password changed successfully") {
          swal("Great Job!", response.data.message, 'success')
          setIsSubmitting(false)
        } else {
          swal('Oops!', response.data.message, 'error')
        }
      } catch (error) {
        console.error({error})
      }
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Update Password</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='password'
                  name='password'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Password'
                      htmlFor='password'
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='confirmPassword'
                  name='confirmPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Confirm Password'
                      htmlFor='confirmPassword'
                      className='input-group-merge'
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                )}
              </Col>
              <Col className='mt-1' sm='12'>
                <Button type='submit' className='me-1' color='primary' disabled={isSubmitting}>
              {isSubmitting && <Spinner color='white' size='sm' />}
                  Save changes
                </Button>
                <Button color='secondary' outline>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTabContent
