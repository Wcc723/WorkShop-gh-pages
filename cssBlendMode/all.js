app = angular.module('app', []);

app.controller('appCtrl', [function(){
  var vm = this;

  vm.blendProp = blendProp;
  vm.mixBlendMode = mixBlendMode;
  vm.color = '#2391AE';
  vm.text = 'Chili peppers';
  vm.textColor = '#FF0000';

  vm.choseProp = function(items){
    styleJson = '{"'+ vm.blendProp.propName + '" : "' + vm.blend+
                 '","background-color":"' + vm.color +'"}' ;
    vm.style = JSON.parse(styleJson);
    console.log(vm.style);
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

var mixBlendMode =
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
  ]
  }
