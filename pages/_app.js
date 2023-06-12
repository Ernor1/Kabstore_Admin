import '../styles/globals.css'
import '../styles/custom_dt_html5.css'
import '../styles/boostrap.min.css'
import '../styles/main.css'
import '../styles/plugins.css'
import '../styles/apexcharts.css'
import '../styles/dash_1.css'
import '../styles/custom-list-group.css'
import '../styles/animate.css'
import '../styles/datatables.css'
import '../styles/dt-global_style.css'
import '../styles/user-profile.css'
import '../styles/structure.css'
import '../styles/custom-media_object.css'
import '../styles/scrollSpyNav.css'
import '../styles/loader.css'

import '../styles/select2.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import Router, { useRouter } from 'next/router'
import { use, useState } from 'react'
import Loader from '../components/Loader'

export default function App({ Component, pageProps, session }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [path, setPath] = useState(router.asPath)
    Router.events.on("routeChangeStart", (url) => {
        console.log("Changing");
        if (url !== path) {
            setLoading(true);
            setPath(url);
        }
    })
    Router.events.on("routeChangeComplete", (url) => {
        console.log("Complete");
        setLoading(false);
    })
    return (
        <>
            {loading ? <Loader /> : <Component {...pageProps} />}

        </>
    )
}