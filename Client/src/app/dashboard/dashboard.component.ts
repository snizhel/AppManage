import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../Service/item.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { title } from 'process';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  rfItem: FormGroup;
  itemsList: any[] = [];
  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.rfItem = new FormGroup({
      title: new FormControl(),
      status: new FormControl(),
      number: new FormControl(),
      price: new FormControl(),
    });
  }

  upload(event: any) {
    this.itemservice.changeImgURL(event);
  }
  async gettest() {
    await this.itemservice.getItem1();
  }

  public async getProducts() {
    await (
      await this.itemservice.getAllItem()
    ).subscribe((data) => {
      this.itemsList = data;
      console.log(this.itemsList);
    });
  }

  public async deleteItem(id: any) {
    console.log(id);
    await this.itemservice.deleteProduct(id).subscribe((resp) => {
      return this.itemsList.push(resp);
    });
  }

  // onSubmit = this.itemservice.addProduct;
  public async onSubmit() {
    // Do something awesome
    let temp = this.rfItem.value;
    await this.itemservice.addProduct(temp as Item).subscribe((item) => {
      this.itemsList.push(item);
    });

    console.log(this.rfItem.value);
  }
}
