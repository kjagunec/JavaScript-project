import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {Post} from "../models/post.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts : Post[] = [];
  private postSubject : BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  addPostErrorEmitter : Subject<{message:string, alert:string}> = new Subject<{message:string, alert:string}>();

  constructor(private dataService : DataService) {
    this.refreshPosts();
  }

  refreshPosts() {
    this.dataService.getPosts().subscribe((res : {status:string, rows:Post[]}) => {
      if (res.status == 'OK') {
        this.posts = res.rows;
        this.postSubject.next([...this.posts]);
      }
      else console.log(res.status);
    })
  }

  getPosts() : BehaviorSubject<Post[]> {
    return this.postSubject;
  }

  addPost(post : Post) {
    this.dataService.addPost(post).subscribe((res : {status:string, insertId:number}) => {
      if (res.status == 'OK') {
        this.refreshPosts();
        this.addPostErrorEmitter.next({message: 'Objava uspješno dodana!', alert: 'alert-success'});
      }
      else {
        console.log(res.status);
        this.addPostErrorEmitter.next({message: res.status, alert: 'alert-danger'});
      }
    })
  }

  getPost(postId : number) : Post | undefined {
    return this.posts.find((p : Post) => p.id == postId);
  }

  deletePost(postId : number) {
    this.dataService.deletePost(postId).subscribe((res : {status:string, affectedRows:number}) => {
      if (res.status == 'OK') this.refreshPosts();
      else console.log(res.status);
    })
  }
}
