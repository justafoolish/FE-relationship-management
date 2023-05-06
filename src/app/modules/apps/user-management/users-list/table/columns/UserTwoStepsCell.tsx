import { FC } from 'react';

interface Props {
  two_steps?: boolean;
}

const UserTwoStepsCell: FC<Props> = ({ two_steps }) => (
  <> {two_steps && <div className="badge badge-light-success fw-bolder">Enabled</div>}</>
);

export { UserTwoStepsCell };
