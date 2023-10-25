import CreateProductC from "../components/CreateProduct"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"

export default function CreateProduct({ name, subName, categories }) {
    return (<>

        <NavBar />
        <div class="main-container" id="container" >

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
            <CreateProductC categories={categories} />

        </div >
    </>

    )
}
export async function getServerSideProps(context) {
    const query = context.query;
    // console.log(context);
    const name = query.name || null;
    const subName = query.subName || null;
    const categories = await fetch('http://localhost:4000/category')
        .then(response => response.json())
    console.log("hello", categories);

    return {
        props: {
            name,
            subName,
            categories
        }
    }
}