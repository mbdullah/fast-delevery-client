import React from "react";
import location from "../../../assets/location-merchant.png";
import bgImage from "../../../assets/be-a-merchant-bg.png"

const Marchent = () => {
  return (
    <div
      className="bg-[#03373D] bg-contain bg-no-repeat p-6 md:p-16 lg:p-24 rounded-3xl mt-20"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
        <img
          src={location}
          className="max-w-xs xl:max-w-md rounded-lg shadow-2xl"
          alt="Merchant Location"
        />
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-white max-w-3xl">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-[#DADADA] text-sm lg:text-[16px] max-w-lg">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Profast courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <button className="bg-primary px-5 py-3 rounded-full text-black font-semibold mb-4 xl:mb-0">
            Become a Merchant
          </button>
          <button className="outline px-5 py-3 text-primary rounded-full ms-0 md:ms-4 font-semibold">
            Earn with Profast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marchent;
