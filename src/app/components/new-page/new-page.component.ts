import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SpaceMarine} from "../../models/space.marine";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  public errorMsg: boolean;

  public spaceMarine : SpaceMarine;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.spaceMarine = SpaceMarine.createBasicSpaceMarine();
  }

  public createSpaceMarine(): void {
    this.errorMsg = this.apiService.createNewSpaceMarine(this.spaceMarine);
  }
}
