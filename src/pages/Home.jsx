import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Loaders";
import { useProducts } from "../hooks/useContexts";

export default function Home({ bgToggle, setBgToggle }) {
  const { products } = useProducts();
  const [itemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const filteredItems = products || [];

  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredItems.slice(startIdx, endIdx);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="p-6 pt-24">

      {/* Circle Button with Blink & Star Animation */}
      <button
        onClick={() => setBgToggle(!bgToggle)}
        className="fixed top-5 right-5 z-[2000] w-14 h-14 rounded-full flex items-center justify-center
        bg-gradient-to-br from-gray-500 to-pink-400 shadow-lg animate-blink relative overflow-hidden"
      >

        {/* Sparkle Stars */}
        <span className="absolute text-sm text-white top-1 left-2 animate-star1">★</span>
        <span className="absolute text-xs text-white bottom-2 right-3 animate-star2">★</span>
        <span className="absolute text-xs text-white top-3 right-2 animate-star3">★</span>

        {/* Center Icon/Text */}
        <span className="text-lg font-bold text-white animate-pulse">O</span>
      </button>

      {/* Product Grid */}
      {loading ? (
        <ProductGridSkeleton count={15} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {paginatedItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}

    </div>
  );
}

/* Animations */
const style = document.createElement("style");
style.innerHTML = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.animate-blink {
  animation: blink 1.2s ease-in-out infinite;
}

@keyframes starFade1 {
  0% { transform: scale(0.8); opacity: 0.2; }
  50% { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.2; }
}
@keyframes starFade2 {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.6); opacity: 1; }
  100% { transform: scale(1); opacity: 0.3; }
}
@keyframes starFade3 {
  0% { transform: scale(0.6); opacity: 0.1; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.6); opacity: 0.1; }
}

.animate-star1 { animation: starFade1 1.8s ease-in-out infinite; }
.animate-star2 { animation: starFade2 2.2s ease-in-out infinite; }
.animate-star3 { animation: starFade3 1.5s ease-in-out infinite; }
`;
document.head.appendChild(style);
