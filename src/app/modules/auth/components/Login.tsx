/* eslint-disable jsx-a11y/anchor-is-valid */
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from 'app/components/FormControl/FormControl';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useGetRandomAnimeQuoteQuery } from 'app/reducers/anime/anime.api';
import { useGetEmployeeMutation } from 'app/reducers/employee/employee.api';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface ILoginFormFields {
  email: string;
  password: string;
}

const initialValues: ILoginFormFields = {
  // email: 'admin@demo.com',
  // password: 'demo',
  email: '',
  password: '',
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const { data: animeQuote, refetch } = useGetRandomAnimeQuoteQuery();
  const [getEmployee, { isLoading }] = useGetEmployeeMutation();

  const methods = useForm<ILoginFormFields>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues,
  });

  const submitLogin: SubmitHandler<ILoginFormFields> = async (data) => {
    try {
      refetch();

      console.log('form-data: ', data);

      const res = await getEmployee('3').unwrap();

      console.log('employee-response: ', res);
    } catch (e) {
      handleQueryError(e);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="form w-100" onSubmit={methods.handleSubmit(submitLogin)} noValidate id="kt_login_signin_form">
          {/* begin::Heading */}
          <div className="text-center mb-11">
            <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
            <div className="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div>
          </div>
          {/* begin::Heading */}

          {(animeQuote && (
            <div className="mb-lg-15 alert alert-success">
              <div className="alert-text font-weight-bold">
                {animeQuote.quote} - {animeQuote.character}
              </div>
            </div>
          )) || <></>}

          {/* begin::Login options */}
          <div className="row g-3 mb-9">
            {/* begin::Col */}
            <div className="col-md-6">
              {/* begin::Google link */}
              {/* <a
                href="#"
                className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                <img alt="Logo" src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')} className="h-15px me-3" />
                Sign in with Google
              </a> */}
              {/* end::Google link */}
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className="col-md-6">
              {/* begin::Google link */}
              {/* <a
                href="#"
                className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                <img alt="Logo" src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')} className="theme-light-show h-15px me-3" />
                <img alt="Logo" src={toAbsoluteUrl('/media/svg/brand-logos/apple-black-dark.svg')} className="theme-dark-show h-15px me-3" />
                Sign in with Apple
              </a> */}
              {/* end::Google link */}
            </div>
            {/* end::Col */}
          </div>
          {/* end::Login options */}

          {/* begin::Separator */}
          <div className="separator separator-content my-14">
            <span className="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
          </div>
          {/* end::Separator */}

          {/* begin::Form group */}
          <FormControl type={FORM_CONTROLS.MAIL} placeholder="Email" name="email" cxContainer="fv-row mb-8" label="Email" autoComplete="off" />
          {/* end::Form group */}

          {/* begin::Form group */}
          <FormControl type={FORM_CONTROLS.PASSWORD} autoComplete="off" name="password" cxContainer="fv-row mb-3" label="Password" />
          {/* end::Form group */}

          {/* begin::Wrapper */}
          <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
            <div />

            {/* begin::Link */}
            <Link to="/auth/forgot-password" className="link-primary">
              Forgot Password ?
            </Link>
            {/* end::Link */}
          </div>
          {/* end::Wrapper */}

          {/* begin::Action */}
          <div className="d-grid mb-10">
            <button type="submit" id="kt_sign_in_submit" className="btn btn-primary">
              {!isLoading && <span className="indicator-label">Continue</span>}
              {isLoading && (
                <span className="indicator-progress" style={{ display: 'block' }}>
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
          {/* end::Action */}

          <div className="text-gray-500 text-center fw-semibold fs-6">
            Not a Member yet?{' '}
            <Link to="/auth/registration" className="link-primary">
              Sign up
            </Link>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
