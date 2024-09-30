import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';

export interface Book {
  id: number;
  name: string;
  author: string;
  edition: string;
}

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (books) => {
        console.log('Received books:', books);
        this.books = books;
      },
      (error) => {
        console.error('Error loading books:', error);
      }
    );
  }
}
