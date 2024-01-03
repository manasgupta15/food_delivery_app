import React from 'react'
import {Header} from "../components";
import {Bill} from "../assests";
import { buttonClick } from '../animations';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CheckOutSuccess = () => {
  return (
    <main className='w-screen min-h-screen flex items-center justify-start flex-col'>
        <Header/>
        <div className='w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24'>
            <img src={Bill} 
           className='w-full md:w-656'
           style={{ width: '250px', height: 'auto' }} alt="" />

           <h1 className='text-[50px] text-headingColor font-bold'>Amount paid Successfully</h1>

           <motion.div {...buttonClick}>
            <NavLink to ={"/"} className = "flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor font-semibold px-4 rounded-md border border-gray-300 py-2 hover:shadow-md">
                <FaArrowLeft className='text-3xl text-textColor'/>Get Back to Home
            </NavLink>
           </motion.div>
        </div>
    </main>
  );
};

export default CheckOutSuccess;
