import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
	public get USER_ROLES(): any {
		return {
			member: 'member_role'
		};
	}
	public get AUTH_EVENTS(): any {
		return {
			notAuthenticated: 'auth-not-authenticated',
			notAuthorized: 'auth-not-authorized'
		};
	}
	public get URL(): any {
		return {
			ConUrl: 'http://private-anon-354896da2-matslats.apiary-mock.com/',
			con: 'http://demo.communityforge.net/',
			conUrl: 'http://demo.communityforge.net/commex/',
			membersId: 'http://demo.communityforge.net/commex/member',
			smalladsId: 'http://demo.communityforge.net/commex/ad',
			transactionsId: 'http://demo.communityforge.net/commex/transaction'
		};
	}

}