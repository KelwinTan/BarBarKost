<!doctype html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link href="https://cdnjs.cloudfare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput.css" media="all" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudfare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" media="all" type="text/css">
    <style type="text/css">
        .main-section{
            margin: 0 auto;
            padding: 20px;
            margin-top: 100px;
            background-color: #fff;
            box-shadow: 0px 0px 20px #c1c1c1;
        }

    </style>
</head>
<body class="bg-info">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-11 main-section">
                <h1>Upload Multiple Images</h1>
                <input type="hidden" name="_token" value="{{csrf_token()}}">
                <div class="form-group">
                    <input type="file" id="file-1" name="file" multiple class="file" data-overwrite-initial="false" data-min-file-count="2">
                </div>
            </div>
        </div>
    </div>



    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudfare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/fileinput.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudfare.com/ajax/libs/bootstrap-fileinput/4.4.7/themes/fa/theme.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudfare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" type="text/javascript"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" type="text/javascript"></script>

</body>
</html>