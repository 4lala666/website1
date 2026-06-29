import { useEffect, useState } from 'react';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(target, isActive, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(easeOutCubic(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    }
    requestAnimationFrame(step);
  }, [isActive, target, duration]);
  return value;
}
