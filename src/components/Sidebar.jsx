import { X } from 'lucide-react'
import { navigationItems } from '../constants/navigation-items'

const Sidebar = ({ isSideBarOpen, handleCloseSideBar }) => {
    return (
        <div className={`fixed w-64 bg-gray-900 h-screen shadow ${isSideBarOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 lg:static`}>
            {/* Product Logo */}
            <div className='flex justify-between p-4  border-b border-gray-800'>
                <div className='w-12 h-12 flex items-center gap-2'>
                    <img className='w-full object-cover' src="./products.png" alt="product" />
                    <span className='text-xl text-white font-semibold'>Products</span>
                </div>
                <button className='cursor-pointer lg:hidden' >
                    <X color='white' onClick={handleCloseSideBar} />
                </button>
            </div>

            {/* Navigation Bar */}
            <div className='p-4 space-y-2'>
                {
                    navigationItems?.map((item) => (
                        <div className='flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800 rounded-md transform duration-75 ease-in-out' key={item?.name}>
                            <div className='text-xl'>{item?.icon}</div>
                            <p className='text-xl text-gray-400'>{item?.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
