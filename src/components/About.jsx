import ProductCard from "./shared/ProductCard";

const products = [
  {
    image: "https://placehold.co/600x400",
    productName: "William Shakespeare: The Complete Works — Oxford Edition",
    description:
      "A substantial Oxford edition collecting Shakespeare's plays and poetry in one volume. A useful reference copy for readers, students, and collectors.",
    author: "William Shakespeare",
    publisher: "Oxford University Press",
    publicationYear: null,
    edition: "Complete works edition",
    language: "English",
    binding: "Hardcover",
    conditionGrade: "Very Good",
    conditionNotes:
      "Clean pages and firm binding with light shelf wear to the cover.",
    isbn: null,
    specialPrice: 78,
    price: 95,
  },
  {
    image: "https://placehold.co/600x400",
    productName: "Amusing Ourselves to Death",
    description:
      "Neil Postman's influential examination of television, public discourse, and the effect of entertainment-driven media on culture.",
    author: "Neil Postman",
    publisher: null,
    publicationYear: null,
    edition: "Vintage edition",
    language: "English",
    binding: "Paperback",
    conditionGrade: "Good",
    conditionNotes:
      "Light edge wear and mild page toning; text remains clean and readable.",
    isbn: null,
    specialPrice: 26,
    price: 34,
  },
  {
    image: "https://placehold.co/600x400",
    productName: "Lost Horizon",
    description:
      "James Hilton's classic novel of Shangri-La, offered as a characterful vintage reading copy with an attractive period appearance.",
    author: "James Hilton",
    publisher: null,
    publicationYear: null,
    edition: "Vintage edition",
    language: "English",
    binding: "Hardcover",
    conditionGrade: "Good",
    conditionNotes:
      "Moderate cover wear, age-toned pages, and a firm, intact binding.",
    isbn: null,
    specialPrice: 42,
    price: 55,
  },
];

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            sollicitudin metus sed purus vestibulum porttitor. Vestibulum ut
            mollis elit. Vestibulum suscipit nibh porttitor est scelerisque
            pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Proin ultrices mollis auctor. Vivamus a rutrum erat. Curabitur in
            dictum elit. Duis pharetra et orci quis facilisis. Pellentesque at
            enim mauris. Pellentesque sed arcu non lacus sagittis posuere. Nam
            imperdiet risus ac purus sagittis lobortis. Etiam eu fermentum
            massa. Donec malesuada iaculis neque sed cursus.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://placehold.co/600x400"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          ></img>
        </div>
      </div>
      <div className="py-7 space-y-8">
        <h1 className="text-slate-800 text-4xl font-bold text-center">
          Featured Listings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {products.map((product) => (
            <ProductCard key={product.productName} {...product} about />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default About;
