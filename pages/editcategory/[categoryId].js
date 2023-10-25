import EditCategoryC from "../../components/EditCategory"
import NavBar from "../../components/NavBar"
import SideBar from "../../components/SideBar"

export default function EditCategory({ name, subName, category }) {

    return (<>

        <NavBar />
        <div class="main-container" id="container" >

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
            <EditCategoryC category={category} />

        </div >
    </>

    )
}
export async function getServerSideProps(context) {

    const query = context.query;
    const name = query.name || null;
    const subName = query.subName || null;
    const category = await fetch('http://localhost:4000/category/' + context.params.categoryId)
        .then(response => response.json())

    return {
        props: {
            name,
            subName,
            category

        }
    }
}