/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from 'app/components/button';
import useAuthGuard from 'app/hooks/useAuthGuard';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import FormControl from 'app/components/form-control/FormControl';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useGetUserInfoQuery, useSubmitLoginMutation } from 'app/reducers/account/account.api';

import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'app/reducers/store.hook';
import { updateLoginStatus } from 'app/reducers/user/auth.slice';

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

export function Login() {
  const [login, { isLoading }] = useSubmitLoginMutation();
  const { refetch } = useGetUserInfoQuery(undefined, { skip: true });

  const { setAccessToken, setRefreshToken, setAuthenticated } = useAuthGuard();

  const methods = useForm<ILoginFormFields>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues,
  });

  // demo login without call api
  const dispatch = useAppDispatch(); // note to remove when api is successfully deploy

  const submitLogin: SubmitHandler<ILoginFormFields> = async (data) => {
    try {
      /*
			* handle login with email and password
			const loginResponse = await login(data).unwrap();
      setAccessToken(loginResponse.data?.jwt?.token);
      setRefreshToken(loginResponse.data?.jwt?.refresh_token);

      // handle authenticated
      await refetch().unwrap();
      setAuthenticated(); */
      dispatch(updateLoginStatus(true)); // note to remove when api is successfully deploy

      toast.success('Successfully logged in');

      // todo: handle redirect
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
            {/* <div className="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div> */}
          </div>
          {/* begin::Heading */}

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
          {/* <div className="separator separator-content my-14">
            <span className="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
          </div> */}
          {/* end::Separator */}

          {/* begin::Form group */}
          <FormControl type={FORM_CONTROLS.MAIL} placeholder="Email" name="email" cxContainer="fv-row mb-8" label="Email" autoComplete="off" />

          <FormControl type={FORM_CONTROLS.PASSWORD} autoComplete="off" name="password" cxContainer="fv-row mb-3" label="Password" />
          {/* begin::Form group */}

          <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
            <Link to="/auth/forgot-password" className="link-primary">
              Forgot Password ?
            </Link>
          </div>

          <div className="d-grid mb-10">
            <Button isLoading={isLoading} id="kt_sign_in_submit">
              Continue
            </Button>
          </div>

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
