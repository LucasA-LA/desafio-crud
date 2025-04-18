"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    name: string;
    title: string;
    email: string;
    role: string;
}

const initialUsers: User[] = [
    {
        id: 1,
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    {
        id: 2,
        name: "Courtney Henry",
        title: "Designer",
        email: "courtney.henry@example.com",
        role: "Admin",
    },
    {
        id: 3,
        name: "Tom Cook",
        title: "Director of Product",
        email: "tom.cook@example.com",
        role: "Member",
    },
];

const Cards: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [filters, setFilters] = useState({ name: "", title: "", email: "", role: "" });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState<keyof User>("name");

    const handleEdit = (index: number, value: string) => {
        const updatedUsers = [...users];
        updatedUsers[index].name = value;
        setUsers(updatedUsers);
    };

    const filteredUsers = users.filter((user) =>
        Object.entries(filters).every(([key, value]) =>
            user[key as keyof User].toLowerCase().includes(value.toLowerCase())
        )
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aVal = a[sortColumn].toLowerCase();
        const bVal = b[sortColumn].toLowerCase();
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const toggleSort = (column: keyof User) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handleDelete = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const router = useRouter();
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-11/12 max-w-6xl p-6 rounded-md ">
                <div className="flex justify-between items-center mb-6 text-white">
                    <h2 className="text-xl font-bold text-black">Categoria</h2>
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md cursor-pointer"
                        onClick={() =>
                            setUsers([
                                ...users,
                                {
                                    id: users.length + 1,
                                    name: "Novo Usuário",
                                    title: "Nova Função",
                                    email: "novo.email@example.com",
                                    role: "Member",
                                },
                            ])
                        }
                    >
                        + Adicionar Categoria
                    </button>
                </div>

                <div className="bg-blue-950 p-4 rounded-md">

                    <table className="w-full text-left">
                        <thead>
                            <tr className="">
                                {(["name", "title", "email", "role"] as (keyof User)[]).map((key) => (
                                    <th
                                        key={key}
                                        onClick={() => toggleSort(key)}
                                        className="px-6 py-3 text-left text-sm font-medium text-white cursor-pointer"
                                    >
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </th>
                                ))}
                            </tr>
                                <tr>
                                    {(["name", "title", "email", "role"] as (keyof User)[]).map((key) => (
                                    <th key={key} className="px-6 py-2">
                                        <input
                                        type="text"
                                        placeholder={`Filtrar ${key}`}
                                        value={filters[key]}
                                        onChange={(e) =>
                                            setFilters({ ...filters, [key]: e.target.value })
                                        }
                                        className="w-full px-2 py-1 rounded-md text-white"
                                        />
                                    </th>
                                    ))}
                                </tr>
                        </thead>
                        <tbody className="divide-y divide-white">
                            {sortedUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        {editingIndex === index ? (
                                            <input
                                                value={user.name}
                                                onChange={(e) => handleEdit(index, e.target.value)}
                                                onBlur={() => setEditingIndex(null)}
                                                className="px-2 py-1 border rounded-md"
                                                autoFocus
                                            />
                                        ) : (
                                            <span onClick={() => setEditingIndex(index)}>{user.name}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        <input 
                                            value={user.title}
                                            onChange={(e) => handleEdit(index, e.target.value)}
                                            onBlur={() => setEditingIndex(null)}
                                            className="px-2 py-1 border rounded-md"
                                            autoFocus
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        <input 
                                        value={user.email}
                                        onChange={(e) => handleEdit(index, e.target.value)}
                                        onBlur={() => setEditingIndex(null)}
                                        className="px-2 py-1 border rounded-md"
                                        autoFocus
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        <input 
                                        value={user.role}
                                        onChange={(e) => handleEdit(index, e.target.value)}
                                        onBlur={() => setEditingIndex(null)}
                                        className="px-2 py-1 border rounded-md"
                                        autoFocus
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white flex gap-2">
                                        <button className="bg-gray-200 text-black px-2 py-1 rounded"
                                        onClick={() => router.push(`/users/${user.id}`)}
                                      >
                                        Editar
                                      </button>
                                      
                                        <button
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(user.id)}
                                        >
                                        Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md cursor-pointer"
                        onClick={() => setUsers([])}
                    >
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
};

export default Cards;