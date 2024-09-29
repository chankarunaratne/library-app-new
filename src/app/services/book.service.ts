import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../book-list/book-list.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([
    {
      id: 1,
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      edition: '1st',
    },
    { id: 2, name: '1984', author: 'George Orwell', edition: '1st' },
  ]);

  books$: Observable<Book[]> = this.booksSubject.asObservable();

  addBook(book: Book): void {
    const currentBooks = this.booksSubject.getValue();
    this.booksSubject.next([...currentBooks, book]);
  }

  getBooks(): Book[] {
    return this.booksSubject.getValue();
  }
}
