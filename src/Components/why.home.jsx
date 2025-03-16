import { FaSeedling, FaShippingFast } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { GiSprout } from "react-icons/gi";

const features = [
  {
    icon: <FaSeedling className="text-yellow-600 text-3xl" />,
    title: "Premium Quality",
    description: "Our grains are carefully selected from the finest farms to ensure exceptional quality and taste."
  },
  {
    icon: <FaShippingFast className="text-yellow-600 text-3xl" />,
    title: "Fast Delivery",
    description: "We offer prompt and reliable delivery services to bring fresh grains straight to your doorstep."
  },
  {
    icon: <MdVerified className="text-yellow-600 text-3xl" />,
    title: "Certified Organic",
    description: "Our products are certified organic, ensuring they are grown without harmful pesticides or chemicals."
  },
  {
    icon: <GiSprout className="text-yellow-600 text-3xl" />,
    title: "Sustainably Sourced",
    description: "We partner with farmers who practice sustainable agriculture to protect our environment."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Why Choose Our Grains
        </h2>
        <p className="text-gray-600 mt-2">
          We pride ourselves on delivering the highest quality grains with exceptional service and commitment to sustainability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
