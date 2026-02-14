import { Outlet } from 'react-router-dom';
import { BasicsProgressProvider } from '../../context/BasicsProgressContext';

export default function BasicsLayout() {
  return (
    <BasicsProgressProvider>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2838 50%, #0D1B2A 100%)',
        overflow: 'hidden',
      }}>
        <Outlet />
      </div>
    </BasicsProgressProvider>
  );
}
