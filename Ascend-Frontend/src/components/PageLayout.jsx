import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './BasicThings/Home';
import AboutUs from './BasicThings/AboutUs';
import ContactUs from './BasicThings/ContactUs';
import PrivacyPolicy from './BasicThings/PrivacyPolicy';
import TermsAndConditions from './BasicThings/TermsAndConditions';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

