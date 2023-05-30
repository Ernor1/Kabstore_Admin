import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
export default function CreateProductC({ categories }) {
    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#000',
                darker: '#053e85',
            },
            neutral: {
                main: '#fff',
                contrastText: '#fff',
            },
        },
    });
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(false)
    const handleFormSubmit = async e => {
        e?.preventDefault()
        setProgress(true)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('category', category);
        try {
            const api = await fetch('http://localhost:4000/product/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: formData
            })
            const data = await api.json()
            if (data) {
                setProgress(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (


        <div id="content" class="main-content">
            <div class="layout-px-spacing">

                <div class="row layout-spacing">

                    <div class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing offset-md-2">

                        <div class="skills layout-spacing ">
                            <div class="widget-content widget-content-area">
                                <form action="" method="post" enctype="multipart/form-data" onSubmit={handleFormSubmit}>
                                    <h3 class="">Product Registration</h3>


                                    <div class="row">
                                        <div class="col-lg-12 mb-3 ">

                                            <div class="form-group">

                                                <input type="text" class="form-control" placeholder="Product Name" name="productName" value={name} required onChange={(e) => {
                                                    setName(e.target.value)
                                                }} />
                                            </div>
                                        </div>

                                        <div class="col-lg-6 mb-3">
                                            <div class="form-group">

                                                <input type="number" class="form-control" placeholder="Price [ RWF ]" name="productPrice" value={price} required onChange={(e) => {
                                                    setPrice(e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mb-3 ">
                                            <div class="form-group">

                                                <input type="number" class="form-control" placeholder="Discount Price [ RWF ]" name="discountPrice" value={discount} onChange={(e) => {
                                                    setDiscount(e.target.value)
                                                }} required />
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mb-3">
                                            <div class="form-group">

                                                <select name="categoryId" id="" required class='form-control' onChange={(e) => {
                                                    setCategory(e.target.value)
                                                }}>
                                                    <option value="">Product Category</option>
                                                    <option value="Phone">Phone</option>
                                                    {categories?.map((category, index) => {
                                                        return <option key={index} value={category.name}>{category.name}</option>
                                                    }
                                                    )
                                                    }
                                                    {/* <?php

                                                    $query = mysqli_query($connection, "SELECT * FROM  categories") or die(mysqli_error($connection));

                                                    while ($data = mysqli_fetch_assoc($query)) { ?>
                                                        <option value="<?php print $data["category_id"]; ?>"><?php print $data["category_name"]; ?></option>
                                                    <?php } ?> */}
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <textarea name="productDescription" placeholder="Product Description" value={description} class="form-control" id="" cols="30" rows="10" style={{
                                                    height: "20vh"
                                                }} onChange={(e) => {
                                                    setDescription(e.target.value)
                                                }}></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <label for="">Product Image</label>
                                                <input type="file" name="productImage" class="form-control" required onChange={(e) => {
                                                    setFile(e.target.files[0])
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary " type="submit" name="addProduct">
                                        {progress && <ThemeProvider theme={theme}>
                                            <CircularProgress className='mt-[10px]' color='neutral' size={20} />
                                        </ThemeProvider>}
                                        {!progress && "Save Product"}</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}