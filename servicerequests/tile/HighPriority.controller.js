sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	/*global $*/

	return Controller.extend("ServiceRequests.tile.HighPriority", {

		onAfterRendering: function() {
			$("#highPriorityTile").click(function() {
				var oViewData = this.getView().getViewData();
				var navTargetUrl = oViewData.properties && oViewData.properties.navigation_target_url;
				if (navTargetUrl) {
					window.hasher.setHash(navTargetUrl);
				}
			}.bind(this));

			if (window.location.href.indexOf("mockData") !== -1 || sap.ushell.Container.getUser().getEmail() === "") {
				$("#highPriorityTileNumber").text("2");
			} else {
				var email = sap.ushell.Container.getUser().getEmail();
				$.ajax({
					method: "GET",
					url: "/sap/fiori/servicerequests/destinations/c4c/sap/byd/odata/v1/c4codata/ServiceRequestCollection/$count?$filter=ReporterEmail eq %27" + email + "%27and ServiceRequestUserLifeCycleStatusCodeText ne %27Completed%27 and ServicePriorityCode lt %273%27",
					success: function(result) {
						$("#highPriorityTileNumber").text(result);
					},
					error: function() {
						$("#highPriorityTileNumber").text("!");
					}
				});
			}

		}

	});

});