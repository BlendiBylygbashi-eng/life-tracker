'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardDocumentIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-md hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo/Brand */}
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-primary-500">Life Tracker</span>
              </div>
              
              {/* Navigation Links */}
              <div className="ml-6 flex space-x-8">
                <Link 
                  href="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === '/' 
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Daily Entry
                </Link>
                
                <Link 
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg sm:hidden z-50">
        <div className="flex justify-around">
          <Link 
            href="/"
            className={`flex flex-col items-center py-3 w-1/2 ${
              pathname === '/' ? 'text-primary-500' : 'text-gray-500'
            }`}
          >
            <ClipboardDocumentIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Daily Entry</span>
          </Link>
          
          <Link 
            href="/dashboard"
            className={`flex flex-col items-center py-3 w-1/2 ${
              pathname === '/dashboard' ? 'text-primary-500' : 'text-gray-500'
            }`}
          >
            <ChartBarIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
        </div>
      </nav>

      {/* Add bottom padding to content on mobile to account for fixed nav */}
      <div className="pb-16 sm:pb-0"></div>
    </>
  );
}
