import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../book-list/book-list.component';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  @ViewChild('bookForm') bookForm!: NgForm;

  newBook: Book = {
    id: 0,
    name: '',
    author: '',
    edition: '',
  };

  constructor(private bookService: BookService) {}

  addBook() {
    if (this.isValidBook()) {
      this.bookService.addBook({ ...this.newBook });
      this.resetForm();
    }
  }

  isValidBook(): boolean {
    return (
      !this.isDuplicateId() &&
      !this.isDuplicateName() &&
      !this.isDuplicateRecord()
    );
  }

  isDuplicateId(): boolean {
    return this.bookService
      .getBooks()
      .some((book) => book.id === this.newBook.id);
  }

  isDuplicateName(): boolean {
    return this.bookService
      .getBooks()
      .some(
        (book) => book.name.toLowerCase() === this.newBook.name.toLowerCase()
      );
  }

  isDuplicateRecord(): boolean {
    return this.bookService
      .getBooks()
      .some(
        (book) =>
          book.id === this.newBook.id &&
          book.name.toLowerCase() === this.newBook.name.toLowerCase() &&
          book.author.toLowerCase() === this.newBook.author.toLowerCase() &&
          book.edition.toLowerCase() === this.newBook.edition.toLowerCase()
      );
  }

  resetForm() {
    this.newBook = {
      id: 0,
      name: '',
      author: '',
      edition: '',
    };
    if (this.bookForm) {
      this.bookForm.resetForm();
    }
  }
}
