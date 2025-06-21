import React from "react";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenter = useLoaderData();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-4">
        We are available in 64 districts
      </h2>

      {/* Search box will go here later */}

      <CoverageMap serviceCenter={serviceCenter} />
    </div>
  );
};

export default Coverage;
