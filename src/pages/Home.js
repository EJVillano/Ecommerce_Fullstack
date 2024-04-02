import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import SearchByName from '../components/SearchByName';
import backgroundImage from '../images/bg1.jpg';
import ScrollBehavior from '../components/ScrollBehavior';

export default function Home(){

    const data = {
        title: "TITANIA WINTER '24: OLYMPUS SPORTS CLUB",
        content: "THE UNIVERSAL LOVE LANGUAGE FOR SPORTS, ENCAPSULATED.",
        destination: "/products",
        label: "SHOP NOW"
    }

    return(
        <>
            <Banner data={data} />
            <SearchByName/>
            <div className="my-5 pt-5">
                <img src={backgroundImage} alt="" style={{ width: '100%', height: 'auto' }} />
                <FeaturedProducts />
            </div>
            <footer style={{ backgroundColor: 'black', color: 'white',width: '100%', position: 'absolute'  }}>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <h5>Contact Us</h5>
                            <h5>About Us</h5>
                            <h5>Store Locator</h5>
                            <h5>Barbershop</h5>
                            <h5>Careers</h5>
                        </div>
                        <div className="col-md-6">
                            <h5>Track Your Order</h5>
                            <h5>Size Chart</h5>
                            <h5>FAQs</h5>
                            <h5>Returns & Exchanges</h5>
                            <h5>Terms of Service</h5>
                            <h5>Privacy Policy</h5>
                            <h5>Shipping Policy</h5>
                        </div>
                    </div>
                </div>
                <div className="p-5 m-5 text-center">
                    <h5>© 2024 Titania Inc., All Rights Reserved</h5>
                </div>
            </footer>
            <ScrollBehavior/>
        </>
    )
}

