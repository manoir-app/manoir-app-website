using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using Microsoft.Azure.Cosmos.Tables;
using Microsoft.Azure.Cosmos.Table;
using System.Globalization;

namespace ManoirApp.Server
{
    public static class GetAccount
    {
        public class AccountDetails 
        {
            public Guid AccountGuid {get; set;}
            public string Name {get; set;}
            public string DomainPrefix {get; set;}
        }

        [FunctionName("GetAccount")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            return new OkObjectResult(new AccountDetails() {
                Name = "carbenay",
                DomainPrefix="dev.carbenay",
                AccountGuid = new Guid("ed0f40af-fbcf-4f34-a599-ae9882c2dc4a")
            });
        }
    }
}
