let authProxyUrl = "/api/GetEmbedConfig";

function loadReport(embedReportId, replacementImagePath) {
    $.get(authProxyUrl, { reportId: embedReportId } )
    .done(function(embedConfig) {
        embedReport(embedConfig.token);
    })
    .fail(function(error) {
        setImageAsReport(replacementImagePath);
        console.log(error);
    });
}

function setImageAsReport(replacementImagePath) {
    var reportContainer = $('#embedContainer')[0];
    var reportImage = document.createElement('img');
    reportImage.width = 1045;
    reportImage.height = 780;
    reportImage.classList.add('img-fluid');
    reportImage.src = replacementImagePath;
    reportContainer.replaceWith(reportImage);
}

function embedReport(embedConfig) {
    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;

    // Embed configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    var config = {
        type: 'report',
        tokenType: models.TokenType.Embed,
        accessToken: embedConfig.EmbedToken.Token,  // Application token
        embedUrl: embedConfig.EmbedUrl,             // Embed URL
        id: embedConfig.Id,                         // Report id
        permissions: models.Permissions.All,
        settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true
        }
    };

    // Get a reference to the embedded report HTML element
    var reportContainer = $('#embedContainer')[0];

    powerbi.embed(reportContainer, config);
}
