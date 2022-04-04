import React from 'react'
import { reduxForm, Field, isValid } from 'redux-form'
import showResults from './showResults'
import isValidEmail from 'sane-email-validation'
import countries from '../data/countries'



const validate = values => {
    const errors = {}



    if (!values.firstName) {
        errors.firstName = 'Required'
    }
    if (!values.lastName) {
        errors.lastName = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!isValidEmail(values.email)) {
        errors.email = 'Invalid Email'
    }
    if (!values.password) {
        errors.password = 'Required'
    
    }
    if (!values.country) {
        errors.country = 'Required'
    }
    if (!values.comments) {
        errors.comments = 'Required'
    }
    if (!values.phone) {
        errors.phone = 'Required'
    } 
    
  return errors
}

const createRenderer = render => ({ input, meta, label, ...rest }) =>
  <div
    className={[
      meta.error && meta.touched ? 'error' : '',
      meta.active ? 'active' : ''
    ].join(' ')}
  >
    <label>
      {label}
    </label>
    {render(input, label, rest)}
    {meta.error &&
      meta.touched &&
      <span>
        {meta.error}
      </span>}
  </div>

const RenderInput = createRenderer((input, label) =>
  <input {...input} placeholder={label} />
)

const RenderSelect = createRenderer((input, label, { children }) =>
  <select {...input}>
    {children}
  </select>
)

const textarea = createRenderer((input, label) =>
    <input {...input} placeholder={label} />
)


let DemoForm = ({ handleSubmit, submitting }) =>
  <form onSubmit={handleSubmit(showResults)}>
    <Field name="firstName" label="First Name" component={RenderInput} />
    <Field name="lastName" label="Last Name" component={RenderInput} />
        
        
            
        <label>

            <label>Gender</label>
                    <Field name="Gender_selection" style={{ margin: '10px', padding: '10px' }} component="input" type="radio" value="Male" />
                    <span>Male</span>
                </label>
                <label>
                    <Field name="Gender_selection" style={{ margin: '10px', padding: '10px' }} component="input" type="radio" value="Female" />
                    <span>Female</span>
                </label>
                <label>
                    <Field name="Gender_selection" style={{ margin: '10px', padding: '10px'}} component="input" type="radio" value="Other" />

                    <span>Other</span>
                </label>
            
        
        

        <Field name="email" label="Email" component={RenderInput} />
        <Field name="password" label="Password" component={RenderInput} type="password" />

    <Field name="country" label="Country" component={RenderSelect}>
      <option />
      {countries.map(country =>
        <option key={country} value={country}>
          {country}
        </option>
      )}
        </Field>
        <Field name="comments" label="Comments" component={textarea} />
        <Field name="phone" label="Phone Number" component={RenderInput} type="tel" />
    <button type="submit" disabled={submitting}>
      Submit
    </button>
       
  </form>

DemoForm = reduxForm({
  form: 'demo',
  destroyOnUnmount: false,
  validate
})(DemoForm)
export default DemoForm
