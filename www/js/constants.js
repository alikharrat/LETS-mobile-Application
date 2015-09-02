angular.module('starter')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('URL',{
	ConUrl: 'http://private-anon-354896da2-matslats.apiary-mock.com/',
	con: 'http://demo.communityforge.net/',
	conUrl: 'http://demo.communityforge.net/commex/',
	membersId:"http://demo.communityforge.net/commex/member",
	smalladsId:"http://demo.communityforge.net/commex/ad",
	transactionsId:"http://demo.communityforge.net/commex/transaction"

})
 
.constant('USER_ROLES', {
  member: 'member_role'
});
