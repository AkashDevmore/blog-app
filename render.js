const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Define directories
const viewsDir = path.join(__dirname, 'views'); // Directory with EJS files
const outputDir = path.join(__dirname, 'public'); // Directory to output HTML files

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// List of EJS files and corresponding data
const templates = [
  {
    file: 'index.ejs',
    data: {
      posts: [
        { title: 'Sample Post 1', content: 'This is a sample post content.' },
        { title: 'Sample Post 2', content: 'This is another sample post content.' }
      ]
    }
  },
  {
    file: 'edit-post.ejs',
    data: {
      id: '1', // Example post ID
      post: { title: 'Sample Post 1', content: 'This is a sample post content.' }
    }
  },
  {
    file: 'new-post.ejs',
    data: {} // Provide data if needed
  }
];

// Render EJS files to HTML
templates.forEach(({ file, data }) => {
  ejs.renderFile(path.join(viewsDir, file), data, (err, str) => {
    if (err) {
      console.error(`Error rendering ${file}:`, err);
      return;
    }
    // Write HTML to the output directory
    fs.writeFileSync(path.join(outputDir, file.replace('.ejs', '.html')), str);
    console.log(`Converted ${file} to HTML`);
  });
});
