"use client";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";



export default function UserEditPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Editar Usuário</h1>
        <p className="text-lg">Você está editando o usuário com ID: {id}</p>
        
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
export {useParams} from "next/Product";
