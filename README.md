# Letterhead Editor

A free-form document editor with custom letterhead support. Write and format text anywhere on the page, just like Microsoft Word.

## Features

- 📝 **Custom Letterhead**: Set up company name, address, phone, and email
- ✨ **Free-Form Writing**: Click anywhere on the page to add and position text
- 🎨 **Text Formatting**: Font family, size, bold, italic, and underline options
- 💾 **Auto-Save**: Documents and letterhead are automatically saved to your browser
- 🖨️ **Print-Ready**: Format optimized for printing on standard letter-size paper
- 📱 **Responsive**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Initial Setup**: When you first visit, you'll be prompted to enter your letterhead information
2. **Add Text**: Click anywhere on the document to add text
3. **Edit Text**: Click on any text to select it and edit
4. **Format**: Select text and use the toolbar to change font, size, and style
5. **Move Text**: Click and drag text boxes to reposition them
6. **Delete**: Select text and click the Delete button or press Delete key
7. **Print**: Use the Print button or Ctrl+P to print your document
8. **Update Letterhead**: Click "Edit Letterhead" to change your letterhead information

## Keyboard Shortcuts

- `Click` - Add/select text
- `Ctrl/Cmd + Delete` - Delete selected text element
- `Ctrl/Cmd + P` - Print

## Browser Storage

Your documents and letterhead information are stored in your browser's localStorage. Clearing your browser data will remove saved documents.

## Built With

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## License

MIT
