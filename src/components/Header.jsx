import React, { useState } from 'react'
import notification from '../assets/notification-bing.png'
import admin from '../assets/Vector.png'
import close from '../assets/close.png'
import mark from '../assets/mark.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const [showmodal, setShowModal] = useState(false)

    const handleNotificationClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <div className='w-full h-[50px] border-b flex gap-5 justify-end my-2 font-inter'>
                <div className='relative'>
                    <img src={notification} alt="Notification-bing" className='w-6 h-6 mt-2 cursor-pointer' onClick={handleNotificationClick} />
                    <div className='absolute top-[7px] right-[4px] w-[6px] h-[6px] bg-black rounded-full'></div>
                </div>
                <img src={admin} alt="Admin" className='w-10 h-10 rounded-[8px] cursor-pointer' onClick={()=>navigate('/settings')}/>
                <div className="mr-12 mt-1 font-inter">
                    <h6 className='font-bold text-[14px] leading-[16.94px] cursor-pointer' onClick={()=>navigate("/settings")} >Sean Dennis</h6>
                    <p className='font-[600] text-[12px] leading-[14.52px] text-[#0857A3] cursor-pointer' onClick={()=>navigate("/settings")}>Admin</p>
                </div>
                {/* Show modal */}
                {showmodal && (
                    <div className="fixed inset-0 bg-[#B3B3B3] bg-opacity-30 flex justify-center items-start z-40 font-inter">
                        {/* Modal Container */}
                        <div className="relative top-[75px] w-[595px] h-[299px] bg-white rounded-[20px] p-[30px] gap-[16px] z-50"
                            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <div className="flex justify-between">
                                <div className="flex font-inter">
                                    <p className='font-[600] text-[20px] leading-6 text-[#2D2D2E]'>Notifications</p>
                                    <p className='text-[#F5F5F5] bg-[#0857A3] w-5 h-5 mt-1 ml-3 flex items-center justify-center rounded-full text-xs'>
                                        3
                                    </p>
                                </div>
                                <img src={close} alt="Close" onClick={handleCloseModal} className='w-6 h-6 cursor-pointer' />
                            </div>
                            <hr className='my-3 text-[#D9D9D9]' />
                            <div className="flex justify-end">
                                <button className='w-[120px] h-8 rounded-md bg-[#233B77] font-inter text-white flex items-center justify-center gap-2' onClick={() => alert("Marked as read")}>
                                    <img src={mark} alt="Mark" className='w-3 h-3' />
                                    <span className='font-semibold text-[12px] leading-[14.52px]'>Mark as read</span>
                                </button>
                            </div>
                            <div className="mt-5 flex justify-between font-inter">
                                <div>
                                    <p className='text-[#555555] font-normal text-[12px] leading-[14.52px]'>John Deo</p>
                                    <p className='text-[#555555] font-normal text-[14px] leading-[16.52px]'>Add a new Sheet</p>
                                </div>
                                <p className='text-[#F5F5F5] bg-[#0857A3] w-5 h-5 mt-1 ml-3 mr-5 flex items-center justify-center rounded-full text-xs'>
                                    2
                                </p>
                            </div>
                            <hr className='my-3 text-[#D9D9D9]' />
                            <div className="mt-10 flex justify-between font-inter">
                                <div>
                                    <p className='text-[#555555] font-normal text-[12px] leading-[14.52px]'>John Deo</p>
                                    <p className='text-[#555555] font-normal text-[14px] leading-[16.52px]'>Add a new Sheet</p>
                                </div>
                                <p className='text-[#F5F5F5] bg-[#0857A3] w-5 h-5 mt-1 ml-3 mr-5 flex items-center justify-center rounded-full text-xs'>
                                    2
                                </p>
                            </div>
                            <hr className='mt-5 mb-3 text-[#D9D9D9]' />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default Header;
