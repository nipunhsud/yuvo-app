import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Answer, AnswerRequestVO } from '../../models/model';

/**
 * Generated class for the QuestionAnswerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-question-answer',
  templateUrl: 'question-answer.html',
})
export class QuestionAnswerPage {

  private selectedQuestionId: string;
  private answersByQuestion: Answer[];
  private answer: Answer = new Answer();

  // Might have to update this
  private answerRequestVO: AnswerRequestVO = new AnswerRequestVO();

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private http: Http
  ) {
    this.selectedQuestionId = navParams.get("questionId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionAnswerPage' + this.selectedQuestionId);
    this.loadDataById(this.selectedQuestionId);
  }

  public loadDataById(id: string){
    this.http.get('http://localhost:8080/zazen-infrastructure-services/answers/question/'+id)
    .subscribe(response => {
      this.answersByQuestion = response.json() as Answer[];
    });
  }

  public postAnswer(){
    this.answerRequestVO.answer = this.answer.answerRecommendation;
    this.answerRequestVO.question = this.selectedQuestionId;
    this.answerRequestVO.user = 'a7bca981-08e1-459b-b61e-413b204f2cd5';

    this.http.post("http://localhost:8080/zazen-infrastructure-services/answers/answer", this.answerRequestVO).subscribe(response =>{
      //Route to questions dashboard here.
      // this.router.navigate(['/question-list']);
      this.loadDataById(this.selectedQuestionId);
  });
    // console.log("This, answer "+ this.answer.answerRecommendation);
  }
}
