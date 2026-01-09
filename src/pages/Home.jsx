import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Loaders";
import { useProducts } from "../hooks/useContexts";
import ProductBar from "../components/ProductBar";

export default function Home({ bgToggle, setBgToggle }) {
  const { products } = useProducts();
  const loading = false;

  const categoryConfig = [
    { name: 'Phone', cardsCount: 5 },
    { name: 'TV Appliances', cardsCount: 5 },
    { name: 'Toys', cardsCount: 5 },
    { name: 'Grocery', cardsCount: 5 },
    { name: 'Home Electronics', cardsCount: 5 },
    { name: 'Home Furniture', cardsCount: 5 }
  ];

 const groupedProducts = useMemo(() => {
  const grouped = {};
  categoryConfig.forEach(({ name, cardsCount }) => {
    const categoryKey = 
      name === "Phone" ? "phone" :
      name === "TV Appliances" ? "tvAppliances" :
      name === "Toys" ? "toys" :
      name === "Grocery" ? "grocery" :
      name === "Home Electronics" ? "homeElectronics" :
      name === "Home Furniture" ? "homeFurniture" : null;

    grouped[name] = categoryKey
      ? (products[categoryKey] || []).slice(0, cardsCount)
      : [];
  });
  return grouped;
}, [products]);


  return (
    <div className="min-h-screen p-6 pt-24 bg-gray-50">
      <ProductBar />

      <button
        onClick={() => setBgToggle(!bgToggle)}
        className="fixed top-5 right-5 z-[2000] w-14 h-14 rounded-full flex items-center justify-center
        bg-gradient-to-br from-gray-500 to-pink-400 shadow-lg animate-blink relative overflow-hidden"
      >
        <span className="absolute text-sm text-white top-1 left-2 animate-star1">★</span>
        <span className="absolute text-xs text-white bottom-2 right-3 animate-star2">★</span>
        <span className="absolute text-xs text-white top-3 right-2 animate-star3">★</span>
        <span className="text-lg font-bold text-white animate-pulse">O</span>
      </button>

      {loading ? (
        <ProductGridSkeleton count={30} />
      ) : (
        <div className="space-y-10">
          {categoryConfig.map(({ name, cardsCount }) => (
            <div key={name} className="p-6 bg-white rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="inline-block pb-3 text-3xl font-bold text-gray-900 border-b-4 border-orange-500">
                  {name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">Showing up to {cardsCount} featured items</p>
              </div>

              {groupedProducts[name] && groupedProducts[name].length > 0 ? (
                <div className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${cardsCount} grid-cols-1`}>
                  {groupedProducts[name].map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No products available in this category</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
.animate-blink{animation:blink 1.2s infinite}
@keyframes starFade1 {0%{scale:.8;opacity:.2}50%{scale:1.4;opacity:1}100%{scale:.8;opacity:.2}}
@keyframes starFade2 {0%{scale:1;opacity:.3}50%{scale:1.6;opacity:1}100%{scale:1;opacity:.3}}
@keyframes starFade3 {0%{scale:.6;opacity:.1}50%{scale:1.2;opacity:1}100%{scale:.6;opacity:.1}}
.animate-star1{animation:starFade1 1.8s infinite}
.animate-star2{animation:starFade2 2.2s infinite}
.animate-star3{animation:starFade3 1.5s infinite}
`;
document.head.appendChild(style);
