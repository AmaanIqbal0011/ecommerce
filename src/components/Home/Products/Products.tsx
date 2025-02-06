import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Product } from "@/types/product"; // Only keep the used import

const Products = async () => {
  const data = await client.fetch(`*[_type == "product"][0...8] {
    ...,
    "slug": slug.current,
    "productImage": productImage.asset->url
  }`);
  
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product: Product) => (
          <div
            key={product.title}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/product/${product.slug}`}>
              <div className="relative">
                <Image
                  src={urlFor(product.productImage).url()}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex space-x-2">
                  {product.dicountPercentage > 0 && (
                    <span className="bg-[#E97171] text-white text-sm px-2 py-1 rounded">
                      -{product.dicountPercentage}% 
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#2EC1AC] text-white text-sm px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <h2 className="text-xl font-sans mb-2 text-gray-400">
                  {product.tagline}
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">${product.price}</p>
                  <p className="text-2xl font-serif text-gray-400 line-through">
                    ${product.oldPrice}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;