import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';


@Component({
  selector: 'app-logout',
  template: '登出成功，幾秒後自動跳轉...',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/'], { relativeTo: this.route });
    }, 500);
  }
}
