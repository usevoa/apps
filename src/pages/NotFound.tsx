import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const NotFoundPage = () => (
  <div className="min-h-screen selection:bg-brand/30 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
    <Helmet>
      <title>404 — VOA Apps</title>
    </Helmet>
    <Navbar />
    <main className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg mb-8">
          Pagina nao encontrada.
        </p>
        <Link
          to="/"
          className="inline-flex bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-hover transition-all"
        >
          Voltar para Apps
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFoundPage;
