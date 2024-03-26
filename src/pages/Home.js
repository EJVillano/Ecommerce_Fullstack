import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home(){

	const data = {
        title: "Zuitt Coding Bootcamp",
        content: "Opportunities for everyone, everywhere",
        destination: "/products",
        label: "Enroll now!"
    }

	return(
		<>
			< Banner data={data} />
			<FeaturedProducts />
			
		</>  
	)
}

