
A full-stack event booking web application that allows users to browse, search, and book events, as well as manage their profiles. Organisers can create and manage events, while admins can manage users and events.

## Features

- User authentication (signup, login, email verification, password reset)
- Browse, search, and filter events by category
- Book and pay for events (integrated payment gateway)
- User dashboard to view and manage bookings
- Organiser dashboard to create and manage events
- Admin dashboard to manage users and events (block/unblock users)
- Responsive UI with modern design (Tailwind CSS)

## Tech Stack

- **Frontend:** React, Redux, React Router, Tailwind CSS
- **Backend:** (Not included in this repo)
- **API Integration:** RESTful APIs for authentication, event management, and payment

## Folder Structure

```
EventBooking-main/
├── public/                # Static files
├── src/
│   ├── api/               # API connectors and services
│   ├── assest/            # Images and assets
│   ├── components/        # React components (auth, dashboard, common, etc.)
│   ├── Hooks/             # Custom React hooks
│   ├── mocks/             # Mock service worker setup
│   ├── Pages/             # Page components (Home, Catalog, Dashboard, etc.)
│   ├── redux/             # Redux store and slices
│   └── Utils/             # Utility functions
├── data.json              # Sample data
├── package.json           # Project metadata and dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd EventBooking-main
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts
- `npm start` — Start the development server
- `npm run build` — Build for production
- `npm run test` — Run tests (if available)

## Environment Variables
Create a `.env` file in the root directory and add your API endpoints and keys as needed.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---

*This project is for educational/demo purposes. Backend/API endpoints and payment integration should be configured as per your requirements.*
