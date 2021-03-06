﻿function GatesViewModel() {
    var self = this;
    ko.validation.rules.pattern.message = 'Invalid.';
    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null,
        decorateElement: true,
        errorElementClass: 'err'
    });
    var self = this;

    self.GateNumber = ko.observable().extend({
        required: { message: 'Gate Number is required' },
        deferValidation: true
    });
    self.Buildings = ko.observableArray();
    AjaxCall('/Api/Gates/GetAllBuilding', null, 'GET', function (data) {
        self.Buildings(data);
    })
    self.BuildingName = ko.observable('').extend({ required: true });
    self.GateNumber = ko.observable('').extend({ required: true });
    self.GlobalSearch = ko.observable('');
    self.CountryName = ko.observable('');
    self.StateName = ko.observable('');
    self.CityName = ko.observable('');
    self.BuildingId = ko.observable(undefined).extend({ required: true });
    self.Id = ko.observable(undefined).extend({ required: true });
    self.CountryId = ko.observable(undefined).extend({ required: true });
    self.StateId = ko.observable(undefined).extend({ required: true });
    self.CityId = ko.observable(undefined).extend({ required: true });

    self.errors = ko.validation.group(
        {
            GateNumber: this.GateNumber,
            BuildingId: this.BuildingId

        });
    self.DataGrid = new RIT.eW.DataGridAjax('/Api/Gates/GetAllGate', 7);
    self.GetAllGateData = function () {
        self.DataGrid.UpdateSearchParam('?globalSearch=' + self.GlobalSearch());
        self.DataGrid.GetData();
    }
    self.BuildingChanged = function () {
        //  debugger;
        if (self.BuildingId() != undefined && self.BuildingId() != 0) {
            AjaxCall('/Api/Gates/GetAllBuildingDetails?id=' + self.BuildingId(), null, 'GET', function (data) {
                //debugger;
                if (data[0].CityId != null) {
                    self.CityName(data[0].CityMaster.LookUpValue);
                    if (self.CityName() == "Others") {
                        self.CityName(data[0].OtherCity);
                    }
                    self.CountryName(data[0].CountryMaster.LookUpValue);
                    self.StateName(data[0].StateMaster.LookUpValue);
                }
              
            })
        }
    }


    self.EditGate = function (tableItem) {
        
        if (tableItem != undefined) {
            self.Id(tableItem.Id);
            self.GateNumber(tableItem.GateNumber);
            self.BuildingId(tableItem.BuildingId);
            self.CityId(tableItem.CityId);
            self.CountryId(tableItem.CountryId);
            self.StateId(tableItem.StateId);


            if (self.BuildingId() != undefined && self.BuildingId() != 0) {
                AjaxCall('/Api/Gates/GetAllBuildingDetails?id=' + self.BuildingId(), null, 'GET', function (data) {
                   // debugger;
                    if (data[0].CityId != null) {
                        self.CityName(data[0].CityMaster.LookUpValue);
                        if (self.CityName() == "Others") {
                            self.CityName(data[0].OtherCity);
                        }
                        self.CountryName(data[0].CountryMaster.LookUpValue);
                        self.StateName(data[0].StateMaster.LookUpValue);

                       
                        //self.CityId(data[0].CityMaster.Id);
                        //self.StateId(data[0].CityMaster.ParentId);
                        //self.StateId(data[0].CityMaster.ParentId);
                        
                    }
                    
                })
            }


            $("#btnSave").text("Update");
        }
    }



    self.DeleteGate = function (tableItem) {
        
        //var message = confirm("Are you sure, you want to delete selected record!");
        //if (message == true) {
        //    AjaxCall('/Api/Gates/DeleteGate', tableItem, 'POST', function (data) {

        //        if (data.Success == true) {
        //            toastr.success(data.Message);
        //            ApplyCustomBinding('gates');
        //        }
        //        else if (data.Success == false) {
        //            toastr.warning(data.Message);
        //        }
        //    });
        //       // toastr.success('Gate deleted successfully!!')
        //        //ApplyCustomBinding('gates');

        //}

        recordToDelete = tableItem;
    }
    self.DeleteConfirmed = function () {
        
        $('#myModal').modal('hide');
        $('.modal-backdrop').modal('show');
        $('.modal-backdrop').modal('hide');
        AjaxCall('/Api/Gates/DeleteGate', recordToDelete, 'POST', function (data) {
            if (data.Success == true) {
                toastr.success(data.Message);
                ApplyCustomBinding('gates');
            }
            else if (data.Success == false) {
                toastr.warning(data.Message);
            }
        });
    }

    self.ResetGates = function () {
        self.GlobalSearch('');
        self.GateNumber('');
        self.BuildingName('');
        self.CityName('');
        ApplyCustomBinding('gates');
    }
    self.SaveGate = function () {
        
        if (self.errors().length > 0) {
            self.errors.showAllMessages(true);
            this.errors().forEach(function (data) {
                var abc = self.BuildingId();
                abc = self.GateNumber();
            });
        }
        else {
            var data = new Object();
            
            data.Id = self.Id(),
            data.BuildingId = self.BuildingId(),
            data.GateNumber = self.GateNumber();
            //// display any error messages if we have them
            AjaxCall('/Api/Gates/SaveGate', data, 'POST', function (data) {
                if (data.Success == true) {
                    toastr.clear();
                    toastr.success(data.Message)
                    ApplyCustomBinding('gates');
                }
                else {
                   // self.GateNumber('');
                    toastr.error('Gate name alreday exists!!')
                }
                //self.IsInsert(true);
            })
        }
    }
    self.GlobalSearchEnter = function (data) {
        
        self.GetAllGateData();
        //console.log(event);
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
    self.GetAllGateData();
}