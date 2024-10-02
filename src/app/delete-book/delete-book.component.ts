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
      this.bookService.deleteBook(this.bookId).subscribe(
        (response) => {
          this.bookService.getBooks();
          this.message = 'Book deleted successfully';
          this.showMessage = true;
          this.bookId = null;
        },
        (error) => {
          this.message = 'Error deleting book: ' + error;
          this.showMessage = true;
        }
      );
    } else {
      this.message = 'Please enter a valid book ID';
      this.showMessage = true;
    }
  }
}
