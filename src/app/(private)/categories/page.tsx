import { getCategories } from "@/actions/categories/categoryActions";
import { CategoryList } from "@/features/categories/list";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return <CategoryList initialCategories={categories || []} />;
}
