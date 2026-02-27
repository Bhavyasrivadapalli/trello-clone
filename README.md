# Trello Clone

A React-based task management application inspired by Trello, built with Vite, Firebase, and Tailwind CSS.

## Features

- **User Authentication**: Sign up and login with Firebase authentication
- **Boards**: Create and manage multiple boards for organizing your projects
- **Lists**: Organize cards within lists for better workflow management
- **Cards**: Create, edit, and move cards between lists with ease
- **Responsive Design**: Fully responsive interface built with Tailwind CSS
- **Real-time Updates**: Powered by Firebase Firestore for real-time data synchronization

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication & Firestore)
- **Build Tool**: Vite


## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://git.beehyv.com/bhavya.vadapalli/trello-clone.git
cd trello-clone
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase configuration:
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration variables

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/       # React components (Board, Card, List, etc.)
├── context/         # React Context for state management
├── firebase/        # Firebase configuration and services
├── layouts/         # Layout components
├── pages/           # Page components
├── routes/          # Route definitions and protected routes
├── services/        # Business logic services
└── styles/          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is licensed under the MIT License.
