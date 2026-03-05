import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const CreatePage = () => {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    product_desc: "",
    product_category: "",
    product_price: "",
    vendor_name: "",
    product_status: "available",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post("/products", product);

      toast.success("Product added successfully");

      navigate("/");

    } catch (error) {

      toast.error("Failed to add product");

    }
  };

  return (
    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl p-6 w-96"
      >

        <h2 className="text-xl font-bold mb-4">
          Add Product
        </h2>

        <input
          placeholder="Product Name"
          className="input input-bordered mb-3"
          onChange={(e) =>
            setProduct({ ...product, product_name: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="input input-bordered mb-3"
          onChange={(e) =>
            setProduct({ ...product, product_desc: e.target.value })
          }
        />

        <input
          placeholder="Category"
          className="input input-bordered mb-3"
          onChange={(e) =>
            setProduct({ ...product, product_category: e.target.value })
          }
        />

        <input
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3"
          onChange={(e) =>
            setProduct({ ...product, product_price: e.target.value })
          }
        />

        <input
          placeholder="Vendor Name"
          className="input input-bordered mb-3"
          onChange={(e) =>
            setProduct({ ...product, vendor_name: e.target.value })
          }
        />

        <button className="btn btn-primary">
          Add Product
        </button>

      </form>

    </div>
  );
};

export default CreatePage;