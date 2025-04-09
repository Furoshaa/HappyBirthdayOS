# Happy Birthday Website

A cute Windows 95-themed birthday website with interactive prompts and a celebration animation.

## Features

- Authentic Windows 95 aesthetic using 98.css
- Interactive dialog windows that ask questions
- "No" button that moves randomly around the screen when clicked
- Desktop icons you can click after the celebration
- Windows 95 taskbar with working clock
- Confetti animation when celebration screen appears
- Responsive design

## How to Use

1. Simply open the website and you'll see a Windows 95-style dialog box asking if you want the best birthday ever.
2. Click "Yes" to proceed through a series of prompts.
3. Try clicking "No" to see what happens!
4. After the third prompt, you'll see a celebration screen with confetti.
5. Click the desktop icons for additional fun interactions.

## Deployment

To deploy this website for your girlfriend's birthday:

1. Build the project with `npm run build`
2. Deploy the contents of the `build` folder to any static hosting service like:
   - GitHub Pages
   - Netlify
   - Vercel
   - Amazon S3

## Development

This project was created with Create React App using TypeScript.

To run the development server:

```
npm start
```

To build for production:

```
npm run build
```

## Customization

- Edit the messages in the dialog boxes in `App.tsx` within the `renderDialogContent` function
- Change colors in `App.css`
- Add more desktop icons or customize the existing ones

## Credits

- Made with ❤️ for a special birthday
- Uses [98.css](https://github.com/jdan/98.css) for Windows 95 styling
