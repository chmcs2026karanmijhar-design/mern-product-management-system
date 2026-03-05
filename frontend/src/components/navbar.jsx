import { Link } from "react-router-dom";
import { PackagePlus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow px-6">

      <div className="flex-1 text-xl font-bold">
        Product Manager
      </div>

      <Link to="/create">
        <button className="btn btn-primary">
          <PackagePlus size={18} />
          Add Product
        </button>
      </Link>

    </div>
  );
};

export default Navbar;