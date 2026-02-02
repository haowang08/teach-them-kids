import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3D2914] text-[#C9A227] py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 text-center">
        {/* Motivational message */}
        <p className="text-lg font-[family-name:var(--font-heading)] tracking-wide">
          Keep Exploring!
        </p>

        {/* Home link */}
        <Link
          to="/"
          className="text-sm text-[#F5E6A3] hover:text-white underline underline-offset-2 transition-colors"
        >
          Back to Home
        </Link>

        {/* Copyright */}
        <p className="text-xs text-[#CD7F32]">
          &copy; {year} Kids Learn Everything. Made with curiosity and wonder.
        </p>
      </div>
    </footer>
  );
}
