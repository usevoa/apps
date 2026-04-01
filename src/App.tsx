import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, ThemeProvider } from './context';
import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AppsPage = lazy(() => import('./pages/Apps'));
const MoovoaPage = lazy(() => import('./pages/Moovoa'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const LegalPage = lazy(() => import('./pages/Legal'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark">
    <div className="h-8 w-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <ScrollToTop />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<AppsPage />} />
              <Route path="/moovoa" element={<MoovoaPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/legal/:page" element={<LegalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
