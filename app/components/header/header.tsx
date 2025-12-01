import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-black">The Village</Link>
          <nav className="hidden lg:flex gap-4 xl:gap-8">
            <a href="#" className="text-xs sm:text-sm font-medium hover:underline">NEW DROP</a>
            <a href="#" className="text-xs sm:text-sm font-medium hover:underline">CATALOG</a>
            <a href="#" className="text-xs sm:text-sm font-medium hover:underline">ABOUT</a>
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
            <User className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
          </div>
        </div>
      </header>
    )
}