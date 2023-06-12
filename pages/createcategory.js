import CreateCategoryC from "../components/CreateCategory"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"

export default function AddCategory({ name, subName, categories }) {
    return (<>

        <NavBar />
        <div class="main-container" id="container" >

            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar name={name} subName={subName} />
            <CreateCategoryC />

        </div >
    </>

    )
}
export async function getServerSideProps(context) {
    const query = context.query;
    const name = query.name || null;
    const subName = query.subName || null;

    return {
        props: {
            name,
            subName,
        }
    }
}