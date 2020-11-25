import {Injectable} from "@angular/core";
import {NgxXml2jsonService} from 'ngx-xml2json';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import * as converter from 'xml-js';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PageableSpaceMarinesDto} from "../models/pageable.space.marines.dto";
import {SpaceMarine} from "../models/space.marine";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiEndpoint: string;
  private apiAllSpaceMarine: string;
  private apiSpaceMarine: string;
  private apiMeanHealth: string;
  private apiDeleteByHealth: string;
  private apiFindSpaceMarineWhereCategory: string;
  private httpOptions;

  constructor(
    private http: HttpClient,
    private ngxXml2jsonService: NgxXml2jsonService,
    private router: Router){
    // this.apiEndpoint = "http://localhost:8091/space_marines_war";
    this.apiEndpoint = "http://localhost:8080/space_marines_war_exploded";
    this.apiSpaceMarine = "/space/marine";
    this.apiAllSpaceMarine = "/space/marines";
    this.apiMeanHealth = "/space/marine/health/mean";
    this.apiDeleteByHealth = "/space/marine/health/";
    this.apiFindSpaceMarineWhereCategory = "/space/marine/category";

  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/xml',
      'Accept': 'application/xml',
      'Response-Type': 'text'
    })
  };
  }

  public getAllSpaceMarines(sort: string = '', order: string = '', page: number = 1, perPage: number = 5, filterString: string = "") : Observable<PageableSpaceMarinesDto> {
    return this.http.get(`${this.apiEndpoint}${this.apiAllSpaceMarine}?at_page=${perPage}&page_number=${page}&sort_state=${order}&sort=${sort}${this.parseFilterString(filterString)}`, {responseType: 'text'})
      .pipe(
        map((res) => {
          let xmlToJson = converter.xml2json(res, {compact: true, spaces: 2});
          return JSON.parse(xmlToJson).PageableSpaceMarinesDto;
        }));
  };

  public deleteSpaceMarine(spaceMarineId: number) {
    return this.http.delete(this.apiEndpoint + this.apiSpaceMarine + `/${spaceMarineId}`);
  }

  public findSpaceMarineWhereCategory(category: string){
    return this.http.get(this.apiEndpoint  + this.apiFindSpaceMarineWhereCategory + `/${this.mapCategoryStringToInt(category)}`, {responseType: 'text'})
      .pipe(
        map((res) => {
          let xmlToJson = converter.xml2json(res, {compact: true, spaces: 2});
          return JSON.parse(xmlToJson);
        }));
  }

  public findSpaceMarineById(id: number){
    return this.http.get(this.apiEndpoint + this.apiSpaceMarine + `/${id}`, {responseType: 'text'})
      .pipe(
        map((res) => {
          let xmlToJson = converter.xml2json(res, {compact: true, spaces: 2});
          return JSON.parse(xmlToJson);
        }));
  }

  public deleteSpaceMarineByHealth(health: string) {
    return this.http.delete(this.apiEndpoint + this.apiDeleteByHealth + health);
  }

  public getMeanHealth(spaceMarines: Array<SpaceMarine>){
    let requestString = "";

    spaceMarines.forEach(function (spaceMarine) {
      requestString += `space_marine=${spaceMarine.id}&`;
    });

    return  this.http.get(this.apiEndpoint + this.apiMeanHealth + "?" + requestString)
  }

  public createNewSpaceMarine(spaceMarine: SpaceMarine): boolean {
    let spaceMarineXml: string = SpaceMarine.getSpaceMarineXmlPattern()(
      spaceMarine.name,
      spaceMarine.height,
      spaceMarine.category,
      spaceMarine.health,
      spaceMarine.meleeWeapon,
      spaceMarine.chapterName,
      spaceMarine.chapterMarinesCount,
      spaceMarine.coordinateX,
      spaceMarine.coordinateY);

    this.http.post(this.apiEndpoint + this.apiSpaceMarine, spaceMarineXml, this.httpOptions).subscribe(
      result => this.router.navigate([''])
    );

    return true;
  }

  public updateSpaceMarine(spaceMarine: SpaceMarine, spaceMarineId: number): boolean {
    let spaceMarineXml: string = SpaceMarine.getSpaceMarineXmlPattern()(
      spaceMarine.name,
      spaceMarine.height,
      spaceMarine.category,
      spaceMarine.health,
      spaceMarine.meleeWeapon,
      spaceMarine.chapterName,
      spaceMarine.chapterMarinesCount,
      spaceMarine.coordinateX,
      spaceMarine.coordinateY);

    this.http.put(this.apiEndpoint + this.apiSpaceMarine + `/${spaceMarineId}`, spaceMarineXml, this.httpOptions).subscribe(
      result => this.router.navigate([''])
    );

    return true;
  }

  private parseFilterString(filterString: string): string{
    let result: string = "";
    let filterValues: string[] = filterString.split(',');

    for (let value of filterValues){
      let filterPair = value.split('=');
      if (filterPair != null && filterPair.length == 2){
        filterPair[0] = filterPair[0].trim().toLowerCase();
        filterPair[1] = filterPair[1].trim().toLowerCase();

        result += `&filter=${filterPair[0]}&${filterPair[0]}=${filterPair[1]}`
      }
    }

    return result;
  }

  private mapCategoryStringToInt(category: string){
    switch (category) {
      case ("SCOUT"): { return 0; }
      case ("AGGRESSOR"): { return 1; }
      case ("INCEPTOR"): { return 2; }
      case ("HELIX"): { return 3; }
      default: { return null; }
    }
  }
}
