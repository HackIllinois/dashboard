import React, { useState, useEffect, useCallback } from "react";

const UpcomingEvents = () => {
    const [eventsData, setEventsData] = useState([]);

    const fetchEventsData = useCallback(() => {
        fetch("https://api.hackillinois.org/event/")
            .then(response => response.json())
            .then(data => setEventsData(data["events"]))
            .catch();
    }, [setEventsData]);

    useEffect(() => {
        fetchEventsData();
        const interval = setInterval(() => fetchEventsData(), 1000 * 60);

        return () => clearInterval(interval);
    }, [fetchEventsData]);

    return (
        <div className="upcomingEvents">
            <div className="upcomingEventsHeader">Upcoming Events</div>
            <div className="upcomingEventsList">
                {eventsData.slice(0, 1).map((event, i) => (
                    <div key={i} className="upcomingEvent">
                        {JSON.stringify(event)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;
