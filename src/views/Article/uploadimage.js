import { Form, Formik, Field, ErrorMessage } from "formik";

import React from "react";

import { Container, Row, Col, Table } from "react-bootstrap";

import * as Yup from "yup";

import PreviewImage from "../components/PreviewImage/PreviewImage";

import { Submitting } from "./../UI/Submitting";
const initialValues = {
  name: “”,
  short_name: “”,
  address: “”,
  status: “”,
  url: “”,
  image: null,
};
const SUPPORTED_FORMATS = [“image/jpg”, “image/png”, “image/jpeg”, “image/gif”];
const validationSchema = Yup.object({
  name: Yup.string().required(“Required Field”),
  short_name: Yup.string().required(“Required Field”),
  address: Yup.string().required(“Required Field”),
  url: Yup.string().required(“Required Field”),
  status: Yup.string().required(“Required Field”).oneOf([“Active”, “Inactive”]),
  image: Yup.mixed()
    .nullable()
  .required(“Required Field”)
  // .test(“size”, “File is too large”, (value) => { //*************** THESE ARE ALTERNATIVE WAY TO VALIDATE IMAGE *****************/
    //   return value && value.size <= 5 * 1024 * 1024;   // 5MB
    // })
    // .test(
    //   “type”,
    //   “Invalid file format”,
    //   (value) => {
    //     return (
    //       value &&
    //       value.type === “image/jpeg” ||
    //       value.type === “image/jpg” ||
    //       value.type === “image/png”
    //     );
    //   }
    // ),
    .test(
      “size”,
      “File size is too big”,
      (value) => value && value.size <= 1024 * 1024 // 5MB
    )
    .test(
      “type”,
      “Invalid file format selection”,
      (value) =>
        // console.log(value);
        !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});

const App = () => {

          return (<>

<Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {(formikProps) => (
                <Form>
                  <div className=”form-group”>
                    <Field
                      name=”name”
                      type=”input”
                      className={
                        formikProps.touched.name
                          ? formikProps.errors.name
                            ? “form-control input_user is-invalid”
                            : “form-control input_user is-valid”
                          : “form-control”
                      }
                      placeholder=”University”
                    />
                    {formikProps.touched.name && formikProps.errors.name ? (
                      <small className=”text-danger”>
                        {formikProps.errors.name}
                      </small>
                    ) : null}
                  </div>
                  <div className=”form-group”>
                    <Field
                      name=”short_name”
                      type=”input”
                      className={
                        formikProps.touched.short_name
                          ? formikProps.errors.short_name
                            ? “form-control input_user is-invalid”
                            : “form-control input_user is-valid”
                          : “form-control”
                      }
                      placeholder=”University in Short”
                    />
                    {formikProps.touched.short_name &&
                    formikProps.errors.short_name ? (
                      <small className=”text-danger”>
                        {formikProps.errors.short_name}
                      </small>
                    ) : null}
                  </div>
                  <div className=”form-group”>
                    <Field
                      name=”address”
                      type=”input”
                      className={
                        formikProps.touched.address
                          ? formikProps.errors.address
                            ? “form-control input_user is-invalid”
                            : “form-control input_user is-valid”
                          : “form-control”
                      }
                      placeholder=”Address”
                    />
                    {formikProps.touched.address &&
                    formikProps.errors.address ? (
                      <small className=”text-danger”>
                        {formikProps.errors.address}
                      </small>
                    ) : null}
                  </div>
                  <div className=”form-group”>
                    <Field
                      name=”url”
                      type=”input”
                      className={
                        formikProps.touched.url
                          ? formikProps.errors.url
                            ? “form-control input_user is-invalid”
                            : “form-control input_user is-valid”
                          : “form-control”
                      }
                      placeholder=”URL”
                    />
                    {formikProps.touched.url && formikProps.errors.url ? (
                      <small className=”text-danger”>
                        {formikProps.errors.url}
                      </small>
                    ) : null}
                  </div>
                  <div className=”form-group”>
                    <Field
                      name=”status”
                      as=”select”
                      className={
                        formikProps.touched.status
                          ? formikProps.errors.status
                            ? “form-control input_user is-invalid”
                            : “form-control input_user is-valid”
                          : “form-control”
                      }
                    >
                      <option value=”status”>Status</option>
                      <option value=”red”>Red</option>
                      <option value=”Active”>Active</option>
                      <option value=”Inactive”>Inactive</option>
                    </Field>
                    {formikProps.touched.status && formikProps.errors.status ? (
                      <small className=”text-danger”>
                        {formikProps.errors.status}
                      </small>
                    ) : null}
                  </div>
                  <div className=”form-group”>
                    <input
                      name=”image” //NAME field not required in this case as image is set through onChange
                      type=”file”
                    // onChange={(event) => { //*** these are commented to show other alternative way by using URL.createObjectURL for preview ***//
                      //   setIsNewImage(true);
                      //   formikProps.setTouched({
                      //     image: true,
                      //   });
                      //   if (event.target.files[0]) {
                      //     formikProps.setFieldValue(
                      //       “preview”,
                      //       URL.createObjectURL(event.target.files[0])
                      //     );
                      //     formikProps.setFieldValue(
                      //       “image”,
                      //       event.target.files[0]
                      //     );
                      //   }
                      // }}
                      onChange={(event) => {
                        formikProps.setTouched({
                          …formikProps.touched,
                          image: true,
                        });
                        formikProps.setFieldValue(
                          “image”,
                          event.target.files[0]
                        );
                      }}
                      className={
                        formikProps.touched.image
                          ? formikProps.errors.image
                            ? “form-control input_user is-invalid”
                            : “form-control input_user is-valid”
                          : “form-control”
                      }
                    ></input>
                    {formikProps.touched.image && formikProps.errors.image ? (
                      <small className=”text-danger”>
                        {formikProps.errors.image}
                      </small>
                    ) : null}
                  </div>
                  {formikProps.values.image ? (
                    <PreviewImage className={{margin:’auto’}} width={100} height={100} file={formikProps.values.image} />
                  ) : null}
                  <div className=”d-flex justify-content-center mt-3 login_container”>
                    {formikProps.isSubmitting ? (
                      <Submitting
                        disabled={true}
                        myclass=”btn login_btn_disable”
                        msg=”Inserting…”
                      />
                    ) : (
                      <button
                        type=”submit”
                        disabled={
                          formikProps.isValid && formikProps.dirty
                            ? false
                            : true
                        }
                        name=”button”
                        className={
                          formikProps.isValid && formikProps.dirty
                            ? “btn login_btn”
                            : “btn login_btn_disable”
                        }
                      >
                        Insert
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>

            </>)

}



export default App;
