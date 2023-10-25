import EditProductC from "../../components/EditProduct"
import NavBar from "../../components/NavBar"
import SideBar from "../../components/SideBar"

export default function EditProduct({ name, subName, categories, product }) {
    return (<>

        <NavBar />
        <div class="main-container" id="container" >

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
            <EditProductC categories={categories} product={product} />

        </div >
    </>

    )
}
export async function getServerSideProps(context) {
    const query = context.query;
    console.log(context.params);
    console.log("here is ", context.params.productId);
    const name = query.name || null;
    const subName = query.subName || null;
    const categories = await fetch('http://localhost:4000/category')
        .then(response => response.json())
    const pro = await fetch('http://localhost:4000/product/' + context.params.productId)
        .then(response => response.json())
    const product = pro.product
    console.log("hello", categories);

    return {
        props: {
            name,
            subName,
            categories,
            product
        }
    }
}