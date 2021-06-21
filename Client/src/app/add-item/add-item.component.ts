import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../Service/item.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  rfItem: FormGroup;
  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
}
