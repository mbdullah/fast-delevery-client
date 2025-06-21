import { FaTruckPickup, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const HowItWorks = () => {
  const cards = [
    {
      title: "Booking Pick & Drop",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaTruckPickup className="text-4xl lg:text-6xl text-secondary" />,
    },
    {
      title: "Cash On Delivery",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaMoneyBillWave className="text-4xl lg:text-6xl text-secondary" />,
    },
    {
      title: "Delivery Hub",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaWarehouse className="text-4xl lg:text-6xl text-secondary" />,
    },
    {
      title: "Booking SME & Corporate",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaBuilding className="text-4xl lg:text-6xl text-secondary" />,
    },
  ];

  return (
    <section data-aos="fade-up" className="mt-16 px-5 md:px-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary text-left">How It Works</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="card bg-white shadow-md hover:shadow-lg transition duration-300 rounded-xl p-8 text-left">
            <div className="mb-6">{card.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-secondary">{card.title}</h3>
            <p className="text-[#606060] text-[16px] font-medium">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
