import CustomerCare from "@/components/CustomerCare/CustomerCare";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Iproduct } from "@/types/product";

const Shop = async () => {
  const data = await client.fetch(`*[_type == "product"] {
      ...,
      "slug": slug.current, // Get the slug value
      "productImage": productImage.asset->url
    }`);

  return (
    <>
      <section className="min-h-full w-full flex flex-col  bg-white items-center  ">
        {/* banner part */}
        <div className="h-full md:h-[416px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center">
          <div className=" md:h-[316px] relative w-[90%] md:w-[1440px] ">
            <Image
              src={"/images/shopbenner.png"}
              alt="hero"
              width={1440}
              height={316}
            />
            <div className="w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] ">
              <h1 className="font-medium text-4xl text-black">Shop</h1>
              <p className="font-normal text-[16px] text-mygray">
                home &gt; shop
              </p>
            </div>
          </div>
          {/* filter */}
          <div className=" h-[80px] flex items-center justify-center  md:h-[100px] w-full md:w-[1440px] bg-peach">
            {/* inner filter */}
            <div className="h-full md:h-[38px] w-[1240px] flex  flex-col md:flex-row items-center  justify-between">
              {/* right side */}
              <div className="h-full w-full md:w-[500px] flex items-center justify-between  ">
                {/* box 1 */}
                <div className="h-[30px] w-[58px] flex items-center ">
                  <Image
                    src={"/images/filter/filter1.png"}
                    alt="hero"
                    width={58}
                    height={30}
                  />
                </div>
                {/* box 2 */}
                <div className="h-[30px] w-[58px] flex  justify-between items-center ">
                  <span className="h-[28px] w-[28px] ">
                    <Image
                      src={"/images/filter/filter2.png"}
                      alt="hero"
                      width={28}
                      height={20}
                    />
                  </span>
                  <span className="h-[24px] w-[24px] ">
                    <Image
                      src={"/images/filter/filter3.png"}
                      alt="hero"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
                {/* box 3 */}
                <span className="h-[37px]  md:w-[285px] flex border-l-2 border-black items-center justify-end ">
                  <h2 className="text-[16px] font-semibold text-myblack">
                    Showing 1–16 of 32 results
                  </h2>
                </span>
              </div>
              {/* left side */}
              <div className="h-[38px] w-full md:w-[500px] flex justify-between  ">
                <div className="h-full w-[100px] flex justify-between items-center">
                  <p className="text-[16px] font-semibold text-myblack">Show</p>
                  <span className="h-[38px] w-[38px] flex justify-center items-center bg-white">
                    16
                  </span>
                </div>
                <span>
                  <div className="h-full w-[288px] flex justify-between items-center">
                    <p className="text-[16px] font-semibold text-myblack">
                      Sort By
                    </p>
                    <span className="h-[38px] w-[188px] flex justify-center items-center bg-white">
                      Default
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* products cards */}
        <div className="h-[7400px] md:h-[1980px] w-[90%] md:w-[1440px] flex flex-col justify-between pb-10 items-center ">
          <div className=" md:max-h-[1980px] w-[90%] md:w-[1340px] md:px-auto px-6 grid grid-cols-1  md:grid-cols-4  gap-2  ">
            {data.map((product: Iproduct) => (
              <div
                key={product.title}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image with Tags */}
                <Link href={`../product/${product.slug}`}>
                  <div className="relative">
                    <Image
                      src={urlFor(product.productImage).url()} // Use your Sanity image URL builder
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex space-x-2">
                      {/* show new tag */}
                      {product.dicountPercentage > 0 && (
                        <span className="bg-[#E97171] text-white text-sm px-2 py-1 rounded">
                          -{product.dicountPercentage}%
                        </span>
                      )}

                      {/* show new tag */}
                      {product.isNew && (
                        <span className="bg-[#2EC1AC] text-white text-sm px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h2>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">${product.price}</p>
                      {product.dicountPercentage > 0 && (
                        <p className="text-sm text-gray-500 line-through">
                          $
                          {product.price +
                            (product.price * product.dicountPercentage) / 100}
                        </p>
                      )}
                    </div>
                    {product.dicountPercentage > 0 && (
                      <p className="text-sm text-red-500">
                        {product.dicountPercentage}% Off
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* pagination */}
          <div className="h-[32px] w-[90%] md:w-[392px] flex justify-between items-center ">
            <div className="h-[60px] w-[60px] text-white flex justify-center items-center bg-golden hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md">
              1
            </div>
            <div className="h-[60px] w-[60px] text-white flex justify-center items-center bg-golden  hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md">
              2
            </div>
            <div className="h-[60px] w-[60px] text-white flex justify-center items-center bg-golden  hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md">
              3
            </div>
            <div className="h-[60px] w-[98px] text-white flex justify-center items-center bg-golden  hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md">
              Next
            </div>
          </div>
        </div>
        <CustomerCare />
      </section>
    </>
  );
};

export default Shop;
