import { PageLink, PageTitle } from '_metronic/layout/core';
import { AccountHeader } from 'app/modules/accounts/AccountHeader';
import { Settings } from 'app/modules/accounts/components/settings/Settings';
import { FC } from 'react';

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/crafted/account/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];

const UserSetting: FC = () => {
  return (
    <>
      <AccountHeader />
      <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
      <Settings />
    </>
  );
};

export default UserSetting;
