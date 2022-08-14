///<reference path="typings/angular.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
///<reference path="ngtools.ts" />
var Hemcefor;
(function (Hemcefor) {
    var ChatApp;
    (function (ChatApp) {
        class ChatMessage {
            constructor() {
            }
        }
        class DefaultPage {
            constructor($scope, $http, $timeout) {
                this.scope = $scope;
                this.http = $http;
                this.$timeout = $timeout;
                this.scope.Events = this;
                this.scope.Loading = false;
                this.scope.CurrentChannel = "global";
                this.scope.Channels = ["global", "sexe", "voyages", "zoia"];
                this.scope.Fournisseurs = new Array();
                this.scope.InputBoxData = "";
                this.scope.User = "micky";
                if (document.location.search.indexOf("ganou") >= 0)
                    this.scope.User = "ganou";
                let self = this;
                this.RefreshData();
                setInterval(function () { self.RefreshData(); }, 15000);
            }
            isActiveChannel(chan) {
                let self = this;
                let sc = self.scope;
                return chan == sc.CurrentChannel;
            }
            changeChannel(chan) {
                let self = this;
                let sc = self.scope;
                sc.CurrentChannel = chan;
                sc.Loading = true;
                sc.$applyAsync(function () { });
                this.RefreshData();
            }
            pushMessage() {
                let self = this;
                let sc = self.scope;
                sc.Loading = true;
                let src = sc.Search;
                let params = "";
                let url = "api/PrivateChatPush?ts=" + (new Date).getTime() + "&from=" + sc.User + "&channel=" + sc.CurrentChannel + "&message=";
                url = url + encodeURIComponent(sc.InputBoxData);
                fetch(url)
                    .then(res => res.json())
                    .then(json => {
                    sc.InputBoxData = "";
                    self.RefreshData();
                });
            }
            RefreshData() {
                let self = this;
                let sc = self.scope;
                sc.Loading = true;
                let src = sc.Search;
                let params = "";
                let url = "api/PrivateChatRefresh?ts=" + (new Date).getTime() + "&channel=" + sc.CurrentChannel;
                fetch(url)
                    .then(res => res.json())
                    .then(json => {
                    sc.CurrentMessages = json;
                    sc.Loading = false;
                    sc.$applyAsync(function () { });
                });
            }
        }
        ChatApp.DefaultPage = DefaultPage;
    })(ChatApp = Hemcefor.ChatApp || (Hemcefor.ChatApp = {}));
})(Hemcefor || (Hemcefor = {}));
var theApp = angular.module('ChatApp', []);
theApp.controller('ChatAppController', Hemcefor.ChatApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
});
//# sourceMappingURL=manoir.js.map