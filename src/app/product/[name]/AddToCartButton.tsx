"use client";

import { Iproduct } from "@/types/product";
import { addToCart } from "@/actions/actions";
import Swal from "sweetalert2";

export default function AddToCartButton({ product }: { product: Iproduct }) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    Swal.fire({
      position : "top-right",
      icon : "success",
      title : `${product.title} added to cart`,
      showConfirmButton : false,
      timer : 1000
    })
  };

  return (
    <button
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={handleAddToCart}
    >
      Add To Cart
    </button>
  );
}
