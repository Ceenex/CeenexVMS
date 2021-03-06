﻿using Evis.VMS.Business;
using Evis.VMS.UI.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using Evis.VMS.Utilities;
using Evis.VMS.UI.HelperClasses;

namespace Evis.VMS.UI.Controllers.ApiControllers
{
    public partial class DashboardController : BaseApiController
    {

        GenericService _genericService = new GenericService();
        private readonly UserService _userService = new UserService();
        //
        // GET: /Dashboard/

       

        [Route("~/Api/DashBoard/LoadGraph")]
        [HttpGet]
        public async Task<List<Tuple<int, string,DateTime>>> GetGraphData()//, int pageIndex, int pageSize, string sortField = "", string sortOrder = "ASC")
        {

           


            var currentUserId = HttpContext.Current.User.Identity.GetUserId();
            var currentUser = await _userService.GetAsync(x => x.Id == currentUserId);
            var myData = from visitorDetails in _genericService.VisitDetails.GetAll()
                         where visitorDetails.GateMaster.BuildingMaster.OrganizationId == (currentUser.OrganizationId==null ? 1:currentUser.OrganizationId)
                         group visitorDetails by EntityFunctions.TruncateTime(visitorDetails.CheckIn) into g
                         
                         orderby g.Key
                         select new { CreateTime = g.Key, Count = g.Count() };

          

            string[] formats = { "MM/dd/yyyy" };
            
            List<Tuple<int, string,DateTime>> mydict = new List<Tuple<int, string,DateTime>>();

            // add an item

            //q = "[";
            var currentDate = DateTime.Now.Date;
            var lastDate = DateTime.Now.AddDays(-30).Date;
            List<string> dates = new List<string>();
            

            
           
            foreach (var item in myData)
            {
                if (item.CreateTime >= lastDate && item.CreateTime <= currentDate)
                {
                    mydict.Add(new Tuple<int, string,DateTime>(item.Count, (Convert.ToDateTime(item.CreateTime)).ToString("dd/MM/yyyy"),Convert.ToDateTime(item.CreateTime)));
                }
              
            }

            foreach (DateTime day in EachDay(lastDate, currentDate))
            {
                if(!mydict.Any(s=>s.Item3.Date==day.Date))
                {

                    mydict.Add(new Tuple<int, string, DateTime>(0, (Convert.ToDateTime(day.Date)).ToString("dd/MM/yyyy"), day));
                }
            }
            mydict= mydict.OrderByDescending(x => x.Item3).ToList();
            return mydict;
        }

        public IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }


        [Route("~/Api/DashBoard/DisplayAllShift")]
        [HttpPost]
        public async Task<string> DisplayAllShift(string globalSearch, int pageIndex, int pageSize, string sortField = "", string sortOrder = "ASC")
        {

            var user = (await _userService.GetAllAsync()).Where(x => x.Id == HttpContext.Current.User.Identity.GetUserId() && x.IsActive == true).FirstOrDefault();
            int orgId = (user == null) ? 0 : (int)user.OrganizationId;

        
            var ShiftDisplay = _genericService.ShiftDetails.GetAll().Where(x => x.IsActive == true 
                && ((EntityFunctions.TruncateTime(x.ShiftDate) ==EntityFunctions.TruncateTime(DateTime.Now))
                || (EntityFunctions.TruncateTime(x.ShiftDate) == EntityFunctions.TruncateTime(DateTime.Now) ))).ToList()
                .Select(x => new ShiftAssignmentVM
                {
                    UserId = x.SecurityID,
                    UserName = x.ApplicationUser.FullName,
                    BuildingId = x.Gates.BuildingId,
                    BuildingName = x.Gates.BuildingMaster.BuildingName,
                    OrganizationId = x.Gates.BuildingMaster.OrganizationId,
                    GateId = x.GateID,
                    GateName = x.Gates.GateNumber,
                    ShitfId = x.ShiftID,
                    ShiftName = x.Shitfs.ShitfName + " (" + x.Shitfs.FromTime.ToString("hh:mm tt") + " - " + x.Shitfs.ToTime.ToString("hh:mm tt") + ")",
                    FromDate=x.ShiftDate,
                })
                .Where(x => x.FromDate.Date == DateTime.Now.Date && (orgId == 0 || x.OrganizationId == orgId)).AsQueryable();


            var searchDetails = JsonConvert.DeserializeObject<SearchShiftReport>(globalSearch);
           

            if (string.IsNullOrEmpty(sortField))
            {
                sortField = "UserName";
                //sortOrder = "ASC";
            }
            
            var paginationRequest = new PaginationRequest
            {
                PageIndex = (pageIndex - 1),
                PageSize = pageSize,
                SearchText = globalSearch,
                Sort = new Sort { SortDirection = (sortOrder == "ASC" ? SortDirection.Ascending : SortDirection.Descending), SortBy = sortField }
            };
            int totalCount = 0;
            IList<ShiftAssignmentVM> result =
            GenericSorterPager.GetSortedPagedList<ShiftAssignmentVM>(ShiftDisplay, paginationRequest, out totalCount);

            var jsonData = JsonConvert.SerializeObject(result);
            return JsonConvert.SerializeObject(new { totalRows = totalCount, result = jsonData });
            //return Shift;

        }

    }
}