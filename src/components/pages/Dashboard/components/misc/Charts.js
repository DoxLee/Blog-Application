import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ data }) => {
  return (
    <ResponsiveContainer height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDashArray="4" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="view" fill="rgba(0, 149, 235)" barSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
