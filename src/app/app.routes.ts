import { Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AboutComponent} from "./about/about.component";
import {ProductsComponent} from "./products/products.component";
import {NewsComponent} from "./news/news.component";
import {PostComponent} from "./post/post.component";
import {UnknownComponent} from "./unknown/unknown.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  {path: '',             component: MainComponent},
  {path: 'about',        component: AboutComponent},
  {path: 'products',     component: ProductsComponent},
  {path: 'news',         component: NewsComponent},
  {path: 'post/:id',     component: PostComponent},
  {path: 'login',        component: LoginComponent},
  {path: 'profile',      component: ProfileComponent},
  {path: '**',           component: UnknownComponent}
];
