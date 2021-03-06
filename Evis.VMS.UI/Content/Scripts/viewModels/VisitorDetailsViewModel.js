﻿function VisitorDetailsViewModel() {
    var self = this;
    var gateId = 0;
    var securityId = '';
    self.BuildingId = ko.observable(undefined); //.extend({ required: false });
    self.SecurityId = ko.observable(undefined); // .extend({ required: false });
    self.GateId = ko.observable(undefined);//.extend({ required: false });
    self.VisitorName = ko.observable('');//.extend({ required: false });
    self.CheckIn = ko.observable('');//.extend({ required: false });
    self.CheckOut = ko.observable('');//.extend({ required: false });

    self.DataGrid = new RIT.eW.DataGridAjax('/Api/VisitorsDetails/GetVisitorsDetails', 7);

    self.SearchVisitorsDetails = function () {
        self.DataGrid.UpdateSearchParam('?search=' + JSON.stringify(new Object()));
        self.DataGrid.GetData();
    }

    self.SearchVisitorsDetails();

    // To get all buildings.
    self.Buildings = ko.observableArray();

    AjaxCall('/Api/Gates/GetAllBuilding', null, 'GET', function (data) {
        self.Buildings(data);
    });

    // To get all building's gates.
    self.Gates = ko.observableArray();

    self.GetGates = function () {
        if (self.BuildingId() != undefined && self.BuildingId() != 0) {
            AjaxCall('/Api/VisitorsDetails/GetGates?BuildingId=' + self.BuildingId(), null, 'GET', function (data) {
                self.Gates(new Object());
                self.Gates(data);
                self.GateId(gateId);

            })
        }
    }

    // To get all security persons.
    self.Users = ko.observableArray();

    self.GetUsers = function () {
        if (self.GateId() != undefined && self.GateId() != 0) {
            AjaxCall('/Api/VisitorsDetails/GetUsers?GateId=' + self.GateId(), null, 'GET', function (data) {
                self.Users(new Object());
                self.Users(data);
                self.SecurityId(securityId);
            })
        }
    }
    ko.bindingHandlers.enterkey = {
        init: function (element, valueAccessor, allBindings, viewModel) {
            var callback = valueAccessor();
            $(element).keypress(function (event) {
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    callback.call(viewModel);
                    return false;
                }
                return true;
            });
        }
    };
    
    self.VisitorsSearchDetails = function () {
        var data = new Object();
        data.BuildingId = self.BuildingId();
        data.GateId = self.GateId();
        data.SecurityId = self.SecurityId();
        data.VisitorName = self.VisitorName();
     
        var fromdate = '';
        var toDate = '';

        if ($('#dateFromCheckIn').val() != "") {
            var from = $('#dateFromCheckIn').val().split('/');
            fromdate = from[1] + '/' + from[0] + '/' + from[2];
        }
        if ($('#dateToCheckOut').val() != "") {
            var TO = $('#dateToCheckOut').val().split('/');
            toDate = TO[1] + '/' + TO[0] + '/' + TO[2];
        }

        data.checkin = fromdate;
        data.checkout = toDate;


        //data.CheckIn = self.CheckIn();
        //data.CheckOut = self.CheckOut();

        self.DataGrid.UpdateSearchParam('?search=' + JSON.stringify(data));
        self.DataGrid.GetData();

        //AjaxCall('/Api/VisitorsDetails/GetVisitorsDetails', data, 'POST', function () {
        //    toastr.success('ShiftAssignment saved successfully!!')
        //    ApplyCustomBinding('shiftassignment');
        //})
    }

    self.ResetVisitorsDetails = function () {
        self.BuildingId(undefined);
        self.GateId(undefined);
        self.SecurityId(undefined);
        self.VisitorName('');
        self.CheckIn('');
        self.CheckOut('');
        ApplyCustomBinding('visitordetailsreport');
    }

    self.GenerateRDLCReportPDF = function () {
        var data = new Object();
        data.BuildingId = self.BuildingId();
        data.GateId = self.GateId();
        data.SecurityId = self.SecurityId();
        data.VisitorName = self.VisitorName();
        //data.CheckIn = self.CheckIn();
        // data.CheckOut = self.CheckOut();
        data.checkin = $("#dateFromCheckIn").val();
        data.checkout = $("#dateToCheckOut").val();
        window.open('../Report/PrintVisitorsDetailsReport?search=' + JSON.stringify(data), '_blankl');
       // window.open('../Report/PrintVisitorsDetailsReport?search=' + JSON.stringify(data), '_blankl');
      
    }

    self.GenerateRDLCReportExcel = function () {
        var data = new Object();
        data.BuildingId = self.BuildingId();
        data.GateId = self.GateId();
        data.SecurityId = self.SecurityId();
        data.VisitorName = self.VisitorName();
        //data.CheckIn = self.CheckIn();
        // data.CheckOut = self.CheckOut();
        data.checkin = $("#dateFromCheckIn").val();
        data.checkout = $("#datetocheckout").val();
        window.open('../Report/PrintVisitorsDetailsReportExcel?search=' + JSON.stringify(data), '_blankl');
        // AjaxCall('/Api/VisitorsDetails/GenerateRDLCReport', "", 'POST', function() {
        // });
    }
}