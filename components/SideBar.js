import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faCube, faLayerGroup, faTableLayout, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import Icon from '../assets/img/favicon.png'
import Image from "next/image";
import { Trello, Layers, Layout, Box, Users, } from 'react-feather';
import Link from "next/link";
import { useRouter } from "next/router";
export default function SideBar({ name, subName }) {
    const router = useRouter();
    const query = router.query;
    const sideContent = [
        {
            name: "Catalog",
            icon: <Layers />,
            subs: ["Categories", "Products"]
        },
        {
            name: "Design",
            icon: <Layout />,
            subs: ["Banners", "Slides"]
        },
        {
            name: "Sales",
            icon: <Box />,
            subs: ["Orders", "Payments"]
        },
        {
            name: "Customers",
            icon: <Users />,
            subs: ["Add New", "Report"]
        }
    ];
    const onRouteClick = (name, sub) => {
        router.push({
            pathname: `/${sub.toLowerCase()}`,
            query: {
                name: name,
                subName: sub
            },
        }, `/${sub.toLowerCase()}`, { shallow: true, as: router.asPath }, { scroll: false })
    }

    const [active, setActive] = useState(-1);
    console.log("consoling active", query.liId);
    const [page, setPage] = useState("Dashboard")
    const handlePage = (page) => {
        setPage(page)
    }

    const handleClick = (id) => {
        setActive((prevActive) => (prevActive === id ? -1 : id));
    };
    console.log("Trying to query", query.name);

    return (
        <div className="sidebar-wrapper sidebar-theme">
            <nav id="sidebar">
                <ul className="navbar-nav theme-brand flex-row text-center">
                    <li className="nav-item theme-logo">
                        <Link href={{
                            pathname: "/"
                        }}>
                            <Image src={Icon} alt="logo" className="navbar-logo" />
                        </Link>
                    </li>

                    <li className="nav-item theme-text">
                        <a href="dashboard" className="nav-link">
                            KABSTORE
                        </a>
                    </li>
                    <li className="nav-item toggle-sidebar">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-left sidebarCollapse"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </li>
                </ul>

                <div className="shadow-bottom"></div>
                <ul className="list-unstyled menu-categories " id="accordionExample">
                    <li className={`menu dashboard ${query.name == "" ? "active" : ""}`}>
                        <a href="/" aria-expanded="false" className="dropdown-toggle text-decoration-none">
                            <div>
                                <Trello />
                                <span>Dashboard</span>
                            </div>
                        </a>
                    </li>
                    {sideContent.map((content, i) => {
                        console.log(content.name);
                        return (
                            <li key={i} className={`menu catalog ${query.name == content.name ? "active" : ""}`} style={{ textDecoration: "none" }} onClick={() => handleClick(i)}>
                                <a
                                    data-toggle="collapse"
                                    aria-expanded={active === i || query.name == content.name ? "true" : "false"}
                                    className="dropdown-toggle collapsed text-decoration-none  "
                                >
                                    <div className=" ">
                                        {content.icon}
                                        <span>{content.name}</span>
                                    </div>
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-chevron-right"
                                        >
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </div>
                                </a>
                                {content.subs ? (
                                    <Collapse in={active === i || content.name == query.name}>
                                        <ul className="submenu list-unstyled" id="catalog" data-parent="#accordionExample">
                                            {content.subs.map((sub, j) => {
                                                return (
                                                    <li className={sub + `${sub === query.subName ? " active" : ""}`} key={j}>
                                                        <a className="text-decoration-none" onClick={() => {
                                                            onRouteClick(content.name, sub)
                                                        }}>{sub}</a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Collapse>
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div >
    );
}
