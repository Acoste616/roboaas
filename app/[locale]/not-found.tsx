import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-3xl font-bold text-neutral-light mb-4">Strona nie znaleziona</h2>
        <p className="text-neutral-gray mb-8">
          Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona.
        </p>
        <Link href="/pl" className="btn-primary">
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}
