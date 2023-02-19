import { mathSelector } from 'reducers/math/math.slice';
import { useAppSelector } from 'reducers/store.hook';

const useCustomHook = () => {
  const { a, b } = useAppSelector(mathSelector);

  const getTotal = () => a + b;

  return { getTotal };
};

export default useCustomHook;
