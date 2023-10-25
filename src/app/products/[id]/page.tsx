import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

async function getProductdata(id: any) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
}

export default async function ProductDeatilsPage({ params }: { params: any }) {
  const { id: paramsId } = params;
  const { id, title, thumbnail, description, price, rating } =
    await getProductdata(paramsId);
  {
    return (
      <div className="p-5">
        <div className="text-2xl font-bold text-center">
          <Link
            href={{
              pathname: "/products",
            }}
            className="text-xs px-5 text-blue-500"
          >
            Back
          </Link>
          <h1>Product Details Page</h1>
        </div>
        {/* make the details page */}
        <div className="grid md:grid-cols-2 gap-8 py-8">
          <Image
            src={thumbnail}
            alt={title}
            width={200}
            height={200}
            quality={100}
            className="w-full"
          />
          <div>
            <h2 className="text-2xl font-bold py-5">{title}</h2>
            <p className="pb-5">{description}</p>
            <p>{price}</p>
            <p>{rating}</p>
          </div>
        </div>
      </div>
    );
  }
}
