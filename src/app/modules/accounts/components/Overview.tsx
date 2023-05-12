import { DATE_FORMAT } from 'app/constants/constant';
import { useAppSelector } from 'app/reducers/store.hook';
import { userInfoSelector } from 'app/reducers/user/auth.slice';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export function Overview() {
  const userInfo = useAppSelector(userInfoSelector);

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Profile Details</h3>
          </div>

          <Link to="/c-user/setting" className="btn btn-primary align-self-center">
            Edit Profile
          </Link>
        </div>

        <div className="card-body p-9">
          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Full Name</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark text-capitalize">
                {userInfo?.first_name} {userInfo?.last_name}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Gender</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bold fs-6 text-capitalize">{userInfo?.gender}</span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Birthday</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bold fs-6 text-capitalize">
                {dayjs(userInfo?.birthday).format(DATE_FORMAT)}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Address</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bold fs-6 text-capitalize">{userInfo?.address}</span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">
              Contact Phone
              <i
                className="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"></i>
            </label>

            <div className="col-lg-8 d-flex align-items-center">
              <span className="fw-bolder fs-6 me-2">{userInfo?.phone}</span>

              <span className="badge badge-success">Verified</span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Communication</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">Email, Phone</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
