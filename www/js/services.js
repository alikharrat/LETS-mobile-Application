angular.module('starter')
 
.service('AuthService', function($q, $http, USER_ROLES,URL) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var userinformation = [];
  var isAuthenticated = false;
  var role = '';



  
 
  function loadUseridentifiers() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useidentifiers(token);
    }
  }
 
  function storeUseridentifiers(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useidentifiers(token);
  }
 
  function useidentifiers(token) {
      console.log("TAKEEEEEEEN");
      console.log(taken);
      userinformation=taken;
      isAuthenticated = true;
      role = USER_ROLES.member;


      
  }
 
  function destroyUseridentifiers() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.clear();
    //$ionicHistory.clearCache();
    //$ionicHistory.clearHistory();
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 

 
  var logout = function() {
        $http.get(URL.conUrl+"user/logout").then(function(data) {
                console.log(data);
                destroyUseridentifiers();

            }) 


  };
 

    var login = function(Acc_num, pw) {
    return $q(function(resolve, reject) {
      console.log(Acc_num);
      console.log(URL.con+"user/login");

   $.ajax({
    type: 'POST',
    url:URL.con+"user/login",
    data:{
          name: Acc_num,
          pass: pw,
          form_id:"user_login"
        },

     success: function (status,header,config) {
              $http.get(URL.conUrl+'member/'+Acc_num).success(function(data){
                resolve(data);
                
            }).error(function(err){
              if(err.error=="Access denied")
                  {
                    reject('Login Failed.');
                    
                  }

            })
    },
    error: function(data,status){

      reject('Connexion Problem.');
      
      }
  });


    });

  };

  var getuserinfo =function(user_id){
    var defer=$q.defer();

    $http.get(URL.conUrl+user_id).success(function(data){
            
            defer.resolve(data);
    }).error(function(error){
      defer.reject("error");
    });
    return defer.promise;
    



  };



  loadUseridentifiers();
 
  return {
    login: login,
    logout: logout,
    getuserinfo: getuserinfo,
    isAuthenticated: function() {return isAuthenticated;},
    userinfo: function() {return userinformation;},
    role: function() {return role;}
  };
})

.service('GetService', function($q, $http,URL,AuthService){
    var profiles=[];
    var Smallads=[];
    var Transactions=[];
    var Categories=[];
    var Alerts=[];
    var config=[];
 function emptyprofiles(){
  profiles=[];
 }
 function emptytransaction(){
  Transactions=[];
 }
  function emptysmallad(){
  Smallads=[];
 }

 function getProfiles(){
    var defered=$q.defer();
    var j=0;
    var membersId=[];
    var strings;
    var str='?';
    for (var i = 0; i < arguments.length; i++) {
    str=str+arguments[i];
            }
    $http.get(URL.membersId+str).then(function(data) {
            var urlp;
            data.data.forEach(function(thread,i){
                 membersId[i] = thread;
                  var threadId = thread;
                  urlp=URL.conUrl+thread;
               $http.get(urlp).then(function(data2) {
                  profiles.push(data2.data);
                  j=j+1; 
                  if(j==data.data.length){
                   defered.resolve();
                   } 
                })            
              })
            }) 

    return defered.promise;

  };

var getCategories=function(){

  var defered=$q.defer();
  var j=0;
    var str='ad'
    var CatId=[];
    var strings;
     $http.get(URL.conUrl+str).then(function(data) {
         
            var urlp;
            data.data.forEach(function(thread,i){

                  CatId[i] = thread;
                  var threadId = thread;
                  urlp=URL.conUrl+thread;
                  $http.get(urlp).then(function(data2) {
                  Categories[i]=data2.data;
                  Categories[i].checked=false;

                  j=j+1;
                  if(j==data.data.length){
                  
                   defered.resolve();
                   }
                })
              })
            }) 

    return defered.promise; 
};

var getConfig=function(){
  var defered=$q.defer();
    $http.get(URL.conUrl+"config").then(function(data) {

          config=data.data;
          defered.resolve()
            }) 
  return defered.promise;



};

var getSmallads=function(){


    var defered=$q.defer();
    var j=0;
    var str='?'
    var SmalladId=[];
    for (var i = 0; i < arguments.length; i++) {
    str=str+arguments[i];
         }
    var strings;
    $http.get(URL.smalladsId+str).then(function(data) {
            var urlp;
            data.data.forEach(function(thread,i){

                  SmalladId[i] = thread;
                  var threadId = thread;
                  strings=threadId.split('/');
                  urlp=URL.conUrl+thread;
                  $http.get(urlp).then(function(data2) {
                  
                  Smallads.push(data2.data);
      
                  j=j+1;
                  if(j==data.data.length){
                   defered.resolve();
                   }
                })
              })
            }) 

    return defered.promise;

};

 var getTransactions=function(){
    var defered=$q.defer();
    var j=0;
    var str='?'
    var TransactionId=[];
    for (var i = 0; i < arguments.length; i++) {
    str=str+arguments[i];
         }
    var strings;
    $http.get(URL.transactionsId+str).then(function(data) {
            var urlp;
            data.data.forEach(function(thread,i){
                  TransactionId[i] = thread;
                  var threadId = thread;
                  strings=threadId.split('/');
                  urlp=URL.conUrl+threadId;
                  $http.get(urlp).then(function(data2) {
                      var pro1=AuthService.getuserinfo(data2.data.payee);
                      pro1.then(function(result){
                      data2.data.payee=result;
                      });
                      var pro2=AuthService.getuserinfo(data2.data.payer);
                      pro2.then(function(result){
                        data2.data.payer=result;
                      });
                      Transactions.push(data2.data);     
                      j=j+1; 
                      if(j==data.data.length){
                       defered.resolve();
                       }   
                       })
              })
            }) 

    return defered.promise;
  };

/* var getAlerts=function(){
    var defered=$q.defer();
    var j=0;
    var str='alert?'
    var AlertId=[];
    for (var i = 0; i < arguments.length; i++) {
    str=str+arguments[i];
         }
    var strings;
    $http.get(URL.ConUrl+str).then(function(data) {
            var urlp;
            data.data.forEach(function(thread,i){

                  AlertId[i] = thread;
                  var threadId = thread;
                  strings=threadId.split('/');
                  urlp=URL.ConUrl+'alert/'+strings[0]+'_'+strings[1];
                  $http.get(urlp).then(function(data2) {
                  Alerts[i]=data2.data;
                  j=j+1;
                  if(j==data.data.length){
                   defered.resolve();
                   }
                })
              })
            }) 

    return defered.promise;
  };*/



 return {
    getConfig:getConfig,
    getProfiles: getProfiles,
    getSmallads: getSmallads,
    getCategories: getCategories,
    getTransactions:getTransactions,
  //  getAlerts:getAlerts,
    emptyprofiles:emptyprofiles,
    emptytransaction:emptytransaction,
    emptysmallad:emptysmallad,
    profiles:function(){return profiles;},
    Categories:function(){return Categories;},
    Transactions:function(){return Transactions;},
    Alerts:function(){return Alerts;},
    config:function(){return config;},
    Smallads:function(){return Smallads;}
  };


})
.service('PostService', function($q, $http,URL,AuthService, $ionicPopup){


  var PostTransaction=function(mid,id,amount,description,categories){

    var def=$q.defer();
    var d=new Date();
                  var creat=d.getDay()+"/"+d.getMonth()+"/"+d.getYear();
                   $http.post(URL.conUrl+'transaction',  {
                         
                          "created": creat,
                          "payer": mid,
                          "payee": id,
                          "quantity": amount,
                          "description": description,
                          "categories": categories,
                        }).success(function(response, status, headers, config){
                           
                            
                            var myPopup = $ionicPopup.show({
                                   template: 'Transaction succeded',
                                   title: 'Make a transaction',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
                            


                        })
                        
  }



  var PostSmallad=function(type,title,description,locality,categ,date){

    var def=$q.defer();
    var d=new Date();
                  var creat=d.getDay()+"/"+d.getMonth()+"/"+d.getYear();
                   $http.post(URL.conUrl+'ad',  {
                         
                          'type': type,
                          'title': title,
                          'expried':date,
                          'description': description,
                          'locality': locality,
                          //'image': 'http://blah.com/images/blah.jpg',
                          'categories': categ,
                        
                        }).success(function(response, status, headers, config){
                          console.log(response)
                          console.log(status)
                            
                            
                            var myPopup = $ionicPopup.show({
                                   template: 'Smallad succeded',
                                   title: 'Make a Smallad',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
                            


                        }).error(function(response, status, headers, config){
                          console.log("we are here"+ status)
                        })
                        
  }



  var PostMessage=function(from,to,message,smallad){

    var def=$q.defer();
    var d=new Date();
                  var creat=d.getDay()+"/"+d.getMonth()+"/"+d.getYear();
                   $http.post(URL.conUrl+'contact/'+from.split('/')[1]+'?',  {
                         
                         // "from": from,
                         // "to": to,
                          "message": message,
                         // "smallad": smallad,
                         // "date":creat
                          
                        }).success(function(response, status, headers, config){
                            console.log("i'm here");
                            
                            var myPopup = $ionicPopup.show({
                                   template: 'Message sent',
                                   title: 'Send Message',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
                            


                        })
                        
  }

return{

  PostTransaction:PostTransaction,
  PostMessage:PostMessage,
  PostSmallad:PostSmallad


};

})


.service('UpdateService', function($q, $http,URL,AuthService, $ionicPopup){

      var UpdateSmallad=function(type,title,description,locality,categ,date){

    var def=$q.defer();
    var d=new Date();
                  var creat=d.getDay()+"/"+d.getMonth()+"/"+d.getYear();
                   $http.post(URL.ConUrl+'ad',  {
                         
                          'type': type,
                          'created': date,
                          'title': title,
                          'description': description,
                          'locality': locality,
                          'image': 'http://blah.com/images/blah.jpg',
                          'categories': categ,
                        
                        
                        }).success(function(response, status, headers, config){
                            
                            
                            var myPopup = $ionicPopup.show({
                                   template: 'Smallad Updated',
                                   title: 'Update a Smallad',
                                   buttons: [
                                       { text: 'OK' },
                                  
                                     ]
                                   });
                            


                        }).error(function(response, status, headers, config){
                          console.log("we are here"+ status)
                        })
                        
  }

return{

UpdateSmallad:UpdateSmallad

};

})