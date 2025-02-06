'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Iproduct } from '@/types/product'
import { getCartItems, removeItemCart, updateCartQuantity } from '@/actions/actions'
import { urlFor } from '@/sanity/lib/image'
import swal from "sweetalert2"
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation'


const Cart = () => {

const [cartItems,setCartItems] = useState<Iproduct[]>([])

useEffect(() => {
  setCartItems(getCartItems())
},[])


const handleRemove = (id :string) => {
  swal.fire({
    title : 'Are You Sure?',
    text : "you will not be able to recover item",
    icon : "warning",
    showCancelButton : true,
    confirmButtonColor : "#3085d6",
    cancelButtonColor : "#d33",
    confirmButtonText : "Yes, remove it"
   }).then((result) =>
  {
    if(result.isConfirmed){
      removeItemCart(id)
      setCartItems(getCartItems())
      swal.fire("removed!","Item has been removed","success")
    }
  })
} 

const handleQuantity = (id : string, quantity : number) => {
  updateCartQuantity(id,quantity)
  setCartItems(getCartItems())

}

const handleIncrement = (id:string) => {
  const product = cartItems.find (
    (item) => item.title === id
  );
  if(product){
    handleQuantity(id,product.inventory + 1)
  }
}

const handleDecrement = (id:string) => {
  const product = cartItems.find (
    (item) => item.title === id
  );
  if(product && product.inventory > 1){
    handleQuantity(id,product.inventory - 1)
  }
}


const calculatedTotal = () => {
  return cartItems.reduce((total,item)=>total + item.price * item.inventory,0)
}

const router = useRouter();


const handleProceed = () => {
  swal.fire({
    title : "Proceed to Checkout",
    text : "Please review your cart before checkout",
    icon : "question",
    showCancelButton : true,
    confirmButtonColor : "#3085d6",
    cancelButtonColor : "#d33",
    confirmButtonText : "Yes, Proceed!"
  }).then((result) => {
    if(result.isConfirmed){
      swal.fire("success","Your Order has been succeed","success")
      router.push("/checkout")
      setCartItems([])
    }
  })
}



  return (
    
    <div className="min-h-full w-full flex flex-col bg-white items-center">
    {/* Banner */}
    <div className="w-full">
      <div className="relative w-full max-w-[1440px] h-[200px] md:h-[316px]">
        <Image
          src="/images/shopbenner.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="font-medium text-3xl md:text-4xl text-black">Cart</h1>
          <p className="font-normal text-base md:text-[16px] text-mygray">
            home &gt; Cart
          </p>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="w-full max-w-[1440px] px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-md shadow-sm">
            {/* Desktop Table Headers */}
            <div className="hidden lg:flex items-center justify-between py-2 bg-[#FAF3EA] px-4">
              <span className="text-gray-700 font-semibold w-2/5">Product</span>
              <span className="text-gray-700 font-semibold w-1/5 text-center">
                Price
              </span>
              <span className="text-gray-700 font-semibold w-1/5 text-center">
                Quantity
              </span>
              <span className="text-gray-700 font-semibold w-1/5 text-center">
                Subtotal
              </span>
              <span className="w-1/5" />
            </div>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-gray-200 gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center w-full sm:w-2/5">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mr-2 sm:mr-4">
                    <Image
                      src={urlFor(item.productImage).url()}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <span className="text-gray-800 text-sm sm:text-base line-clamp-2">
                    {item.title}
                  </span>
                </div>

                {/* Price */}
                <div className="text-gray-800 w-full sm:w-1/5 text-center text-sm sm:text-base">
                  <span className="lg:hidden font-medium">Price: </span>${' '}
                  {item.price.toLocaleString()}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center w-full sm:w-1/5">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleDecrement(item.title)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.inventory}
                      readOnly
                      className="text-center w-12 sm:w-16 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                    />
                    <button
                      onClick={() => handleIncrement(item.title)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-gray-800 w-full sm:w-1/5 text-center text-sm sm:text-base">
                  <span className="lg:hidden font-medium">Subtotal: </span>${' '}
                  {(item.price * item.inventory).toLocaleString()}
                </div>

                {/* Delete Button */}
                <div className="w-full sm:w-1/5 flex justify-center sm:justify-end">
                  <button
                    onClick={() => handleRemove(item.title)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <RiDeleteBin6Line className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Totals */}
        <div className="lg:col-span-1">
          <div className="bg-[#FAF3EA] p-4 sm:p-6 rounded-md shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Cart Totals
            </h2>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700 font-semibold text-sm sm:text-base">
                Subtotal
              </span>
              <span className="text-gray-800 text-sm sm:text-base">
                ${calculatedTotal().toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700 font-semibold text-sm sm:text-base">
                Total
              </span>
              <span className="text-gray-800 font-bold text-sm sm:text-base">
                ${calculatedTotal().toLocaleString()}
              </span>
            </div>
            <Link href={'../cart'}>
            <button
              onClick={handleProceed}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium sm:font-bold py-3 px-6 rounded mt-4 w-full text-sm sm:text-base"
            >
              Check Out
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Cart;