import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Chart from '../components/Chart';

export default function Home() {
  return (
    <>
      <NavBar />
      <div class="main-container" id="container">

        <div class="overlay"></div>
        <div class="search-overlay"></div>
        <SideBar />


        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="row layout-top-spacing">

              <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-one">
                  <div class="widget-heading">
                    <h6 class="">Statistics</h6>
                  </div>
                  <div class="w-chart">
                    <div class="w-chart-section">
                      <div class="w-detail">
                        <p class="w-title">Orders</p>
                        <p class="w-stats">
                          {/* 
                        <?php

                        $query = mysqli_query($connection, "SELECT * FROM  orders") or die(mysqli_error($connection));
                        $count = mysqli_num_rows($query);
                        print number_format($count);
                                        ?> */}

                        </p>
                      </div>
                      <Chart size={67} color={'#e4a952'} chart={'line'} />

                    </div>

                    <div class="w-chart-section">
                      <div class="w-detail">
                        <p class="w-title">Sales</p>
                        <p class="w-stats">
                          {/* <?php

                        $query = mysqli_query($connection,"SELECT SUM(order_total) as total FROM orders, payments WHERE orders.order_id = payments.order_id AND transaction_status ='paid'");
                        $data = mysqli_fetch_assoc($query);
                        $total = $data["total"];

                        print number_format($total);
                                        
                                        ?> */}
                        </p>
                      </div>
                      <Chart size={67} chart={'line'} color={'#1b9982'} />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                <div class="widget widget-account-invoice-two">
                  <div class="widget-content">
                    <div class="account-box">
                      <div class="info">
                        <h5 class="">Products</h5>
                        <p class="inv-balance">
                          {/* <?php

                        $query = mysqli_query($connection, "SELECT * FROM  products") or die(mysqli_error($connection));
                        $count = mysqli_num_rows($query);
                        print number_format($count);
                                        ?> */}
                        </p>
                      </div>
                      <div class="acc-action">
                        <div class="">
                          <a href="addProduct.php"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg></a>
                          <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                            <line x1="1" y1="10" x2="23" y2="10"></line>
                          </svg></a>
                        </div>
                        <a href="addProduct">Details</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                <div class="widget widget-card-four">
                  <div class="widget-content">
                    <div class="w-content">
                      <div class="w-info">
                        <h6 class="value">
                          {/* <?php
                        $query = mysqli_query($connection, "SELECT * FROM  customers") or die(mysqli_error($connection));
                        $count = mysqli_num_rows($query);
                        print number_format($count);
                                        ?> */}
                        </h6>
                        <p class="">Customers</p>
                      </div>
                      <div class="" onclick="javascript:window.location='customers'">
                        <div class="w-icon">
                          <i data-feather="users"></i>
                        </div>
                      </div>
                    </div>
                    <div class="progress">
                      <div class="progress-bar bg-gradient-secondary" role="progressbar" style={{ width: "57%" }} aria-valuenow="57" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget-four">
                  <div class="widget-heading">
                    <h5 class="">Orders</h5>
                  </div>
                  <div class="widget-content">
                    <div class="vistorsBrowser">
                      <div class="browser-list">
                        <div class="w-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chrome">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="4"></circle>
                            <line x1="21.17" y1="8" x2="12" y2="8"></line>
                            <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                            <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                          </svg>
                        </div>
                        <div class="w-browser-details">
                          <div class="w-browser-info">
                            <h6>Pending</h6>
                            <p class="browser-count">-%</p>
                          </div>
                          <div class="w-browser-stats">
                            <div class="progress">
                              <div class="progress-bar bg-gradient-primary" role="progressbar" style={{ width: "65%" }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="browser-list">
                        <div class="w-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                          </svg>
                        </div>
                        <div class="w-browser-details">

                          <div class="w-browser-info">
                            <h6>Rejected</h6>
                            <p class="browser-count">-%</p>
                          </div>

                          <div class="w-browser-stats">
                            <div class="progress">
                              <div class="progress-bar bg-gradient-danger" role="progressbar" style={{ width: "35%" }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>

                        </div>

                      </div>

                      <div class="browser-list">
                        <div class="w-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        </div>
                        <div class="w-browser-details">

                          <div class="w-browser-info">
                            <h6>Approved</h6>
                            <p class="browser-count">-%</p>
                          </div>

                          <div class="w-browser-stats">
                            <div class="progress">
                              <div class="progress-bar bg-gradient-warning" role="progressbar" style={{ width: "15%" }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </div>

              <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="row widget-statistic">
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                    <div class="widget widget-one_hybrid widget-followers" onclick='javascript:window.location="#"'>
                      <div class="widget-heading">
                        <div class="w-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <p class="w-value">
                          0
                        </p>
                        <h5 class="">Pending</h5>
                      </div>
                      <div class="widget-content">
                        <Chart chart={'area'} size={160} color={'#000'} />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                    <div class="widget widget-one_hybrid widget-referral">
                      <div class="widget-heading">
                        <div class="w-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                        </div>
                        <p class="w-value">
                          0
                        </p>
                        <h5 class="">Rejected</h5>
                      </div>
                      <div class="widget-content">
                        <Chart size={160} color={'#e7515a'} chart={'area'} />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                    <div class="widget widget-one_hybrid widget-engagement">
                      <div class="widget-heading">
                        <div class="w-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <p class="w-value">
                          0
                        </p>
                        <h5 class="">Approved</h5>
                      </div>
                      <div class="widget-content">
                        <Chart size={160} chart={'area'} color={'#8dbf42'} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer-wrapper">
            <div class="footer-section f-section-1">
              <p class="">Copyright ©  2023 <a target="_blank" href="#">Kab Store</a>, All rights reserved.</p>
            </div>
            <div class="footer-section f-section-2">
              <p class="">Coded with <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></p>
            </div>
          </div>
        </div>


      </div>
    </>

  )
}
