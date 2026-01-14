import Link from "next/link";
import { Mail, MapPin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-primary">JJC Puerto Princesa Perlas</h3>
            <p className="text-gray-300 mb-4">
              Building Leaders, Serving Humanity. Empowering young people to create positive change.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a
                href="https://www.facebook.com/jjcpuertoprincesaperlas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:jjcpuertoprincesaperlas@gmail.com"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 text-white transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-primary transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-primary transition-colors">
                  Membership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <a
                  href="mailto:jjcpuertoprincesaperlas@gmail.com"
                  className="hover:text-primary transition-colors break-all"
                >
                  jjcpuertoprincesaperlas@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Facebook className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <a
                  href="https://www.facebook.com/jjcpuertoprincesaperlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Facebook Page
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <span>Puerto Princesa City, Palawan, Philippines</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} JJC Puerto Princesa Perlas. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Part of the Philippine Junior Jaycees - Empowering Young Leaders Since 1975
          </p>
        </div>
      </div>
    </footer>
  );
}

