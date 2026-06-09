import { useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import truncateText from "../../utils/truncateText";
import ProductViewModal from "./ProductViewModal";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  author,
  publisher,
  publicationYear,
  edition,
  language,
  binding,
  conditionGrade,
  conditionNotes,
  isbn,
  about = false,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState({});

  const dispatch = useDispatch();
  const btnLoader = false;

  const isAvailable = Number(quantity) > 0;

  const hasDiscount =
    Number(specialPrice) > 0 &&
    Number(price) > 0 &&
    Number(specialPrice) < Number(price);

  const viewProduct = {
    id: productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    author,
    publisher,
    publicationYear,
    edition,
    language,
    binding,
    conditionGrade,
    conditionNotes,
    isbn,
  };

  const handleProductView = (product) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => handleProductView(viewProduct)}
        className="w-full overflow-hidden aspect-[3/2] bg-slate-50"
      >
        <img
          className="w-full h-full object-contain cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={productName || "Book cover"}
        />
      </div>

      <div className="p-4">
        <h2
          onClick={() => handleProductView(viewProduct)}
          className="text-lg font-semibold mb-1 cursor-pointer"
        >
          {truncateText(productName, 50)}
        </h2>

        {(author || publicationYear || conditionGrade) && (
          <div className="mb-3 space-y-1">
            {author && (
              <p className="text-sm font-medium text-slate-700">
                {truncateText(author, 45)}
              </p>
            )}

            {(publicationYear || conditionGrade) && (
              <p className="text-xs text-slate-500">
                {[publicationYear, conditionGrade].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        )}

        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm">
            {truncateText(description, 80)}
          </p>
        </div>

        {!about && (
          <div className="flex items-center justify-between gap-3">
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  ${Number(price).toFixed(2)}
                </span>

                <span className="text-xl font-bold text-slate-700">
                  ${Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                ${Number(price).toFixed(2)}
              </span>
            )}

            <button
              disabled={!isAvailable || btnLoader}
              onClick={() =>
                addToCartHandler({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                })
              }
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
              } text-white py-2 px-3 rounded-lg transition-colors duration-300 w-36 flex items-center justify-center`}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        )}
      </div>

      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default ProductCard;
