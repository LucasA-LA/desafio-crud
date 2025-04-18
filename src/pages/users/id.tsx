"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProductDetails = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Editar Produto</h1>
      <p>Aqui você pode editar o produto com ID: (pegue da URL)</p>
    </div>
  );
};

export default ProductDetails;
