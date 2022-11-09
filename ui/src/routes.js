import { useRoutes } from 'react-router-dom';
import Page404 from './pages/Page404';
import Cop27 from './pages/Cop27';
import FAQ from './pages/FAQ';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path:'/',
      element: <Cop27 />
    },
    {
      path: '/faq',
      element: <FAQ/>
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
