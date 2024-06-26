import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {DataService} from "./data.service";
import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories : Category[] = [];
  private categorySubject : BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private selectedCategoryIdSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  addCategoryEmitter : Subject<{message:string, alert:string}> = new Subject<{message:string, alert:string}>();

  constructor(private dataService : DataService) {
    this.refreshCategories();
  }

  refreshCategories() {
    this.dataService.getCategories().subscribe((res : {status:string, rows:Category[]}) => {
      if (res.status == 'OK') {
        this.categories = res.rows;
        this.categorySubject.next([...this.categories]);
      } else console.log(res.status);
    })
  }

  getCategories() : BehaviorSubject<Category[]> {
    return this.categorySubject;
  }

  addCategory(category : Category) {
    this.dataService.addCategory(category).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.refreshCategories();
        this.addCategoryEmitter.next({message: 'Kategorija uspješno dodana!', alert: 'alert-success'});
      }
      else {
        console.log(res.status);
        this.addCategoryEmitter.next({message: res.status, alert: 'alert-danger'});
      }
    })
  }

  getCategory(categoryId : number) : Category | undefined {
    return this.categories.find((c : Category) => c.id == categoryId);
  }

  deleteCategory(categoryId : number) {
    this.dataService.deleteCategory(categoryId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') this.refreshCategories();
      else console.log(res.status);
    })
  }

  editCategory(category : Category) {
    this.dataService.editCategory(category).subscribe((res : {status:string, changedRows:number}) => {
      if (res.status == 'OK') this.refreshCategories();
      else console.log(res.status);
    })
  }

  changeSelectedCategory(id : number) {
    this.selectedCategoryIdSubject.next(id);
  }

  getSelectedCategoryId() : BehaviorSubject<number> {
    return this.selectedCategoryIdSubject
  }
}
