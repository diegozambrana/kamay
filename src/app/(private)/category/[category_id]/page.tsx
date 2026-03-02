import { getCategoryById } from "@/actions/categories/categoryActions";
import { CategoryDetail } from "@/features/categories/detail";
import type { Category } from "@/lib/schemas/category";
import { notFound } from "next/navigation";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ category_id: string }>;
}) {
  const { category_id } = await params;
  let category: Category;

  try {
    category = await getCategoryById(category_id);
  } catch {
    notFound();
  }

  return <CategoryDetail category={category} />;
}
