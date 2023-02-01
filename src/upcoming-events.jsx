import React from "react";

const eventsData = [
    // {
    //     name: "Shark Tank",

    // }
];

const UpcomingEvents = () => {
    return (
        <div className="upcomingEvents">
            <div className="upcomingEventsHeader">Upcoming Events</div>
            {eventsData.map((event, i) => (
                <div key={i}>
                    {event}
                </div>
            ))}
        </div>
    );
};

export default UpcomingEvents;
