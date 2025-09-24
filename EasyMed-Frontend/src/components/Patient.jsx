import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import bookingImg from '../assets/booking.svg'; // adjust path as needed

export default function Patient() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Patient Section with Image */}
      <div className="flex justify-around items-center max-w-6xl mx-auto flex-col md:flex-row">
        {/* Patient Card */}
        <div className="bg-white rounded-2xl p-8 max-w-lg shadow-lg border border-gray-200 mb-10 md:mb-0">
          <div className="flex items-center text-sm font-semibold text-green-700 bg-green-50 rounded-full px-4 py-1.5 w-max">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            <span>For Patients</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-6 leading-tight">
            Your Health, Made Easy
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            We believe managing your health should be simple. Our platform is designed to put you in control with:
          </p>
          <ul className="mt-6 space-y-4">
            {[
              "No more waiting on hold—book appointments online instantly.",
              "Access your prescriptions and health records from anywhere.",
              "Receive automated reminders for upcoming appointments and refills.",
              "Connect with your doctor through secure telehealth consultations.",
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </li>
            ))}
          </ul>

        
        </div>
      </div>
    </div>
  );
}
