import { ChevronsRight, ChevronsLeft, Edit3, PlusCircle, UploadCloud } from "react-feather";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Upload, Spin, Alert, ConfigProvider, Anchor, Row, Col } from 'antd';
import ImgCrop from 'antd-img-crop';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useRouter } from 'next/router';

export default function Category({ category, products }) {

    const router = useRouter()
    const tryR = () => {
        router.replace(router.asPath)
        console.log("tryingggg");

    }


    const onRouteClick = (name, sub) => {
        router.push({
            pathname: `/createcategory`,
            query: {
                name: name,
                subName: sub
            },
        }, `/${sub.toLowerCase()}`, { shallow: true, as: router.asPath }, { scroll: false })
    }


    return (
        <div id="content" class="main-content" style={{
            marginTop: "80px"
        }}>
            <div class="container" style={{
                display: "block",
                maxWidth: "71.333%"
            }}>

                <Row class="container" style={{
                    display: "block"
                }}>
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
                                            <h4 class="">Category Details</h4>
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
                                        {products.length == 0 ? <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJ1BMVEXt7e3V1dXW1tbm5ubs7Ozg4ODc3NzS0tLw8PDo6OjZ2dnj4+Pe3t5T9WAhAAAEmklEQVR4nO2ciXKsIBBFsQUB9f+/9+EuKjPEpe2X3FOVSTJlAmdaWRpUKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8Pbnh9mr4Uza+nnSpbChTTy0M/hNfKeNeXyIshW/BReaVZ4+h8zSY3lESG008rz+a30LIqFpbYDa1huxC1qovQDHAbUuG5DF3Tl8cmORdTs/Ua9VxuzUHXaA+WnsnQD90EUa1ZPlRtChoMuRobs5w0PLiGphJ5YlgNxVnGHrgeTlOuIkdD4imtx/B+qKNhzThOLF8xJE5D+4ohT2k9MLwZGD4ADG8Ghg8Aw5uB4QPINRxqdH14J9awmyG7summ5tfqJthQO1NY21wtUrKh7zJW9mqWTLLhcPDV9INYQ6XHqhXGXaqcXEM1L2/4S2k5qYbaNfP61LXEnFRDpWhJize/MIbrEAau1E6qoV75FfZKwlqmoVYmWiWmUp1ex5VpqKIQdhdkOG9/l2EcwuDYnu4UZRrq7frihSVOgYahKm2xUzw9eBNoqJy3O8Pi9CRDoqGqhv0+UQzpbKco0bAs9iEMVOeKlGeoVWpH0bnBmzxD5VMbbuhUJQUapkJI9tR5Ks+w+bBnqnRxXqr7razMx30d8gzTu4nI1nE1O8HWfkl0SDN0TXq7lKUwyYgqqrvDw9uftq1JM9RftoP57eF09PYaYYbOpNRG6vUIXLtqrH6bPk+FGX4LYdcpLripVSJbupSjMMNvISyiwZsu5sFdOlsly1Afa8Xn6Xzw9N96geTAXJShazMMi3I4WOsmejtlIMowbws4jRmbOOA2tV1dkGFoGbMMu9O0q24VZzpSSziCDKfttV8iSGOSv9wODRKjVkGGrs7Z/G0b1w/XdDy6Cz/b8rBIQYal3U7sj6j70WhoR+12AEt02CVKMdTpWVNk0TeZ4as5SgM0R8NTIYZDnTMYL7bjjpOO8uJCDFVeCKebX1Kt7tEcQ4xhXgjH/dPJgw96DCmGuyz3MdQ1pc4nj632QRRi+HXWNNJNghvz4cPwO0Uhht9nTeMfhqp+PGCf0BBimBnC8a8/fRzNdpFKhmFuCDOoZcYwa9aUyXZFXIThrTfO0qbHeN1QL+/exKbHeN1QZc6a8tnMMV431GHWdPM9s3W07/Z1Q+XKgxXfS8RZqfcN84bcP4LW6zfvG2YOuX9EGwavk9HrhvqBEEYbNt82/LTWdIFVVuptwweuwp6l23/bUD/zHJfVbsa3Df3nmcJpltP0bcPwziNR9GJaGqUbU91LG1g9BeN9w2v3GiSR0x8+9AAQSWOap4Hhzfx6Q1eNzxdiKU1F6yFshn0ILdPjcPoUCU2GLGVOeVG2p4u5aZWK68Lw/Vkavswdt/jmFDiN7A9WNB5hSf3WhoPpFKXrd9tmCi63irA8sI3mb+f2F58xvDF/n6VIwytXCFW/2Y7zyZ6TJVv3pPpnxPGzW655Ere9a+tpqLAVp2D/BNOa1TG54+1JfMXW4JDhDeCM9r5kwL+k92d4/vNFBAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4Y/wDpoY2HBKwqLIAAAAASUVORK5CYII=" /> : <img class="rounded " src={products[0]?.pictures[0]} alt="F" />}
                                        <div class="media-body">
                                            <h4 class="media-heading">{category.name}</h4>
                                            <h4 class="media-heading">The total number of Products : {products.length}</h4>
                                            <p class="media-text"> {category.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
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
                                        <div class="col-sm-12" style={{
                                            height: "100px"
                                        }}>
                                            <a class="btn btn-outline-info btn-sm btn-rounded float-end mb-1  mr-2" style={{
                                                position: "relative",
                                                width: "60px",
                                            }} onClick={() => {
                                                onRouteClick()
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
                                                    {products?.pictures?.map((image, index) => {
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