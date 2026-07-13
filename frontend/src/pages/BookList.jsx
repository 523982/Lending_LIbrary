import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import BookCard from '../pages/BookCard';
import { sourceBooks } from '../data/sourceSheetData';
import '../pages/BookList.css'; // CSS for the grid layout

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usingSourceData, setUsingSourceData] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Assuming you have a '/books' endpoint
                const response = await apiClient.get('/books');
                const apiBooks = Array.isArray(response.data) ? response.data : [];
                if (apiBooks.length > 0) {
                    setBooks(apiBooks);
                    setUsingSourceData(false);
                } else {
                    setBooks(sourceBooks);
                    setUsingSourceData(true);
                }
            } catch (err) {
                console.error("Error fetching books:", err);
                setBooks(sourceBooks);
                setUsingSourceData(true);
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
            {!loading && usingSourceData && (
                <p className="source-data-note">Showing temporary data from Source Sheet.xlsx.</p>
            )}
            <div className="book-list">
                {!loading && !error && books.map(book => (
                    <BookCard key={book.bookId} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BookList;

