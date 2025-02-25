import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContexts';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/BasicThings/Home';
import RegisterPage from './pages/Auth/RegisterPage';
import Login from './pages/Auth/Login';
import AboutUs from './components/BasicThings/AboutUs';
import ContactUs from './components/BasicThings/ContactUs';
import PrivacyPolicy from './components/BasicThings/PrivacyPolicy';
import TermsAndConditions from './components/BasicThings/TermsAndConditions';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Footer from './components/Footer';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SubscriptionPlanForm from './pages/Admin/Subscription/SubscriptionPlanForm';
import SubscriptionPlanList from './pages/Admin/Subscription/SubscriptionPlanList';
import EmployerPaymentSuccess from './pages/Employer/Payment/employer-payment-success';
import JobseekerPaymentSuccess from './pages/Jobseeker/Payment/jobseeker-payment-success';
import PaymentPage from './pages/Employer/Payment/employer-payment-page';
import PaymentPageEmployer from './pages/Jobseeker/Payment/payment-page';
import EmployerPlans from './pages/Employer/Payment/EmployerPlans';
import JobseekerPlans from './pages/Jobseeker/Payment/JobseekerPlans';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import JobseekerDashboard from './pages/Jobseeker/JobseekerDashboard';
import JobseekerDetailsForm from './pages/Jobseeker/JobseekerDetailsFrom';
import EmployerDetailsForm from './pages/Employer/EmployerDetailsForm'
import CreateJob from './pages/Employer/Job/CreateJob'
import ListActiveJobs from './pages/Employer/Job/ActiveListJobs';
import ListExpiredJobs from './pages/Employer/Job/ExpiredJobList';

import ListAllJobs from './pages/Jobseeker/Job/ListAllJobs';
import JobSeekerProfile from './pages/Jobseeker/Profile test/JobseekerProfile';
import SavedJobs from './pages/Jobseeker/Job/SavedJobs';
import AppliedJobs from './pages/Jobseeker/Job/AppliedJobs';
import ApplyJob from './pages/Jobseeker/Job/ApplyJob';
import ViewJob from './pages/Jobseeker/Job/ViewJob';
import ApplicationDetails from './pages/Employer/Job/ApplicationDetails'
import ProfileView from './pages/Employer/ProfileView';
import EditProfile from './pages/Employer/EditProfile';
import Employers from './pages/Admin/Users/Employers'
import JobSeekersList from './pages/Admin/Users/Jobseekers';
import EmployerVerification from './pages/Admin/Users/EmployerVerification';
import ChatPage from './pages/Employer/chat/ChatPage';
import Chating from './pages/Jobseeker/Job/ChatPage'
import EmployerDetails from './pages/Admin/Users/EmployerDetails';
import VideoCall from './pages/Employer/chat/VideoCall';
import UnapprovedJobsTable from './pages/Admin/Job/UnapprovedJobsTable';
import JobVerification from './pages/Admin/Job/JobVerification';
// import Chat from './components/Chat';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route element={<ProtectedRoute />}>
              <Route path="/jobseeker/dashboard" element={<JobseekerDashboard />} />
            <Route path="/jobseeker/complete-profile" element={<JobseekerDetailsForm />} />
            <Route path="/jobseeker/jobs" element={<ListAllJobs />} />
            <Route path="/jobseeker/profile" element={<JobSeekerProfile />} />
            <Route path="/jobseeker/savedJobs" element={<SavedJobs />} />
            <Route path="/jobseeker/my-jobs" element={<AppliedJobs />} />
            <Route path="/jobseeker/apply-job/:jobId" element={<ApplyJob />} />
            <Route path="/jobseeker/view-job/:applicationId" element={<ViewJob />} />
            <Route path="/jobseeker/jobseeker-plans" element={<JobseekerPlans />} />
            <Route path="/jobseeker/payment" element={<PaymentPage />} />
            <Route path="/jobseeker/payment-success" element={<JobseekerPaymentSuccess />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/create-job" element={<CreateJob />} />

            <Route path="/employer/edit-job/:jobId" element={<CreateJob />} />
            
            <Route path="/employer/profile" element={<ProfileView />} /> 
            <Route path="/employer/application/:jobId" element={<ApplicationDetails />} />
            <Route path="/employer/jobs" element={<ListActiveJobs />} /> 
            <Route path="/employer/expiredjobs" element={<ListExpiredJobs />} /> 
            <Route path="/edit" element={<EditProfile />} /> 
            <Route path="/employer/chat/:chatId" element={<ChatPage />} />
            <Route path="/chat/:chatId" element={<Chating />} />
            <Route path="/employer/complete-profile" element={<EmployerDetailsForm />} />
            <Route path="/employer/employer-plans" element={<EmployerPlans />} />
            <Route path="/employer/payment" element={<PaymentPageEmployer />} />
            <Route path="/employer/payment-success" element={<EmployerPaymentSuccess />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/jobseeker-list" element={<JobSeekersList />} />
            <Route path="/video-call" element={<VideoCall />} />
            <Route path="/admin/employer-list" element={<Employers />} />
            <Route path="/admin/employer-verification" element={<EmployerVerification />} />
            <Route path="/admin/employer-details/:empId" element={<EmployerDetails />} />
            <Route path="/admin/subscription-plans" element={<SubscriptionPlanList />} /> 
            <Route path="/admin/subscription-plans/new" element={<SubscriptionPlanForm />} />
            <Route path="/admin/jobs" element={<UnapprovedJobsTable />} />
            <Route path="/admin/verify/:id" element={<JobVerification />} />

            {/* <Route path="/chats/:userRole" element={<Chat />} /> */}

            <Route path="/admin/subscription-plans/edit/:id" element={<SubscriptionPlanForm />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
