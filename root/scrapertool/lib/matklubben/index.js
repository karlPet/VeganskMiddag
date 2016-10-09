
var mapping = require("./mapping.json");
var Xray = require("x-ray");
var xray = Xray();

var internals = {
  recipeId: ".title2",
  recipeNamesId: "a",
  recipeLinksId: "a@href"
}

var scrapeWebsite = function() {

  return new Promise(function(resolve, reject) {

    xray(mapping["links"][0], internals.recipeId, [{
        recipeName: internals.recipeNamesId,
        recipeLink: internals.recipeLinksId
    }])(function(err, obj) {

      if (err) { reject(err); }

      resolve(obj);
    })

  });
}

module.exports.scrapeWebsite = scrapeWebsite;
