import useAuthGuard from 'app/hooks/useAuthGuard';
import { FC, useEffect } from 'react';
import { Navigate, Routes } from 'react-router-dom';

const Logout: FC = () => {
  const { handleLogout } = useAuthGuard();
  useEffect(() => {
    handleLogout();
    document.location.reload();
  }, [handleLogout]);

  return (
    <Routes>
      <Navigate to="/auth/login" />
    </Routes>
  );
};

export default Logout;
