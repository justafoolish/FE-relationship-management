import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'app/components/button';
import AvatarButton from 'app/components/button/AvatarButton';
import FormControl from 'app/components/form-control/FormControl';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { IUserInfo } from 'app/domains/user/user.i';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useGetUserInfoMutation, useUpdateUserInfoMutation } from 'app/reducers/account/account.api';
import { useAppSelector } from 'app/reducers/store.hook';
import { userInfoSelector } from 'app/reducers/user/auth.slice';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

const userInfoSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  phone: Yup.number().required('Contact phone is required'),
  gender: Yup.string(),
  birthday: Yup.string(),
  address: Yup.string(),
  relationNotification: Yup.string(),
  appointmentNotification: Yup.string(),
});

interface IUserSetting {
  relationNotification?: string | number;
  appointmentNotification?: string | number;
}

export const ProfileDetails: React.FC = () => {
  const userInfo = useAppSelector(userInfoSelector);

  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

  const [getUserInfo] = useGetUserInfoMutation();

  const methods = useForm<Partial<IUserInfo & IUserSetting>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(userInfoSchema),
    defaultValues: {
      first_name: userInfo?.first_name,
      phone: userInfo?.phone,
      avatar: userInfo?.avatar,
      gender: userInfo?.gender,
      address: userInfo?.address,
      appointmentNotification: userInfo?.settings?.ready_time_appointment ?? 1,
      relationNotification: userInfo?.settings?.user_long_time ?? 7,
    },
  });

  useEffect(() => {
    if (isEmpty(userInfo)) return;
    methods.setValue('birthday', dayjs(userInfo.birthday));
  }, [userInfo]);

  const submitUserInfo: SubmitHandler<Partial<IUserInfo & IUserSetting>> = async (formData) => {
    try {
      const {
        first_name,
        avatar,
        birthday,
        relationNotification = 7,
        appointmentNotification = 1,
        ...data
      } = formData;

      await updateUser({
        ...data,
        first_name,
        name: first_name,
        ...(avatar !== userInfo?.avatar ? { avatar } : {}),
        birthday: dayjs(birthday).toISOString(),
        setting: [+relationNotification, +appointmentNotification],
      }).unwrap();

      await getUserInfo();

      toast.success('Update Successful');
    } catch (error) {
      handleQueryError(error);
    }
  };

  const formFields = useMemo(
    () => [
      {
        label: 'Full Name',
        type: FORM_CONTROLS.TEXT,
        placeholder: 'Full Name',
        name: 'first_name',
      },
      {
        label: 'Gender',
        type: FORM_CONTROLS.SELECT,
        placeholder: 'Gender',
        name: 'gender',
        options: [
          {
            label: 'Male',
            value: 'male',
          },
          {
            label: 'Female',
            value: 'female',
          },
          {
            label: 'Other',
            value: 'other',
          },
        ],
      },
      {
        label: 'Birthday',
        type: FORM_CONTROLS.DATE_PICKER,
        placeholder: 'Birthday',
        name: 'birthday',
      },
      {
        label: 'Phone',
        type: FORM_CONTROLS.TEXT,
        placeholder: 'Phone',
        name: 'phone',
      },
      {
        label: 'Address',
        type: FORM_CONTROLS.TEXT,
        placeholder: 'Address',
        name: 'address',
      },
      {
        label: 'Relation Notification',
        type: FORM_CONTROLS.TEXT,
        placeholder: 'Enter time amount',
        name: 'relationNotification',
      },
      {
        label: 'Appointment Notification',
        type: FORM_CONTROLS.TEXT,
        placeholder: 'Enter time amount',
        name: 'appointmentNotification',
      },
    ],
    []
  );

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
                <label className="align-self-center mb-2 col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
                <div className="col-lg-8">
                  <AvatarButton name="avatar" algin="start" />
                </div>
              </div>

              {formFields.map(({ label, ...inputProps }) => (
                <div className="row mb-6" key={label}>
                  <label className="align-self-center mb-2 col-lg-4 col-form-label fw-bold fs-6">
                    {label}
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <FormControl {...inputProps} cxContainer="fv-row mb-8" autoComplete="off" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <Button isLoading={isLoading}>Save Changes</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
