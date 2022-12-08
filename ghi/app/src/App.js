import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutoList from './AutoList';
import AutoForm from './AutoForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';
import ServiceHistory from './ServiceHistory';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/autos" element={<AutoList />} />
          <Route path="/autos/new" element={<AutoForm />} />
          {/* <Route path="/models" element={<ModelList />} />
          <Route path="/models/new" element={<ModelForm />} /> */}
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/service" element={<ServiceList />} />
          <Route path="/service/new" element={<ServiceForm />} />
          <Route path="/history" element={<ServiceHistory />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
