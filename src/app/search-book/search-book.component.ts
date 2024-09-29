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
    // Only perform search if searchQuery is not empty
    if (this.searchQuery.trim()) {
      this.searchPerformed = true;
      const books = this.bookService.getBooks();
      this.foundBook =
        books.find((book) =>
          book.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) || null;
    } else {
      // Reset search state if query is empty
      this.searchPerformed = false;
      this.foundBook = null;
    }
  }
}
