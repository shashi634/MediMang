using System.Text;
using System.Web.Optimization;



namespace MediMang
{
    public class PartialsTransform : IBundleTransform
    {
        private readonly string _moduleName;
        private readonly string _physicalPath;
        public PartialsTransform(string moduleName)
        {
            _moduleName = moduleName;
        }

        public void Process(BundleContext context, BundleResponse response)
        {
            var strBundleResponse = new StringBuilder();
            // Javascript module for Angular that uses templateCache 
            strBundleResponse.AppendFormat(
                @"angular.module('{0}').run(['$templateCache',function(t){{",
                _moduleName);

            foreach (var file in response.Files)
            {
                // Get content of file
                var content = file.ApplyTransforms();
                // Remove newlines and replace ' with \\'
                content = content.Replace("'", "\\'").Replace("\r\n", "");
                // Find templateUrl by getting file path and removing inital ~
                var templateUrl = file.IncludedVirtualPath.Replace("~", "").Replace('\\', '/');
                // Add content of template file inside an Angular put method
                strBundleResponse.AppendFormat("t.put('{0}','{1}');", templateUrl, content);
            }
            strBundleResponse.Append(@"}]);");

            // response.Files = new FileInfo[] { };
            response.Content = strBundleResponse.ToString();
            response.ContentType = "text/javascript";
        }
    }
    public class PartialsBundle : Bundle
    {
        public PartialsBundle(string moduleName, string virtualPath)
            : base(virtualPath, new[] { new PartialsTransform(moduleName) })
        {
        }
    }
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Clear();
            bundles.ResetAll();
            //BundleTable.EnableOptimizations = true;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/metisMenu.min.css", 
                      "~/Content/sb-admin-2.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular/angular.js",
                "~/Scripts/angular/angular-route.js",
                "~/Scripts/angular/angular-messages.js",
                "~/Scripts/angular/angular-sanitize.js",
                "~/Scripts/angular/angular-cookies.js",
                "~/Scripts/angular/angular-animate.js"));
            bundles.Add(new ScriptBundle("~/bundles/app").IncludeDirectory(
                       "~/Static/js", "*.js", true));
            bundles.Add(new ScriptBundle("~/bundles/theme").IncludeDirectory(
                       "~/Scripts/theme", "*.js", true));
            bundles.Add(new ScriptBundle("~/bundles/plugins").IncludeDirectory(
                       "~/Static/plugins", "*.js", true));
            bundles.Add(new StyleBundle("~/bundles/css/plugins").IncludeDirectory(
                      "~/Static/plugins",
                      "*.css", true
                      ));
            // html templates for the crm app
            bundles.Add(new PartialsBundle("app", "~/bundles/templates").IncludeDirectory(
                      "~/Static/templates",
                      "*.html", true
                      ));
        }
    }

   
}
