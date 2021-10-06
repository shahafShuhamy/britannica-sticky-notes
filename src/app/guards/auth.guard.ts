import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

type Post = { title: string, content: string };

@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) {}
    
  canActivate()  {
    if( this.authService.loggedIn) {
        return true;
    }
    else {
        this.router.navigate(['/']);
        return false;
    }
  }
} 