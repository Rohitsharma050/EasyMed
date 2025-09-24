import React from 'react';
import { CheckCircle2 } from 'lucide-react';
// use a doctor-specific illustration if available
import bookingImg from '../assets/booking.svg';
export default function Doctor() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Doctor Section with Image */}
      <div className="flex justify-around items-center max-w-6xl mx-auto flex-col md:flex-row">
        
       
        {/* Doctor Card */}
        <div className="bg-white rounded-2xl p-8 max-w-lg shadow-lg border border-gray-200 mb-10 md:mb-0">
          <div className="flex items-center text-sm font-semibold text-blue-700 bg-blue-50 rounded-full px-4 py-1.5 w-max">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            <span>For Doctors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-6 leading-tight">
            Simplify Your Practice
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            We make managing your patients and practice seamless, so you can focus on what matters most — providing care.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              "Manage appointments and schedules with ease.",
              "Access patient records anytime, anywhere securely.",
              "Send automated reminders to reduce no-shows.",
              "Offer telehealth consultations to reach more patients.",
              "Track patient progress with detailed health insights and analytics.",
              
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        
      </div>
    </div>
  );
}
