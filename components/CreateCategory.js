export default function CreateCategory() {
    return (
        <div id="content" class="main-content">
            <div class="layout-px-spacing">

                <div class="row layout-spacing">

                    <div class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing offset-md-2">

                        <div class="skills layout-spacing ">
                            <div class="widget-content widget-content-area">
                                <form action="" method="post" enctype="multipart/form-data">
                                    <h3 class="">Category Registration</h3>
                                    {/* <?php require("scripts/main.php"); ?> */}

                                    <div class="row">
                                        <div class="col-lg-6 ">
                                            <div class="form-group">

                                                <input type="text" class="form-control" placeholder="Category Name" name="categoryName" value="" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">

                                                <select name="top" id="" required class='form-control'>
                                                    <option value="">Is it top category?</option>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea name="categoryDescription" placeholder="Category Description" class="form-control" id="" cols="30" rows="5"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="">Category Image</label>
                                                <input type="file" name="categoryImage" class="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary " type="submit" name="addCategory">Save Info</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* <?php require("templates/footer.php"); ?> */}
        </div>
    )
}