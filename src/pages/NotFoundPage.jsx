import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">Check the address or return to the homepage.</p>
      <Link className="mt-6 inline-block font-semibold text-blue-800 underline" to="/">
        Back to home
      </Link>
    </section>
  );
}
