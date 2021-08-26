import Footer from '../components/footer';
import Header from '../components/header';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
	return (
		<div className='container'>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}

export default MyApp;
