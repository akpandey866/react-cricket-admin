import * as Yup from 'yup'

import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'

import React from 'react'

const AddMoreDemo = () => (
  <>
    <div>
      <hr />
      <Formik
        initialValues={{
          users: [
            {
              name: '',
              // email: '',
            },
          ],
          organizationName: [],
        }}
        validationSchema={Yup.object({
          users: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required('Nameasdasds required'),
              // email: Yup.string().required('email required').email('Enter valid email'),
            }),
          ),
        })}
        onSubmit={
          (values) => console.log(values)
          //alert(JSON.stringify(values, null, 2))
        }
      >
        {({ values }) => (
          <Form>
            <h5>Form </h5>
            <h5>Organzation users </h5>
            <FieldArray
              name="users"
              render={(arrayHelpers) => {
                const users = values.users
                return (
                  <div>
                    {users && users.length > 0
                      ? users.map((user, index) => (
                          <div key={index}>
                            <Field
                              placeholder="Price"
                              name={`users.${index}.name`}
                              className="form-control"
                            />
                            <ErrorMessage name={`users.${index}.name`} />
                            <br />

                            {/* <Field
                              placeholder="user email"
                              name={`users.${index}.email`}
                              className="form-control"
                            />
                            <ErrorMessage name={`users.${index}.email`} /> */}

                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
                          </div>
                        ))
                      : null}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: '',
                        })
                      } // insert an empty string at a position
                    >
                      add a User
                    </button>
                    <br />
                    <br />
                    <br />
                    <div>
                      <button type="submit">Form Submit</button>
                    </div>
                  </div>
                )
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  </>
)
export default AddMoreDemo
