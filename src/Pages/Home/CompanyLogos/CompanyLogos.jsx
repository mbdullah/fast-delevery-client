import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png"
import casio from "../../../assets/brands/casio.png"
import moonstar from "../../../assets/brands/moonstar.png"
import randstad from "../../../assets/brands/randstad.png"
import start from "../../../assets/brands/start.png"
import startPeople from "../../../assets/brands/start-people 1.png"

const CompanyLogos = () => {
  return (
    <section className="mt-24">
      <div className="text-center mb-6 lg:mb-10">
        <h2 className="text-2xl text-[28px] font-extrabold text-secondary">We've helped thousands of sales teams</h2>
      </div>

      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <div className="flex gap-24 items-center">
          <img src={amazon} alt="Google" className="h-6 lg:h-8 xl:h-10" />
          <img src={casio} alt="Microsoft" className="h-6 lg:h-8 xl:h-10" />
          <img src={moonstar} alt="Amazon" className="h-6 xl:h-10" />
          <img src={randstad} alt="Shopify" className="h-6 lg:h-8 xl:h-10" />
          <img src={start} alt="Meta" className="h-6 lg:h-8 xl:h-10" />
          <img src={startPeople} alt="Slack" className="h-6 lg:h-8 xl:h-10 mr-24" />
          {/* Add more logos as needed */}
        </div>
      </Marquee>
    </section>
  );
};

export default CompanyLogos;
