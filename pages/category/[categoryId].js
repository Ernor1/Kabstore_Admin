import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Category from '../../components/Category';
import { useRouter } from 'next/router';
import { Button } from 'antd';

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

export default function CategoryPage({ name, subName, products, category, load }) {
    const router = useRouter();
    // 



    useEffect(() => {
        if (load) {
            // Use the 'onload' event to ensure everything is loaded
            window.onload = () => {
                router.push(router.asPath);
                window.location.reload();
                console.log("Page was loading");
            };
        }
    }, [load, router]);

    console.log("These are the products", products);
    const productHeaders = ["Name", "Price", "Discount", "Category", "Status"];
    console.log(productHeaders);

    console.log(name, subName);
    console.log(products[0]);

    return (

        <ThemeProvider theme={theme}>
            
            <NavBar />
            <div className="main-container" id="container">
                <div className="overlay"></div>
                <div className="search-overlay"></div>
                <SideBar name={name} subName={subName} />
                <Category category={category} products={products} />
            </div>
        </ThemeProvider >
    );
}

export async function getServerSideProps(context) {
    const query = context.query;
    const name = query.name || null;
    const subName = query.subName || null;
    const load = query.load || false;
    const category = await fetch('http://localhost:4000/category/' + context.params.categoryId).then(response => response.json());
    const pro = await fetch('http://localhost:4000/product').then(response => response.json());

    console.log(category, "from categories");
    const products = pro.filter(
        product => product.category.toLowerCase().includes(category.name.toLowerCase())
    );
    console.log("pros from categories", products);

    return {
        props: {
            name,
            subName,
            products,
            category,
            load
        }
    };
}
