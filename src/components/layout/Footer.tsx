import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#3D2914] text-[#C9A227] py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 text-center">
        {/* Production credit */}
        <p className="text-sm font-[family-name:var(--font-heading)] tracking-wide">
          an Olivo e Biscotto production.
        </p>

        {/* Contribute */}
        <p className="text-xs text-[#F5E6A3]">
          contribute / pay what you want @curiouskidsdotfun on Venmo.
        </p>

        {/* Contact */}
        <p className="text-xs text-[#CD7F32]">
          Feedback or see something wrong? Contact us at{' '}
          <a
            href="mailto:info@padna.app"
            className="text-[#F5E6A3] hover:text-white underline underline-offset-2 transition-colors"
          >
            info@padna.app
          </a>
        </p>

        {/* Home link */}
        <Link
          to="/"
          className="text-xs text-[#F5E6A3] hover:text-white underline underline-offset-2 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </footer>
  );
}
