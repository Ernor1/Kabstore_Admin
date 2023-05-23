import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faCube, faLayerGroup, faTableLayout, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Collapse } from "react-bootstrap";

export default function SideBar() {
    const sideContent = [
        {
            name: "Catalog",
            icon: <FontAwesomeIcon icon={faLayerGroup} />,
            subs: ["Categories", "Products"]
        },
        {
            name: "Design",
            icon: <FontAwesomeIcon icon={faTrello} />,
            subs: ["Banners", "Slides"]
        },
        {
            name: "Sales",
            icon: <FontAwesomeIcon icon={faCube} />,
            subs: ["Orders", "Payments"]
        },
        {
            name: "Customers",
            icon: <FontAwesomeIcon icon={faUsers} />,
            subs: ["Add New", "Report"]
        }
    ];

    const [active, setActive] = useState(-1);

    const handleClick = (id) => {
        setActive((prevActive) => (prevActive === id ? -1 : id));
    };

    return (
        <div className="sidebar-wrapper sidebar-theme">
            <nav id="sidebar">
                <ul className="navbar-nav theme-brand flex-row text-center">
                    <li className="nav-item theme-logo">
                        <a href="dashboard">
                            <img src="assets/img/favicon.png" className="navbar-logo" alt="logo" />
                        </a>
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
                <ul className="list-unstyled menu-categories" id="accordionExample">
                    <li className="menu dashboard">
                        <a href="dashboard" aria-expanded="false" className="dropdown-toggle">
                            <div>
                                <FontAwesomeIcon icon={faTrello} />
                                <span>Dashboard</span>
                            </div>
                        </a>
                    </li>
                    {sideContent.map((content, i) => {
                        console.log(content.name);
                        return (
                            <li key={i} className="menu catalog" onClick={() => handleClick(i)}>
                                <a
                                    href="#catalog"
                                    data-toggle="collapse"
                                    aria-expanded={active === i ? "true" : "false"}
                                    className="dropdown-toggle collapsed"
                                >
                                    <div>
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
                                    <Collapse in={active === i}>
                                        <ul className="submenu list-unstyled" id="catalog" data-parent="#accordionExample">
                                            {content.subs.map((sub, j) => {
                                                return (
                                                    <li className={sub} key={j}>
                                                        <a href={sub}>{sub}</a>
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
        </div>
    );
}
