import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../Service/item.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Item } from '../model/item.model';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  rfItem: FormGroup;
  itemsList: any[] = [];
  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    

    this.rfItem = new FormGroup({
      title: new FormControl(''),
      status: new FormControl(''),
      number: new FormControl(''),
      price: new FormControl(''),
    });
   
  }
  upload(event: any) {
    this.itemservice.changeImgURL(event);
  }

  public async onSubmit() {
    // Do something awesome
    let temp = this.rfItem.value;
    await this.itemservice.addProduct(temp as Item).subscribe((item) => {
      item;
      console.log(item);
    });

    console.log(this.rfItem.value);
  }
}
