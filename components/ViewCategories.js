import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from './NavBar'
import SideBar from './SideBar'
import Chart from './Chart';
import { useRouter } from 'next/router';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PlusCircle } from 'react-feather';
import Link from 'next/link';
import { message } from 'antd';
import { set } from 'nprogress';
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
export default function ViewCategories({ products, categoryHeaders, categories }) {
    const router = useRouter()
    const [action, setAction] = useState(-1)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [data, setData] = useState(categories)
    useEffect(() => {
        setData(categories)
    }, [categories])
    const onRouteClick = (name, sub) => {
        router.push({
            pathname: `/createcategory`,
            query: {
                name: name,
                subName: sub
            },
        }, `/${sub.toLowerCase()}`, { shallow: true, as: router.asPath }, { scroll: false })
    }
    const onDetailClick = (id, name, sub) => {
        router.push({
            pathname: `/category/${id}`,
            query: {
                name: name,
                subName: sub
            },
        }, `/category/${id}`, { shallow: true, as: router.asPath }, { scroll: false })
    }
    const onEditClick = (id, name, sub) => {
        router.push({
            pathname: `/editcategory/${id}`,
            query: {
                name: name,
                subName: sub
            },
        }, `/editcategory/${id}`, { shallow: true, as: router.asPath }, { scroll: false })
    }
    const onDeleteClick = async (id) => {
        try {
            message.loading("Deleting category", 2.5);

            // Introduce a delay of 2 seconds before the delete action
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("id", id);

            const api = await fetch('https://kabstore-7p9q.onrender.com/category/' + id, {
                method: 'DELETE',
            });
            const data = await api.json();
            if (data) {
                console.log(data);
                message.success("Category deleted successfully")
                refreshData()


            }
        } catch (err) {
            console.log("error from categories", err);
            message.error(err);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToRoute = (route) => {
        router.push(`/${route}`)
    }
    const buttons = ["Copy", "Excel", "CSV", "PDF", "Print"]
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleAction = (id) => {
        if (id === action) {
            setAction(-1);
        } else {
            setAction(id);
        }
    };

    const [page, setPage] = useState(1)
    const pageSize = 8
    const [start, setStart] = useState(1)
    const [displayCategories, setDisplayCategories] = useState([])

    const [end, setEnd] = useState(pageSize)
    let pageCount = Math.ceil(data?.length / pageSize)
    useEffect(() => {
        pageCount = Math.ceil(data?.length / pageSize)
    }, [data])
    console.log(pageCount);
    useEffect(() => {
        const firstPageIndex = (page - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        if (lastPageIndex < data?.length) {
            setStart(firstPageIndex + 1)
            setEnd(lastPageIndex)
            console.log("was here", lastPageIndex);
        }
        else {
            setStart(firstPageIndex + 1)
            setEnd(data?.length)
            console.log("was last bbbrr", firstPageIndex + 1);
        }
        return setDisplayCategories(data?.slice(firstPageIndex, lastPageIndex));

    }, [page, data])
    // console.log('cp', displayCategories);
    const handlePagination = (event, page1) => {
        setPage(page1)
    }


    return (
        <div id="content" class="main-content mt-16" style={{
            marginTop: "80px"
        }}>
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
                                            {categoryHeaders?.map((header) => {
                                                return <th>{header}</th>
                                            })}

                                            <th width="50">Action</th>
                                            <th width="50">Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayCategories?.map((category, id) => {

                                            return <tr>
                                                <td>{id + start}</td>
                                                <td>{category.name}</td>
                                                <td>{products.filter(
                                                    product => {
                                                        return (

                                                            product
                                                                .category
                                                                .toLowerCase()
                                                                .includes(category.name.toLowerCase())
                                                        );
                                                    }
                                                ).length}</td>
                                                <td>
                                                    {category.isTop}
                                                </td>
                                                <td>

                                                    <div>
                                                        <Button
                                                            id="demo-customized-button"
                                                            aria-controls={open ? 'demo-customized-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            variant="contained"
                                                            disableElevation
                                                            onClick={handleClick}
                                                            endIcon={<KeyboardArrowDownIcon />}
                                                        >
                                                            Options
                                                        </Button>
                                                        <StyledMenu
                                                            id="demo-customized-menu"
                                                            MenuListProps={{
                                                                'aria-labelledby': 'demo-customized-button',
                                                            }}
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                        >
                                                            <MenuItem onClick={() => {
                                                                handleClose()
                                                                onEditClick(category._id, "Catalog", "Categories")

                                                            }} disableRipple>
                                                                <EditIcon />
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={() => {
                                                                handleClose()
                                                                onDetailClick(category._id, "Catalog", "Categories")
                                                            }} disableRipple>
                                                                <FileCopyIcon />
                                                                Details
                                                            </MenuItem>
                                                        </StyledMenu>
                                                    </div>
                                                </td>
                                                <td><Button onClick={() => {
                                                    onDeleteClick(category._id)
                                                }} >Delete</Button></td>
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
                                            {categoryHeaders?.map((header) => {
                                                return <th>{header}</th>
                                            })}

                                            <th width="50">Action</th>
                                            <th width="50">Delete</th>

                                        </tr>
                                    </tfoot>
                                </table>
                                <div className='row  col-md-5' style={{
                                    flexWrap: "nowrap",
                                    gap: "30%"
                                }}>
                                    <div className='' style={{
                                        border: "1px solid rgb(0, 0, 0)",
                                        borderRadius: "5px",
                                        display: "flex",
                                        alignItems: "center",
                                        marginLeft: "57px",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        width: "200px"
                                        // paddingLeft: "35px",
                                    }}><span>{`Showing products ${start}–${end}`}</span></div>
                                    <Pagination color='primary' count={pageCount} variant="outlined" onChange={handlePagination} shape="circular" />
                                </div>

                            </div>
                        </div>

                        <a class="btn btn-primary btn-rounded btn-floated" onClick={() => {
                            onRouteClick("Catalog", "Categories")
                        }}><PlusCircle /></a>
                    </div>

                </div>

            </div>
            {/* <?php require("templates/footer.php"); ?> */}
            {/* </Footer> */}
        </div >
    )
}