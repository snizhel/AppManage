import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../Service/item.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Item } from '../model/item.model';
@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent implements OnInit {
  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  
}
