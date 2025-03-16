import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Wheat",
    description: "Premium wheat varieties for baking and cooking",
    image: "https://img.freepik.com/free-photo/wheat-grains-bowl-wheat-popcorn-bowl-wheat-seed-rustic_114579-1316.jpg?t=st=1742117240~exp=1742120840~hmac=a9d9f3f940778cbf548fe99a9a69a8ab9c32c4bfeff48bb019e797b07b4438d8&w=2000",
  },
  {
    name: "Rice",
    description: "Fine rice grains from sustainable farms",
    image: "https://img.freepik.com/free-photo/high-angle-bowl-with-rice-grains-assortment_23-2149359450.jpg?t=st=1742117347~exp=1742120947~hmac=560497a61a596cc47a739e27e0b68b0a4570d31cb039612b19b0fd94d91ca0ff&w=2000",
  },
  {
    name: "Maize",
    description: "Nutritious maize varieties for diverse culinary needs",
    image: "https://img.freepik.com/free-photo/close-up-fresh-corn-ready-eat_1150-34421.jpg?t=st=1742117385~exp=1742120985~hmac=5cfea9f0357df8dc2b2fc1f8c3d4a34b182c35cbdd21c62e3cdf4b89b156bf80&w=2000",
  },
  {
    name: "Specialty Grains",
    description: "Unique grain selections for health-conscious consumers",
    image: "https://img.freepik.com/free-photo/view-allergens-commonly-found-grains_23-2150170288.jpg?t=st=1742117431~exp=1742121031~hmac=ae6df5b97b5eb507dac792e8a1119eedcae88425b8db5b8eeb4320e0fa3061e3&w=2000",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/product/${category}`);
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Explore Our Categories
        </h2>
        <p className="text-gray-600 mt-2">
          Browse through our diverse selection of premium grains to find the
          perfect match for your culinary needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-md group"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm">{category.description}</p>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className="mt-2 inline-block text-white font-semibold bg-amber-500 px-4 py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
