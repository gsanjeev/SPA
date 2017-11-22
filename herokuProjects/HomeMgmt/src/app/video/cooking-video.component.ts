import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Http} from '@angular/http';
import { CookingVideoService } from './cooking-video.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component( {
    templateUrl: './cooking-video.component.html'
})
export class CookingVideoComponent implements OnInit {

    //selecteVideoId: any;
    search = new FormControl();
    //seachResults: Observable<any>;
    seachResults: any[] =[];
    player: YT.Player;
    YTPlayerConfig= {
            "videoId": "gtS84etMrKA",
            "width": 285,
            "height": 185
          };
    private selectedVideoId: string = 'gtS84etMrKA';
    //video-id:string ='gtS84etMrKA';

    constructor( private videoService: CookingVideoService, private http:Http) {
       /* this.http.get('./config/ytplayer-config.json') 
        .subscribe(res => this.YTPlayerConfig = res.json());*/
        
        console.log( this.YTPlayerConfig ); 
        
        //observable of results
       // this.seachResults =
            //input value change observable
            this.search.valueChanges
                .debounceTime( 200 ) //debounce for 200ms
                .switchMap( query => videoService.search( query ) )
                .subscribe(result => {
                this.seachResults = result;
            });
            
            
    }

    ngOnInit() {
        this.videoService.search( "sanjeev kapoor" ).subscribe(result => {
            this.seachResults = result;
        });
    }

    selectedVideo( video ) {
        //alert("ok");
        this.selectedVideoId = video.id.videoId;
        console.log( video );
        console.log( this.selectedVideoId );

        //alert(this.selecteVideoId);
        if ( this.selectedVideoId ) {
            this.player.loadVideoById( this.selectedVideoId );
        }
    }

    savePlayer( player ) {
       // alert("savePlayer");
        
        this.player = player;
        console.log( 'player instance', player )
    }
    onStateChange( event ) {
        console.log( 'player state', event.data );
    }

}

@Pipe({
    name: 'videoFilter',
    //pure: false
  })
  export class VideoFilter implements PipeTransform {
    transform(seachResults: any[]): any {
        return seachResults.filter(video => {
         if (!video.id.videoId)  {
             return false;
         }             
          return true;
        });
    }
    

  }
