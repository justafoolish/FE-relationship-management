import { toAbsoluteUrl } from '_metronic/helpers';
import { NOTIFICATION_BADGE_STATUS, NOTIFICATION_TYPE } from 'app/domains/notification/notification.i';
import { useGetAllNotificationQuery } from 'app/reducers/api';
import { getRemainTime } from 'app/utils/common';
import clsx from 'clsx';
import { FC } from 'react';

const NotificationMenu: FC = () => {
  const { _notifications } = useGetAllNotificationQuery(undefined, {
    selectFromResult: (response) => ({
      ...response,
      _notifications: response.data?.data ?? [],
    }),
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px" data-kt-menu="true">
      <div
        className="d-flex flex-column bgi-no-repeat rounded-top"
        style={{ backgroundImage: `url('${toAbsoluteUrl('/media/misc/menu-header-bg.jpg')}')` }}>
        <h3 className="text-white fw-bold px-9 mt-10 mb-6">
          Notifications <span className="fs-8 opacity-75 ps-3">{_notifications.length ?? 0} reports</span>
        </h3>

        <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
          <li className="nav-item">
            <a
              className="nav-link text-white opacity-75 opacity-state-100 pb-4 active"
              data-bs-toggle="tab"
              href="#kt_topbar_notifications_3">
              Logs
            </a>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="kt_topbar_notifications_3" role="tabpanel">
          <div className="scroll-y mh-325px my-5 px-8">
            {_notifications.map((_notification) => (
              <div key={_notification._id} className="d-flex flex-stack py-4">
                <div className="d-flex align-items-center me-2">
                  <span
                    className={clsx(
                      'badge',
                      `badge-light-${NOTIFICATION_BADGE_STATUS[_notification.type].badge}`,
                      'me-4'
                    )}>
                    {NOTIFICATION_BADGE_STATUS[_notification.type].title}
                  </span>
                  <p className="text-gray-800 text-hover-primary fw-bold mb-0">
                    {_notification.title}
                    {'  '}
                    {_notification.type === NOTIFICATION_TYPE.RELATIONSHIP
                      ? `Contact ${_notification.info?.full_name} `
                      : ' '}
                    {_notification.type === NOTIFICATION_TYPE.APPOINTMENT
                      ? ` at ${_notification.info?.date_meeting} `
                      : ' '}
                    <span className="badge badge-light fs-8">
                      {getRemainTime(Date.now(), _notification?.created_at ?? Date.now())} ago
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMenu;
