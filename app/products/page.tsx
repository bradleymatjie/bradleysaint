import ProductFilters from "./components/ProductFilters";


export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Catalog</h1>
        <ProductFilters />
      </div>
    </div>
  );
}