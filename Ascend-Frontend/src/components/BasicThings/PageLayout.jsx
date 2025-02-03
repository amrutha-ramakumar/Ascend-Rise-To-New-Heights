import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

export default function PageLayout({ title, children }) {
  return (
    <div className="min-h-screen py-11 bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-16 flex flex-col justify-center">
        <h1 className="text-4xl  font-bold mb-8 text-center">{title}</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          {children}
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}



PageLayout.propTypes = {
    title: PropTypes.string.isRequired,  // title must be a string and is required
    children: PropTypes.node,            // children can be any renderable content
  };
  
  // ✅ Default props (optional)
  PageLayout.defaultProps = {
    title: "Page Title",                 // Default title if none is provided
  };