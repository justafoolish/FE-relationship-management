import { KTSVG, toAbsoluteUrl } from '_metronic/helpers';
import { Dropdown, MenuProps, Space } from 'antd';
import { BUTTON_SIZES, BUTTON_VARIANTS } from 'app/domains/components/button.i';
import { FC } from 'react';
import Button from '../button';

interface IAppointmentProps {
  className: string;
  image: string;
  title: string;
  time: string;
  description: string;
  dropdownItems: MenuProps['items'];
}

const AppointmentCard: FC<Partial<IAppointmentProps>> = ({
  className,
  image,
  title,
  time,
  description = '',
  dropdownItems = [],
}) => {
  return (
    <div
      className={`card bgi-no-repeat ${className}`}
      style={{
        backgroundPosition: 'right top',
        backgroundSize: '30% auto',
        backgroundImage: `url(${toAbsoluteUrl('/media/svg/shapes/' + image)})`,
      }}>
      <div className="card-header border-0">
        <h3 className="card-title fw-bold text-muted text-hover-primary fs-4">{title}</h3>
        <div className="card-toolbar">
          <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
            <Button
              size={BUTTON_SIZES.SM}
              variant={BUTTON_VARIANTS.ICON}
              className="btn-color-primary btn-active-light-primary"
              onClick={(e) => e.preventDefault()}>
              <Space>
                <KTSVG path="/media/icons/duotune/general/gen024.svg" className="svg-icon-2" />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="fw-bold text-primary my-6">{time}</div>

        <p
          className="text-dark-75 fw-semibold fs-5 m-0"
          dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
};

export default AppointmentCard;
