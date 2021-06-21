import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemService } from '../Service/item.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from '../model/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  rfItem: FormGroup;

  id: any;
  constructor(
    public itemservice: ItemService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params.id;
    console.log(this.id);

    this.rfItem = new FormGroup({
      title: new FormControl(''),
      status: new FormControl(''),
      number: new FormControl(''),
      price: new FormControl(''),
    });

    // this.itemservice.getProduct(this.id).subscribe((data) => {
    //   this.id == this.rfItem.setValue(data.id);
    //   this.rfItem.setValue(data.data);
    // });
  }

  public async getItem(id: any) {
    return await this.itemservice.getProduct(id).subscribe((data: any) => {
      this.id = data.id;
      this.rfItem.setValue({
        title: data.title,
        number: data.number,
        price: data.price,
        status: data.status,
      });
    });
  }

  public async onFormSubmit() {
    this.itemservice
      .updateProduct(this.id, this.rfItem.value)
      .subscribe((data) => {
        const id = data.id;
        console.log(data);
        this.router.navigate(['/dashboard', id]);
      });
  }
}
