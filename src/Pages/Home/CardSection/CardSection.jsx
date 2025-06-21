import live from "../../../assets/live-tracking.png"
import safe from "../../../assets/safe-delivery.png"

const cardData = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: live,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safe,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: safe,
  },
];

const CardSection = () => {
  return (
    <section className="pt-24 pb-20 border-0 md:border-y-2 border-dashed border-secondary mt-24">
      {cardData.map((item) => (
        <div
          key={item.id}
          className="w-full flex flex-col md:flex-row items-center gap-6 px-5 md:px-10 py-8 bg-white mb-6 rounded-3xl shadow-xl"
        >
          {/* Left Image */}
          <div className="p-8">
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 xl:w-42 xl:h-42 object-contain"
            />
          </div>

          {/* Dotted Line */}
           <div className="hidden md:flex h-32 xl:h-42 w-px border-l-2 border-dashed border-gray-400"></div>

          {/* Right Text Content */}
          <div className="w-full md:w-3/5 text-center md:text-left ml-0 lg:ml-10">
            <h3 className="text-2xl font-bold text-secondary mb-4">{item.title}</h3>
            <p className="text-[#606060] text-sm lg:text-[16px] font-medium">{item.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardSection;
