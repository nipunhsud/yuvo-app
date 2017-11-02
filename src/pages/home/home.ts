import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule,MapsAPILoader } from '@agm/core';
import { BrowserModule } from "@angular/platform-browser";
import { Http, RequestOptions} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AutocompletePrediction, Question } from '../../models/model';
import { Router } from '@angular/router';
import { QuestionPage } from '../question/question';
import { AnswerPage } from '../answer/answer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  public selectedPlace: AutocompletePrediction;
  public placeList: AutocompletePrediction[];
  public searchTerm: string;
  private lat: number;
  private long: number;
  // public searchControl: FormControl;

  private selectedQuestion: string;
  private questionList: string[];

  private question: Question;

  private icons: any;

  constructor(
  private http: Http,
  private geolocation: Geolocation,
  private router: Router,
  private nav: NavController
) {
    
  }

  onCancel(event: any){

  }  

  ngOnInit() {
    this.getLocation();
  }

  public onSearch(){
    console.log("place search "+ this.searchTerm);
    

    
    if(this.lat && this.long){
      let options = new RequestOptions({
        // Have to make a URLSearchParams with a query string
        params: {'search': this.searchTerm,
                  'latitude': this.lat,
                  'longitude': this.long
      }
      });
       this.http.get('http://localhost:8080/zazen-infrastructure-services/place', options)
       .subscribe(response => {
         this.placeList = response.json() as AutocompletePrediction[];
       });
    }
    
  }

  public getLocation(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     this.lat = data.coords.latitude;
     console.log("place search latitude "+ data.coords.latitude);
     console.log("place search longitude "+ data.coords.longitude);
     this.long = data.coords.longitude;
    });
  }

  public selectedItem(item: AutocompletePrediction){
    this.questionList = ["Bar", "Open Late", "Large Group"];
    console.log(item.description);
    this.selectedPlace = item;
    this.searchTerm = item.description;
    this.placeList = null;
  }

  public onQuestionSelect(question: string){
    this.selectedQuestion = question;
  }

  public submitQuestion(){
    
    if(!this.question){
      this.question = new Question();
    }
    // WHat is the lat and long here? Geoloction of the user or the place selected?
    this.question.latitude = this.lat.toString();
    this.question.longitude = this.long.toString();
    this.question.query = this.selectedQuestion;
    this.question.locationName = this.selectedPlace.description;
    this.question.userId = 'a7bca981-08e1-459b-b61e-413b204f2cd5';
    
    let headersObj = new Headers();
    headersObj.set('Content-Type', 'application/x-www-form-urlencoded');

    // let requestArg: RequestOptionsArgs = { headers: headersObj, method: "POST" };

    this.http.post("http://localhost:8080/zazen-infrastructure-services/questions/question", this.question).subscribe(response =>{
        //Route to questions dashboard here.
        // this.router.navigate(['/question-list']);
        this.nav.push(QuestionPage);
    });
  }

  public segmentChanged(event){
    console.log(event.value);
    console.log("icons "+ this.icons);
    if(event.value == "Question"){
      this.nav.push(QuestionPage);
    }else if(event.value == "Answer"){
      this.nav.push(AnswerPage);
    }
  }
}
