import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item.model';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public List: Observable<any>;
  public temp;
  constructor(
    public fire: AngularFirestore,
    private http: HttpClient,
    private fireData: AngularFireStorage
  ) {
    this.List = fire.collection<any>('user').valueChanges({ idField: 'idDoc' });
  }

  // getAllItems(): Observable<Item[]> {
  //   return this.http.get<Item[]>(environment.endpoint + 'user');
  // }

  async getAllItem() {
    return this.List;
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<Item>(environment.endpoint + 'user/id' + id);
  }

  addProduct(item: Item): Observable<any> {
    return this.http.post(environment.endpoint + 'create', item);
  }

  updateProduct(id: string, item: Item): Observable<any> {
    return this.http.put<Item>(environment.endpoint + 'update' + id, item);
  }

  deleteProduct(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<Item>(environment.endpoint + 'delete?id=' + id);
  }

  // getItem(title: string) {
  //   return this.http.get(environment.endpoint + 'user/id' + title);
  // }

  // insertItem(item: Item): Observable<Item> {
  //   console.log(item);
  //   return this.http.post<Item>('http://192.168.1.129:8080/create', item);
  // }

  // getData() {
  //   return this.http.get;
  // }

  async getItem1() {
    let result = await this.http
      .get<string>(environment.endpoint + 'test')
      .toPromise();
    console.log(result);
    return result;
  }

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  public changeImgURL(event) {
    let file = event.target.files[0];
    let n = file.name;
    let filePath = `RoomsImages/${n}`;
    let fileRef = this.fireData.ref(filePath);
    let task = this.fireData.upload(`RoomsImages/${n}`, file);
    console.log(task);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              console.log(url);
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          // console.log(url);
        }
      });
  }

  // updateItem(item: Item): Observable<void> {
  //   return this.http.put<void>(
  //     environment.endpoint + 'update' + item.title,
  //     item
  //   );
  // }

  // deleteItem(title: string) {
  //   return this.http.delete(environment.endpoint + 'delete' + title);
  // }
}
