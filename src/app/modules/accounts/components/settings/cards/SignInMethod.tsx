import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'app/components/button';
import FormControl from 'app/components/form-control/FormControl';
import { BUTTON_VARIANTS } from 'app/domains/components/button.i';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useUpdatePasswordMutation } from 'app/reducers/api';
import clsx from 'clsx';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { IUpdatePassword, updatePassword } from '../SettingsModel';

const passwordFormValidationSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  new_password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
});

const SignInMethod: React.FC = () => {
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false);

  const [changePassword, { isLoading }] = useUpdatePasswordMutation();

  const methods = useForm<IUpdatePassword>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(passwordFormValidationSchema),
    defaultValues: updatePassword,
  });

  const submitUpdatePassword: SubmitHandler<IUpdatePassword> = async (data) => {
    try {
      await changePassword({
        old_password: data.old_password,
        new_password: data.new_password,
      }).unwrap();

      toast.success('Update Password Successful');
    } catch (error) {
      handleQueryError(error);
    }
  };

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_signin_method">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Sign-in Method</h3>
        </div>
      </div>

      <div id="kt_account_signin_method" className="collapse show">
        <div className="card-body border-top p-9">
          <div className="d-flex flex-wrap align-items-center mb-10">
            <div id="kt_signin_password" className={clsx([showPasswordForm && 'd-none'])}>
              <div className="fs-6 fw-bolder mb-1">Password</div>
              <div className="fw-bold text-gray-600">************</div>
            </div>

            <div
              id="kt_signin_password_edit"
              className={clsx('flex-row-fluid', [!showPasswordForm && 'd-none'])}>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(submitUpdatePassword)}
                  id="kt_signin_change_password"
                  className="form"
                  noValidate>
                  <div className="row mb-1">
                    {[
                      { name: 'old_password', label: 'Current Password', type: FORM_CONTROLS.PASSWORD },
                      { name: 'new_password', label: 'New Password', type: FORM_CONTROLS.PASSWORD },
                      {
                        name: 'password_confirmation',
                        label: 'Confirm New Password',
                        type: FORM_CONTROLS.PASSWORD,
                      },
                    ].map((formItem, idx) => {
                      return (
                        <div className="col-lg-4" key={idx}>
                          <FormControl
                            type={formItem.type}
                            name={formItem.name}
                            label={formItem.label}
                            cxContainer="fv-row mb-0"
                            className="form-control form-control-lg form-control-solid "
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="form-text mb-5">
                    Password must be at least 8 character and contain symbols
                  </div>

                  <div className="d-flex">
                    <Button id="kt_password_submit" type="submit" className="me-2 px-6" isLoading={isLoading}>
                      Update Password
                    </Button>

                    <Button
                      type="button"
                      id="kt_password_cancel"
                      onClick={() => setPasswordForm(false)}
                      variant={BUTTON_VARIANTS.PRIMARY_ACTIVE_LIGHT}
                      className="btn-color-gray-400 px-6">
                      Cancel
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>

            <Button
              id="kt_signin_password_button"
              type="button"
              onClick={() => setPasswordForm(true)}
              variant={BUTTON_VARIANTS.PRIMARY_ACTIVE_LIGHT}
              className={clsx('btn-light ms-auto', [showPasswordForm && 'd-none'])}>
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignInMethod };
