import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="w-full md:w-1/4 lg:w-1/3">
            <Link to="/" className="text-2xl font-bold">Ascend</Link>
            <p className="mt-4 text-gray-400">
              Find your dream job and take the next step in your career journey with us.
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Connect with us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/6 lg:w-1/6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/6 lg:w-1/6">
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-400 hover:text-white">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="text-gray-400 hover:text-white">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link to="/resume-tips" className="text-gray-400 hover:text-white">
                  Resume Tips
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/6 lg:w-1/6">
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-white">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/employer-branding" className="text-gray-400 hover:text-white">
                  Employer Branding
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ascend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

