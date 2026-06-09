import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import { MdClose, MdDone } from "react-icons/md";
import Status from "./Status";

function ProductViewModal({ open, setOpen, product = {}, isAvailable }) {
  const {
    productName,
    image,
    description,
    price,
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
  } = product;

  const numericPrice = Number(price) || 0;
  const numericSpecialPrice = Number(specialPrice) || 0;

  const hasDiscount =
    numericSpecialPrice > 0 &&
    numericPrice > 0 &&
    numericSpecialPrice < numericPrice;

  const hasBookMetadata =
    author ||
    publisher ||
    publicationYear ||
    edition ||
    language ||
    binding ||
    conditionGrade ||
    isbn;

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-60"
      onClose={() => setOpen(false)}
    >
      <DialogBackdrop className="fixed inset-0 bg-amber-500/30 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative z-60 w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-all transition-all"
          >
            {image && (
              <div className="flex w-full justify-center bg-slate-50 p-4">
                <img
                  src={image}
                  alt={productName || "Book cover"}
                  className="max-h-[420px] w-full object-contain"
                />
              </div>
            )}

            <div className="px-6 pb-2 pt-8">
              <DialogTitle
                as="h1"
                className="mb-4 text-xl font-semibold leading-tight text-gray-800 sm:text-2xl lg:text-3xl"
              >
                {productName}
              </DialogTitle>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center justify-between gap-4">
                  {hasDiscount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through">
                        ${numericPrice.toFixed(2)}
                      </span>

                      <span className="font-semibold text-slate-700 sm:text-xl">
                        ${numericSpecialPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-slate-700">
                      ${numericPrice.toFixed(2)}
                    </span>
                  )}

                  {isAvailable ? (
                    <Status
                      text="Available"
                      icon={MdDone}
                      bg="bg-teal-200"
                      color="text-teal-900"
                    />
                  ) : (
                    <Status
                      text="Sold Out"
                      icon={MdClose}
                      bg="bg-rose-200"
                      color="text-rose-700"
                    />
                  )}
                </div>

                {hasBookMetadata && (
                  <>
                    <Divider />

                    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                      {author && (
                        <div>
                          <dt className="font-semibold text-slate-700">
                            Author
                          </dt>
                          <dd className="text-slate-600">{author}</dd>
                        </div>
                      )}

                      {publisher && (
                        <div>
                          <dt className="font-semibold text-slate-700">
                            Publisher
                          </dt>
                          <dd className="text-slate-600">{publisher}</dd>
                        </div>
                      )}

                      {publicationYear && (
                        <div>
                          <dt className="font-semibold text-slate-700">
                            Publication year
                          </dt>
                          <dd className="text-slate-600">{publicationYear}</dd>
                        </div>
                      )}

                      {edition && (
                        <div>
                          <dt className="font-semibold text-slate-700">
                            Edition
                          </dt>
                          <dd className="text-slate-600">{edition}</dd>
                        </div>
                      )}

                      {language && (
                        <div>
                          <dt className="font-semibold text-slate-700">
                            Language
                          </dt>
                          <dd className="text-slate-600">{language}</dd>
                        </div>
                      )}

                      {binding && (
                        <div>
                          <dt className="font-semibold text-slate-700">
                            Binding
                          </dt>
                          <dd className="text-slate-600">{binding}</dd>
                        </div>
                      )}

                      {conditionGrade && (
                        <div>
                          <dt className="font-semibold text-slate-700">
                            Condition
                          </dt>
                          <dd className="text-slate-600">{conditionGrade}</dd>
                        </div>
                      )}

                      {isbn && (
                        <div>
                          <dt className="font-semibold text-slate-700">ISBN</dt>
                          <dd className="break-all text-slate-600">{isbn}</dd>
                        </div>
                      )}
                    </dl>
                  </>
                )}

                {conditionNotes && (
                  <>
                    <Divider />

                    <div>
                      <h2 className="mb-1 font-semibold text-slate-700">
                        Condition notes
                      </h2>
                      <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                        {conditionNotes}
                      </p>
                    </div>
                  </>
                )}

                {description && (
                  <>
                    <Divider />

                    <div>
                      <h2 className="mb-1 font-semibold text-slate-700">
                        Description
                      </h2>
                      <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                        {description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end px-6 py-4">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-800 hover:text-slate-800"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;
