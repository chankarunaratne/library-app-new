import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from '../book-list/book-list.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl =
    'https://5b747i281i.execute-api.us-east-1.amazonaws.com/ckarun10-stage'; // Your API Gateway URL

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    console.log('Fetching books...');
    return this.http.get<any>(`${this.apiUrl}?param=all`).pipe(
      map((response) => {
        // Explicitly parse response if it's a string
        if (typeof response === 'string') {
          try {
            const parsedResponse = JSON.parse(response);
            if (Array.isArray(parsedResponse)) {
              return parsedResponse;
            } else {
              throw new Error('Response is not an array');
            }
          } catch (e) {
            console.error('Error parsing response:', e);
            return [];
          }
        }
        return response; // Assuming response is already an array of Book[]
      }),
      tap((books) => console.log('Parsed books:', books)),
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(error);
      })
    );
  }

  addBook(book: Book): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Adding book:', book); // Log the book being added
    return this.http.post(`${this.apiUrl}?param=add`, book, { headers }).pipe(
      tap((response) => console.log('Add book response:', response)), // Log the response
      catchError(this.handleError)
    );
  }

  deleteBook(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}?param=delete=${id}`)
      .pipe(catchError(this.handleError));
  }

  searchBook(name: string): Observable<Book | null> {
    return this.http.get<string>(`${this.apiUrl}?param=search=${name}`).pipe(
      map((response) => this.parseBook(response)),
      catchError(this.handleError)
    );
  }

  private parseBook(response: string): Book | null {
    try {
      const bookData = JSON.parse(response);
      return {
        id: bookData.id,
        name: bookData.name,
        author: bookData.author,
        edition: bookData.edition,
      };
    } catch (e) {
      console.error('Error parsing book data:', e);
      return null;
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
