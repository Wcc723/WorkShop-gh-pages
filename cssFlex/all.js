app = angular.module('app', []);

app.controller('appCtrl', [function(){
  var scope = this;
  
  scope.wrapProps = wrapProp;
  scope.inlineProps = inlineProp;
  scope.flexWrap = {};
  scope.flexitems = [{
    style:{
      "background-color": "orange",
      "flex-basis":"200px",
      "flex-shrink": "0",
      "flex-grow": "0",
      "padding":"20px"
    }
  },{
    style:{
      "background-color": "coral",
      "flex-basis":"200px",
      "flex-shrink": "1",
      "flex-grow": "1",
      "padding":"20px",
      "height": "200px",
    }
  },{
    style:{
      "background-color": "deepskyblue",
      "flex-basis":"400px",
      "flex-shrink": "5",
      "flex-grow": "5",
      "height": "200px",
      "padding":"20px",
      "align-self": "center"
    }
  }];
  
  scope.choseProp = function(items){
    var tempWrapString = '';
    angular.forEach(items, function(item, i){
      comma = ',';
      if (i == scope.wrapProps.length -1){
        comma = '';
      }
      tempWrapString = tempWrapString + '"'+item.propName+'": "'+item.value+'" '+comma+'';
    });
    flexWrapJson = JSON.parse('{'+ tempWrapString+ '}');
    scope.flexWrap = flexWrapJson;
  };
  
  scope.addNewFlex = function(){
    scope.flexitems.push({
    "style":{
        "background": "orange",
      }
    });
  };
  scope.removeObject = function(key){
  	scope.flexitems.splice(key, 1);
  }
}]);



var wrapProp = [
  {
    propName: 'align-items',
    props: [
  'flex-start' , 'flex-end' , 'center' , 'baseline' , 'stretch'
  ]},
  {
    propName: 'justify-content',
    props: [
  'flex-start' , 'flex-end' , 'center' , 'space-between' , 'space-around'
  ]},
  {
    propName: 'flex-direction',
    props: [
  'row','row-reverse','column','column-reverse','initial','inherit'
  ]},
  {
    propName: 'flex-wrap',
    props: [
  'nowrap','wrap','wrap-reverse','initial','inherit'
  ]}
];

var inlineProp = [
  // {
  //   propName: 'flex',
  //   props: [
  // 'auto','1','2','3','4','5'
  // ]},
  {
    propName: 'flex-grow',
    props: [ '0','1','2','3','4','5','auto'
  ]},
  {
    propName: 'flex-shrink',
    props: [ '0','1','2','3','4','5','auto'
  ]},
  {
    propName: 'flex-basis',
    props: [ '0','1','2','100px','200px','300px','400px','20%','30%', 'auto'
  ]},
  {
    propName: 'align-self',
    props: [ 'auto' , 'flex-start' , 'flex-end' , 'center' , 'baseline' , 'stretch'
  ]},
  {
    propName: 'background-color',
    props: [ 'cyan','palegreen','orange','purple','deepskyblue','gray','coral','HotPink'
  ]},
  {
    propName: 'width',
    props: [ '100px','200px','10%','20%','30%','10vh','20vh'
  ]},
  {
    propName: 'height',
    props: [ '200px','400px','10%','20%','30%','10vh','20vh'
  ]},
  {
    propName: 'padding',
    props: [ '10px','20px','10vh','20vh'
  ]}
];


