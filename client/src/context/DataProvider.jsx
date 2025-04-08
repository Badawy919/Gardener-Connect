import { useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import Swal from 'sweetalert2';

// Sweet Alert
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const DataProvider = ({ children }) => {
    const [tips, setTips] = useState([]);
    const [gardeners, setGardeners] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const urls = [
                    `${import.meta.env.VITE_API_URL}/gardeners`,
                    `${import.meta.env.VITE_API_URL}/tips`,
                    `${import.meta.env.VITE_API_URL}/events`
                ];
                const responses = await Promise.all(urls.map(url => fetch(url)))
                const [gardenersData, tipsData, eventsData] = await Promise.all(responses.map(response => response.json()));

                setGardeners(gardenersData);
                setTips(tipsData);
                setEvents(eventsData);
            } catch (error) {
                //Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            } finally {
                setLoading(false)
            }
        }
        fetchAll();
    }, [])

    // console.log("Fetched Gardeners: ", gardeners)
    // console.log("Fetch Tips: ", tips)
    return (
        <DataContext value={{ loading, gardeners, tips, events }}>
            {children}
        </DataContext>
    );
};

export default DataProvider;