import Logo from "@/components/shared/Logo";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F1115] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-wrap *:min-w-32 justify-between gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6 min-w-full! md:min-w-auto! flex-1">
            <Logo variant="white" textClassName="text-white" />
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Enjoy homemade flavors & chef&apos;s signature dishes, freshly prepared every day. Order online or visit our nearest branch.
            </p>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Follow on Social Media</h4>
              <div className="flex gap-4">
                <SocialIcon icon={<Facebook size={18} />} />
                <SocialIcon icon={<Instagram size={18} />} />
                <SocialIcon icon={<Linkedin size={18} />} />
                <SocialIcon icon={<Twitter size={18} />} />
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block"></div>

          {/* Explore Links */}
          <div className="flex-1">
             <h3 className="font-semibold mb-6">Explore</h3>
             <ul className="space-y-4 text-sm text-gray-400">
               <li><Link href="/" className="hover:text-primary transition-colors">All Food</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Nearby</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Discount</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Best Seller</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Delivery</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Lunch</Link></li>
             </ul>
          </div>

           {/* Help Links */}
           <div className="flex-1">
             <h3 className="font-semibold mb-6">Help</h3>
             <ul className="space-y-4 text-sm text-gray-400">
               <li><Link href="/" className="hover:text-primary transition-colors">How to Order</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Payment Methods</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Track My Order</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">FAQ</Link></li>
               <li><Link href="/" className="hover:text-primary transition-colors">Contact Us</Link></li>
             </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
      {icon}
    </button>
  );
}
