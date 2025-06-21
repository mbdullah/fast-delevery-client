import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaHandshake,
  FaUndoAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="text-4xl text-secondary mx-auto mb-4" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaMapMarkedAlt className="text-4xl text-secondary mx-auto mb-4" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaBoxOpen className="text-4xl text-secondary mx-auto mb-4" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyCheckAlt className="text-4xl text-secondary mx-auto mb-4" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaHandshake className="text-4xl text-secondary mx-auto mb-4" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndoAlt className="text-4xl text-secondary mx-auto mb-4" />,
  },
];

const OurServices = () => {
  return (
    <section className="p-8 md:p-16 lg:p-20 xl:p-26 bg-[#03373D] rounded-4xl mt-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white mb-2">
          Our Services
        </h2>
        <p className="max-w-3xl mx-auto text-[#DADADA] font-medium text-sm lg:text-[16px]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <div
          data-aos="zoom-in"
            key={index}
            className="relative group bg-white rounded-xl shadow-md px-8 py-10 text-center transition duration-300 overflow-hidden"
          >
            {/* CHANGED: Overlay on hover */}
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

            {/* CHANGED: Icon with bg color and rounded full */}
            <div className="relative z-10">
              <div className="bg-gradient-to-t from-[#eeedfc00] to-[#EEEDFC] w-24 h-24 flex items-center justify-center mx-auto rounded-full pt-4">
                {service.icon}
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-secondary my-6">
                {service.title}
              </h3>
              <p className="text-[#606060] text-sm lg:text-[16px] font-medium">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
