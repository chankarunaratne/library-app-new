import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Book {
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
export class BookListComponent {
  books: Book[] = [
    {
      id: 1,
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      edition: '1st',
    },
    { id: 2, name: '1984', author: 'George Orwell', edition: '1st' },
    // Add more books as needed
  ];
}
