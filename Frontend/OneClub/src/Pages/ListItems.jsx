import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Components/Pagination';
import AdminProductsFilters from '../Components/AdminProductsFilters';
import Title from '../Components/Title';
import AdminProductsTable from '../Components/AdminProductsTable';

const fallbackImage = 'https://i.ibb.co/YTZn5gQL/p-img8.png';

const subcategoryMap = {
  Clothing: ['topwear', 'bottomwear', 'winterwear', 'summerwear'],
  Electronics: ['tv', 'mobile', 'gaming', 'audio', 'accessories'],
  Jewellery: ['jewellery']
};

const ListItems = () => {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const pageSize = 8;
  const maxPageTabs = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:9000/products/admin', {
          headers: { Authorization: `Bearer ${token}` } // ✅ Fixed here
        });
        setProducts(res.data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:9000/users/vendors', {
          headers: { Authorization: `Bearer ${token}` } // ✅ Fixed here
        });
        console.log('Fetched vendors:', res.data);
        setVendors(res.data || []);
      } catch (err) {
        console.error('Failed to fetch vendors:', err);
      }
    };
    fetchVendors();
  }, []);

  const filtered = products.filter(item => {
    const p = item.responseDTO;
    const matchesVendor = selectedVendor ? item.vendorId === parseInt(selectedVendor) : true;
    const matchesCategory = selectedCategory ? p.categoryName === selectedCategory : true;
    const matchesSubcategory = selectedSubcategory ? p.subcategoryName === selectedSubcategory : true;
    const matchesMin = minPrice ? p.price >= parseFloat(minPrice) : true;
    const matchesMax = maxPrice ? p.price <= parseFloat(maxPrice) : true;
    return matchesVendor && matchesCategory && matchesSubcategory && matchesMin && matchesMax;
  });

  const sorted = [...filtered].sort((a, b) => {
    const pa = a.responseDTO;
    const pb = b.responseDTO;
    switch (sortOrder) {
      case 'price-low-high': return pa.price - pb.price;
      case 'price-high-low': return pb.price - pa.price;
      case 'quantity-high-low': return pb.quantity - pa.quantity;
      case 'quantity-low-high': return pa.quantity - pb.quantity;
      case 'units-sold-high-low': return b.unitsSold - a.unitsSold;
      case 'units-sold-low-high': return a.unitsSold - b.unitsSold;
      case 'name-az': return pa.title.localeCompare(pb.title);
      case 'name-za': return pb.title.localeCompare(pa.title);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const indexOfLast = currentPage * pageSize;
  const currentProducts = sorted.slice(indexOfLast - pageSize, indexOfLast);

  const getPageNumbers = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxPageTabs - 1, totalPages);
    if (end - start < maxPageTabs - 1) start = Math.max(end - maxPageTabs + 1, 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex flex-col gap-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <Title text1="FILTERS FOR ADMIN" />
        <AdminProductsFilters
          sortOrder={sortOrder} setSortOrder={setSortOrder}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          selectedSubcategory={selectedSubcategory} setSelectedSubcategory={setSelectedSubcategory}
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          selectedVendor={selectedVendor} setSelectedVendor={setSelectedVendor}
          setCurrentPage={setCurrentPage}
          subcategoryMap={subcategoryMap}
          vendors={vendors}
        />
      </div>

      <AdminProductsTable currentProducts={currentProducts} fallbackImage={fallbackImage} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          getPageNumbers={getPageNumbers}
        />
      )}
    </div>
  );
};

export default ListItems;