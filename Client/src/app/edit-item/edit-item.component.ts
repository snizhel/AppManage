import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemService } from '../Service/item.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from '../model/item.model';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  item2: any;
  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.item2 = { tittle: '', number: '', price: '', status: '' };
  }

  public async getItem(id: any) {
    console.log(id);
    return await this.itemservice.getProduct(id);
  }

  public async editProduct(id: any) {
    let temp1: Item = await this.getItem(id);
    console.log(temp1);

    this.item2 = new FormGroup({
      title: new FormControl(this.item2.temp1.title),
      status: new FormControl(this.item2.temp1.status),
      number: new FormControl(this.item2.temp1.number),
      price: new FormControl(this.item2.temp1.price),
    });
    console.log(this.item2.value);
  }
  public async SaveChanges() {
    console.log(this.item2.temp1);
    return this.itemservice.updateProduct(this.item2.temp1, this.item2.id);
  }
}
