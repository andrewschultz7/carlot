import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutoList from './AutoList';
import AutoForm from './AutoForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/autos" element={<AutoList/>} />
          <Route path="/autos/new" element={<AutoForm />} /> */}
          <Route path="/models" element={<ModelList />} />
          <Route path="/models/new" element={<ModelForm />} />
          {/* <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
