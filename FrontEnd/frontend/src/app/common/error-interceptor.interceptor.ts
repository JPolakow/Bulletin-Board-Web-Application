import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../pages/error/error.component';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred.';
        
        if (error.error && error.error.error) {
          errorMessage = error.error.error; // Adjust this to match your server's error structure
        }
        
        this.openErrorDialog(errorMessage);
        throw error;
      })
    );
  }

  openErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorComponent, {
      data: {
        message: errorMessage
      }
    });
  }
}
