import { FC, lazy } from 'react';

const Test = lazy(() => import('components/temp'));

const Home: FC = () => {
  return (
    <div>
      <Test />
    </div>
  );
};

export default Home;
