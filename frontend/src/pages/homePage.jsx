import { useEffect, useState } from "react";
import axios from "../lib/axios";
import ProductCard from "../components/productCard";

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      let url = "/products?";

      if (category) {
        url += `category=${category}&`;
      }

      if (sort) {
        url += `sort=${sort}`;
      }

      const res = await axios.get(url);

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // fetch all products once to extract categories
  const fetchAllProducts = async () => {
    try {

      const res = await axios.get("/products");
      setAllProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // get unique categories dynamically
  const categories = [...new Set(allProducts.map(p => p.product_category))];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Page Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <h2 className="text-3xl font-bold">
          Products
        </h2>

        <span className="text-sm opacity-70 mt-2 md:mt-0">
          {products.length} items
        </span>

      </div>

      {/* Filter Section */}

      <div className="flex flex-wrap gap-4 mb-10">

        {/* Category Filter */}

        <div className="flex flex-col">
          <label className="text-xs mb-1 opacity-70">
            Category
          </label>

          <select
            className="select select-bordered w-48"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}

          </select>
        </div>

        {/* Sort Filter */}

        <div className="flex flex-col">
          <label className="text-xs mb-1 opacity-70">
            Sort Price
          </label>

          <select
            className="select select-bordered w-48"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="lowtohigh">Low → High</option>
            <option value="hightolow">High → Low</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}

      {loading ? (

        <div className="text-center py-16 opacity-70">
          Loading products...
        </div>

      ) : products.length === 0 ? (

        <div className="text-center py-16 opacity-70">
          <p className="text-lg">No products found</p>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              refreshProducts={fetchProducts}
            />
          ))}

        </div>

      )}

    </div>
  );
};

export default HomePage;