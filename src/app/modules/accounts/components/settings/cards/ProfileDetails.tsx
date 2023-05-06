import React, { useState } from 'react';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers';
import * as Yup from 'yup';
import { useAppSelector } from 'app/reducers/store.hook';
import { userInfoSelector } from 'app/reducers/user/auth.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IUserInfo } from 'app/domains/user/user.i';
import FormControl from 'app/components/form-control/FormControl';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import Button from 'app/components/button';
import { useGetUserInfoMutation, useSubmitLoginMutation, useUpdateUserInfoMutation } from 'app/reducers/account/account.api';
import { toast } from 'react-hot-toast';
import { handleQueryError } from 'app/modules/utils/error-handler';

const userInfoSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  phone: Yup.string().required('Contact phone is required'),
});

export const ProfileDetails: React.FC = () => {
  // const [data, setData] = useState<IProfileDetails>(initialValues);
  // const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
  //   const updatedData = Object.assign(data, fieldsToUpdate);
  //   setData(updatedData);
  // };
  const userInfo = useAppSelector(userInfoSelector);
  // const [loading, setLoading] = useState(false);

  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

  const [getUserInfo] = useGetUserInfoMutation();

  const methods = useForm<Partial<IUserInfo>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(userInfoSchema),
    defaultValues: {
      first_name: userInfo?.first_name,
      last_name: '',
      phone: userInfo?.phone,
    },
  });

  const submitUserInfo: SubmitHandler<Partial<IUserInfo>> = async (data) => {

    try {
      data.name = data.first_name;
      await updateUser(data).unwrap();

      await getUserInfo();

      toast.success('Update Successful');

    } catch (error) {
      handleQueryError(error)
    }

  };

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Profile Details</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitUserInfo)} noValidate className="form">
            <div className="card-body border-top p-9">
              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
                <div className="col-lg-8">
                  {/* <div
                  className="image-input image-input-outline"
                  data-kt-image-input="true"
                  style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}>
                  <div
                    className="image-input-wrapper w-125px h-125px"
                    style={{ backgroundImage: `url(${toAbsoluteUrl(data.avatar)})` }}></div>
                </div> */}
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row">
                      {/* <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="First name"
                      {...formik.getFieldProps('fName')}
                    />
                    {formik.touched.fName && formik.errors.fName && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.fName}</div>
                      </div>
                    )} */}
                      <FormControl
                        type={FORM_CONTROLS.TEXT}
                        placeholder="First Name"
                        name="first_name"
                        cxContainer="fv-row mb-8"
                        label="First Name"
                        autoComplete="off"
                      />
                    </div>

                    {/* <div className="col-lg-6 fv-row">
                      <FormControl
                        type={FORM_CONTROLS.TEXT}
                        placeholder="Last Name"
                        name="last_name"
                        cxContainer="fv-row mb-8"
                        label="Last Name"
                        autoComplete="off"
                      />
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  <span className="required">Contact Phone</span>
                </label>

                <div className="col-lg-4 fv-row">
                  <FormControl
                    type={FORM_CONTROLS.TEXT}
                    placeholder="Phone"
                    name="phone"
                    cxContainer="fv-row mb-8"
                    label="Phone"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="row mb-6">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  <span >Country</span>
                </label>

                <div className="col-lg-8 fv-row">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    <span >Ho Chi Minh city</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              {/* <button type="submit" className="btn btn-primary" disabled={loading}>
              {!loading && 'Save Changes'}
              {loading && (
                <span className="indicator-progress" style={{ display: 'block' }}>
                  Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
              </button> */}

              <Button isLoading={isLoading}>Save Changes</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
