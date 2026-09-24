import { ProductView, generateProductMetadata, productStaticParams } from "@/views/product";

export const dynamicParams = false;
export const generateStaticParams = productStaticParams;
export const generateMetadata = generateProductMetadata;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  return <ProductView slug={slug} />;
}
