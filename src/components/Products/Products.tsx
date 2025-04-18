"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  title: string;
  email: string;
  role: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Produto 1",
    title: "Tipo A",
    email: "produto1@exemplo.com",
    role: "Disponível",
  },
  {
    id: 2,
    name: "Produto 2",
    title: "Tipo B",
    email: "produto2@exemplo.com",
    role: "Indisponível",
  },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState({ name: "", title: "", email: "", role: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<keyof Product>("name");

  const router = useRouter();

  const handleEdit = (index: number, value: string) => {
    const updated = [...products];
    updated[index].name = value;
    setProducts(updated);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filtered = products.filter((product) =>
    Object.entries(filters).every(([key, value]) =>
      product[key as keyof Product].toLowerCase().includes(value.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortColumn].toLowerCase();
    const bVal = b[sortColumn].toLowerCase();
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-11/12 max-w-6xl p-6 rounded-md">
        <div className="flex justify-between items-center mb-6 text-white">
          <h2 className="text-xl font-bold text-black">Produtos</h2>
          <button
            className="px-4 py-2 bg-black text-white rounded-md cursor-pointer"
            onClick={() =>
              setProducts([
                ...products,
                {
                  id: products.length + 1,
                  name: "Novo Produto",
                  title: "Novo Tipo",
                  email: "novo@exemplo.com",
                  role: "Disponível",
                },
              ])
            }
          >
            + Adicionar Produto
          </button>
        </div>

        <div className="bg-blue-950 p-4 rounded-md">
          <table className="w-full text-left">
            <thead>
              <tr>
                {(["name", "title", "email", "role"] as (keyof Product)[]).map((key) => (
                  <th
                    key={key}
                    onClick={() =>
                      setSortColumn(key) || setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                    }
                    className="px-6 py-3 text-left text-sm font-medium text-white cursor-pointer"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
                <th className="px-6 py-3 text-sm font-medium text-white">Ações</th>
              </tr>
              <tr>
                {(["name", "title", "email", "role"] as (keyof Product)[]).map((key) => (
                  <th key={key} className="px-6 py-2">
                    <input
                      type="text"
                      placeholder={`Filtrar ${key}`}
                      value={filters[key]}
                      onChange={(e) =>
                        setFilters({ ...filters, [key]: e.target.value })
                      }
                      className="w-full px-2 py-1 rounded-md text-white bg-blue-900 border border-white"
                    />
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white">
              {sorted.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-white">{product.name}</td>
                  <td className="px-6 py-4 text-white">{product.title}</td>
                  <td className="px-6 py-4 text-white">{product.email}</td>
                  <td className="px-6 py-4 text-white">{product.role}</td>
                  <td className="px-6 py-4 text-white flex gap-2">
                    <button
                      className="bg-gray-200 text-black px-2 py-1 rounded"
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(product.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
