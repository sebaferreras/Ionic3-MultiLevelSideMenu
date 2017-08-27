// Angular
import { Component } from '@angular/core';

// Ionic
import { NavParams } from 'ionic-angular';

@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailsPage {

	public title: string;

	constructor(private paramsCtrl: NavParams) {
		this.title = this.paramsCtrl.get('title');
	}
}
