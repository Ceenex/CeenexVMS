﻿var dataToSend = '';
var gblTableId;

ShowLoader = function () {
    $('.loader-div').show();
}

HideLoader = function () {
    $('.loader-div').hide();
}

ApplyCustomBinding = function (elementName) {
    ShowLoader();
    switch (elementName) {

        //Administration module  
        case 'organization':
            BindingViewModel("/Administration/_Organization", OrganizationViewModel());
            break;
        case 'myorganization':
            BindingViewModel("/Administration/_MyOrganization", MyOrganizationViewModel());
            break;
        case 'buildings':
            BindingViewModel("/Administration/_Building", BuildingViewModel());
            break;
        case 'gates':
            BindingViewModel("/Administration/_Gates", GatesViewModel());
            break;
        case 'newuser':
            BindingViewModel("/Administration/_Users", UsersViewModel());
            break;
        case 'newshiftcreate':
            BindingViewModel("/Administration/_Shifts", ShiftViewModel());
            break;
        case 'shiftassignment':
            BindingViewModel("/Administration/_ShiftAssignment", ShiftAssignmentViewModel());
            break;
        case 'shiftmanagement':
            BindingViewModel("/Administration/_ShiftManagement", ShiftManagementViewModel());
            break;

        case 'shiftmanagementdynamic':
            BindingViewModel("/Administration/_ShiftManagement_dynamic", ShiftManagementdynamicViewModell());
            break;
        case 'myprofile':
            BindingViewModel("/Administration/_Myprofile", MyProfileViewModel());
            break;
        case 'changepassword':
            BindingViewModel("/Administration/_ChangePassword", ChangePasswordViewModel());
            break;
        case 'themeSelection':
            BindingViewModel("/Administration/_ThemeSelection", ThemeSelectionViewModel());
            break;
            //Visitor module  
        case 'scanvisitor':
            BindingViewModel("/Visitor/_ScanVisitor", ScanVisitorViewModel());
            break;

        case 'managevisitor_with_param':
            var scanVisitorViewModel = ScanVisitorViewModel();
            BindingViewModel("/Visitor/_ManageVisitorManually", VisitorViewModel(scanVisitorViewModel.split('&&')[0], scanVisitorViewModel.split('&&')[1], scanVisitorViewModel.split('&&')[2], scanVisitorViewModel.split('&&')[3], scanVisitorViewModel.split('&&')[4], scanVisitorViewModel.split('&&')[5], scanVisitorViewModel.split('&&')[6], scanVisitorViewModel.split('&&')[7], scanVisitorViewModel.split('&&')[8], scanVisitorViewModel.split('&&')[9], scanVisitorViewModel.split('&&')[10]));
            break;
        case 'managevisitor':
            BindingViewModel("/Visitor/_ManageVisitorManually", VisitorViewModel());
            break;
        case 'visitorcheckin':
            BindingViewModel("/Visitor/_VisitorCheckIn", VisitorCheckInViewModel());
            break;
        case 'visitorcheckout':
            BindingViewModel("/Visitor/_VisitorCheckout", VisitorCheckOutViewModel());
            break;
            //Report module  
        case 'visitordetailsreport':
            BindingViewModel("/Report/_VisitorDetailsReport", VisitorDetailsViewModel());
            break;
        case 'shiftdetailsreport':
            BindingViewModel("/Report/_ShiftDetailsReport", ShiftDetailsViewModel());
            break;
        case 'dashboard':
            BindingViewModel("../Dashboard/_Dashboard", DashboardViewModel());
            break;

        default:
    }
}

BindingViewModel = function (controllerUrl, viewModel) {
    // 
    $('#content').load(controllerUrl, function () {
        ko.cleanNode($('#content')[0]);
        ko.applyBindings(viewModel, $('#content')[0]);
        HideLoader();
        DashboardBindEvent();

        if (controllerUrl == "/Visitor/_ManageVisitorManually") {
            $('#dateDOB').datepicker({

                dateFormat: 'dd/mm/yy',
                maxDate: 'now',
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0"

            });
        }
        if (controllerUrl == "/Visitor/_VisitorCheckIn") {
            BindAutoCompleteEventCheckin();
        }
        if (controllerUrl == "/Visitor/_VisitorCheckout") {
            BindAutoCompleteEventCheckout();
        }
        if (controllerUrl == "/Administration/_ShiftAssignment") {
            $("#dateFrom").keypress(function (event) { event.preventDefault(); });
            $('#dateFrom').datepicker({
                dateFormat: 'dd/mm/yy',
                minDate: 'now',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                    $('#dateTo').datepicker('option', 'minDate', date);
                }


            });

        }
        if (controllerUrl == "/Administration/_ShiftAssignment") {
            $("#dateTo").keypress(function (event) { event.preventDefault(); });
            $('#dateTo').datepicker({
                dateFormat: 'dd/mm/yy',
                minDate: 'now',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                    $('#dateFrom').datepicker('option', 'maxDate', date);
                }


            });
        }
        if (controllerUrl == "/Report/_VisitorDetailsReport") {
            $("#dateFromCheckIn").keypress(function (event) { event.preventDefault(); });
            $("#dateFromCheckIn").datepicker({
                dateFormat: 'dd/mm/yy',
                maxDate: 'now',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                    $("#dateToCheckOut").datepicker('option', 'minDate', date)
                }

            });
        }
        if (controllerUrl == "/Report/_VisitorDetailsReport") {
            $("#dateToCheckOut").keypress(function (event) { event.preventDefault(); });
            $("#dateToCheckOut").datepicker({
                dateFormat: 'dd/mm/yy',
                maxDate: 'now',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                    $("#dateFromCheckIn").datepicker('option', 'maxDate', date)
                }

            });

        }
        if (controllerUrl == "/Report/_ShiftDetailsReport") {
            $("#txtToDate").keypress(function (event) { event.preventDefault(); })
            $("#txtToDate").datepicker({
                dateFormat: 'dd/mm/yy',
                //minDate: 'now',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                    $("#txtFromDate").datepicker('option', 'maxDate', date)
                }

            });

        }

        if (controllerUrl == "/Report/_ShiftDetailsReport") {
            $("#txtFromDate").keypress(function (event) { event.preventDefault(); })
            $("#txtFromDate").datepicker({
                dateFormat: 'dd/mm/yy',
                //maxDate: 'now',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                    $("#txtToDate").datepicker('option', 'minDate', date)
                }

            });

        }

        if (controllerUrl == "/Administration/_Shifts") {
            $(".timepickerCtr").keypress(function (event) { event.preventDefault(); });
            $('.timepickerCtr').timepicker();
        }

        if (controllerUrl == "/Administration/_ShiftManagement") {
            $('#txtShiftDate').datepicker();


            $('.shiftCell').click(function () {
                gblTableId = $(this).attr('id');
                $('#myModal').modal('show');
            });
        }

        if (controllerUrl == "/Administration/_ShiftManagement_dynamic") {
            $('#txtShiftDate').datepicker({
                dateFormat: 'dd/mm/yy',
                //minDate: 'now',
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                }
            });


            $('.shiftCell').click(function () {
                gblTableId = $(this).attr('id');
                $('#myModal').modal('show');
            });
        }
    });
}

DashboardBindEvent = function () {
    $('#lnkVisitorCheckIn').unbind('click').bind('click', function () {
        ApplyCustomBinding('visitorcheckin');
    });

    $('#lnkTotalVisitor').unbind('click').bind('click', function () {
        ApplyCustomBinding('managevisitor_with_param');
    });

    $('#lnkBuilding').click(function () {
        ApplyCustomBinding('buildings');
    });

    $('#lnkGates').click(function () {
        ApplyCustomBinding('gates');

    });

    //$('#btnCompleteRegister').click(function () {
    //    ApplyCustomBinding('managevisitor');
    //});

}

