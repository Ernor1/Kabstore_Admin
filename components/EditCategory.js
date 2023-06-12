import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { message } from 'antd'
// [
//     {
//         uid: '-1',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
// ]
export default function EditCategoryC({ category }) {
    const [name, setName] = useState(category.name)
    const [description, setDescription] = useState(category.description)
    const [isTop, setIsTop] = useState(category.isTop)

    const [progress, setProgress] = useState(false)
    const handleFormSubmit = async (e) => {
        e?.preventDefault();
        setProgress(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('isTop', isTop);


        try {
            const api = await fetch('https://kabstore-7p9q.onrender.com/category/', {
                method: 'PUT',
                body: formData,
            });
            const data = await api.json();
            if (data) {
                message.success('Category Updated Successfully', 5);
                setProgress(false);
            }
        } catch (err) {
            message.error('Something went wrong', 5);
            setProgress(false);
            console.log(err);
        }
    };

    return (


        <div id="content" class="main-content" style={{
            marginTop: "80px"
        }}>
            <div class="layout-px-spacing">

                <div class="row layout-spacing">

                    <div class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing offset-md-2">

                        <div class="skills layout-spacing ">
                            <div class="widget-content widget-content-area">

                                <form action="" method="post" enctype="multipart/form-data" onSubmit={handleFormSubmit}>
                                    <h3 class="">Update Product</h3>


                                    <div class="row">
                                        <div class="col-lg-6 mb-3 ">

                                            <div class="form-group">

                                                <input type="text" class="form-control" placeholder="Category Name" name="categoryName" value={name} required onChange={(e) => {
                                                    setName(e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mb-3">
                                            <div class="form-group">

                                                <select name="categoryId" id="" value={isTop} required class='form-control' onChange={(e) => {
                                                    setIsTop(e.target.value)
                                                }}>
                                                    <option value="">Is Top Category</option>
                                                    <option value="YES">YES</option>
                                                    <option value="NO">NO</option>
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