import React from 'react';
import { Plane, Construction } from 'lucide-react';

const Maintenance = () => {
  return (
    <>
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-bg {
            background: linear-gradient(-45deg, #3b82f6, #1d4ed8, #1e40af, #2563eb);
            background-size: 400% 400%;
            animation: gradientBG 10s ease infinite;
          }
        `}
      </style>
      <div className="min-h-screen animate-bg flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-5 sm:space-y-6 border-t-8 border-blue-400 mx-4">
          <div className="flex justify-center items-center space-x-2 text-blue-600">
            <Plane className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">
              We'll be back soon!
            </h1>
            <p className="text-blue-700/80 text-base sm:text-lg">
              Sara Aviation is currently undergoing scheduled maintenance to improve our services.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center space-y-2 sm:space-y-3 border border-blue-100">
            <Construction className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
            <p className="text-sm sm:text-base font-semibold text-blue-800">
              Thank you for your patience.
            </p>
          </div>

          {/* <div className="pt-5 sm:pt-6 border-t border-blue-100 text-xs sm:text-sm text-blue-600">
            Need urgent help? Contact us at <br />
            <a href="mailto:info@saraaviation.com" className="text-blue-800 font-bold hover:underline">
              info@saraaviation.com
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Maintenance;
