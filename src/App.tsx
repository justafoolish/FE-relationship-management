import { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routesConfig from 'utils/constants/routes';

const App: FC = () => {
  const routeElement = useRoutes(routesConfig);
  return (
    <div className="App">
      <Suspense fallback={<></>}>{routeElement}</Suspense>
    </div>
  );
};

export default App;
