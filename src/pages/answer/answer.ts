import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { Answer } from '../../models/model';

/**
 * Generated class for the AnswerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {

  public answerList: Answer[];

  constructor(
    public nav: NavController, 
    public navParams: NavParams,
    public http:Http
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
    this.loadData();
  }

  public loadData(){
    // this.answerRequestVO.user = 'a7bca981-08e1-459b-b61e-413b204f2cd5';
    const id = "a7bca981-08e1-459b-b61e-413b204f2cd5";
    this.http.get('http://localhost:8080/zazen-infrastructure-services/answers/user/'+id)
    .subscribe(response => {
      this.answerList = response.json() as Answer[];
    });
  }

  public segmentChanged(event){
    if(event.value == "search"){
      this.nav.push(HomePage);
    }else if(event.value == "question"){
      this.nav.push(QuestionPage);
    }
  }
}
