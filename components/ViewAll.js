import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Chart from '../components/Chart';
import { useRouter } from 'next/router';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from 'react';
export default function ViewAll({ products, productHeaders }) {
    const [action, setAction] = useState(-1)
    const buttons = ["Copy", "Excel", "CSV", "PDF", "Print"]
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleAction = (id) => {
        if (id === action) {
            // Clicked on the same button, close the dropdown menu
            setAction(-1);
            setIsDropdownOpen(false);
        } else {
            setAction(id);
            setIsDropdownOpen(true);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu')) {
                // Clicked outside the dropdown menu, close it
                setAction(-1);
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const [page, setPage] = useState(1)
    const pageSize = 3
    const [start, setStart] = useState(1)
    const [displayProducts, setDisplayProducts] = useState([])

    const [end, setEnd] = useState(pageSize)
    const [price, setPrice] = useState(false)
    let pageCount = Math.ceil(products?.length / pageSize)
    useEffect(() => {
        pageCount = Math.ceil(products?.length / pageSize)
    }, [products])
    console.log(pageCount);
    useEffect(() => {
        const firstPageIndex = (page - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        if (lastPageIndex < products?.length) {
            setStart(firstPageIndex + 1)
            setEnd(lastPageIndex)
            console.log("was here", lastPageIndex);
        }
        else {
            setStart(firstPageIndex + 1)
            setEnd(firstPageIndex + 1)
            console.log("was last bbbrr", firstPageIndex + 1);
        }
        return setDisplayProducts(products?.slice(firstPageIndex, lastPageIndex));

    }, [page])
    console.log('cp', displayProducts);
    const handlePagination = (event, page1) => {
        setPage(page1)
    }
    return (
        <div id="content" class="main-content">
            <div class="layout-px-spacing">

                <div class="row layout-top-spacing" id="cancel-row">

                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        {/* <?php require("scripts/main.php"); ?> */}
                        <div class="widget-content widget-content-area br-6">
                            <div className='db-buttons col-md-6 col-xl-12 row gap-4 '>
                                {buttons.map((button, index) => {
                                    return <button className='dt-button buttons-html5 w-[20%] btn bg-black' style={{
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        width: "100px",
                                        height: "10%"

                                    }}>{button}</button>
                                })}

                            </div>

                            <div class="table-responsive mb-4 mt-4">
                                <table id="zero-config" class="table table-hover non-hover" style={{
                                    width: "100%"
                                }}>
                                    <thead>
                                        <tr>
                                            <th width="30">No</th>
                                            {productHeaders?.map((header) => {
                                                return <th>{header}</th>
                                            })}

                                            <th width="50">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((product, id) => {
                                            return <tr>
                                                <td>{id + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    {product.discount}
                                                </td>
                                                <td>{product.category}</td>
                                                <td>{product.status}</td>
                                                <td>

                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                                            handleAction(id)
                                                        }}>Action</button>
                                                        <button type="button" class="btn btn-default btn-sm dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference<?php print($no) ?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                        </button>
                                                        <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} style={{ left: '-54%', top: '-6%' }}>
                                                            <a className="dropdown-item" href="#">Edit</a>
                                                            <a className="dropdown-item text-danger" href="?deleteCategory=">Delete</a>
                                                        </div>

                                                    </div>
                                                </td>
                                            </tr>

                                        })}

                                        {/* <?php

                                    $query = mysqli_query($connection, "SELECT * FROM  categories") or die(mysqli_error($connection));
                                    $no = 0;
                                    while ($data = mysqli_fetch_assoc($query)) {
                                        $no++; ?>

                                <?php } ?> */}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th width="30">No</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th width="50">Action</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className='row  col-md-5'>
                                    <Pagination color='primary' count={pageCount} variant="outlined" onChange={handlePagination} shape="circular" />
                                </div>

                            </div>
                        </div>

                        <a href="addCategory" class="btn btn-primary btn-rounded btn-floated"><i data-feather="plus-circle"></i></a>
                    </div>

                </div>

            </div>
            {/* <?php require("templates/footer.php"); ?> */}
            {/* </Footer> */}
        </div>
    )
}