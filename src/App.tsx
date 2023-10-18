
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './assets/vendors.css';
import './assets/app.css';
import './assets/core/menu/menu-types/horizontal-menu.css';
import './App.css';

import MainPage from './MainPage';
import JuniorSeniorPromotion from './JuniorSeniorStaff/JuniorSeniorPromotion';
import AdministrativeProfessional from './AdministrativeProfessionalStaff/AdministrativeProfessional';
import { Provider } from 'react-redux';
import store from './store';
import PendingHoDCompletion from "./PendingHoDCompletion/PendingHoDCompletion";
import CompleteSeniorJuniorApplication from "./HoD/CompleteSeniorJuniorApplication";
import CompleteAdminProfApplication from "./HoD/CompleteAdminProfApplication";


const prodBaseURL = process.env.NODE_ENV =='development' ? '' : '/services/staff/staff-promotions';

const router = createBrowserRouter([
  {
    path: prodBaseURL+"/",
    element: <MainPage />,
  },
  {
    path: prodBaseURL+"/junior-senior-promotion",
    element: <JuniorSeniorPromotion />,
  }, 
  {
    path: prodBaseURL+"/admin-professional-promotion",
    element: <AdministrativeProfessional />,
  }, 
  {
    path: prodBaseURL+"/pending-hod-completion",
    element: <PendingHoDCompletion />,
  },
  {
    path: prodBaseURL+"/snrjnr-hod-complete-application",
    element: <CompleteSeniorJuniorApplication />,
  },
  {
    path: prodBaseURL+"/adminprof-hod-complete-application",
    element: <CompleteAdminProfApplication />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
     </Provider>
    </>
  )
}

export default App
