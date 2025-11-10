import { useState, useEffect, useContext } from 'react';
import Dropdown from '../assets/dropdown.png';
import Title from '../Components/Title';
import Gridcard from '../Components/Gridcard';
import axios from 'axios';
import { toast } from 'react-toastify';
import FiltersSidebar from '../Components/FiltersSidebar';
import Pagination from '../Components/Pagination';
import { SearchContext } from '../Contexts/SearchContext';

const subcategoryMap = {
  Clothing: ['topwear', 'bottomwear', 'winterwear', 'summerwear'],
  Electronics: ['tv', 'mobile', 'gaming', 'audio', 'accessories'],
  Jewellery: ['jewellery']
};

const Collections = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [sortOrder, setSortOrder] = useState('relevant');
  const { searchText } = useContext(SearchContext);
  const productsPerPage = 12;
  const maxPageTabs = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get('http://localhost:9000/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  // Handlers
  const handleCategoryChange = (value) => {
    setSelectedCategory(prev => (prev === value ? '' : value));
    setSelectedSubcategory('');
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(prev => (prev === value ? '' : value));
    setCurrentPage(1);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  // Filter products based on all criteria
  let filtered = products;

  // Search filter
  if (searchText) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Category filter
  if (selectedCategory) {
    filtered = filtered.filter(p => p.categoryName === selectedCategory);
  }

  // Subcategory filter
  if (selectedSubcategory) {
    filtered = filtered.filter(p => p.subcategoryName === selectedSubcategory);
  }

  // Price range filter
  if (minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  }

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'low-high') return a.price - b.price;
    if (sortOrder === 'high-low') return b.price - a.price;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = sorted.slice(indexOfLast - productsPerPage, indexOfLast);

  const getPageNumbers = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxPageTabs - 1, totalPages);
    if (end - start < maxPageTabs - 1) start = Math.max(end - maxPageTabs + 1, 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-8 max-w-screen-xl mx-auto border-t">
      <aside className="w-fit pr-6">
        <FiltersSidebar
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          Dropdown={Dropdown}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          selectedSubcategory={selectedSubcategory}
          handleSubcategoryChange={handleSubcategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
          subcategoryMap={subcategoryMap}
        />
      </aside>

      <main className="flex-1">
        {searchText && (
          <div className="mb-4">
            <p className="text-gray-600">
              Showing results for: <span className="font-semibold">"{searchText}"</span>
              {filtered.length !== products.length && (
                <span> ({filtered.length} of {products.length} products)</span>
              )}
            </p>
          </div>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.length ? currentProducts.map(product => (
            <li key={product.id}>
              <Gridcard
                product={product}
                isInitiallyFavorite={favoriteIds.includes(product.id)}
                onRemove={() => toggleFavorite(product.id)}
              />
            </li>
          )) : (
            <p className="text-gray-600">
              {searchText ? "No products match your search." : "No products available."}
            </p>
          )}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          getPageNumbers={getPageNumbers}
        />
      </main>
    </div>
  );
};

export default Collections;