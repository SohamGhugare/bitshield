import Link from 'next/link';

export const Navbar = () => (
  <nav className="w-full bg-white border-b border-gray-200">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-900">
        <span className="text-bitcoin">Bit</span>Shield
      </Link>
      <div className="flex items-center gap-6">
        <Link 
          href="/about" 
          className="text-gray-600 hover:text-bitcoin transition-colors"
        >
          About
        </Link>
      </div>
    </div>
  </nav>
); 