import { useEffect, useState } from 'react';
import { api } from '@/services/api';

interface Category {
  id: number;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get<Category[]>('/categories?offset=0&limit=10')
      .then((res) => setCategories(res.data))
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Categorias</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
