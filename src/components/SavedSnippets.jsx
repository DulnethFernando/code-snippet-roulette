import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, Chip, IconButton, Collapse } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Prism from 'prismjs';

const SavedSnippets = ({ snippets, onRemove, onSelect }) => {
  const [expandedId, setExpandedId] = React.useState(null);

  useEffect(() => {
    if (expandedId) {
      Prism.highlightAll();
    }
  }, [expandedId]);

  if (!snippets.length) {
    return (
      <Card sx={{ mt: 4, bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
        <CardContent>
          <Typography color="text.primary" textAlign="center">
            No saved snippets yet. Click the bookmark icon to save snippets for later!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Saved Snippets
      </Typography>
      {snippets.map((snippet) => (
        <Card key={snippet.id} sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CodeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ flex: 1, color: 'text.primary' }}>
                {snippet.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip
                  label={snippet.category}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={snippet.difficulty}
                  color={snippet.difficulty === 'Easy' ? 'success' : 'warning'}
                  variant="outlined"
                  size="small"
                />
                <IconButton
                  size="small"
                  onClick={() => setExpandedId(expandedId === snippet.id ? null : snippet.id)}
                >
                  {expandedId === snippet.id ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onRemove(snippet.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Collapse in={expandedId === snippet.id}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.primary" paragraph>
                  {snippet.explanation}
                </Typography>
                <pre className="language-javascript line-numbers">
                  <code className="language-javascript">
                    {snippet.code}
                  </code>
                </pre>
                <Box 
                  onClick={() => onSelect(snippet)}
                  sx={{ 
                    mt: 2,
                    p: 2,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.selected'
                    }
                  }}
                >
                  <Typography variant="body2" color="primary">
                    Click to view full snippet
                  </Typography>
                </Box>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SavedSnippets;
