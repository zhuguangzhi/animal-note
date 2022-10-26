import { useEffect } from 'react';

export const useMounted = (call: () => void) => {
  useEffect(call, []);
};
