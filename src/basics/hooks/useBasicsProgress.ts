import { useContext } from 'react';
import {
  BasicsProgressContext,
  type BasicsProgressContextType,
} from '../context/BasicsProgressContext';

/**
 * Convenience hook that returns the BasicsProgress context.
 * Must be used inside a <BasicsProgressProvider>.
 */
export function useBasicsProgress(): BasicsProgressContextType {
  const ctx = useContext(BasicsProgressContext);
  if (!ctx) {
    throw new Error(
      'useBasicsProgress must be used within a <BasicsProgressProvider>',
    );
  }
  return ctx;
}
