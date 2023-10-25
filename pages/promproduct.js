import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PromProductC from '../components/PromProduct';

export default function ({ name, subName, product }) {
    console.log("These are the products", product);
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
    const productHeaders = ["Name", "Price", "Discount", "Category", "Status"]
    console.log(productHeaders); const router = useRouter();
    return (<ThemeProvider theme={theme}>
        <NavBar />
        <div class="main-container" id="container" >

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
            <PromProductC product={product} />

        </div >
    </ThemeProvider>)
}
export async function getServerSideProps(context) {
    const query = context.query;
    // console.log(context);
    const name = query.name || null;
    const subName = query.subName || null;
    const product = await fetch('https://kabstore-7p9q.onrender.com/promproduct/63f2656b2dbeae2d5818d689')
        .then(response => response.json())
    console.log("hello", product);
    const categories = []

    return {
        props: {
            name,
            subName,
            product,
            categories

        }
    }
}