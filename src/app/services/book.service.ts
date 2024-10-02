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

  ngOnInit() {
    this.getBooks();
  }
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
    return this.http.get<string>(
      `${this.apiUrl}?param=${book.id},${book.name},${book.author},${book.edition}`
    );
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?param=delete=${id}`);
  }

  searchBook(name: string): Observable<Book | null> {
    return this.http
      .get<string>(`${this.apiUrl}?param=search=${name}`)
      .pipe(map((response) => JSON.parse(response)));
  }
}
