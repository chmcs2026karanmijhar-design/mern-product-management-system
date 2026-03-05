import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const ProductCard = ({ product, refreshProducts }) => {

  const handleDelete = async () => {
    try {

      await axios.delete(`/products/${product._id}`);

      toast.success("Product deleted");

      refreshProducts();

      document.getElementById(`delete_modal_${product._id}`).close();

    } catch (error) {

      toast.error("Delete failed");

    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-lg border border-transparent hover:border-primary hover:shadow-xl transition duration-300">

        <div className="card-body">

          <h2 className="card-title">
            {product.product_name}
          </h2>

          <p className="text-sm opacity-80">
  {product.product_desc}
</p>
<p className="text-xs opacity-70">
  Category: {product.product_category}
</p>

<p className="text-xs opacity-70">
  Vendor: {product.vendor_name}
</p>

          <p className="text-lg font-bold text-primary">
₹ {product.product_price}
</p>
          <div className="card-actions justify-between items-center mt-4">

            <Link to={`/edit/${product._id}`}>
              <button className="btn btn-sm btn-primary">
                <Pencil size={16}/>
              </button>
            </Link>

            <button
              onClick={() =>
                document.getElementById(`delete_modal_${product._id}`).showModal()
              }
              className="btn btn-sm btn-error"
            >
              <Trash2 size={16}/>
            </button>

          </div>

        </div>

      </div>

      {/* Delete Modal */}

      <dialog id={`delete_modal_${product._id}`} className="modal">

        <div className="modal-box">

          <h3 className="font-bold text-lg">
            Delete Product
          </h3>

          <p className="py-4">
            Are you sure you want to delete this product?
          </p>

          <div className="modal-action">

            <button
              className="btn"
              onClick={() =>
                document.getElementById(`delete_modal_${product._id}`).close()
              }
            >
              Cancel
            </button>

            <button
              className="btn btn-error"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>

        </div>

      </dialog>
    </>
  );
};

export default ProductCard;