import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ViewProducts from '../components/ViewProduct';

export default function Products({ name, subName, products }) {
    console.log("These are the products", products);
    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#000',
                darker: '#000',
            },
            neutral: {
                main: '#000',
                contrastText: '#000',
            },
        },
    });
    console.log(name, subName);
    console.log(products[0]);
    const productHeaders = ["Name", "Price", "Discount", "Category", "Status"]
    console.log(productHeaders);
    const router = useRouter();
    return (<ThemeProvider theme={theme}>
        <NavBar />
        <div class="main-container" id="container" >

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
            <ViewProducts products={products} productHeaders={productHeaders} />

        </div >
    </ThemeProvider>)
}

export async function getServerSideProps(context) {
    const query = context.query;
    // console.log(context);
    const name = query.name || null;
    const subName = query.subName || null;
    const products = await fetch('https://kabstore-7p9q.onrender.com/product')
        .then(response => response.json())
    console.log("hello", products);
    const categories = []

    return {
        props: {
            name,
            subName,
            products,
            categories

        }
    }
}


