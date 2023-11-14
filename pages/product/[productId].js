import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Product from '../../components/Product';
import { useEffect, useState } from 'react';

export default function ({ name, subName, products, product, isInitialLoaded }) {
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
    return (<ThemeProvider theme={theme}>
        <NavBar />
        <div class="main-container" id="container" >

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
            <Product product={product} />

        </div >
    </ThemeProvider>)
}

export async function getServerSideProps(context) {
    const query = context.query;
    const name = query.name || null;
    const subName = query.subName || null;
    const id = query.id || null;
    const products = await fetch('https://kabstore-7p9q.onrender.com/product')
        .then(response => response.json())
    const pro = await fetch('https://kabstore-7p9q.onrender.com/product/' + context.params.productId).then(response => response.json())
    const product = pro.product
    console.log("hello", product);
    const categories = []

    return {
        props: {
            name,
            subName,
            products,
            categories,
            product

        }
    }
}


