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
  rfItem2: FormGroup;
  item2: any;
  itemsList: any[] = [];

  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder
  ) {
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
    this.item2 = { tittle: '', number: '', price: '', status: '' };

    this.rfItem = new FormGroup({
      title: new FormControl(''),
      status: new FormControl(''),
      number: new FormControl(''),
      price: new FormControl(''),
    });
    this.rfItem2 = new FormGroup({
      title2: new FormControl(''),
      status2: new FormControl(''),
      number2: new FormControl(''),
      price2: new FormControl(''),
    });
    // this.item2 = { tittle: '', number: '', price: '', status: '' };
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

  public async getItem(id: any) {
    return await this.itemservice.getProduct(id);
  }

  public async editProduct(id: any) {
    console.log(id);
    let data = await this.getItem(id);
    this.item2 = {
      idDoc: id,
      ...data,
    };
  }
  public async SaveChanges(id: any) {
    console.log(this.item2);
    console.log(this.itemsList);
    let data = {
      idDoc: this.item2.idDoc,
      title2: this.rfItem2.value.title2,
      number2: this.rfItem2.value.number2,
      price2: this.rfItem2.value.price2,
      status2: this.rfItem2.value.status2,
    };
    this.rfItem2.patchValue(data);
    let index = this.itemsList.findIndex((item) => {
      if (item.idDoc == this.item2.idDoc) {
        return true;
      }
      return false;
    });
    this.itemsList[index] = {
      idDoc: this.item2.idDoc,
      title: this.rfItem2.value.title2,
      number: this.rfItem2.value.number2,
      price: this.rfItem2.value.price2,
      status: this.rfItem2.value.status2,
    };
    console.log(this.itemsList);

    // this.rfItem = new FormGroup({
    //   title: new FormControl(),
    //   status: new FormControl(),
    //   number: new FormControl(),
    //   price: new FormControl(),
    // });
    console.log(this.rfItem2.value.price2);
    return this.itemservice.updateProduct(id, this.rfItem2.value);
  }
}
