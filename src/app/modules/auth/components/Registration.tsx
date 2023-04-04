import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from 'app/components/FormControl';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { PasswordMeterComponent } from '../../../../_metronic/assets/ts/components';

interface IRegistrationFromFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  changePassword: string;
}
const initialValues: IRegistrationFromFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  changePassword: '',
};

const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols'),
  email: Yup.string().email('Wrong email format').min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Email is required'),
  lastName: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Last name is required'),
  password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Password is required'),
  changePassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
});

export function Registration() {
  const methods = useForm<IRegistrationFromFields>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(registrationSchema),
    defaultValues: initialValues,
  });

  const submitRegister: SubmitHandler<IRegistrationFromFields> = (data) => {
    console.log(data);

    // handle call api with data here
  };

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
          noValidate
          id="kt_login_signup_form"
          onSubmit={methods.handleSubmit(submitRegister)}>
          {/* begin:Heading */}
          <div className="text-center mb-11">
            <h1 className="text-dark fw-bolder mb-3">Sign Up</h1>
          </div>
          {/* end:Heading */}

          {/* begin:Control */}
          <FormControl type={FORM_CONTROLS.TEXT} cxContainer="fv-row mb-8" name="firstName" placeholder="First name" label="First name" />

          <FormControl type={FORM_CONTROLS.TEXT} cxContainer="fv-row mb-8" name="lastName" placeholder="Last name" label="Last name" />

          <FormControl type={FORM_CONTROLS.MAIL} cxContainer="fv-row mb-8" name="email" placeholder="Email" label="Email" />

          <div className="fv-row mb-8" data-kt-password-meter="true">
            <FormControl type={FORM_CONTROLS.PASSWORD} cxContainer="mb-3" name="changePassword" placeholder="Password" label="Password" />
            {/* begin::Meter */}
            <div className="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
            </div>
            {/* end::Meter */}

            <div className="text-muted">Use 8 or more characters with a mix of letters, numbers & symbols.</div>
          </div>
          <FormControl
            type={FORM_CONTROLS.PASSWORD}
            cxContainer="fv-row mb-8"
            name="password"
            placeholder="Confirm Password"
            label="Confirm Password"
          />
          {/* end:Control */}

          {/* begin:Submit */}
          <div className="text-center">
            <button type="submit" id="kt_sign_up_submit" className="btn btn-lg btn-primary w-100 mb-5">
              {!false && <span className="indicator-label">Submit</span>}
              {false && (
                <span className="indicator-progress" style={{ display: 'block' }}>
                  Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
            <Link to="/auth/login">
              <button type="button" id="kt_login_signup_form_cancel_button" className="btn btn-lg btn-light-primary w-100 mb-5">
                Cancel
              </button>
            </Link>
          </div>
          {/* end:Submit */}
        </form>
      </FormProvider>
    </>
  );
}
