import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import AddForm from './AddForm'
import Table from './Table'
import * as Yup from 'yup'

import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'

const Player = () => {
  const [visible, setVisible] = useState(false)
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={10}>
                  <strong>Add</strong> <small> Player</small>
                </CCol>
                <CCol xs={2}>
                  <CButton
                    className="mb-3"
                    onClick={() => setVisibleHorizontal(!visibleHorizontal)}
                    aria-expanded={visibleHorizontal}
                    aria-controls="collapseWidthExample"
                  >
                    Add
                  </CButton>
                  {/* <CButton onClick={() => setVisible(!visible)}>Add</CButton> */}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <AddForm />
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardBody>
              <Table />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal visible={visible} onClose={() => setVisible(false)} size="xl">
        <CModalHeader>
          <CModalTitle>Add Player</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="table-responsive">
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Add Player</strong>
              </CCardHeader>
              <CCardBody>
                <Formik
                  initialValues={{
                    users: [
                      {
                        first_name: '',
                        last_name: '',
                        position: '',
                        svalue: '',
                        team: '',
                        bat_style: '',
                        bowl_style: '',
                      },
                    ],
                    organizationName: [],
                  }}
                  validationSchema={Yup.object({
                    users: Yup.array().of(
                      Yup.object().shape({
                        first_name: Yup.string().required('First Name is required'),
                        last_name: Yup.string().required('Last Name is required'),
                        position: Yup.string().required('Position is required'),
                        svalue: Yup.string().required('Value is required'),
                        // email: Yup.string().required('email required').email('Enter valid email'),
                      }),
                    ),
                  })}
                  onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                >
                  {({ values }) => (
                    <Form>
                      <FieldArray
                        name="users"
                        render={(arrayHelpers) => {
                          const users = values.users
                          return (
                            <>
                              <CTable className="table table-responsive table-bordered">
                                <CTableHead>
                                  <CTableRow>
                                    <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Position</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Team </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Bat Style </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Bowl Style </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                      {' '}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.push({
                                            name: '',
                                            email: '',
                                          })
                                        } // insert an empty string at a position
                                      >
                                        add a User
                                      </button>{' '}
                                    </CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {users && users.length > 0
                                    ? users.map((user, index) => (
                                        <>
                                          <CTableRow>
                                            <CTableHeaderCell scope="col" key={index}>
                                              {' '}
                                              <Field
                                                placeholder="First Name"
                                                name={`users.${index}.first_name`}
                                              />
                                              <ErrorMessage name={`users.${index}.first_name`} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                              <Field
                                                placeholder="Last Name"
                                                name={`users.${index}.last_name`}
                                              />
                                              <ErrorMessage name={`users.${index}.last_name`} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                              <Field
                                                placeholder="Position"
                                                name={`users.${index}.position`}
                                              />
                                              <ErrorMessage name={`users.${index}.position`} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                              {' '}
                                              <Field
                                                placeholder="Value"
                                                name={`users.${index}.svalue`}
                                              />
                                              <ErrorMessage name={`users.${index}.svalue`} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                              {' '}
                                              <Field
                                                placeholder="Team"
                                                name={`users.${index}.team`}
                                              />
                                              <ErrorMessage name={`users.${index}.team`} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                              {' '}
                                              <Field
                                                placeholder="Bat Style"
                                                name={`users.${index}.bat_style`}
                                              />
                                              <ErrorMessage name={`users.${index}.bat_style`} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                              {' '}
                                              <Field
                                                placeholder="Bowl Style"
                                                name={`users.${index}.bowl_style`}
                                              />
                                              <ErrorMessage name={`users.${index}.bowl_style`} />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                              {' '}
                                              <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                              >
                                                -
                                              </button>
                                            </CTableHeaderCell>
                                          </CTableRow>
                                        </>
                                      ))
                                    : null}
                                </CTableBody>
                              </CTable>

                              <div>
                                <button type="submit">Form Submit</button>
                              </div>
                            </>
                          )
                        }}
                      />
                    </Form>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Player
