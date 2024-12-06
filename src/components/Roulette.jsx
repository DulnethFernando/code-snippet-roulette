import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, CircularProgress, FormControl, Select, MenuItem, Chip, IconButton, Snackbar } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CodeIcon from '@mui/icons-material/Code';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import '../styles/prism-custom.css';
import '../styles/scrollbar.css';
import SavedSnippets from './SavedSnippets';

const snippets = [
  // Arrays - Easy
  {
    id: 1,
    title: 'Array Map Transformation',
    category: 'Arrays',
    difficulty: 'Easy',
    explanation: 'The map() method creates a new array with the results of calling a function for every array element.',
    code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]`,
    useCase: 'Use map() when you need to transform each element in an array in the same way.',
    exercise: 'Create a function that takes an array of temperatures in Celsius and returns an array with temperatures in Fahrenheit.'
  },
  // Arrays - Medium
  {
    id: 2,
    title: 'Array Filter and Reduce',
    category: 'Arrays',
    difficulty: 'Medium',
    explanation: 'Combining filter() and reduce() allows you to filter elements and then perform calculations on the filtered results.',
    code: `const orders = [
  { id: 1, total: 200, status: 'completed' },
  { id: 2, total: 300, status: 'pending' },
  { id: 3, total: 150, status: 'completed' }
];

const completedTotal = orders
  .filter(order => order.status === 'completed')
  .reduce((sum, order) => sum + order.total, 0);

console.log(completedTotal); // 350`,
    useCase: 'Use filter() and reduce() together when you need to filter data and then perform calculations on the filtered results.',
    exercise: 'Create a function that takes an array of products and calculates the total price of all in-stock items.'
  },
  // Objects - Easy
  {
    id: 3,
    title: 'Object Destructuring',
    category: 'Objects',
    difficulty: 'Easy',
    explanation: 'Object destructuring allows you to extract multiple properties from an object and assign them to variables.',
    code: `const user = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const { name, age } = user;
console.log(name); // 'John'
console.log(age);  // 30`,
    useCase: 'Use destructuring to extract specific properties from objects, making code cleaner and more readable.',
    exercise: 'Create a function that takes a product object and destructures its price and quantity to calculate the total cost.'
  },
  // Objects - Medium
  {
    id: 4,
    title: 'Object Methods and This',
    category: 'Objects',
    difficulty: 'Medium',
    explanation: 'Objects can contain methods that use "this" to reference the object itself.',
    code: `const calculator = {
  value: 0,
  add(num) {
    this.value += num;
    return this;
  },
  subtract(num) {
    this.value -= num;
    return this;
  },
  getResult() {
    return this.value;
  }
};

console.log(
  calculator
    .add(5)
    .subtract(2)
    .getResult() // 3
);`,
    useCase: 'Use object methods with method chaining when you need to perform multiple operations on the same object.',
    exercise: 'Create a bank account object with methods for deposit, withdraw, and checking balance.'
  },
  // DOM - Easy
  {
    id: 5,
    title: 'Basic DOM Manipulation',
    category: 'DOM',
    difficulty: 'Easy',
    explanation: 'DOM manipulation involves selecting elements and modifying their content or attributes.',
    code: `// Selecting elements
const title = document.getElementById('title');
const buttons = document.querySelectorAll('.btn');

// Modifying content and attributes
title.textContent = 'Hello World';
title.style.color = 'blue';
title.classList.add('active');

// Creating new elements
const div = document.createElement('div');
div.innerHTML = '<span>New Content</span>';
document.body.appendChild(div);`,
    useCase: 'Use DOM manipulation to update webpage content and styling dynamically.',
    exercise: 'Create a function that adds a new list item to an unordered list when a button is clicked.'
  },
  // DOM - Medium
  {
    id: 6,
    title: 'Event Delegation',
    category: 'DOM',
    difficulty: 'Medium',
    explanation: 'Event delegation allows you to handle events on multiple elements using a single event listener on their parent.',
    code: `const todoList = document.querySelector('.todo-list');

todoList.addEventListener('click', function(event) {
  if (event.target.matches('.delete-btn')) {
    const todoItem = event.target.closest('.todo-item');
    todoItem.remove();
  } else if (event.target.matches('.edit-btn')) {
    const todoText = event.target
      .closest('.todo-item')
      .querySelector('.todo-text');
    todoText.contentEditable = true;
    todoText.focus();
  }
});`,
    useCase: 'Use event delegation when you have multiple similar elements that need event handling, especially for dynamically added elements.',
    exercise: 'Create a dynamic table where clicking column headers sorts the table by that column.'
  },
  // Functions - Easy
  {
    id: 7,
    title: 'Arrow Functions',
    category: 'Functions',
    difficulty: 'Easy',
    explanation: 'Arrow functions provide a concise syntax for writing function expressions.',
    code: `// Regular function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const addArrow = (a, b) => a + b;

// Arrow function with object return
const createUser = (name, age) => ({ name, age });

// Arrow function in array methods
const numbers = [1, 2, 3];
const squared = numbers.map(num => num * num);`,
    useCase: 'Use arrow functions for short callbacks and when you want to preserve the lexical scope of this.',
    exercise: 'Convert a set of traditional functions into arrow functions and use them with array methods.'
  },
  // Functions - Medium
  {
    id: 8,
    title: 'Closure Factory',
    category: 'Functions',
    difficulty: 'Medium',
    explanation: 'Function factories use closures to create specialized functions with preset values.',
    code: `function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Another example with private state
function createCounter(initialValue = 0, step = 1) {
  let count = initialValue;
  
  return {
    increment() {
      count += step;
      return count;
    },
    getCount() {
      return count;
    }
  };
}`,
    useCase: 'Use function factories when you need to create functions with preset configurations or maintain private state.',
    exercise: 'Create a function factory that generates custom validation functions with preset rules.'
  },
  // Async - Easy
  {
    id: 9,
    title: 'Basic Promises',
    category: 'Async',
    difficulty: 'Easy',
    explanation: 'Promises represent a future value and provide a clean way to handle asynchronous operations.',
    code: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(1000)
  .then(() => console.log('One second passed'))
  .catch(error => console.error('Error:', error));

// Converting callback to promise
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    readFile(filename, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}`,
    useCase: 'Use promises to handle asynchronous operations like API calls, file operations, or delayed executions.',
    exercise: 'Create a promise-based function that simulates fetching user data with a random delay.'
  },
  // Async - Medium
  {
    id: 10,
    title: 'Async/Await with Error Handling',
    category: 'Async',
    difficulty: 'Medium',
    explanation: 'Async/await with proper error handling provides a cleaner way to work with promises.',
    code: `async function fetchUserData(userId) {
  try {
    const user = await fetch(\`/api/users/\${userId}\`);
    const posts = await fetch(\`/api/posts?userId=\${user.id}\`);
    const comments = await fetch(\`/api/comments?postId=\${posts[0].id}\`);
    
    return {
      user: await user.json(),
      posts: await posts.json(),
      comments: await comments.json()
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch user data');
  }
}

// Using Promise.all for parallel requests
async function fetchUserDataParallel(userId) {
  try {
    const [user, posts, comments] = await Promise.all([
      fetch(\`/api/users/\${userId}\`).then(r => r.json()),
      fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),
      fetch(\`/api/comments?userId=\${userId}\`).then(r => r.json())
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
    useCase: 'Use async/await with proper error handling for complex asynchronous operations that require sequential or parallel execution.',
    exercise: 'Create an async function that fetches data from multiple APIs and combines the results, with proper error handling and retries.'
  },
  // Classes - Easy
  {
    id: 11,
    title: 'Basic Class Syntax',
    category: 'Classes',
    difficulty: 'Easy',
    explanation: 'Classes provide a clean syntax for creating objects with shared properties and methods.',
    code: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.getArea());      // 15
console.log(rect.getPerimeter()); // 16`,
    useCase: 'Use classes to create blueprints for objects that share similar properties and behaviors.',
    exercise: 'Create a Circle class with methods to calculate area and circumference.'
  },
  // Classes - Medium
  {
    id: 12,
    title: 'Class Inheritance and Polymorphism',
    category: 'Classes',
    difficulty: 'Medium',
    explanation: 'Class inheritance allows you to create specialized classes based on existing ones, while polymorphism allows different classes to be treated as instances of the same class.',
    code: `class Shape {
  constructor(color) {
    this.color = color;
  }

  getArea() {
    throw new Error('getArea() must be implemented');
  }

  describe() {
    return \`A \${this.color} shape with area \${this.getArea()}\`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(color, side) {
    super(color);
    this.side = side;
  }

  getArea() {
    return this.side ** 2;
  }
}

const shapes = [
  new Circle('red', 5),
  new Square('blue', 4)
];

shapes.forEach(shape => {
  console.log(shape.describe());
});`,
    useCase: 'Use class inheritance and polymorphism when you have a hierarchy of related objects that share common behavior but have specific implementations.',
    exercise: 'Create a hierarchy of Employee classes (Manager, Developer, Designer) with shared and specific behaviors.'
  }
];

// Get unique categories and difficulties from snippets
const categories = Array.from(new Set(snippets.map(snippet => snippet.category)));
const difficulties = Array.from(new Set(snippets.map(snippet => snippet.difficulty)));

const Roulette = () => {
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [savedSnippets, setSavedSnippets] = useState(() => {
    const saved = localStorage.getItem('savedSnippets');
    return saved ? JSON.parse(saved) : [];
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('savedSnippets', JSON.stringify(savedSnippets));
  }, [savedSnippets]);

  useEffect(() => {
    if (currentSnippet) {
      Prism.highlightAll();
    }
  }, [currentSnippet]);

  const handleSaveSnippet = () => {
    if (!currentSnippet) return;

    if (savedSnippets.some(s => s.id === currentSnippet.id)) {
      setSavedSnippets(savedSnippets.filter(s => s.id !== currentSnippet.id));
      setSnackbarMessage('Snippet removed from saved items');
    } else {
      setSavedSnippets([...savedSnippets, currentSnippet]);
      setSnackbarMessage('Snippet saved for later!');
    }
    setSnackbarOpen(true);
  };

  const copyToClipboard = async () => {
    if (!currentSnippet) return;
    try {
      await navigator.clipboard.writeText(currentSnippet.code);
      setSnackbarMessage('Code copied to clipboard!');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Failed to copy code');
      setSnackbarOpen(true);
    }
  };

  const runCode = () => {
    if (!currentSnippet) return;
    try {
      // Create a safe environment for running code
      const code = currentSnippet.code;
      const consoleOutput = [];
      const mockConsole = {
        log: (...args) => consoleOutput.push(args.join(' ')),
        error: (...args) => consoleOutput.push('Error: ' + args.join(' ')),
        warn: (...args) => consoleOutput.push('Warning: ' + args.join(' '))
      };
      
      const fn = new Function('console', code);
      fn(mockConsole);
      
      setSnackbarMessage('Output: ' + consoleOutput.join('\\n'));
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Error running code: ' + err.message);
      setSnackbarOpen(true);
    }
  };

  const spinRoulette = () => {
    setIsSpinning(true);
    
    // Create a copy of snippets array
    let availableSnippets = [...snippets];
    console.log('Available snippets:', availableSnippets.length);
    
    // Apply filters if selected
    if (selectedCategory) {
      availableSnippets = availableSnippets.filter(s => s.category === selectedCategory);
      console.log('After category filter:', availableSnippets.length);
    }
    
    if (selectedDifficulty) {
      availableSnippets = availableSnippets.filter(s => s.difficulty === selectedDifficulty);
      console.log('After difficulty filter:', availableSnippets.length);
    }
    
    // Check if we have any snippets after filtering
    if (availableSnippets.length === 0) {
      console.log('No snippets available with current filters');
      setCurrentSnippet(null);
      setIsSpinning(false);
      return;
    }
    
    // Select a random snippet
    const randomIndex = Math.floor(Math.random() * availableSnippets.length);
    const selectedSnippet = availableSnippets[randomIndex];
    console.log('Selected snippet:', selectedSnippet);
    
    setTimeout(() => {
      setCurrentSnippet(selectedSnippet);
      setIsSpinning(false);
    }, 1000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4caf50';
      case 'Medium': return '#ff9800';
      case 'Hard': return '#f44336';
      default: return '#757575';
    }
  };

  const handleRemoveSaved = (id) => {
    setSavedSnippets(savedSnippets.filter(s => s.id !== id));
    setSnackbarMessage('Snippet removed from saved items');
    setSnackbarOpen(true);
  };

  const handleSelectSaved = (snippet) => {
    setCurrentSnippet(snippet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      <Card sx={{ mb: 4, p: { xs: 2, sm: 3 }, background: 'linear-gradient(45deg, #3f51b5 30%, #757de8 90%)', color: 'white' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: 1, width: '100%' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <Select
                value={selectedCategory}
                displayEmpty
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Category</span>;
                  }
                  return selected;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 300, marginTop: 1 }
                  }
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1, width: '100%' }}>
            <FormControl fullWidth variant="outlined" size="small">
              <Select
                value={selectedDifficulty}
                displayEmpty
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Difficulty</span>;
                  }
                  return selected;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 300, marginTop: 1 }
                  }
                }}
              >
                <MenuItem value="">All Difficulties</MenuItem>
                {difficulties.map(difficulty => (
                  <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              variant="contained"
              onClick={spinRoulette}
              disabled={isSpinning}
              startIcon={<CasinoIcon />}
              sx={{
                bgcolor: 'white',
                color: '#3f51b5',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
                width: { xs: '100%', sm: 'auto' },
                minWidth: { sm: 150 }
              }}
            >
              {isSpinning ? 'Spinning...' : 'Spin'}
            </Button>
          </Box>
        </Box>
      </Card>

      {isSpinning ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress size={60} />
        </Box>
      ) : currentSnippet ? (
        <Card sx={{ 
          p: { xs: 2, sm: 3 }, 
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: 2
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CodeIcon sx={{ color: 'primary.main', fontSize: { xs: 24, sm: 32 } }} />
                <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  {currentSnippet.title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, ml: { xs: 0, sm: 'auto' } }}>
                <IconButton
                  onClick={handleSaveSnippet}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  {savedSnippets.some(s => s.id === currentSnippet.id) 
                    ? <BookmarkIcon /> 
                    : <BookmarkBorderIcon />}
                </IconButton>
                <Chip
                  label={currentSnippet.category}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={currentSnippet.difficulty}
                  color={currentSnippet.difficulty === 'Easy' ? 'success' : 'warning'}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              {currentSnippet.explanation}
            </Typography>

            <pre className="language-javascript line-numbers">
              <code className="language-javascript">{currentSnippet.code}</code>
            </pre>

            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                <IconButton
                  onClick={copyToClipboard}
                  size="small"
                  title="Copy code"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={runCode}
                  size="small"
                  title="Run code"
                  color="primary"
                >
                  <PlayArrowIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mt: 3
            }}>
              <FitnessCenterIcon sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} /> Practice Exercise:
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              {currentSnippet.exercise}
            </Typography>
          </CardContent>
        </Card>
      ) : null}

      <SavedSnippets 
        snippets={savedSnippets}
        onRemove={handleRemoveSaved}
        onSelect={handleSelectSaved}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Roulette;
