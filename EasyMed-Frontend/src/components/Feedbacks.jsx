import React, { useState, useEffect } from 'react';

const Card = (props) => {
    return (
        <div className="flex flex-col items-start gap-6 p-8 border border-gray-200 rounded-lg shadow-md bg-white w-2xl h-110">
            <div className="flex items-center gap-4">
                <img 
                    src={props.image} 
                    alt={props.name} 
                    className="w-24 h-24 rounded-full object-cover shadow-md" 
                />
                <h1 className="text-4xl font-playfaie font-semibold text-gray-900">
                    {props.name}
                </h1>
            </div>
            <div className="mt-4">
                <p className="text-2xl italic text-gray-800">
                    "{props.feedback}"
                </p>
            </div>
        </div>
    );
};

const data = [
    {
        id: 1,
        name: 'Jane Doe',
        description: 'I was so impressed with how intuitive the whole platform is. Finding and booking an appointment was a breeze, and I got a confirmation email right away. It saved me the hassle of phone calls and waiting on hold. The entire process from start to finish felt seamless and professional. I highly recommend this service to anyone who values their time.',
        image: '../src/assets/p1.jpg',
    },
    {
        id: 2,
        name: 'Robert Chen',
        description: "This system is a game-changer! I've always struggled to find a last-minute appointment, but with this, I was able to see all the available slots for my doctor in one place. The user interface is clean, and the steps are so logical. It’s comforting to know I can manage my health appointments so efficiently without any stress.",
        image: '../src/assets/p2.jpg',
    },
    {
        id: 3,
        name: 'Sarah Khan',
        description: 'The ability to reschedule my appointment without any fuss was a huge relief. The platform notified me of my upcoming visit and allowed me to change the time with just a few clicks. It’s incredibly user-friendly and reliable. I feel completely in control of my schedule, and the peace of mind that brings is invaluable.',
        image: '../src/assets/p3.jpg',
    }
];
export default function Feedback() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % data.length);
        }, 3000); // slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
      
        <div className='align-center bg-gray-100 w-full h-40 text-center'>
            <h1 className='flex justify-center text-5xl pt-10 font-bold pb-2'>Real  <span className='text-blue-500 pl-2'> People,</span>Real <span className='text-blue-500 pl-2'>Results</span></h1>
            <p>Read feedback from patients who love our quick and easy booking service</p>
        </div>
        {/* Steps Section (Simple JSX, No Reusable Components) */}
      <div className="my-8 mb-10 flex justify-center space-x-8 max-w-5xl mx-auto"></div>
        <div className="flex flex-col items-center mb-20 p-8 gap-6 relative">
            {/* Current Card */}
            <Card
                key={data[currentIndex].id}
                name={data[currentIndex].name}
                feedback={data[currentIndex].description}
                image={data[currentIndex].image}
            />

            {/* Dots */}
            <div className="flex gap-2 mt-10 absolute bottom-10 transform-3d ease-in-out">
                {data.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-blue-500' : 'bg-gray-400'}`}
                    ></span>
                ))}
            </div>
        </div>

          </>
    );
}
