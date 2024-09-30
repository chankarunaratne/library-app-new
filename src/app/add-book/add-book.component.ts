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
      this.bookService.addBook({ ...this.newBook }).subscribe(
        (response) => {
          console.log('Book added successfully', response);
          this.resetForm();
        },
        (error) => {
          console.error('Error adding book:', error);
          // Handle error (e.g., show error message to user)
        }
      );
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
    // This method might need to be adjusted or removed depending on how you want to handle ID generation
    return false;
  }

  isDuplicateName(): boolean {
    // This method might need to be adjusted or removed depending on your backend implementation
    return false;
  }

  isDuplicateRecord(): boolean {
    // This method might need to be adjusted or removed depending on your backend implementation
    return false;
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
