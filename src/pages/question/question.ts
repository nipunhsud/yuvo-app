import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Question, Answer } from '../../models/model';
import { Http } from '@angular/http';
import { QuestionAnswerPage } from '../question-answer/question-answer';
import { AnswerPage } from '../answer/answer';
import { HomePage } from '../home/home';

/**
 * Generated class for the QuestionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage implements OnInit{

  private questionList: Question[];
  private selectedQuestion: Question;

  private answer: Answer;

  constructor(
    public nav: NavController, 
    public navParams: NavParams,
    private http: Http
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  ngOnInit() {
    this.answer = new Answer();
    this.loadData();
  }

  public loadData(){
    this.http.get('http://localhost:8080/zazen-infrastructure-services/questions/').subscribe(questions => {
      this.questionList = questions.json() as Question[];
    });
  }

  public onQuestionSelect(question: Question){
    console.log("Question "+ question.query);
    this.selectedQuestion = question;
    console.log("selectedQuestion "+ this.selectedQuestion.query);
    console.log("this.answer.answerRecommendation"+ this.answer.answerRecommendation);
    this.nav.push(QuestionAnswerPage, {questionId : question.id});
  }

  public segmentChanged(event){
    if(event.value == "search"){
      this.nav.push(HomePage);
    }else if(event.value == "answer"){
      this.nav.push(AnswerPage);
    }
  }

}
