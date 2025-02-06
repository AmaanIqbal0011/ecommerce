import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import AddToCartButton from "./AddToCartButton";

// 1. Generate static params for dynamic routing based on product slugs.
export async function generateStaticParams() {
  const query = `*[_type == "product"] { "slug": slug.current }`;
  const products = await client.fetch(query);
  return products.map((product: { slug: string }) => ({
    name: product.slug,
  }));
}

// 2. Fetch product data based on the slug.
async function getProductData(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    ...,
    "productImage": productImage.asset->url
  }`;
  const product = await client.fetch(query, { slug });
  return product;
}
interface PageProps {
  params: { name: string };
}

// 4. Updated component with only needed params
export default async function ProductPage({ params }: PageProps) {
  const product = await getProductData(params.name);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              src={urlFor(product.productImage).url()}
              alt={product.title}
              width={300}
              height={300}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.title}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <p className="line-clamp-4 whitespace-pre-line">
                {product.description}
              </p>
              <br />
              <br />
              <div className="flex">
                <div className="title-font font-medium text-2xl text-gray-900">
                  Price: ${product.price}
                </div>
                <div className="px-9">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}