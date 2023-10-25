import { ChevronsRight, ChevronsLeft, Edit3, PlusCircle, UploadCloud } from "react-feather";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Upload, Spin, Alert, ConfigProvider, Anchor, Row, Col } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { message, Button, FloatButton, Modal, Image } from 'antd'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useRouter } from 'next/router';

export default function Product({ product, isInitialLoaded }) {
    const [showField, setShowField] = useState(false);
    const [progress, setProgress] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [colorImageVisible, setColorImageVisible] = useState(false);
    const [colorImageSrc, setColorImageSrc] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (isInitialLoaded && typeof window !== 'undefined') {
            const hasPageReloaded = sessionStorage.getItem('hasPageReloaded');

            if (!hasPageReloaded) {
                sessionStorage.setItem('hasPageReloaded', 'true');


                router.push(router.asPath);
            }
        }
    }, [router, isInitialLoaded]);





    const showColorImage = (color, image) => {
        setSelectedColor(color);
        setColorImageSrc(image);
        setColorImageVisible(true);
    };
    console.log(product.pictures);
    let picArr = []
    if (product.pictures?.length > 0) {
        picArr = product.pictures.map((picture) => {
            return ({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: picture
            })
        })
    }

    const [fileList, setFileList] = useState(picArr)



        ;
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log("This is the added file", newFileList);
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
    const showFieldHandler = () => {
        setShowField(true);
    }
    const submitImages = async (e) => {
        e?.preventDefault();
        setProgress(true);

        const formData = new FormData();
        console.log("This is the file list", fileList);
        if (fileList.length > 0) {
            console.log(fileList.length);
            fileList.forEach((file, index) => {
                formData.append(`image${index}`, file.originFileObj);
            });



            try {
                const api = await fetch('http://localhost:4000/product/imgs/' + product._id, {
                    method: 'PUT',
                    body: formData,
                });
                const data = await api.json();
                if (data) {
                    message.success("Images Uploaded Successfully")
                    setProgress(false);
                }
            } catch (err) {
                setProgress(false);
                message.error("Error Uploading Images")
                console.log(err);
            }
        }
        else {
            message.error("Please Select Images")
            setProgress(false);

        }


    }


    return (

        <div id="content" class="main-content" style={{
            marginTop: "80px"
        }}>
            <div class="container">

                <Row class="container">
                    <Col >
                        <div id="navSection" data-spy="affix" class="nav  sidenav text-decoration-none">
                            <Anchor className="text-decoration-none"
                                items={[
                                    {
                                        key: 'part-1',
                                        href: '#part-1',
                                        title: 'Info',
                                    },
                                    {
                                        key: 'part-2',
                                        href: '#part-2',
                                        title: 'Images',
                                    },
                                ]}
                            />
                        </div>
                    </Col>



                    <Col class="row layout-top-spacing">
                        <div id="part-1" class="col-lg-12 layout-spacing">
                            <div class="statbox widget box box-shadow " style={{
                                marginTop: "25px"
                            }}>
                                <div class="widget-header">
                                    <div class="row">
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                            <h4 class="">Product Details</h4>
                                            <a href="?addImage&id=" class="btn btn-outline-info btn-rounded float-end mt-n4 mr-4" style={{
                                                width: "60px"
                                            }}><Edit3 /></a>

                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content " style={{
                                    padding: "10px 20px"
                                }}>

                                    <div class="media d-flex align-items-start">
                                        <img class="rounded " src={product.pictures[0]} alt="F" />
                                        <div class="media-body">
                                            <h4 class="media-heading">{product.name}</h4>
                                            <p class="media-text"> {product.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {true && <div id="product_images" class="col-lg-12 col-md-12 layout-spacing">
                            {success && <Alert className='mt-2 mb-3' message="Images Added" type="success" style={{
                                width: "130px",

                            }} />}
                            {error && <Alert className='mt-2 mb-3' message={message} type="error" style={{
                                width: "130px",

                            }} />}
                            <div class="statbox widget box box-shadow">
                                <div class="widget-header">
                                    <div class="row">
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                            <h4>Add image</h4>

                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content " style={{
                                    padding: "10px 20px"
                                }}>

                                    <div class="row">

                                        <div class="col-md-10">
                                            <div class="form-group">
                                                <ImgCrop rotationSlider>
                                                    <Upload
                                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                        listType="picture-card"
                                                        fileList={fileList}
                                                        onChange={onChange}
                                                        onPreview={onPreview}
                                                    >
                                                        {fileList.length < 5 && '+ Upload'}
                                                    </Upload>
                                                </ImgCrop>
                                            </div>
                                        </div>

                                        <div class="col-md-2">
                                            <button class="btn btn-add btn-outline-primary btn-rounded  mt-1 " type="submit" name="addProductImage" style={{
                                                width: "60px"
                                            }} onClick={(e) => {
                                                submitImages(e);
                                            }}>{progress ? <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorPrimary: '#000',
                                                    },
                                                }}
                                            >
                                                <Spin />
                                            </ConfigProvider> : <UploadCloud />}</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>}
                        <div id="part-2" class="col-lg-12 col-md-12 layout-spacing">
                            <div class="statbox widget box box-shadow">
                                <div class="widget-header">
                                    <div class="row" >
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                            <h4>Images</h4>

                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content " style={{
                                    padding: "10px 20px"
                                }}>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <a class="btn btn-outline-info btn-sm btn-rounded float-end mb-1  mr-2" style={{
                                                top: "-50px",
                                                position: "relative",
                                                width: "60px",
                                            }} onClick={() => {
                                                showFieldHandler()
                                            }}><PlusCircle /></a>

                                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                                <ol class="carousel-indicators">
                                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active m"></li>
                                                </ol>
                                                <Swiper
                                                    spaceBetween={30}
                                                    centeredSlides={true}
                                                    autoplay={{
                                                        delay: 2500,
                                                        disableOnInteraction: false,
                                                    }}
                                                    navigation={{
                                                        nextEl: '.review-swiper-button-next',
                                                        prevEl: '.review-swiper-button-prev',
                                                    }}
                                                    modules={[Autoplay, Pagination, Navigation]}
                                                    onAutoplayTimeLeft={5}
                                                    className="mySwiper carousel-inner swip"
                                                >
                                                    {product.pictures?.map((image, index) => {
                                                        return <SwiperSlide class="carousel-item active">
                                                            <img class="d-block w-100" src={image} alt="F" />
                                                        </SwiperSlide>
                                                    })}
                                                </Swiper>
                                                <a class="carousel-control-prev" role="button" data-slide="prev">
                                                    <ChevronsLeft class="carousel-control-prev-icon review-swiper-button-prev" aria-hidden="true" />
                                                </a>
                                                <a class="carousel-control-next" role="button" data-slide="next">
                                                    <ChevronsRight class="carousel-control-next-icon review-swiper-button-next" aria-hidden="true" />

                                                </a>


                                            </div>
                                            <div class="row mt-4" >
                                                <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                                    <h4>Colors</h4>
                                                    <div className="d-flex gap-4 mt-3">
                                                        {
                                                            product.colors.map((c, i) => {

                                                                return <Button style={{
                                                                    backgroundColor: `${c}`,

                                                                }} onClick={() => showColorImage(c, product.imageColors[i])} />
                                                            })
                                                        }
                                                        <Button style={{
                                                            backgroundColor: 'green',
                                                        }} />
                                                    </div>
                                                    <Modal
                                                        title="Color Product"
                                                        open={colorImageVisible}
                                                        onCancel={() => setColorImageVisible(false)}
                                                        footer={null}
                                                    >
                                                        <Image width="100%" src={colorImageSrc} />
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div >
        </div >
    )

}