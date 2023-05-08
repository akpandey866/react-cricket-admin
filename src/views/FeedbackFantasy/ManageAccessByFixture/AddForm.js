import {
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CLoadingButton,
  CMultiSelect,
} from '@coreui/react-pro'
import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastComponent from 'src/components/common/TaostComponent'
import FeedbackFantasyService from 'src/service/FeedbackFantasyService'
import moment from 'moment'
const AddForm = (props) => {
  const [loader, setLoader] = useState(false)
  const [userId, setUserId] = useState(false)
  const validationSchema = Yup.object().shape({
    user: Yup.string().required('Please select user.'),
  })
  const formik = useFormik({
    initialValues: {
      user: '',
      team: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (data, actions) => {
      data.team = selectedValue
      actions.resetForm({
        values: {
          user: '',
        },
      })
      setLoader(true)
      FeedbackFantasyService.saveManageAccessByFixture(data)
        .then((res) => {
          if (res.status === 200) {
            props.setUsers(res.data)
            props.setUserList(res.user_list)
            props.setFixtureList(res.fixture_list)
            ToastComponent(res.message, 'success')
            setLoader(false)
          } else {
            setLoader(false)
            ToastComponent(res.message, 'error')
          }
        })
        .catch((e) => {
          setLoader(false)
          console.log('Here is Error', e)
          ToastComponent('Something Went wront. Please try again.', 'error')
        })
    },
  })
  const [selectedValue, setSelectedValue] = useState([])
  const handleChange = (e) => {
    console.log('value is here', e)
    setSelectedValue((oldArray) => [...oldArray, e])
    // setSelectedValue(Array.isArray(e) ? e.map((x) => console.log(x.value)) : [])
  }
  return (
    <>
      <CForm className="row g-3" onSubmit={formik.handleSubmit}>
        <CCol md={6}>
          <table className="main-table table table-bordered innertable">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Check All</th>
              </tr>
            </thead>
            <tbody>
              {props.fixtureList &&
                props.fixtureList.map((item, key) => (
                  <tr key={key}>
                    <th>{item?.team_name}</th>
                    <th>{moment(item.start_date).format('D.MM.YYYY')}</th>
                    <th>{moment(item.end_date).format('D.MM.YYYY')}</th>
                    <th>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${key}`}
                        name={'team'}
                        value={item.id}
                        onChange={() => {
                          handleChange(item.id)
                        }}
                      />
                      {/* <input
                        type="checkbox"
                        name={'team_id'}
                        checked={false}
                        value={props.fixtureList.filter((obj) => selectedValue.includes(obj.id))}
                        onChange={handleChange}
                      /> */}
                    </th>
                  </tr>
                ))}
              {props.fixtureList.length <= 0 && (
                <tr>
                  <td colSpan={4}>No record yet available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="manager">
            <strong>Manager</strong>{' '}
          </CFormLabel>
          <CFormSelect
            aria-label="manager"
            name="user"
            className={
              'form-control' + (formik.errors.user && formik.touched.user ? ' is-invalid' : '')
            }
            // defaultValue={props.managerDropdown}
            onChange={(event) => {
              formik.setTouched({
                ...formik.touched,
                user: true,
              })
              formik.setFieldValue('user', event.target.value)
            }}
            id="user"
          >
            <option value={0}>Select Member</option>
            {props.userList &&
              props.userList.map((item, key) => (
                <option value={item?.user_id} key={key}>
                  {item?.full_name}
                </option>
              ))}
          </CFormSelect>
          {formik.errors.user && formik.touched.user && (
            <CFormFeedback invalid>{formik.errors.user}</CFormFeedback>
          )}
          <CLoadingButton
            className="mt-2"
            type="submit"
            color="success"
            variant="outline"
            loading={loader}
            disabled={loader}
            id="submit"
          >
            Submit
          </CLoadingButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddForm
