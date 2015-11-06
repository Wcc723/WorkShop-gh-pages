app = angular.module('app', []);

app.controller('appCtrl', [function(){
  var scope = this;

  scope.blendProp = blendProp;
  scope.color = '#2391AE';

  scope.choseProp = function(items){
    styleJson = '{"'+ scope.blendProp.propName + '" : "' + scope.blend+
                 '","background-color":"' + scope.color +'"}' ;
    scope.style = JSON.parse(styleJson);
    console.log(scope.style);
  };
}]);

var blendProp =
  {
    propName: 'background-blend-mode',
    props: [
    'normal' ,
    'multiply' ,
    'screen' ,
    'overlay' ,
    'darken',
    'lighten' ,
    'color-dodge' ,
    'color-burn' ,
    'hard-light' ,
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
  ]};
