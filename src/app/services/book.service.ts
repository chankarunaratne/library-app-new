import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from '../book-list/book-list.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://your-cloud9-url:8080'; // Replace with your actual Cloud9 URL
  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(
    []
  );
  books$: Observable<Book[]> = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.http.get<Book[]>(`${this.apiUrl}/books`).subscribe(
      (books) => this.booksSubject.next(books),
      (error) => console.error('Error loading books:', error)
    );
  }

  addBook(book: Book): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/books`, book)
      .pipe(tap(() => this.loadBooks()));
  }

  getBooks(): Observable<Book[]> {
    return this.books$;
  }

  deleteBook(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/books/${id}`)
      .pipe(tap(() => this.loadBooks()));
  }

  searchBook(name: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/search/${name}`);
  }
}
