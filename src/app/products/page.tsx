import { ProductsView, productsMetadata } from "@/views/products";

export const metadata = productsMetadata;

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  return <ProductsView category={category} />;
}
