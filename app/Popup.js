import React, { useEffect, useState } from 'react';

const Popup = ({ words }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 8000); // 20 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!showAlert) return null;

  return (
    <div className="w-screen z-[60] bg-red-600 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="w-full flex justify-center items-center">
          <p className="text-sm sm:text-xl font-semibold">
            <span className="mr-1">⚠️</span> {words}
          </p>
        </div>

        <button
          onClick={() => setShowAlert(false)}
          className="ml-4 px-3 py-1 text-sm font-bold bg-black/30 hover:bg-black/50 rounded"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Popup;
