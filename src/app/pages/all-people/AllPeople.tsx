import { KTSVG } from '_metronic/helpers';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/lib/table';
import Button from 'app/components/button';
import { DATE_FORMAT } from 'app/constants/constant';
import { BUTTON_SIZES, BUTTON_VARIANTS } from 'app/domains/components/button.i';
import DIALOG_WIZARDS from 'app/domains/dialog/dialog.e';
import { IPeople } from 'app/domains/relationship/relationship.i';
import useDialog from 'app/hooks/useDialog';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useDeleteRelationshipMutation, useGetAllRelationshipQuery } from 'app/reducers/api';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

enum IBadgeType {
  SUCCESS = 'Success',
  REJECT = 'Reject',
  APPROVED = 'Approved',
  IN_PROGRESS = 'In progress',
}

const BadgeStatus: FC<{ type: IBadgeType; children: ReactNode }> = ({ type, children }) => {
  const cxBadge = clsx('badge', {
    'badge-light-success': type === IBadgeType.APPROVED,
    'badge-light-warning': type === IBadgeType.IN_PROGRESS,
    'badge-light-danger': type === IBadgeType.SUCCESS,
    'badge-light-info': type === IBadgeType.REJECT,
    'badge-light-primary': type === IBadgeType.APPROVED,
  });
  return <span className={cxBadge}>{children}</span>;
};

const AllPeople: FC = () => {
  const [deleteRelationship] = useDeleteRelationshipMutation();

  const { _relationships, refetch } = useGetAllRelationshipQuery(
    { limit: 20, page: 1 },
    {
      selectFromResult: (response) => ({
        ...response,
        _relationships: response.data?.data?.pagination.items ?? [],
      }),
    }
  );

  const { openDialog } = useDialog();

  const handleDeleteRelationship = useCallback(async (id?: string) => {
    if (!id) return;
    try {
      toast.success('Deleting');
      await deleteRelationship(id).unwrap();
      toast.success('Delete success');

      refetch();
    } catch (error) {
      handleQueryError(error);
    }
  }, []);

  const columns: ColumnsType<IPeople> = useMemo(
    () => [
      {
        title: 'Full Name',
        dataIndex: 'full_name',
        render: (text: string) => <span className="text-dark fw-bold text-hover-primary fs-6">{text}</span>,
      },
      {
        title: 'First meet',
        dataIndex: 'first_meeting',
        render: (date: string) => (
          <span className="text-dark d-block mb-1 fs-6">{dayjs(date).format(DATE_FORMAT)}</span>
        ),
      },
      {
        title: 'Note',
        dataIndex: 'notes',
      },
      {
        title: 'Tags',
        dataIndex: 'tag',
        render: (text: string) => <BadgeStatus type={IBadgeType.REJECT}>{text}</BadgeStatus>,
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        className: 'text-end',
        render: (_, { _id = '' }) => (
          <>
            <Button
              variant={BUTTON_VARIANTS.ICON}
              size={BUTTON_SIZES.SM}
              className="btn-bg-light btn-active-color-warning me-1"
              onClick={() =>
                openDialog(DIALOG_WIZARDS.UPDATE_PEOPLE_FORM, {
                  callback: refetch,
                  options: { formData: { _id } },
                })
              }>
              <KTSVG path="/media/icons/duotune/art/art005.svg" className="svg-icon-3" />
            </Button>
            <Button
              variant={BUTTON_VARIANTS.ICON}
              size={BUTTON_SIZES.SM}
              className="btn-bg-light btn-active-color-danger"
              onClick={() => handleDeleteRelationship(_id)}>
              <KTSVG path="/media/icons/duotune/general/gen027.svg" className="svg-icon-3" />
            </Button>
          </>
        ),
      },
    ],
    [_relationships]
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
            onClick={() => openDialog(DIALOG_WIZARDS.ADD_PEOPLE_FORM, { callback: refetch })}>
            Add People
          </Button>
        </div>
      </div>
      <div className="card-body py-3">
        <Table columns={columns} dataSource={_relationships as IPeople[]} size="small" />
      </div>
    </div>
  );
};

export default AllPeople;
