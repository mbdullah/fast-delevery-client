import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItsWorks/HowItsWorks';
import OurServices from '../OurServices/OurServices';
import CompanyLogos from '../CompanyLogos/CompanyLogos';
import CardSection from '../CardSection/CardSection';
import Marchent from '../Marchent/Marchent';
import CustomerReviews from '../CustomerReview/CustomerReview';
import Faq from '../Faq/Faq';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <CompanyLogos></CompanyLogos>
            <CardSection></CardSection>
            <Marchent></Marchent>
            <CustomerReviews></CustomerReviews>
            <Faq></Faq>
        </div>
    );
};

export default Home;