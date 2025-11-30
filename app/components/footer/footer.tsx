import { Search, ShoppingCart, User } from "lucide-react";

export default function Footer() {
    return (
            <footer className="bg-black text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">PRODUCT</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">T-SHIRTS</a></li>
                <li><a href="#" className="hover:text-white">HOODIES</a></li>
                <li><a href="#" className="hover:text-white">LONG SLEEVES</a></li>
                <li><a href="#" className="hover:text-white">CUSTOM DESIGN</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">CATALOG</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">NEW ARRIVALS</a></li>
                <li><a href="#" className="hover:text-white">BEST SELLERS</a></li>
                <li><a href="#" className="hover:text-white">COLLABORATIONS</a></li>
                <li><a href="#" className="hover:text-white">COLLECTIONS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">CUSTOMER SERVICE</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">CONTACT US</a></li>
                <li><a href="#" className="hover:text-white">SHIPPING INFO</a></li>
                <li><a href="#" className="hover:text-white">RETURNS</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">ABOUT PRINTWAVES</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">OUR STORY</a></li>
                <li><a href="#" className="hover:text-white">SUSTAINABILITY</a></li>
                <li><a href="#" className="hover:text-white">CAREERS</a></li>
                <li><a href="#" className="hover:text-white">PRESS</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-black mb-3 sm:mb-4 opacity-20">PrintWaves</div>
              <p className="text-xs text-gray-500">© 2024 PRINTWAVES. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </footer>
    )
}