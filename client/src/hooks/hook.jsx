import { useState, useEffect } from "react";
import toast from "react-hot-toast"
const useError = (error = []) => {
    useEffect(() => {
        error.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) {
                    fallback()
                } else {
                    toast.error(`${error.message} || "something went"`)
                }
            }
        })
    }, [])
}


function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}



export {
    useError,
    useDebounce
}