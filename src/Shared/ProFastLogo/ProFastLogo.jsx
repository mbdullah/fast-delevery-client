import React from 'react';
import logo from "../../assets/logo.png"
const ProFastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-4' src={logo} alt="" />
            <p className='text-[32px] font-extrabold -ml-4'>Profast</p>
        </div>
    );
};

export default ProFastLogo;