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

### � Search

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

## 🎨 UI / UX

- Built with TailwindCSS
- Fully responsive (mobile hamburger menu, adaptive layouts)
- Sticky navbar with click-based user dropdown
- Animated icons (hover & active states)
- Clean product card layout with wishlist heart icon
- Loading spinner animation
- Gradient buttons and avatars
- Lucide React icons throughout

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

```
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
- TailwindCSS
- Lucide React Icons
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

---

## 📈 Planned Improvements

- Persist cart & wishlist with localStorage or Firestore
- Toast notifications (react-hot-toast)
- Payment integration (Stripe / iyzico)
- 404 page
- Dark mode
- Performance optimization (React.memo)
