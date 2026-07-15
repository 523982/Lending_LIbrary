import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import BookCard from '../pages/BookCard';
import '../pages/BookList.css'; // CSS for the grid layout

const isObsoleteBook = (book) => {
    const statusId = book.bookstatus?.statusId || book.bookStatus?.statusId || book.statusId;
    const statusName = String(
        book.bookstatus?.statusDesc ||
        book.bookstatus?.statusName ||
        book.bookStatus?.statusDesc ||
        book.bookStatus?.statusName ||
        book.status ||
        ''
    ).toLowerCase();

    return Number(statusId) === 6 || statusName === 'obsolete';
};

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Assuming you have a '/books' endpoint
                const response = await apiClient.get('/books');
                const apiBooks = Array.isArray(response.data) ? response.data : [];
                const visibleBooks = apiBooks.filter(book => !isObsoleteBook(book));
                setBooks(visibleBooks);
                setError(apiBooks.length === 0 ? 'No books found in inventory.' : null);
            } catch (err) {
                console.error("Error fetching books:", err);
                setBooks([]);
                setError("Failed to load books from the inventory API.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="book-list-container">
            <h2>Our Collection</h2>
            {loading && <div>Loading books...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="book-list">
                {!loading && !error && books.map(book => (
                    <BookCard key={book.bookId} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BookList;

