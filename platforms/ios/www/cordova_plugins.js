cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.pylonproducts.wifiwizard/www/WifiWizard.js",
        "id": "com.pylonproducts.wifiwizard.WifiWizard",
        "pluginId": "com.pylonproducts.wifiwizard",
        "clobbers": [
            "window.WifiWizard"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.insomnia/www/Insomnia.js",
        "id": "nl.x-services.plugins.insomnia.Insomnia",
        "pluginId": "nl.x-services.plugins.insomnia",
        "clobbers": [
            "window.plugins.insomnia"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "pluginId": "org.apache.cordova.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.pylonproducts.wifiwizard": "0.2.11",
    "cordova-plugin-whitelist": "1.2.2",
    "nl.x-services.plugins.insomnia": "4.0.1",
    "org.apache.cordova.device": "0.2.12"
}
// BOTTOM OF METADATA
});