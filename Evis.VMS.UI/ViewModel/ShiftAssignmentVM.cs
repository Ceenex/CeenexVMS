﻿/********************************************************************************
 * Company Name : East Vision Information System
 * Team Name    : EVIS IT Team
 * Author       : Vipin Raturi
 * Created On   : 06/05/2016
 * Description  : 
 *******************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Evis.VMS.UI.ViewModel
{
    public class ShiftAssignmentVM
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ShitfId { get; set; }
        public int BuildingId { get; set; }
        public int GateId { get; set; }
        public string UserName { get; set; }
        public string ShiftName { get; set; }
        public string BuildingName { get; set; }
        public string GateName { get; set; }
        public string City { get; set; }
        public DateTime FromDate { get; set; }
        public string strFromDate { get; set; }
        public string strToDate { get; set; }
        public DateTime ToDate { get; set; }
        public string CompanyName { get; set; }
        public string OtherCity { get; set; }
        public int? OrganizationId { get; set; }
        public DateTime Fromtime { get; set; }
        public DateTime Totime { get; set; }

    }
}