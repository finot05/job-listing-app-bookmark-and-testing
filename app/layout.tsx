import './globals.css';
import { Providers } from '../store/providers';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ToastContainer position="top-right" autoClose={2000} />
        </Providers>
      </body>
    </html>
  );
}
