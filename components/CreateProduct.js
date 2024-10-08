import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { message, ColorPicker, FloatButton, Button } from 'antd'
import { DeleteFilled, DownloadOutlined } from '@ant-design/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add'
// [
//     {
//         uid: '-1',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
// ]
export default function CreateProductC({ categories }) {
    const [fileList, setFileList] = useState([]);
    const [color, setColor] = useState('')
    const [colorImg, setColorImg] = useState([])
    const [colors, setColors] = useState([])
    const [index, setIndex] = useState(0)
    const cols = []
    // useEffect(() => {
    //     cols.push(color)
    //     setColors(cols)
    //     console.log(cols);
    // }, [color, cols])

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
    const addColor = () => {
        if (color.trim() !== '') {
            if (colorImg.length > colors.length) {
                setColors([...colors, color]);
                setColor('');
                console.log(colors);
            } else {
                message.error("Please add an image before adding another color.")
                console.error("Please add an image before adding another color.");
            }
        }
    }
    const deleteColor = () => {
        const newColors = [...colors];
        newColors.pop()
        setColors(newColors);
        const newImages = [...colorImg]
        newImages.pop()
        setColorImg(newImages)
        console.log(colorImg);
    };
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log("This is the added file", newFileList);

    };
    const onImageChange = ({ fileList: newFileList }) => {
        setColorImg(newFileList);
        console.log("This is the added file", newFileList);
    }
    const beforeUpload = (file) => {
        if (colors.length === colorImg.length) {
            return true;
        } else {
            message.error("Number of colors and images must be equal");
            return false;
        }
    };

    const onPreview = async (file) => {
        let src = file.url
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const refreshData = () => {
        router.replace(router.asPath);
        setIsRefreshing(true);
    };

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [progress, setProgress] = useState(false)
    const [status, setStatus] = useState('')
    const handleFormSubmit = async (e) => {
        e?.preventDefault();
        setProgress(true);
        console.log("consoling array", JSON.stringify(colors));


        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('discount', `${(parseInt(discount) / parseInt(price)) * 100}%`);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('status', status);
        formData.append('colors', JSON.stringify(colors)); // Convert colors array to a string 

        // Append the image file to the form data
        if (fileList.length > 0) {
            fileList.forEach((file, index) => {
                formData.append(`image${index}`, file.originFileObj);
            });
        } else {
            message.error("No pictures");
        }
        if (colorImg.length > 0) {
            colorImg.forEach((file, index) => {
                formData.append(`colorImg${index}`, file.originFileObj);
            });
        }

        try {
            const api = await fetch('https://kabstore-7p9q.onrender.com/product', {
                method: 'POST',
                body: formData,
            });
            const data = await api.json();
            if (data) {
                message.success('Product created successfully', 5);
                setProgress(false);
            }
        } catch (err) {
            message.error('Something went wrong', 5);
            setProgress(false);
            console.log("The pro error", err);
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
                                        <div class="col-lg-6 mb-3">
                                            <div class="form-group">

                                                <input type="number" class="form-control" placeholder="Discount [ RWF ]" name="productPrice" value={discount} required onChange={(e) => {
                                                    setDiscount(e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mb-3 ">
                                            <div class="form-group">
                                                <select name="categoryId" id="" required class='form-control' onChange={(e) => {
                                                    setStatus(e.target.value)
                                                }}>
                                                    <option value="">Product Status</option>
                                                    <option value="AVAILABLE">AVAILABLE</option>
                                                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                                                    <option value="OUT OF STOCK">OUT OF STOCK</option>
                                                    <option value="COMING SOON">COMING SOON</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mb-3">
                                            <div class="form-group">

                                                <select name="categoryId" id="" required class='form-control' onChange={(e) => {
                                                    setCategory(e.target.value)
                                                }}>
                                                    <option value="">Product Category</option>
                                                    {categories?.map((category, index) => {
                                                        return <option key={index} value={category.name}>{category.name}</option>
                                                    }
                                                    )
                                                    }
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
                                                <ImgCrop rotationSlider>
                                                    <Upload
                                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                        listType="picture-card"
                                                        fileList={fileList}
                                                        onChange={onChange}
                                                        onPreview={onPreview}
                                                    >
                                                        {fileList.length < 10 && '+ Upload'}
                                                    </Upload>
                                                </ImgCrop>
                                                {/* <input type="file" name="productImage" class="form-control" required onChange={(e) => {
                                                    setPicture(e.target.files[0])
                                                }} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="statbox widget box box-shadow mb-5  ">
                                        <div class="widget-header">
                                            <div class="row">
                                                <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                                    <h4>Product colors</h4>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="widget-content " style={{
                                            padding: "10px 20px"
                                        }}>

                                            <div class="row">
                                                <div class="col-md-6 col-6">
                                                    <div class="form-group">
                                                        <ImgCrop rotationSlider>
                                                            <Upload
                                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                listType="picture-card"
                                                                fileList={colorImg}
                                                                onChange={onImageChange}
                                                                onPreview={onPreview}
                                                                beforeUpload={beforeUpload}
                                                            >
                                                                {colorImg.length < 5 && '+ Upload'}
                                                            </Upload>
                                                        </ImgCrop>
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <h5>Choose color</h5>
                                                    <div class="col-5 col-md-11 col-sm-12 mb-1">
                                                        <div class="form-group">

                                                            <input type="text" class="form-control" placeholder="ProductColor" name="productPrice" value={color} onChange={(e) => {
                                                                setColor(e.target.value)
                                                            }} />
                                                        </div>
                                                        <IconButton onClick={() => {
                                                            addColor(color)
                                                        }} aria-label="delete" color='primary'>
                                                            <AddIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => {
                                                            deleteColor(index)
                                                        }} color='error' aria-label="delete">
                                                            <DeleteIcon />
                                                        </IconButton>

                                                        <div className="d-flex gap-4 mt-3">
                                                            {
                                                                colors?.map((c) => {
                                                                    console.log("From color display", color);
                                                                    return <Button style={{
                                                                        backgroundColor: `${c}`,
                                                                    }} />

                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>





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