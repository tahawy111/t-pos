interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

export default function ProductDetailsPage({
  params: { productId },
}: ProductDetailsPageProps) {
  return <div>ProductDetailsPage {productId}</div>;
}
