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
export default function ViewAll({ products, productHeaders }) {
    const router = useRouter()
    const [action, setAction] = useState(-1)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
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
                                                                goToRoute("createproduct")

                                                            }} disableRipple>
                                                                <EditIcon />
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={handleClose} disableRipple>
                                                                <FileCopyIcon />
                                                                Details
                                                            </MenuItem>
                                                            <Divider sx={{ my: 0.5 }} />
                                                            <MenuItem onClick={handleClose} disableRipple>
                                                                <ArchiveIcon />
                                                                Delete
                                                            </MenuItem>
                                                            <MenuItem onClick={handleClose} disableRipple>
                                                                <MoreHorizIcon />
                                                                More
                                                            </MenuItem>
                                                        </StyledMenu>
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