import {Injectable} from '@angular/core';
import{Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';



const BASE_URL:string = "https://www.googleapis.com/youtube/v3/search?";
const SPECS:string = "safeSearch=moderate&part=snippet&q=";
const MAX_RESULTS:string = "&maxResults=50&key=";
const API_TOKEN:string = "AIzaSyAJk1xUI72YYfBMgEc84gjHUX-k2AN6-B0";

@Injectable()
export class CookingVideoService {
    constructor(private http:Http) {
        console.log('Task Service Initialized...');
    }
    
    search(query){
                return this.http.get(`${BASE_URL}${SPECS}${query.concat(" food cooking")}${MAX_RESULTS}${API_TOKEN}`)
                .map((res:Response) => res.json())
                .map(json => json.items);
              }
    
}