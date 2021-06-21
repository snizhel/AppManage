import { title } from 'process';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../Service/item.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Item } from '../model/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemsList: any[] = [];
  request: any;
  title: string;
  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  async gettest() {
    await this.itemservice.getItem1();
  }
  navtoEdit(id: any) {
    console.log(id);
    this.router.navigate(['/edit/' + id]);
  }
  public async getProducts() {
    await (
      await this.itemservice.getAllItem()
    ).subscribe((data) => {
      this.itemsList = data;
      console.log(this.itemsList);
    });
  }

  public async search() {
    if (this.title != '') {
      this.itemsList = this.itemsList.filter((result) => {
        return result.title
          .toLocaleLowerCase()
          .match(this.title.toLocaleLowerCase());
      });
    } else if (this.title == '') {
      return this.ngOnInit();
    }
  }

  public async deleteItem(id: any) {
    console.log(id);
    await this.itemservice.deleteProduct(id).subscribe((resp) => {
      resp;
    });
  }
}
