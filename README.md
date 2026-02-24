# 🛍 HookStore

Modern e-commerce frontend project built with React & Firebase.

---

## 🚀 Features

### 🛒 Cart System

- Add products to cart
- Increase / decrease quantity (quantity guard — auto-removes at 0)
- Remove items from cart
- Cart badge counter in navbar
- Clear cart on logout
- Global state management with Context API

---

### ❤️ Wishlist System

- Add / remove products with toggle logic
- Heart icon indicator in ProductCard
- Dedicated Wishlist page (protected route)
- Empty state handling
- Add to cart directly from wishlist
- Clear wishlist on logout

---

### 🔐 Authentication

- Firebase Authentication integration
- Login & Register on the same page (toggle UI)
- Display name support on registration (`updateProfile`)
- Global auth state using AuthContext
- Conditional navbar UI (Login link → User icon dropdown)
- Click-based dropdown menu (Profile, Wishlist, Order History, Logout)
- Responsive hamburger menu for mobile/tablet
- Protected routes for Checkout, Wishlist & Profile pages
- Proper logout flow: clears cart & wishlist, navigates to home

---

### 👤 Profile Page

- Avatar with user's initial (gradient circle)
- Account info cards (email, verified status, member since, last login)
- Edit display name with `updateProfile`
- Change password with `reauthenticateWithCredential` + `updatePassword`
- Success / error feedback messages

---

### 🔍 Search

- Search bar in header with navigation to `/search?q=...`
- Search results page using `useSearchParams`
- Product filtering by title match

---

### 🏷️ Filtering & Categories

- Sidebar layout with pill-style category buttons
- Dynamic categories extracted from products (`useMemo` + `Set`)
- Price range slider with styled UI
- Active filter badges with remove (X) buttons
- "Clear All Filters" functionality
- Product count display ("Showing X of Y products")
- Empty state with icon when no products match

---

### 🔽 Product Sorting

- Sort by price (low to high / high to low)
- Sort by rating (low to high / high to low)
- Default sorting option
- Sidebar dropdown UI matching filter card design
- Immutable sorting with spread operator (`[...array].sort()`)

---

### 📄 Pagination

- Client-side pagination with configurable products per page
- Previous / Next navigation buttons with boundary protection
- Numbered page buttons with active state indicator
- Fixed pagination position at bottom of grid (`min-h` + `mt-auto`)
- Automatic page count based on filtered/sorted product count

---

### 💳 Checkout

- Checkout page with order form & summary (protected route)
- Saves order to Firestore on completion (`addDoc`)
- Navigates to success page after checkout

---

### 📦 Order History

- Fetches user's past orders from Firestore (`getDocs`, `query`, `where`)
- Displays each order with date, status badge, total, and item list
- Loading spinner and empty state
- Responsive layout

---

### ✅ Success Page

- Order confirmation page after successful checkout
- Links to Order History and continue shopping

---

### 🔔 Toast Notifications

- `react-hot-toast` integration
- Cart actions: add / remove feedback
- Wishlist actions: add / remove feedback
- Auth actions: register, login, logout feedback
- Order completion & profile update feedback

---

### 🚫 404 Page

- Custom "Not Found" page for invalid routes
- Catch-all route (`path="*"`) in App.jsx
- Link back to homepage

---

### 🌙 Dark Mode

- Class-based dark mode toggle with Tailwind CSS v4 (`@custom-variant`)
- Sun/Moon icon toggle button in header
- `localStorage` persistence — remembers user preference across sessions
- Global dark mode styles via CSS (`index.css`) for consistent theming
- Per-component `dark:` overrides for special cases (image backgrounds stay white)
- Covers all pages: Header, Footer, ProductCard, Cart, Wishlist, Checkout, Profile, Auth, OrderHistory, ProductDetail, Success, 404

---

## 🎨 UI / UX

- Built with Tailwind CSS v4
- Fully responsive (mobile hamburger menu, adaptive layouts)
- Dark mode support across all components
- Sticky navbar with click-based user dropdown
- Animated icons (hover & active states)
- Clean product card layout with wishlist heart icon
- Loading spinner animation
- Gradient buttons and avatars
- Lucide React icons throughout
- Toast notifications for user feedback
- Fixed pagination positioning

---

## 🧠 Technical Architecture

- React (Functional Components + Hooks)
- React Router v6 (nested routes, protected routes, `useSearchParams`, `useNavigate`)
- Context API
  - `AuthContext` — login, register, logout, currentUser
  - `CartContext` — cart CRUD + clearCart
  - `WishlistContext` — toggle + clearWishlist
  - `ProductContext` — products, loading state, searchProducts
- Firebase Authentication (`signIn`, `signOut`, `updateProfile`, `updatePassword`, `reauthenticateWithCredential`)
- Cloud Firestore (`addDoc`, `getDocs`, `query`, `where`, `collection`)
- Immutable state updates (object-based state)

---

## 📂 Project Structure


src/
├─ app/
│  └─ App.jsx
│
├─ components/
│  ├─ Cart.jsx
│  ├─ Footer.jsx
│  ├─ Header.jsx
│  ├─ Layout.jsx
│  └─ ProductCard.jsx
│
├─ pages/
│  ├─ About.jsx
│  ├─ AuthPage.jsx
│  ├─ Blog.jsx
│  ├─ CheckoutPage.jsx
│  ├─ Home.jsx
│  ├─ Login.jsx
│  ├─ NotFoundPage.jsx
│  ├─ OrderHistoryPage.jsx
│  ├─ ProductDetail.jsx
│  ├─ ProductPages.jsx
│  ├─ ProfilePage.jsx
│  ├─ SearchPage.jsx
│  ├─ successPage.jsx
│  └─ WishlistPage.jsx
│
├─ context/
│  ├─ AuthContext.jsx
│  ├─ CartContext.jsx
│  ├─ WishlistContext.jsx
│  ├─ ProductContext.jsx
│  └─ ProtectedRoute.jsx
│
├─ services/
│  └─ firebase.jsx
├─ hooks/
├─ types/
├─ main.jsx
└─ index.css
```

---

## 🛠 Technologies Used

- React
- React Router v6
- Firebase Authentication
- Cloud Firestore
- Tailwind CSS v4
- Lucide React Icons
- react-hot-toast
- Vite

---

## 📌 What I Practiced

- Context API architecture (multi-provider setup)
- Immutable state management (object-based cart/wishlist)
- Toggle logic design
- Protected routes with `Navigate`
- Firebase Auth flows (register, login, logout, updateProfile, updatePassword, reauthenticate)
- Firestore CRUD (addDoc, getDocs, query, where)
- Dynamic filtering with `useMemo` and `Set`
- URL-based search with `useSearchParams`
- Responsive design with breakpoint-based classes
- Component-based structure
- Async/await error handling
- Array manipulation (`sort`, `slice`, `Array.from`)
- Dark mode with Tailwind CSS v4 (`@custom-variant`, global CSS overrides)
- `localStorage` for persisting user preferences
- Client-side pagination logic
- CSS layout techniques (`flex-col` + `mt-auto` for fixed positioning)

---

## 📈 Planned Improvements

- Persist cart & wishlist with localStorage or Firestore
- Payment integration (Stripe / iyzico)
- Performance optimization (React.memo, lazy loading)
- Product reviews & ratings
- User address management
- Order detail page
- Skeleton loading states
