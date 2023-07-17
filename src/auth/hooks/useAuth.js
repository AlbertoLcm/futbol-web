import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}