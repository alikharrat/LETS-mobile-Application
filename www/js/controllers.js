angular.module('starter')

.controller('AppCtrl', function($scope, $http, $state, $ionicPopup, $q, $localstorage, GetService, AuthService, AUTH_EVENTS) {
    var rules = [];
if (document.styleSheets[2].cssRules)
    rules = document.styleSheets[2].cssRules;
else if (document.styleSheets[2].rules)
    rules = document.styleSheets[2].rules;
console.log(rules);
rules[3].style.backgroundColor = 'yellow ';
rules[3].style.cssText="border-color: red; background-color: yellow !important;"
      console.log(rules[3].style.backgroundColor)

    $scope.logosrc="http://demo.communityforge.net/profiles/cforge/anonymous.jpg";
    $scope.setCurrentUsername = function(name) {
      $scope.info=name;

    };
    $scope.loguser=function(data,tru){

      AuthService.login(data.username,data.password).then(function(userinfor) {
      if(tru==true)
      {
        $localstorage.setObject("identifiers",data);
      }
      var pom=GetService.getConfig();
      pom.then(function(){
      $scope.appconfig=GetService.config();
      $scope.srclogo=$scope.appconfig.logo;
      $state.go('main.home', {}, {reload: true});
      $scope.setCurrentUsername(userinfor);
      })
  

    }, function(err) {

      if(err=="Login Failed."){
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: 'Please check your indentifiers!!'
      });
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Connexion Problem!',
        template: 'Please check your Connexion!!'
      });
    }

    });

  }

  var connected=$localstorage.getObject("identifiers");
  GetService.getCategories();

  $scope.categories=GetService.Categories();
  $scope.countriesName=[];
  $scope.countriesName[0]="All"; 
  $http.get('http://services.groupkt.com/country/get/all').success(function(data){ 
        data.RestResponse.result.forEach(function(thread,i){

            $scope.countriesName[i+1]=thread.name;
                
              })
    })
if (!angular.equals({}, connected)){
    $scope.loguser(connected,false);
  }



 
 
})


.controller('LoginCtrl', function($scope, $state, $ionicPopup, $q, $localstorage, GetService, AuthService,$http) {
  $scope.data = {};
 



/*Login executed when the user press Login button*/
/*param: login and password*/
/*need to be finished*/
/**Some Changes needed but now all you need is the password="password"**/
  $scope.login = function(data) {
    $scope.loguser(data,true);
 
    
  }


/*register executed when the user press register button function to add later*/
 $scope.register =function(){


 }
      	 
 
  	 
})

.controller('SmlCtrl', function($scope, $state,$compile, $http, $ionicPopup, PostService, GetService,AuthService,$ionicLoading) {
  

  var promis=GetService.getSmallads();
  promis.then(function(){
    $scope.Smallad=GetService.Smallads();

  })
  $scope.categories=GetService.Categories();
  $scope.userinfo=AuthService.userinfo();
  var info=AuthService.userinfo();
  $scope.myfunction=function(cat){
      return($scope.categories[cat].logo);
}

  $scope.sendMess = function(sml) {
    

   var myPopup = $ionicPopup.show({
    template: '<ul>'+
                '<li>'+
                  '<div class="row">'+
                    '<div class="col">'+
                      '<label class="item item-input text">'+
                        '<textarea placeholder="description" rows="5" ng-model="mymessage" ng-Required="true" name="description"></textarea>'+
                      '</label>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
              '</ul>',
    title: 'Send Message',
    cssClass:"myPopupClassNewTrans",
    scope: $scope,
    buttons: [
      { text: 'Cancel',type: 'button-positive', onTap: function(e) { return true; } },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e) {
          

            if(!($scope.mymessage===undefined))
            {     
              PostService.PostMessage(sml.user_id,$scope.mymessage);                
            }else{               
              return "missing";             
            }
          }
      },
    ]
    }).then(function(val) {

          if(val=="missing"){
             var myPopup = $ionicPopup.show({
                                   template: 'Sending message Failed: No message to send',
                                   title: 'Send Message Error',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
   
                              

          }
       
    });
  };

    $scope.smldescription = function(sml) {
    

   var myPopup = $ionicPopup.show({
    template: '<p style="color:#fff">'+
                sml.description+
              '</p>',
    title: sml.title,
    cssClass:"myPopupClassNewTrans",
    scope: $scope,
    buttons: [
      { text: 'OK',type: 'button-positive', onTap: function(e) { return true; } },
    ]
    })
  };

/*Filter function user for filtring the smallads*/
/*5 parameters strings with no returning value*/
/*Show the Smallad on the map as marker and Create the on click Listener whish give you
information about the Smallad and the possibility to send message to the creator of the smallad*/
  $scope.filter=function(type,location,categories){
    GetService.emptysmallad();
   
    filters="limit=7";
    var geo;
    
    console.log($scope.map.getCenter());

    if(type === undefined)
    {
      type="Wants";
    }
    filters=filters+"&type="+type;
    if(!(location=="All" || location===undefined))
    {
        
        filters=filters+"&locality="+location;

    }
    if (!(categories=="All") & !(categories===undefined))
      {
        filters=filters+"&type="+categories;
      }
  /*  if(!(search=="")&!(search===undefined))
      {
        filters=filters+"&tags="+search;        
      }*/

  var promis=GetService.getSmallads();
  promis.then(function(){
    $scope.smallad=GetService.Smallads();





  })
}

/*function executed when you pull down to show more profiles*/
  $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      //simulate async response
      var promis=GetService.getSmallads(filters+"&offset="+$scope.Smallad.length);
        promis.then(function(){
          $scope.Smallad=GetService.Smallads();

        })
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
  };

/**This function Sends the Message taking a paramtere the an Int that gives the smallad selected and the second parametere is the message**/
 $scope.Sendmes=function(i,mess){

  if(!(mess===undefined)&!(mess==""))
  {
    
    PostService.PostMessage(info.id,$scope.smallad[i].user_id,$scope.smallad[i].id,mess);
    $scope.messtosend="";
  }else{
    var myPopup = $ionicPopup.show({
                                   template: "Can't send the message",
                                   title: 'Send Message',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
  }
}
  


/*** This Commented function can be used to Add image for the smallad***/

  /*   $scope.selimage=function($rootScope) {
            console.log('fire! $scope.openFileDialog()');
            //ionic.trigger('click', { target: document.getElementById('file') });
            document.getElementById('file').click();
            angular.element(document.getElementById('file')).on('change',function(e){

               var file=e.target.files[0];
                
               console.log(angular.element(document.getElementById('file')));
               console.log(file);
               var fileReader=new FileReader();
               fileReader.onload=function(event){
                 $scope.imagess=fileReader.result;
                 console.log(event.target.result);
                    }

              // fileReader.readAsDataURL(file);
               console.log(fileReader.result);
               $state.go($state.current, {}, {reload: true});

             });

        };*/

 
})

.controller('ProfCtrl', function($scope, $q, $state, $http, $ionicPopup, PostService, GetService, AuthService,$ionicLoading) {
    var info=AuthService.userinfo(); 

    var filters="limit=5";

    $scope.radiuss=50;    

/**myfunction function that return the categorie's Logo from the ID**/
$scope.myfunction=function(cat){
  /***The Commented Code should be used the reste is used for tests***/
     /* for(var j=0;j<$scope.categories.length;j++){
        if($scope.categories[j].id.split('/')[1]==cat)
        {
          break;
        }
      }
      return($scope.categories[j].logo);*/
      return($scope.categories[cat].logo);

}
/*Function executed as initialisation*/
$scope.init = function () {
    var promise=[];
            var pr=GetService.getSmallads("user_id="+info.id);
              pr.then(function(){
              $scope.mysmallad=GetService.Smallads();
              console.log($scope.mysmallad);
               })
    promise=GetService.getProfiles(filters);
    promise.then(function(data){

        $scope.profiles=GetService.profiles();  
       })
}

$scope.init();

/**Filter the Profiles to be shown **/
$scope.filter=function(fragment,neibour,loc){
  GetService.emptyprofiles();
  filters="limit=10";
  
  if (!(fragment=="") & !(fragment===undefined))
  {
    filters="&fragment="+fragment;
  }
  if((neibour==false) || (neibour=== undefined))
  { 
     if(!(loc=="All") & !(loc=== undefined) )
        {

          filters=filters+"&locality="+loc;
           GetService.emptyprofiles();
           GetService.getProfiles(filters);
          $scope.profiles=GetService.profiles();
        }
    
  }else{
       var def=$q.defer();
    navigator.geolocation.getCurrentPosition(function(position) {

        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var latlng = new google.maps.LatLng(pos.G, pos.K);
                geocoder=new google.maps.Geocoder();
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                           for (var i=0; i<results[0].address_components.length; i++) {
                             for (var b=0;b<results[0].address_components[i].types.length;b++) {

            
                               if (results[0].address_components[i].types[b] == "locality") {
                                //this is the object you are looking for
                                 loc= results[0].address_components[i];
                                 filters=filters+"&locality="+loc.long_name;
                                 console.log(loc)
                                 console.log(filters);
                                def.resolve(filters);
                                 break;
                                }
              }
        }

                        
                           if($scope.locality=="") {

                             for (var i=0; i<results[0].address_components.length; i++) {
                                             for (var b=0;b<results[0].address_components[i].types.length;b++) {

                                               if (results[0].address_components[i].types[b] == "country") {
                                                //this is the object you are looking for
                                                  loc= results[0].address_components[i];
                                                  console.log(loc)
                                                  filters=filters+"&locality="+loc.long_name;
                                                  def.resolve(filters);
                                                 break;
                                                }
                                           }     
                                }
                          }                                  
                    })
   
              
      });
   def.promise.then(function(results){
        GetService.emptyprofiles();
        GetService.getProfiles(filters);
        $scope.profiles=GetService.profiles();

    })
   console.log(filters);
  }
 


  
}

/*function executed when you pull down to show more profiles*/
  $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      //simulate async response
      GetService.getProfiles(filters+"&offset="+GetService.profiles().length);
      $scope.profiles=GetService.profiles();
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
  };


/**show smallad of the user selected in a popup**/
  $scope.showsmallad=function(prof){
    $scope.profM=prof;
    var promise=[];
    promise=GetService.getSmallads("user_id="+prof.id);
    promise.then(function(data){
        $scope.smllds=GetService.Smallads(); 
        var myPopup = $ionicPopup.show({
    template: '<ul class="styling">'+
                '<li class="item item-avatar" ng-repeat="smll in smllds">'+
                  '<img src="{{smll.image}}"><h2>{{smll.title}}</h2><h2>{{smll.type}}</h2>'+
                  '<p style="white-space: pre-wrap">{{smll.description}}</p>'+
                  '<div class="row">'+
                    '<img class="skillicon" ng-src="{{myfunction(skill)}}" ng-repeat="skill in smll.categories" />'+
                  '</div>'+
                  '<div class="row" >'+
                    '<label class="item item-input text">'+
                      '<textarea placeholder="write your messaage" rows="1" ng-model="messagetosend" ng-Required="true" name="description"></textarea>'+
                    '</label>'+
                    '<button class="button button-positive icon button-small" ng-click="Sendmes(smll,messagetosend)" style="border-radius:100%">Send</button>'+
                  '</div>'+
                '</li>'+
              '</ul>',
    title: 'Smallads',
    cssClass: "myPopupClass",
    scope: $scope,
    buttons: [
      { text: 'Close',type: 'button-positive', onTap: function(e) { 

        GetService.emptysmallad();
        return true; } },
      
    ]
    })


    })
  }

  //This Function sends message too
 $scope.Sendmes=function(sml,message){
      if(!(message===undefined)&!(message==""))
      {

        PostService.PostMessage(info.id,$scope.profM.id,sml.id,message);
      }else{
        var myPopup = $ionicPopup.show({
                                       template: "Can't send the message",
                                       title: 'Send Message',
                                       buttons: [
                                           { text: 'OK' },
                                      
                                         ]
                                       });
      }

 }


 /**When the user wants to make a transaction is this function is executed a popup is show where 
 there is fields to fill to make the transaction **/
  $scope.NewTrans = function(payee) {
    
   $scope.data = {};
   $scope.data.amount=1;
   var myPopup = $ionicPopup.show({
    template: '<ul>'+
                '<li>'+
                  '<div class="row" style="height:35px">'+
                    '<div class="col">Smallad :</div>'+
                    '<div class="col col-67">'+
                      '<select ng-model="data.smallad" style="width:140px">'+
                        '<option ng-repeat="smlls in mysmallad" value="{{smlls}}">{{smlls.title}}</option>'+
                      '</select>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li>'+
                  '<div class="row"><div class="col">Amount :</div>'+
                    '<div class="col col-67">'+
                      '<input type="number" value="data.amount" min=1 ng-model="data.amount">'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li>'+
                  '<div class="row">'+
                    '<div class="col">'+
                      '<label class="item item-input text">'+
                        '<textarea placeholder="description" rows="5" ng-model="messagetosend" ng-Required="true" name="description"></textarea>'+
                      '</label>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
              '</ul>',
    title: 'Make a Transaction',
    cssClass:"myPopupClassNewTrans",
    scope: $scope,
    buttons: [
      { text: 'Cancel',type: 'button-positive', onTap: function(e) { return true; } },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e) {
          

            if(!($scope.data.description===undefined)&(!($scope.data.smallad===undefined)))
            {     



                  PostService.PostTransaction(info.id,payee.id,$scope.data.amount,$scope.data.description,$scope.data.tags);
                  $http.Delete('http://private-anon-7d78733b7-matslats.apiary-mock.com/ad/'+$scope.data.id);
                  

            }else{
                

                return "missing";
               
            }

          }
      },
    ]
    }).then(function(val) {

          if(val=="missing"){
             var myPopup = $ionicPopup.show({
                                   template: 'Transaction Failed: Missing information',
                                   title: 'Make a transaction',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
   
                              

          }
       
    });
  };

})


.controller('homeCtrl', function($q, $scope, $state, $http, UpdateService, $ionicModal, URL, $localstorage, $ionicPopup,GetService, PostService, AuthService,$ionicLoading) {




   var filters="limit=7";
   $scope.Categories=GetService.Categories();
   console.log($scope.Categories);
   var promise=[];
        promise=GetService.getTransactions(filters);
        promise.then(function(data){
          $scope.Transactions=GetService.Transactions();
          console.log($scope.Transactions)
          
          })

    $scope.createsmld=function(){

      $scope.data={}

  var myPopup = $ionicPopup.show({
    template: '<ul class="styling">'+
                '<li class="item">'+
                 '<div class="input-label">'+
                   '<label class="item item-input">'+
                    'Type:'+
                     '<select ng-model="data.Type" style="width:160px">'+
                      '<option value="Offers">Offers</option>'+
                      '<option value="Wants" ng-selected="true">Wants</option>'+
                     '</select>'+
                    '</label>'+
                  '</div>'+
                '</li>'+
                '<li class="item">'+
                  '<label class="item item-input">'+
                    '<span class="input-label">title:</span>'+
                    '<input type="text" ng-model="data.titl">'+
                  '</label>'+
                '</li>'+
                '<li class="item">'+
                  '<label class="item item-input text">'+
                    '<textarea placeholder="description" rows="5" ng-model="data.Descp" ng-Required="true" name="description"></textarea>'+
                 '</label>'+
                 '</li>'+
                '</ion-scroll>'+
                '<li class="item">'+
                    '<label class="item item-input">'+
                      '<span class="input-label">Expiring Date</span>'+
                      '<input type="date" ng-model="data.date">'+
                    '</label>'+
                  '<li/>'+
                '</li>'+
                 '<li class="item">'+
                    '<div class="input-label">'+
                          'Locality'+
                        '<select ng-model="data.location" style="width:160px">'+
                          '<option ng-repeat="loc in appconfig.localities" value="{{loc}}">{{loc}}</option>'+
                          '<option value="All" ng-selected="true">All</option>'+
                        '</select>'+
                    '</div>'+
                    
                  '</li>'+
                /*'<li class="item">'+
                  '<label class="item item-input">'+
                    '<span class="input-label">Tags:</span></br>'+
                    '<input type="text" ng-model="data.tag" placeholder="tag1,tag2....">'+
                  '</label>'+
                '</li>'+*/
                // we Can Add images too
                /*'<li class="item">'+
                  '<input type="file" id="file" accept="image/*" style="display:none">'+
                  '<button class="button button-block button-calm ion-paperclip uploadButton" ng-click="selimage()">'+
                      'Select Image'+
                  '</button>'+
                '</li>'+*/
                '<ion-scroll direction="y" style="height: 120px">'+
                '<li class="item item-checkbox" ng-repeat="Cats in Categories" size="5">'+
                         '<label class="checkbox">'+
                           '<input type="checkbox" ng-model="Cats.checked">'+
                         '</label>'+                        
                         '{{Cats.name}} '+                       
                
              '</ul>',
    title: 'New Smallad',
    cssClass:"myPopupClassNewSmld",
    scope: $scope,
    buttons: [
      { text: 'Close', onTap: function(e) { return true; } },
      {
        text: '<b>Create</b>',
        type: 'button-positive',
        onTap: function(e) {
          /*This is executer when Create is clicked Test the values then make the POST*/

            var tabcat=[];
            var d=new Date($scope.data.date);
            var today=new Date();
            var creat=d.getDay()+"/"+d.getMonth()+"/"+d.getYear();
            if($scope.data.Type===undefined){
              $scope.data.Type="Want";
            }
            for(var k=0;k<$scope.Categories.length;k++)
            { 

              if($scope.Categories[k].checked==true)
              {    
                  console.log($scope.categories[k].category_id)
                  tabcat.push($scope.categories[k].category_id);
                  console.log(tabcat);
              }

            }
              
            if(!($scope.data.Type===undefined)&(!($scope.data.titl===undefined))&(!(tabcat[0]===undefined))&(!($scope.data.Descp===undefined))&(d>=today)&(!($scope.data.location===undefined))/*&(!($scope.data.tag===undefined))*/)
            {     



                  PostService.PostSmallad($scope.data.Type,$scope.data.titl,$scope.data.Desc,$scope.data.location,tabcat/*$scope.tag*/,creat);
                  

            }else{
                

                return "missing";
               
            }

          }
      },
      
    ]
    }).then(function(val) {

          if(val=="missing"){
             var myPopup = $ionicPopup.show({
                                   template: 'Smallad Failed: Missing informations',
                                   title: 'Create a Smallad',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
   
                              

          }else{
            if(val=="wrong date"){
             var myPopup = $ionicPopup.show({
                                   template: 'Smallad Failed: Wrong Date',
                                   title: 'Create a Smallad',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
   
                              

          }
          }
       
    });

    }      
    
    $scope.hide=function(){
        $scope.modal.hide();
    }
  $scope.updatesmld=function(smld){


          $scope.updata={}

  var myPopup = $ionicPopup.show({
    template: '<ul class="styling">'+
                '<li class="item">'+
                 '<div class="input-label">'+
                   '<label class="item item-input">'+
                    'Type:'+
                     '<select ng-model="updata.Type" style="width:160px">'+
                      '<option value="Offers">Offers</option>'+
                      '<option value="Wants" ng-selected="true">Wants</option>'+
                     '</select>'+
                    '</label>'+
                  '</div>'+
                '</li>'+
                '<li class="item">'+
                  '<label class="item item-input">'+
                    '<span class="input-label">title:</span>'+
                    '<input type="text" ng-model="updata.titl">'+
                  '</label>'+
                '</li>'+
                '<li class="item">'+
                  '<label class="item item-input text">'+
                    '<textarea placeholder="description" rows="5" ng-model="updata.Descp" ng-Required="true" name="description"></textarea>'+
                 '</label>'+
                '</li>'+
                '<ion-scroll direction="y" style="height: 120px">'+
                '<li class="item item-checkbox" ng-repeat="Cats in Categories" size="5">'+
                         '<label class="checkbox">'+
                           '<input type="checkbox" ng-model="Cats.checked">'+
                         '</label>'+                        
                         '{{Cats.name}} '+                       
                '</li>'+
                '</ion-scroll>'+
                '<li class="item">'+
                    '<div class="input-label">'+
                          'Locality'+
                        '<select ng-model="updata.location" style="width:160px">'+
                          '<option ng-repeat="loc in appconfig.localities" value="{{loc}}">{{loc}}</option>'+
                          '<option value="All" ng-selected="true">All</option>'+
                        '</select>'+
                    '</div>'+
                    
                  '</li>'+
                '<li class="item">'+
                    '<label class="item item-input">'+
                      '<span class="input-label">Expiring Date</span>'+
                      '<input type="date" ng-model="updata.date">'+
                    '</label>'+
                  '<li/>'+

               /* '<li class="item">'+
                  '<label class="item item-input">'+
                    '<span class="input-label">Tags:</span></br>'+
                    '<input type="text" ng-model="updata.tag" placeholder="tag1,tag2....">'+
                  '</label>'+
                '</li>'+*/
                // we Can Add images too
                /*'<li class="item">'+
                  '<input type="file" id="file" accept="image/*" style="display:none">'+
                  '<button class="button button-block button-calm ion-paperclip uploadButton" ng-click="selimage()">'+
                      'Select Image'+
                  '</button>'+
                '</li>'+*/               
              '</ul>',
    title: 'Update Smallad',
    cssClass:"myPopupClassNewSmld",
    scope: $scope,
    buttons: [
      { text: 'Close', onTap: function(e) { return true; } },
      {
        text: '<b>Create</b>',
        type: 'button-positive',
        onTap: function(e) {
          var tabcat=[];
          var d=new Date($scope.updata.date);
          var today=new Date();
        var creat=d.getDay()+"/"+d.getMonth()+"/"+d.getYear();
            for(var k=0;k<$scope.Categories.length;k++)
            { 

              if($scope.Categories[k].checked==true)
              {   
                  tabcat.push($scope.categories[k].id.split('/')[1]);
                  console.log(tabcat);
              }

            }
            var upda={};
            if(!($scope.upda.location===undefined))
            {
                upda.locality=$scope.updata.location;
            }
            if(!($scope.updata.Type===undefined))
            {
                upda.type=$scope.updata.Type;
            }
            if(!($scope.updata.titl===undefined))
            {
              upda.title=$scope.updata.titl;
            }
            if(!($scope.updata.Descp===undefined))
            {
              upda.description=$scope.updata.Descp;
            }
            if(!($scope.updata.date===undefined))
            {
              upda.date=$scope.updata.date;
            }
            if(d<today & (!($scope.updata.date===undefined)))
            {
              return "wrong date";
            }else if(angular.equals({}, upda)){

              return "missing";
            }else
              {     
                  UpdateService.UpdateSmallad(upda);
                  

              }

          }
      },
      
    ]
    }).then(function(val) {

          if(val=="missing"){
             var myPopup = $ionicPopup.show({
                                   template: 'Smallad Failed: Nothing to Update',
                                   title: 'Update a Smallad',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
   
                              

          }else{
            if(val=="wrong date"){
             var myPopup = $ionicPopup.show({
                                   template: 'Smallad Failed: Wrong Date',
                                   title: 'Update a Smallad',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
   
                              

          }
          }
       
    });



  }

   $scope.showsmallad=function(prof){
    GetService.emptysmallad();
    $scope.profM=prof;
    var promise=[];
    promise=GetService.getSmallads("user_id="+prof.id);
    promise.then(function(data){
        $scope.smllds=GetService.Smallads(); 

              var modal=$ionicModal.fromTemplateUrl("templates/Mysmallads.html",{
            scope: $scope,
            animation: 'slide-in-up'
          })
              modal.then(function(result){
                 console.log(result)
                 $scope.modal=result;
                  $scope.modal.show();
              })

    })
  }  
$scope.deletesmld=function(smld){

     var myPopup = $ionicPopup.show({
    template: 'Do you Want to delete This smallad?',
    title: 'Delete Smallad',
    cssClass:"myPopupClassNewTrans",
    scope: $scope,
    buttons: [
      { text: 'No',type: 'button-positive', onTap: function(e) { return true; } },
      {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function(e) {
                  //$http.Delete(URL.conUrl+smld.id);
                  $scope.hide();
                  
          }
      },
    ]
    })



}


$scope.filter=function(dates,location,myTrans,fragment,Catss){
      $scope.myTrans=myTrans;
      filters="limit=10";
      
      if (!(fragment=="") & !(fragment===undefined))
      {
        filters=filters+"&fragment="+fragment;
      }
      if (!(location=="All") & !(location===undefined))
      {
        filters=filters+"&locality="+location;
      }
      if (!(dates=="") & !(dates===undefined))
      { 
        var month=new Date(dates).getMonth()+1;
        var year= new Date(dates).getYear();
        filters=filters+"&month="+year+month;
      }
      if (!(myTrans=="false") & !(myTrans===undefined))
      {
        console.log($scope.info)
        filters=filters+"&user_id="+$scope.info.id;
      }
      if (!(Catss=="All") & !(Catss===undefined))
      {
        filters=filters+"&Categories="+Catss;
      }
      console.log(filters)
      GetService.emptytransaction();
      GetService.getTransactions(filters);
      $scope.Transactions=GetService.Transactions();
      
  };
  /**myfunction function that return the categorie's Logo from the ID**/
$scope.myfunction=function(cat){
  /***The Commented Code should be used the reste is used for tests***/
     /* for(var j=0;j<$scope.categories.length;j++){
        if($scope.categories[j].id.split('/')[1]=cat)
        {
          break;
        }
      }
      return($scope.categories[j].logo);*/
      return($scope.categories[cat].logo);

}


  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    
      //simulate async response
      console.log(filters+"&offset="+GetService.Transactions().length);
      GetService.getTransactions(filters+"&offset="+GetService.Transactions().length);
      console.log(GetService.Transactions().length);
      $scope.Transactions=GetService.Transactions();
      //Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.infiniteScrollComplete');
    
   
      
  };
 
  $scope.logout = function() {
    AuthService.logout();
    console.log($localstorage.getObject("identifiers"));
    $state.go('login');
  };

/*    $scope.selimage=function($rootScope) {
            console.log('fire! $scope.openFileDialog()');
            //ionic.trigger('click', { target: document.getElementById('file') });
            document.getElementById('file').click();
            angular.element(document.getElementById('file')).on('change',function(e){

               var file=e.target.files[0];
                
               console.log(angular.element(document.getElementById('file')));
               console.log(file);
               var fileReader=new FileReader();
               fileReader.onload=function(event){
                 $scope.imagess=fileReader.result;
                 console.log(event.target.result);
                    }

              // fileReader.readAsDataURL(file);
               console.log(fileReader.result);
               $state.go($state.current, {}, {reload: true});

             });

        };*/

  
});
