import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { reInitMenu } from '../helpers';
import { ActivityDrawer, DrawerMessenger, InviteUsers, ThemeModeProvider, UpgradePlan } from '../partials';
import { Content } from './components/content';
import { FooterWrapper } from './components/footer';
import { HeaderWrapper } from './components/header';
import { ScrollTop } from './components/scroll-top';
import { Sidebar } from './components/sidebar';
import { PageDataProvider } from './core';
import CustomDialog from 'app/components/dialog/CustomDialog';

const MasterLayout = () => {
  const location = useLocation();
  useEffect(() => {
    reInitMenu();
  }, [location.key]);

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
          <div className="app-page flex-column flex-column-fluid h-screen" id="kt_app_page">
            <HeaderWrapper />
            <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
              <Sidebar />
              <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                <div className="d-flex flex-column flex-column-fluid">
                  {/* <ToolbarWrapper /> */}
                  <Content>
                    <Outlet />
                  </Content>
                </div>
                <FooterWrapper />
              </div>
            </div>
          </div>
        </div>

        {/* begin:: Drawers */}
        <ActivityDrawer />
        <DrawerMessenger />
        {/* end:: Drawers */}

        <CustomDialog />

        {/* begin:: Modals */}
        <InviteUsers />
        <UpgradePlan />
        {/* end:: Modals */}
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  );
};

export { MasterLayout };
