import React from 'react'
import { MdAdminPanelSettings, } from "react-icons/md";
import moment from 'moment';
import { Search, Bell } from 'lucide-react';
import IconBtn from '../../shared/IconBtn';
import toast from 'react-hot-toast';
import { MessageCircle } from "lucide-react";
import { HiUsers } from "react-icons/hi2";
import { MdGroups2 } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { DoughnutChart, LineChart } from '../../components/specific/Chart';


const DashBord = () => {
  const handleSearch = () => {
    console.log('Search clicked');
    toast.success('Search executed');
  }
  return (
    <div className='h-[100vh] overflow-scroll  HideScrollbar mx-auto w-full p-3'>
      <div className="flex w-full flex-col border-opacity-50 md:mt-0 mt-4  bg_blur ">
        <div className="w-full bg-gray-200  md:px-5 py-3 flex justify-around items-center">
          <MdAdminPanelSettings size={30} />
          <div className='flex items-center gap-1 w-full max-w-2xl'>
            <input type="text" className='px-2 py-1 border rounded-full w-full' />
            <IconBtn text="Search" icon={<Search />} className="m_font border btn-outline"
              size='sm' tooltip='Search' onClick={handleSearch}
            />
          </div>
          <span className='m_font hidden md:block'> {moment().format('MMMM Do YYYY')}</span>
          <IconBtn icon={<Bell />} size='sm'  className='md:hidden block' />
        </div>
      </div>
      <div className="flex w-full flex-col border-opacity-50 md:mt-0 mt-4 ">
        <div className='flex flex-wrap gap-5 items-stretch justify-center md:justify-between'>
          <div className='p-5 w-full md:w-[60%] bg-gray-200 shadow-xl rounded-xl'>
            <h1 className='text-4xl font-bold mb-5 text-center md:text-left'>Last Message</h1>
            <LineChart value={[95, 79, 20, 86, 76, 75, 90]} />
          </div>
          <div className='p-5 w-full md:w-[35%] max-w-96 bg-gray-200 shadow-xl rounded-xl flex items-center justify-center'>
            <DoughnutChart values={[75, 90]} labels={["single chats", "group chats"]} />
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col border-opacity-50 md:mt-0 mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 p_font'>
          <Widgets title=" Chats" value="45" Icon={MdGroups2} />
          <Widgets title=" Users" value="34" Icon={HiUsers} />
          <Widgets title=" Messages" value="65" Icon={MdMessage} />
        </div>
      </div>
    </div>
  )
}

export default DashBord



const Widgets = ({ title, value, Icon }) => {
  return (
    <div className="w-full ">
      <div className="bg-gray-300 p-6 gap-3 rounded-2xl flex flex-col items-center justify-center shadow-xl ">
        <p className="text-lg border-4 rounded-full flex items-center justify-center border-black w-12 h-12">{value}</p>
        <div className='flex gap-2 items-center'>
          <Icon size={30} />
          <h2 className="text-xl font-normal ">{title}</h2>
        </div>
      </div>
    </div>
  );
}
