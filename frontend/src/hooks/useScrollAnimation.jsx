import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (ref, threshold = 0.1) => {
  const isInView = useInView(ref, { once: true, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return { isInView, hasAnimated };
}; 