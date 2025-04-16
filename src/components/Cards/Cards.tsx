"use client";

import React, { useState } from "react";

export default function Cards() {
    const [categories, setCategories] = useState([
        { id: 1, name: "Categoria", status: "Online" },
        { id: 2, name: "Categoria", status: "Offline" },
        { id: 3, name: "Categoria", status: "Online" },
        { id: 4, name: "Categoria", status: "Offline" },
        { id: 5, name: "Categoria", status: "Online" },
    ]);

    const handleDeleteAll = () => {
        setCategories([]);
    }

    const handleDelete = (id: number) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    const handleEdit = (id: number) => {
        alert(`Editando categoria com ID: ${id}`);
    };

    const handleAdd = () => {
        const newCategory = { 
            id: Date.now(), 
            name: "Nova Categoria", 
            status: "Online" 
        };
        setCategories([...categories, newCategory]);
    };

    const handleToggleStatus = (id: number) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === id
                    ? {
                          ...category,
                          status: category.status === "Online" ? "Offline" : "Online",
                      }
                    : category
            )
        );
    };

    return (

        <div className="flex item-center justify-center min-h-screen bg-gray-100">
            <div className="w-11/12 max-w-6x1 bg-white p-6 rounded-md shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Categoria</h2>
                <button
                    onClick={handleAdd} 
                    className="px-4 py-2 bg-black text-white rounded-md cursor-pointer"
                >
                    + Adicionar Categoria
                </button>
            </div>

            <div className="bg-gray-200 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">Label</button>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">Filtro</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">Filtro</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">Filtro</button>
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">#</th>
                            <th className="p-2">Categoria</th>
                            <th className="p-2">Ações</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-t">
                                <td className="p-2">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-2">{category.name}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(category.id)}
                                        className="text-blue-500 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-red-500 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleToggleStatus(category.id)}
                                        className={`px-5 py-0-5 rounded-full text-white font-semibold transition-all duration-300 ${
                                            category.status === "Online"
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "bg-red-500 hover:bg-red-600"
                                        }`}
                                    >
                                        {category.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button 
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-black text-white rounded-md cursor-pointer">
                    Delete
                </button>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-black text-white rounded-md cursor-pointer">1</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">2</button>
                    <span>...</span>
                    <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">67</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">68</button>
                </div>
            </div>
        </div>
        </div>
    );
}