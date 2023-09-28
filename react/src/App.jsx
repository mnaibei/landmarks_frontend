import { Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landmarks from './components/landmarks/Landmarks';
import LandmarkDetails from './components/landmarks/LandmarkDetails';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landmarks />,
  },
  {
    path: 'landmark/:id',
    element: <LandmarkDetails />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div>
        <Routes>{router.routes}</Routes>
      </div>
    </RouterProvider>
  );
}

export default App;
