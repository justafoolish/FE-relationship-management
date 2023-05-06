import { FC } from 'react';

interface Props {
  last_login?: string;
}

const UserLastLoginCell: FC<Props> = ({ last_login }) => (
  <div className="badge badge-light fw-bolder">{last_login}</div>
);

export { UserLastLoginCell };
