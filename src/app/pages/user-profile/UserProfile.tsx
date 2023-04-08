import { PageTitle, PageLink } from '_metronic/layout/core';
import { AccountHeader } from 'app/modules/accounts/AccountHeader';
import { Overview } from 'app/modules/accounts/components/Overview';
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

const UserProfile: FC = () => {
  return (
    <>
      <AccountHeader />
      <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
      <Overview />
    </>
  );
};

export default UserProfile;
