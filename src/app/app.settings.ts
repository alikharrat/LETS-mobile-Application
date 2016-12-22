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
	public get SERVER_URL(): any {
		return {
			root: 'http://demo.communityforge.net',
			commex: 'http://demo.communityforge.net/commex'
		};
	}
	public get URL(): any {
		return {
			sessionToken: `${this.SERVER_URL.root}/rest/session/token`,
			userLogin: `${this.SERVER_URL.root}/user/login`,
			userLogout: `${this.SERVER_URL.commex}/user/logout`,
			memberId: `${this.SERVER_URL.commex}/member/`,
			userId: `${this.SERVER_URL.commex}/`,
			// ConUrl: 'http://private-anon-354896da2-matslats.apiary-mock.com/',
			// smalladsId: 'http://demo.communityforge.net/commex/ad',
			// transactionsId: 'http://demo.communityforge.net/commex/transaction'
		};
	}

}