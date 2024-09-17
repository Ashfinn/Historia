'use client'
import Earth from "../components/Globe";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call your API to fetch events here (or mock data)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-xl shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Explore Historical Events
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="month" className="block text-sm">
              Month
            </label>
            <select
              id="month"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
              value={selectedMonth}
              onChange={(event) =>
                setSelectedMonth(event.target.value)
              }
            >
              <option value="">Select Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index} value={String(index + 1)}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="day" className="block text-sm">
              Day
            </label>
            <select
              id="day"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
              value={selectedDay}
              onChange={(event) =>
                setSelectedDay(event.target.value)
              }
            >
              <option value="">Select Day</option>
              {Array.from({ length: 31 }).map((_, index) => (
                <option key={index + 1} value={String(index + 1)}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          >
            Explore
          </button>
        </form>
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Earth />
      </div>
    </div>
  );
}

