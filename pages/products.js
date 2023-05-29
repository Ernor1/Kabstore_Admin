import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Chart from '../components/Chart';
import { useRouter } from 'next/router';

export default function Product({ name, subName }) {
    return (<>
        <NavBar />
        <div class="main-container" id="container">

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
        </div>
    </>)
}

export const getServerSideProps = (context) => {
    const query = context.query;
    const name = query.name || null;
    const subName = query.subName || null;

    return {
        props: {
            name,
            subName
        }
    }
}
