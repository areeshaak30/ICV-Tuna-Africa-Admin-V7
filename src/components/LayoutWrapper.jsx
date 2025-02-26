import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <div className=''> {children}</div>
        </div>
      </div>
    </>
  ) 
}

export default LayoutWrapper
