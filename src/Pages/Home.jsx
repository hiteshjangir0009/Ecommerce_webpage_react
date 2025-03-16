import React from 'react'
import Layout from '../Layout/Layout'
import WhyChooseUs from '../Components/why.home';
import Categories from '../Components/Catagories.home';

const Home = () => {

    const backgroundStyle = {
        backgroundImage: "url('https://img.freepik.com/free-photo/sacks-healthy-legumes-grains_53876-65444.jpg?t=st=1742119945~exp=1742123545~hmac=cbd1ab09876d59fdf1de4058c2b8e4a3c04bb3e10b32006720339d76ed73a95f&w=1800')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <Layout>
            <div>

                {/* hero section */}
                
                <div
                    className="flex justify-center items-center text-amber-400 text-center px-4 h-[60vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh]"
                    style={backgroundStyle}
                >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight">
                        Pure, natural grains <br /> from farm to your table...
                    </h1>
                </div>

                <div>
                    <WhyChooseUs />
                </div>
                <div className=''>
                    <Categories />
                </div>
            </div>
        </Layout>
    )
}

export default Home