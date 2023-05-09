/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG } from '_metronic/helpers';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/lib/table';
import Button from 'app/components/button';
import { BUTTON_SIZES } from 'app/domains/components/button.i';
import DIALOG_WIZARDS from 'app/domains/dialog/dialog.e';
import useDialog from 'app/hooks/useDialog';
import { useGetAllRelationshipQuery } from 'app/reducers/api';
import clsx from 'clsx';
import { FC, useMemo } from 'react';

enum IBadgeType {
  SUCCESS = 'Success',
  REJECT = 'Reject',
  APPROVED = 'Approved',
  IN_PROGRESS = 'In progress',
}

const BadgeStatus: FC<{ type: IBadgeType }> = ({ type }) => {
  const cxBadge = clsx('badge', {
    'badge-light-success': type === IBadgeType.APPROVED,
    'badge-light-warning': type === IBadgeType.IN_PROGRESS,
    'badge-light-danger': type === IBadgeType.SUCCESS,
    'badge-light-info': type === IBadgeType.REJECT,
    'badge-light-primary': type === IBadgeType.APPROVED,
  });
  return <span className={cxBadge}>{type}</span>;
};

interface IAllPeople {
  orderId: string;
  total: number | string;
  country: string;
  company: string;
  status: IBadgeType;
  date: Date | number | string;
}

const AllPeople: FC = () => {
  const { data: _relationships } = useGetAllRelationshipQuery({ limit: 10, page: 1 });

  console.log(_relationships);

  const { openDialog } = useDialog();

  const columns: ColumnsType<IAllPeople> = useMemo(
    () => [
      {
        title: 'Order Id',
        dataIndex: 'orderId',
        render: (text: string) => (
          <a href="#" className="text-dark fw-bold text-hover-primary fs-6">
            {text}
          </a>
        ),
      },
      {
        title: 'Country',
        dataIndex: 'country',
        render: (text: string) => (
          <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
            {text}
          </a>
        ),
      },
      {
        title: 'Date',
        dataIndex: 'date',
      },
      {
        title: 'Company',
        dataIndex: 'company',
        render: (text: string) => (
          <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
            {text}
          </a>
        ),
      },
      {
        title: 'Total',
        dataIndex: 'total',
        render: (text: string) => (
          <a href="#" className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
            {text}
          </a>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status: IBadgeType) => <BadgeStatus type={status} />,
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        className: 'text-end',

        render: () => (
          <>
            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
              <KTSVG path="/media/icons/duotune/general/gen019.svg" className="svg-icon-3" />
            </a>
            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
              <KTSVG path="/media/icons/duotune/art/art005.svg" className="svg-icon-3" />
            </a>
            <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
              <KTSVG path="/media/icons/duotune/general/gen027.svg" className="svg-icon-3" />
            </a>
          </>
        ),
      },
    ],
    []
  );

  const data: IAllPeople[] = useMemo(
    () => [
      {
        orderId: '56037-XDER',
        country: 'Brasil',
        total: '$3560',
        date: 32,
        company: 'The Hill',
        status: IBadgeType.APPROVED,
      },
      {
        orderId: '05822-FXSP',
        country: 'Belarus',
        total: '$3560',
        date: 32,
        company: 'RoadGee',
        status: IBadgeType.IN_PROGRESS,
      },
      {
        orderId: '4472-QREX',
        country: 'Agoda',
        total: '$3560',
        date: 32,
        company: 'WorldQuant',
        status: IBadgeType.SUCCESS,
      },
      {
        orderId: '00347-BCLQ',
        country: 'Vietnam',
        total: '$3560',
        date: 32,
        company: 'Axon',
        status: IBadgeType.REJECT,
      },
      {
        orderId: '59486-XDER',
        country: 'Thailand',
        total: '$3560',
        date: 32,
        company: 'Employment Hero',
        status: IBadgeType.APPROVED,
      },
    ],
    []
  );

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">All people</span>
          <span className="text-muted mt-1 fw-semibold fs-7">A group of all the people in your network</span>
        </h3>
        <div className="card-toolbar">
          <Button
            className="px-4"
            size={BUTTON_SIZES.SM}
            onClick={() =>
              openDialog(DIALOG_WIZARDS.ADD_PEOPLE_FORM, {
                callback: () => console.log('hehe'),
              })
            }>
            Add People
          </Button>
        </div>
      </div>
      <div className="card-body py-3">
        <Table columns={columns} dataSource={data} size="small" />
      </div>
    </div>
  );
};

export default AllPeople;
