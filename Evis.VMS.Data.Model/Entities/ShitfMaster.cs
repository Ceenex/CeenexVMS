﻿/********************************************************************************
 * Company Name : Visitor's Management System
 * Team Name    : Evis Dev Team
 * Author       : Junaid Ameen
 * Created On   : 24/06/2016
 * Description  : 
 *******************************************************************************/

using System;
using System.ComponentModel.DataAnnotations;

namespace Evis.VMS.Data.Model.Entities
{
    public class ShitfMaster : BaseEntity<int>
    {
        public ShitfMaster() { }

        [Required]
        [MaxLength(50)]
        public string ShitfName { get; set; }

        [Required]
        public DateTime FromTime { get; set; }

        [Required]
        public DateTime ToTime { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public int? OrganizationId { get; set; }
    }
}
