
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ('entreprise' | 'particulier')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedUserTypes 
}) => {
  const { currentUser, isInitialized } = useApiData();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement..." />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes && !allowedUserTypes.includes(currentUser.type)) {
    return <Navigate to={currentUser.type === 'entreprise' ? '/entreprise' : '/mon-espace'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
