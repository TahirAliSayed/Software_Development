<?php
include("SessionValidator.php");
include("../Assets/Connection/Connection.php");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>RoadRescue</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta content="Free Website Template" name="keywords">
        <meta content="Free Website Template" name="description">
	
        <!-- Favicon -->
        <link href="../Assets/Templates/Main/../Assets/Templates/Main/img/favicon.ico" rel="icon">

        <!-- Google Font -->
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"> 
        
        <!-- CSS Libraries -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
        <link href="../Assets/Templates/Main/lib/flaticon/font/flaticon.css" rel="stylesheet">
        <link href="../Assets/Templates/Main/lib/animate/animate.min.css" rel="stylesheet">
        <link href="../Assets/Templates/Main/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

        <!-- Template Stylesheet -->
        <link href="../Assets/Templates/Main/css/style.css" rel="stylesheet">
        <link href="../Assets/Templates/form.css" rel="stylesheet">
        
    </head>

    <body>
        <!-- Top Bar Start -->
        <div class="top-bar">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 col-md-12">
                        <div class="logo">
                        <img src="../Assets/Templates/Main/img/download.png" alt="Logo" width=50% height=100%> 
                                <!-- <img src="../Assets/Templates/Main/img/logo.jpg" alt="Logo"> -->
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-7 d-none d-lg-block">
                        <div class="row">
                            <div class="col-4">
                                <div class="top-bar-item">
                                    <div class="usricon"><img src="../Assets/File/User/user.png" alt="user dp"></div>
                                    <div class="top-bar-text">
                                        <h3>USER</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <!-- <div class="top-bar-item">
                                    <div class="top-bar-icon">
                                        <i class="fa fa-phone-alt"></i>
                                    </div>
                                    <div class="top-bar-text">
                                        <h3>Call Us</h3>
                                        <p>+91 9876543210</p>
                                    </div>
                                </div> -->
                            </div>
                            <div class="col-4">
                                <div class="top-bar-item">
                                    
                                    <div class="top-bar-text">
                                        <h3>Hello <?php echo $_SESSION["uname"]; ?></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Top Bar End -->

        <!-- Nav Bar Start -->
        <div class="nav-bar">
            <div class="container">
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                   <!-- <a href="../Assets/Templates/Main/#" class="navbar-brand">MENU</a>-->
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto">
                              <a href="HomePage.php" class="nav-item nav-link">Home</a> 
                            <a href="SearchWorkshop.php" class="nav-item nav-link">Search</a>
                             <a href="ViewRequest.php" class="nav-item nav-link ">Request</a>
                            <a href="Complaint.php" class="nav-item nav-link ">Complaint</a>
                             <a href="Feedback.php" class="nav-item nav-link ">Feedback</a>
                           
                           <div class="nav-item dropdown" style="float:right">
                                <a href="../Assets/Templates/Main/#" class="nav-link dropdown-toggle" data-toggle="dropdown">Settings</a>
                                <div class="dropdown-menu">
                                    <a href="MyProfile.php" class="dropdown-item">Profile</a>
                                    <a href="EditProfile.php" class="dropdown-item">Edit Profile</a>
                                    <a href="ChangePassword.php" class="dropdown-item">Change Password</a>
                                </div>
                            </div>
                        </div>
                        <div class="ml-auto">
                         <a class="btn btn-custom" href="Logout.php">Logout</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Nav Bar End -->


<br><br><br><br>