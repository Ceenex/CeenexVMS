﻿using Evis.VMS.Business;
using Evis.VMS.UI.HelperClasses;
using Evis.VMS.UI.ViewModel;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Evis.VMS.UI.Controllers
{
    public partial class ReportController : Controller
    {
        public readonly VisitorDetailsReportHelper _visitorDetailsReportHelper = null;
        public readonly ShiftDetailsReportHelper _ShiftDetailsReportHelper = null;
        private readonly UserService _userService = null;

        public ReportController()
        {
            _visitorDetailsReportHelper = new VisitorDetailsReportHelper();
            _ShiftDetailsReportHelper = new ShiftDetailsReportHelper();
            _userService = new UserService();
        }

        private string GetReportPath()
        {
            return AppDomain.CurrentDomain.BaseDirectory + "Reports\\RDLC";
        }



    }
}