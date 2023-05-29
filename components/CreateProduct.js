export default function CreateProduct() {
    return (


        <div id="content" class="main-content">
            <div class="layout-px-spacing">

                <div class="row layout-spacing">

                    <div class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing offset-md-2">

                        <div class="skills layout-spacing ">
                            <div class="widget-content widget-content-area">
                                <form action="" method="post" enctype="multipart/form-data">
                                    <h3 class="">Product Registration</h3>


                                    <div class="row">
                                        <div class="col-lg-12 ">
                                            <div class="form-group">

                                                <input type="text" class="form-control" placeholder="Product Name" name="productName" value="" required />
                                            </div>
                                        </div>

                                        <div class="col-lg-6 ">
                                            <div class="form-group">

                                                <input type="number" class="form-control" placeholder="Price [ RWF ]" name="productPrice" value="" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 ">
                                            <div class="form-group">

                                                <input type="number" class="form-control" placeholder="Discount Price [ RWF ]" name="discountPrice" value="" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">

                                                <select name="categoryId" id="" required class='form-control'>
                                                    <option value="">Product Category</option>
                                                    {/* <?php

                                                    $query = mysqli_query($connection, "SELECT * FROM  categories") or die(mysqli_error($connection));

                                                    while ($data = mysqli_fetch_assoc($query)) { ?>
                                                        <option value="<?php print $data["category_id"]; ?>"><?php print $data["category_name"]; ?></option>
                                                    <?php } ?> */}
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea name="productDescription" placeholder="Product Description" class="form-control" id="" cols="30" rows="5"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="">Product Image</label>
                                                <input type="file" name="productImage" class="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary " type="submit" name="addProduct">Save Info</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}