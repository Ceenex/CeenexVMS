
function ScanVisitorViewModel() {

    var self = this;
    self.VisitorName = ko.observable('');
    self.Gender = ko.observable('');
    self.GenderText = ko.observable('');
    self.DOB = ko.observable('');
    self.TypeOfCard = ko.observable('');
    self.TypeOfCardText = ko.observable('');
    self.IdNumber = ko.observable('');
    self.Nationality = ko.observable('');
    self.NationalityText = ko.observable('');
    self.CompanyName = ko.observable('');
    self.EmailAddress = ko.observable('');
    self.ContactNumber = ko.observable('');
    self.IdentityImages = ko.observable('');

    self.ReadImageData = function () {
        self.IdentityImages = ko.observable('');
        if ($('.dz-filename').length == 0) {
            toastr.clear();toastr.warning('No image available to read text.');
            return;
        }
        var firstimg = $('.dz-image-preview img').eq(0).attr("img-name-unique");
        var secoundimg = $('.dz-image-preview img').eq(1).attr("img-name-unique");
        var thirdimg = $('.dz-image-preview img').eq(2).attr("img-name-unique");
        var data = [];
        data.push(firstimg);
        data.push(secoundimg);
        data.push(thirdimg);
        ShowLoader();
        AjaxCall('/Api/Visitor/ScanImage', data, 'POST', function (data) {
            if (data.Gender != undefined) {
                var gender = data.Gender.trim().toLowerCase();
                if (gender == "m" || gender == "male") {
                    self.Gender(1);
                }
                else if (gender == "f" || gender == "female") {
                    self.Gender(2);
                }
                else {
                  //  self.TypeOfCard('-1');

                }
                self.GenderText(data.Gender);
            }
            else
            {
                self.Gender('');
                self.GenderText('');
            }

            if (data.TypeOfCard != undefined) {
                var typeOfCardVal = data.TypeOfCard.trim().toLowerCase();
                if (typeOfCardVal.indexOf("emirates") != -1) {
                    self.TypeOfCard('4');
                }
                else if (typeOfCardVal.indexOf("license") != -1) {
                    self.TypeOfCard('5')
                }
                else {
                    self.TypeOfCard('-1');
                }
                self.TypeOfCardText(data.TypeOfCard);

            }
            else
            {
                self.TypeOfCard('');
                self.TypeOfCardText('');
            }
                if (data.Nationality != undefined) {

                self.NationalityText(data.Nationality);
                self.Nationality(data.NationalityId);
                }
            else
                {
                    self.Nationality('');
                    self.NationalityText('');
                }
            if (data.VisitorName != undefined) {
                self.VisitorName(data.VisitorName);
            }
            else
            {
                self.VisitorName('');
            }
            if (data.IDNumber != undefined) {
                self.IdNumber(data.IDNumber);
            }
            else
            {
                self.IdNumber('');
            }

            if (data.DateOfBirth != undefined) {
                var regExDOB = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
                if (regExDOB.test(data.DateOfBirth)) {
                    self.DOB(data.DateOfBirth);
                }

            }
            else
            {
                self.DOB('');
            }
            if (data.CompanyName != undefined) {
                self.CompanyName(data.CompanyName);
            }
            else
            {
                self.CompanyName('');
            }
            if (data.EmailAddress != undefined) {
                self.EmailAddress(data.EmailAddress);
            }
            else
            {
                self.EmailAddress('');
            }
            if (data.ContactNumber != undefined) {
                self.ContactNumber(data.ContactNumber);
            }
            else
            {
                self.ContactNumber('');
            }
            $('#txtFirstName').focus();
            //$('input[type=text]').removeAttr('readonly').removeClass('inputdisable');

            $('.dz-image img').each(function () {
                if (self.IdentityImages().indexOf(",") == -1) {
                    self.IdentityImages($(this).attr('img-name-unique')+",");
                }
                else {
                    self.IdentityImages(self.IdentityImages() + $(this).attr('img-name-unique') + ",");
                }
            });

            HideLoader();
        })

    }

    self.ResetImageData = function () {
        $('.dz-image-preview').empty();
        $('input[type=text]').attr('readonly', 'readonly').addClass('inputdisable');
        self.IdentityImages('');
        self.VisitorName('');
        self.Gender('');
        self.GenderText('');
        self.DOB('');
        self.TypeOfCard('');
        self.TypeOfCardText('');
        self.IdNumber('');
        self.CompanyName('');
        self.EmailAddress('');
        self.ContactNumber('');
        self.Nationality('');
        self.NationalityText('');
    }

    self.PrepareData = function () {
        dataToSend =
            (self.VisitorName() + "&&" +
            self.Gender() + "&&" +
            self.Nationality() + "&&" +
            self.DOB() + "&&" +
            self.TypeOfCard() + "&&" +
            self.IdNumber() + "&&" +
            self.Nationality() + "&&" +
            self.CompanyName() + "&&" +
            self.EmailAddress() + "&&" +
            self.ContactNumber() + "&&" +
            self.IdentityImages());
    }

    self.ContinueRegistration = function () {
        self.PrepareData();
        if (self.VisitorName() == ""
            && self.Gender() == ""
            && self.DOB() == ""
            && self.TypeOfCard() == ""
            && self.IdNumber() == ""
            &&self.CompanyName()==""
            &&self.EmailAddress()==""
            &&self.ContactNumber()==""
            && self.Nationality() == "") {

            toastr.clear();
            toastr.warning('No scanned image data available to proceed.');
            return;
        }
        ApplyCustomBinding('managevisitor_with_param');
    }

    return dataToSend;
}