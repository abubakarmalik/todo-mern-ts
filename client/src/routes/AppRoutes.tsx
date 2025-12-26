import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage';
import NotFound from '../pages/NotFound';
import MainLayout from '../layouts/MainLayout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="/users" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path=":id" element={<DetailsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>,
  ),
);
