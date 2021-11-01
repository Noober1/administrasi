import {useState, useEffect} from "react";
import axios from "axios";

/**
 * Fetching API, returns [data, loading, error, errorMessage, errorData]
 * @param url - URL endpoint
 * @param options - (Optional) Axios options
 * @param timeout - (Optional) Request timeout limit
 * @returns
 */
const useFetchApi = (url, options, timeout) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorData, seterrorData] = useState(null)
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        seterrorData(null)
        let unmounted = false;
        let source = axios.CancelToken.source();

        const instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            cancelToken: source.token,
            timeout: timeout,
            headers:{
                "Content-Type": "application/json"
            }
        });

        if (!options) {
            options = {
                url: url
            }
        }

        instance(options)
            .then(result => {
                if (!unmounted) {
                    // @ts-ignore
                    setData(result.data);
                    setLoading(false);
                }
            })
            .catch(error => {
                if (!unmounted) {
                    setError(true);
                    if(error.response) {
                        seterrorData(error.response)
                    }
                    setErrorMessage(error.message);
                    setLoading(false);
                    if (axios.isCancel(error)) {
                        console.log(`request cancelled:${error.message}`);
                    } else {
                        console.log("another error happened:" + error.message);
                    }
                }
            });
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
    }, [url, timeout]);

    return [data, loading, error, errorMessage, errorData];
};

export default useFetchApi;