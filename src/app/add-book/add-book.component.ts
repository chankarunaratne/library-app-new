import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../book-list/book-list.component'; // Import the Book interface
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
    id: 0, // Initialize with a default value
    name: '',
    author: '',
    edition: '',
  };

  constructor(private bookService: BookService) {}

  addBook() {
    console.log('Attempting to add book:', this.newBook);
    this.bookService.addBook(this.newBook).subscribe(
      (response) => {
        this.bookService.getBooks();
        console.log('Book added successfully:', response);
        this.resetForm(); // Reset the form after successful addition
      },
      (error) => {
        console.error('Error adding book:', error);
        // Handle error (e.g., show an error message to the user)
      }
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
