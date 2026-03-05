import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const EditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    product_desc: "",
    product_category: "",
    product_price: "",
    vendor_name: "",
    product_status: "",
  });

  // fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.put(`/products/${id}`, product);

      toast.success("Product updated");

      navigate("/");

    } catch (error) {

      toast.error("Update failed");

    }
  };

  return (
    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl p-6 w-96"
      >

        <h2 className="text-xl font-bold mb-4">
          Edit Product
        </h2>

        <input
          className="input input-bordered mb-3"
          value={product.product_name}
          onChange={(e) =>
            setProduct({ ...product, product_name: e.target.value })
          }
        />

        <input
          className="input input-bordered mb-3"
          value={product.product_desc}
          onChange={(e) =>
            setProduct({ ...product, product_desc: e.target.value })
          }
        />

        <input
          className="input input-bordered mb-3"
          value={product.product_category}
          onChange={(e) =>
            setProduct({ ...product, product_category: e.target.value })
          }
        />

        <input
          className="input input-bordered mb-3"
          value={product.product_price}
          onChange={(e) =>
            setProduct({ ...product, product_price: e.target.value })
          }
        />

        <button className="btn btn-primary">
          Update Product
        </button>

      </form>

    </div>
  );
};

export default EditPage;