import { useEffect } from 'react';

const useTimeSyncedReload = () => {
  useEffect(() => {
    // Calculate time until next 5-minute mark
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();
    
    // Calculate milliseconds until next 5-minute mark
    const currentMs = (minutes * 60 + seconds) * 1000 + ms;
    const nextFiveMin = Math.ceil((minutes+1) / 5) * 5;
    const nextFiveMinMs = nextFiveMin * 60 * 1000;
    const delay = nextFiveMinMs - currentMs;
    
    // Set initial timeout to sync with 5-minute marks
    const initialTimeout = setTimeout(() => {
      window.location.reload();
      
      // Note: We don't need to set up an interval since the page will reload
    }, delay);
    
    return () => clearTimeout(initialTimeout);
  }, []);
};

export default useTimeSyncedReload;