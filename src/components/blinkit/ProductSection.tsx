import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  discount?: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductSection({ title, products, viewAllLink = "/products" }: ProductSectionProps) {
  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <Link
            to={viewAllLink}
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
          >
            see all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              unit={product.unit}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
