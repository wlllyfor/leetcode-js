import Home from './pages/Home';
import Detail from './pages/Detail';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
];

export default routes;