import React from 'react';
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from '../../../../_metronic/partials/widgets';
import { useAppSelector } from 'app/reducers/store.hook';
import { userInfoSelector } from 'app/reducers/user/auth.slice';

export function Overview() {
  const userInfo = useAppSelector(userInfoSelector);

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Profile Details</h3>
          </div>

          {/* <Link to="/crafted/account/settings" className="btn btn-primary align-self-center">
            Edit Profile
          </Link> */}
        </div>

        <div className="card-body p-9">
          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Full Name</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {userInfo?.first_name} {userInfo?.last_name}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Company</label>

            <div className="col-lg-8 fv-row">
              <span className="fw-bold fs-6">SGU</span>
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
            <label className="col-lg-4 fw-bold text-muted">Company Site</label>

            <a href="https://sgu.edu.vn/" rel="noreferrer" target="_blank" className="col-lg-8">
              sgu.edu.com.vn
            </a>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">
              Country
              <i
                className="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Country of origination"></i>
            </label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">Viet Nam</span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Communication</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">Email, Phone</span>
            </div>
          </div>

          {/* <div className="row mb-10">
            <label className="col-lg-4 fw-bold text-muted">Allow Changes</label>

            <div className="col-lg-8">
              <span className="fw-bold fs-6">No</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className="row gy-10 gx-xl-10">
        <div className="col-xl-6">
          <ChartsWidget1 className="card-xxl-stretch mb-5 mb-xl-10" />
        </div>

        <div className="col-xl-6">
          <TablesWidget1 className="card-xxl-stretch mb-5 mb-xl-10" />
        </div>
      </div>

      <div className="row gy-10 gx-xl-10">
        <div className="col-xl-6">
          <ListsWidget5 className="card-xxl-stretch mb-5 mb-xl-10" />
        </div>

        <div className="col-xl-6">
          <TablesWidget5 className="card-xxl-stretch mb-5 mb-xl-10" />
        </div>
      </div> */}
    </>
  );
}
