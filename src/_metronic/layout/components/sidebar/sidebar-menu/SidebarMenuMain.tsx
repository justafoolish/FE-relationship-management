import { SidebarMenuItem } from './SidebarMenuItem';
import { useIntl } from 'react-intl';

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      {/* <SidebarMenuItem
        to="/dashboard"
        icon="/media/icons/duotune/art/art002.svg"
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon="bi-app-indicator"
      /> */}
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">Dashboard</span>
        </div>
      </div>

      <SidebarMenuItem
        to="/c-user"
        icon="/media/icons/duotune/communication/com013.svg"
        title="Profile"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/appointment"
        icon="/media/icons/duotune/communication/com004.svg"
        title="Appointment"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/all-people"
        icon="/media/icons/duotune/communication/com005.svg"
        title="All People"
        fontIcon="bi-layers"
      />

    </>
  );
};

export { SidebarMenuMain };
