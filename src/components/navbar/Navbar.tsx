"use client"
import Image from 'next/image'
import { useState } from "react";
import Link from 'next/link'
import { LuAlignJustify } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='h-[100px] w-full bg-white border-b border-gray-200 flex items-center justify-center'>
      <div className='h-[41px] w-[90%] md:w-[1280px] flex items-center justify-between '>
        {/* Navigation Links */}
        <div className='h-[24px] w-full hidden md:flex justify-center'>
          <ul className='flex items-center justify-center gap-6'>
            <Link href="/" className='text-black hover:text-golden hover:underline'>
              <li>Home</li>
            </Link>
            <Link href="/shop" className='text-black hover:text-golden hover:underline'>
              <li>Shop</li>
            </Link>
            <Link href="/blog" className='text-black hover:text-golden hover:underline'>
              <li>Blog</li>
            </Link>
            <Link href="/contact" className='text-black hover:text-golden hover:underline'>
              <li>Contact</li>
            </Link>
          </ul>
        </div>

        {/* Profile, Search, Heart, Cart icons */}
        <div className='h-[24px] w-[290px] hidden md:flex justify-between'>
          <span className='hover:bg-gray-200 rounded-md'><Image src='/images/profile.png' alt='logo' width={28} height={28} /> </span>
          <span className='hover:bg-gray-200 rounded-md'><Image src='/images/search.png' alt='logo' width={28} height={28} /></span>
          <span className='hover:bg-gray-200 rounded-md'><Image src='/images/heart.png' alt='logo' width={28} height={28} /></span>
          <Link href="/cart">
            <span className='hover:bg-gray-200 rounded-md'><Image src='/images/shopping-cart.png' alt='logo' width={28} height={28} /></span>
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex text-black ">
          <button onClick={toggleMenu}>
            {isOpen ? <RxCross1 size={24} /> : <LuAlignJustify size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-28 z-10 w-[95%] pb-10 border-t-2 border-b border-gray-200 bg-white">
          <ul className="flex flex-col gap-2 px-4 py-2">
            <Link href="/" className='text-black hover:text-golden hover:underline'>
              <li>Home</li>
            </Link>
            <Link href="/shop" className='text-black hover:text-golden hover:underline'>
              <li>Shop</li>
            </Link>
            <Link href="/blog" className='text-black hover:text-golden hover:underline'>
              <li>Blog</li>
            </Link>
            <Link href="/contact" className='text-black hover:text-golden hover:underline'>
              <li>Contact</li>
            </Link>
          </ul>
          <div className='flex mx-2 justify-between'>
            <span className='hover:bg-gray-200 rounded-md'><Image src='/images/profile.png' alt='logo' width={28} height={28} /> </span>
            <span className='hover:bg-gray-200 rounded-md'><Image src='/images/search.png' alt='logo' width={28} height={28} /></span>
            <span className='hover:bg-gray-200 rounded-md'><Image src='/images/heart.png' alt='logo' width={28} height={28} /></span>
            <Link href="/cart">
            <span className='hover:bg-gray-200 rounded-md'><Image src='/images/shopping-cart.png' alt='logo' width={28} height={28} /></span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;
