import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutoList from './AutoList';
import AutoForm from './AutoForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import SalesList from './SalesList';
import SaleRecordForm from './SaleRecordForm';
import SalesHistoryList from './SalesHistory';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonList from './SalesPersonList';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';

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
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/new" element={<SaleRecordForm />} />
          <Route path="/sales/history" element={<SalesHistoryList />} />
          <Route path="/salespeople" element={<SalesPersonList />} />
          <Route path="/salespeople/new" element={<SalesPersonForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
