import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

// Sample data structure matching the image
const initialData = [
  { quarter: "Q3 2020", springfield: 35, cohort: 75 },
  { quarter: "Q4 2020", springfield: 32, cohort: 73 },
  { quarter: "Q1 2021", springfield: 30, cohort: 72 },
  { quarter: "Q2 2021", springfield: 33, cohort: 74 },
  { quarter: "Q3 2021", springfield: 35, cohort: 75 },
  { quarter: "Q4 2021", springfield: 37, cohort: 76 },
  { quarter: "Q1 2022", springfield: 38, cohort: 77 },
  { quarter: "Q2 2022", springfield: 40, cohort: 78 },
];

const HeroScene: React.FC = () => {
  const [data, setData] = useState(initialData.slice(0, 1));

  useEffect(() => {
    // Animate data points appearing one by one
    let currentIndex = 1;
    const interval = setInterval(() => {
      if (currentIndex < initialData.length) {
        setData(initialData.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "linear-gradient(to bottom right, #1a1a2e, #16213e)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          height: "350px",
          width: "100%",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="quarter" stroke="#fff" tick={{ fill: "#fff" }} />
            <YAxis stroke="#fff" tick={{ fill: "#fff" }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "8px",
                border: "none",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="springfield"
              stroke="#4ade80"
              strokeWidth={2}
              dot={{ fill: "#4ade80", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="cohort"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: "#60a5fa", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default HeroScene;
