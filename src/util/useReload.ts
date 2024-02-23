import { useEffect } from "react";

export const useReload = (refreshCycle = 900000) => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            window.location.reload();     
        }, refreshCycle);
        return () => clearInterval(intervalId);
    }, [refreshCycle]);
};