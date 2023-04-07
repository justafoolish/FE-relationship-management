import useAuthGuard from 'app/hooks/useAuthGuard';
import { useEffect } from 'react';
import { Navigate, Routes } from 'react-router-dom';

export function Logout() {
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
}
