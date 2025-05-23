# QuizMaster - Interactive Quiz Application

## Overview

QuizMaster is a dynamic web-based quiz application that allows users to test their knowledge across various subjects. The application features a clean, responsive interface with timed quizzes, multiple difficulty levels, and detailed result analysis.

## Features

- **Multiple Categories**: Choose from various subjects including:

  - General Knowledge
  - History
  - Sports
  - Geography
  - Arts
  - Politics

- **Difficulty Levels**:

  - Beginner
  - Intermediate
  - Advanced

- **Quiz Features**:

  - 25 Questions per quiz
  - Previous/Next navigation
  - Option to end quiz early

- **User Interface**:

  - Clean, responsive design
  - Skeleton loading animations
  - Mobile-friendly layout
  - W3Schools-inspired design
  - Interactive option selection

- **Results Page**:
  - Detailed score analysis
  - Question-by-question review
  - Correct/incorrect answer highlighting
  - Option to start new quiz

## Technical Details

### API Integration

The application uses the Open Trivia Database API:

```javascript
https://opentdb.com/api.php?amount=25&category=[category_id]&difficulty=[difficulty_level]&type=multiple
```

### File Structure

quiz-app/
│
├── index.html # Welcome page with quiz setup
├── quiz.html # Main quiz interface
├── styles.css # Styling for both pages
├── script.js # Welcome page logic
├── quiz.js # Quiz functionality
└── README.md # Documentation

````

### Dependencies
- No external JavaScript libraries required
- Uses Google Fonts (Poppins)
- Modern browser with localStorage support

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd quiz-app
````

2. **Server Requirements**

   - Must be served from a web server (not file system)
   - Any static file server will work (e.g., Live Server for VS Code)

3. **Running the Application**
   - Start your web server
   - Navigate to index.html
   - Select category and difficulty
   - Begin quiz

## Implementation Details

### Timer System

- 25-minute countdown
- Color-coded warnings:
  - Yellow: Last 10 minutes
  - Red: Last 5 minutes
- Auto-submits when time expires

### Scoring System

- 1 point per correct answer
- Final score shown as:
  - Raw score (X/25)
  - Percentage
  - Time taken

### Local Storage

Used for:

- Storing quiz settings between pages
- Maintaining selected answers
- Preserving quiz state

### Responsive Design

- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6 support

## Known Limitations

1. Requires internet connection for API access
2. No offline support
3. Session not preserved on page refresh
4. Limited to multiple choice questions

## Future Enhancements

1. Offline mode support
2. User accounts and progress tracking
3. Custom quiz creation
4. Additional question types
5. Social sharing features
6. Performance analytics
7. Dark mode support

## Troubleshooting

### Common Issues

1. **Quiz Not Loading**

   - Check internet connection
   - Verify API endpoint accessibility
   - Clear browser cache

2. **Timer Issues**

   - Ensure browser tab is active
   - Check system time accuracy
   - Clear browser cache

3. **Display Problems**
   - Try different browser
   - Clear cache and reload
   - Check zoom settings

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - feel free to use and modify for your own projects.

## Credits

- Questions provided by Open Trivia Database
- Design inspired by W3Schools
- Font: Google Fonts (Poppins)

## Contact

skaichima@gmail.com

---

_Last Updated: 19th April,2025_
