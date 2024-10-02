import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';
import { Book } from '../book-list/book-list.component';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent {
  searchQuery: string = '';
  foundBook: Book | null = null;
  searchPerformed: boolean = false;

  constructor(private bookService: BookService) {}

  searchBook() {
    if (this.searchQuery) {
      this.searchPerformed = true;
      this.bookService.searchBook(this.searchQuery).subscribe(
        (books) => {
          this.foundBook = books; // Assign the array to foundBook
          console.log(books); // Logs the array of books
        },
        (error) => {
          console.error('Error searching for book:', error);
          this.foundBook = null;
        }
      );
    } else {
      this.searchPerformed = false;
      this.foundBook = null;
    }
  }
}
