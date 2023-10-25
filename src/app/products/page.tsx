import Image from "next/image";
import Link from "next/link";

import React from "react";
import { useSelector } from "react-redux";

async function getProductsData({
  limit = 10,
  skip = 0,
}: {
  limit?: number;
  skip?: number;
}) {
  const res = await fetch(
    "https://dummyjson.com/products?limit=" + limit + "&skip=" + skip
  );
  const data = await res.json();
  return data?.products;
}

export default async function ProductsPage({ searchParams }: any) {
  const limit = Number(searchParams.limit) || 10;
  const skip = Number(searchParams.skip) || 0;
  const productsData = await getProductsData({ limit, skip });

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold py-5 text-center">
        Products {productsData.length}
      </h2>

      <div className="flex justify-between flex-wrap gap-12">
        <div className="flex gap-4 py-5">
          <p>Limit:</p>
          <div className="flex gap-8">
            <div>
              <Link
                href={{ pathname: "/products", query: { limit: 10, skip } }}
                className={`${limit === 10 ? "text-blue-500" : ""}`}
              >
                10
              </Link>
            </div>
            <div>
              <Link
                href={{ pathname: "/products", query: { limit: 20, skip } }}
                className={`${limit === 20 ? "text-blue-500" : ""}`}
              >
                20
              </Link>
            </div>
            <div>
              <Link
                href={{ pathname: "/products", query: { limit: 30, skip } }}
                className={`${limit === 30 ? "text-blue-500" : ""}`}
              >
                30
              </Link>
            </div>
            <div>
              <Link
                href={{ pathname: "/products", query: { limit: 40, skip } }}
                className={`${limit === 40 ? "text-blue-500" : ""}`}
              >
                40
              </Link>
            </div>
            <div>
              <Link
                href={{ pathname: "/products", query: { limit: 100, skip } }}
                className={`${limit === 100 ? "text-blue-500" : ""}`}
              >
                100
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-8 flex-wrap items-center justify-center pb-10">
          <Link
            href={{
              pathname: "/products",
              query: {
                limit: limit,
                skip: skip === 0 ? 0 : skip - limit,
              },
            }}
            className="btn bg-gray-200 py-1 px-5 cursor-pointer"
          >
            Previous
          </Link>
          <p>{Math.ceil(skip / limit) + 1}</p>
          <Link
            href={{
              pathname: "/products",
              query: {
                limit: limit,
                skip: skip + limit,
              },
            }}
            className="btn bg-gray-200 py-1 px-5 cursor-pointer"
          >
            Next
          </Link>
        </div>
      </div>

      {/* loop the data and make a card */}
      <div>
        {productsData?.length === 0 ? (
          <h2 className="text-2xl font-bold py-5 text-center">No products</h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
            {productsData?.map((product: any, index: number) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="shadow-md rounded border border-blue-50 cursor-pointer"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-[200px] mb-8"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1">{product.title}</h3>
                  <p>
                    {product.description.length > 50
                      ? product?.description.slice(0, 50) + "..."
                      : product?.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* pagination */}
    </div>
  );
}
