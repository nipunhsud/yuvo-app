import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Router } from '@angular/router';
import { HomePage } from '../home/home';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage implements OnInit {

  constructor(
    private nav: NavController, 
    private navParams: NavParams,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.router.navigate(['home']);
    this.nav.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
