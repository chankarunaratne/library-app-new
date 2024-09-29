import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css'],
})
export class DeleteBookComponent {
  bookId: number | null = null;
  message: string = '';
  showMessage: boolean = false;

  constructor(private bookService: BookService) {}

  deleteBook() {
    if (this.bookId !== null) {
      const deleted = this.bookService.deleteBook(this.bookId);
      if (deleted) {
        this.message = 'Book deleted successfully';
      } else {
        this.message = "That book doesn't exist";
      }
      this.showMessage = true;
      this.bookId = null;
    } else {
      this.message = 'Please enter a valid book ID';
      this.showMessage = true;
    }
  }
}
