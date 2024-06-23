import './App.css';
import EventRegistration from './components/EventRegistration';
import JobRegistration from './components/JobRegistration';
import Survey from './components/Survey';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';

function App() {
  return (
    <div className="w-screen min-h-screen bg-[#E1EBEE]">
      <Routes>
          <Route path="/internshalaFormAssignment" element={<Home />} />
          <Route path="/event-registration-form" element={<EventRegistration />} />
          <Route path="/job-regsitration-form" element={<JobRegistration />} />
          <Route path='/survey-registration-form' element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
