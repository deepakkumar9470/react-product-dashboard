import { Menu } from 'lucide-react'

const Header = ({ handleOPenSideBar }) => {
  return (
    <header className='flex justify-between bg-gray-900 p-4'>
      <button className='text-xl p-2 font-semibold lg:hidden' onClick={handleOPenSideBar}>
        <Menu color='white' />
      </button>
      <h1 className='text-3xl text-gray-500 font-semibold'>Dashboard</h1>
      <div className='bg-gray-800 w-10 h-10 text-white flex items-center justify-center rounded-full'>DK</div>
    </header>
  )
}

export default Header
