# 🛍 HookStore

Modern e-commerce frontend project built with React.

---

## 🚀 Features

### 🛒 Cart System

- Add products to cart
- Increase / decrease quantity
- Remove items from cart
- Cart badge counter in navbar
- Global state management with Context API

---

### ❤️ Wishlist System

- Add / remove products with toggle logic
- Heart icon indicator in ProductCard
- Wishlist counter in navbar
- Dedicated Wishlist page
- Empty state handling
- Add to cart directly from wishlist

---

### 🔐 Authentication

- Firebase Authentication integration
- Login & Register on the same page
- Global auth state using AuthContext
- Conditional navbar UI (Login → User icon)
- Hover dropdown menu for authenticated users

---

## 🎨 UI / UX

- Built with TailwindCSS
- Responsive layout
- Sticky navbar
- Animated icons (hover & active states)
- Clean product card layout
- Absolute positioned wishlist heart icon

---

## 🧠 Technical Architecture

- React (Functional Components)
- React Router
- Context API
  - CartContext
  - WishlistContext
  - AuthContext
- Firebase Authentication
- Immutable state updates
- Object-based state management
- Toggle logic implementation

---

## 📂 Project Structure

# 🛍 HookStore

Modern e-commerce frontend project built with React.

---

## 🚀 Features

### 🛒 Cart System

- Add products to cart
- Increase / decrease quantity
- Remove items from cart
- Cart badge counter in navbar
- Global state management with Context API

---

### ❤️ Wishlist System

- Add / remove products with toggle logic
- Heart icon indicator in ProductCard
- Wishlist counter in navbar
- Dedicated Wishlist page
- Empty state handling
- Add to cart directly from wishlist

---

### 🔐 Authentication

- Firebase Authentication integration
- Login & Register on the same page
- Global auth state using AuthContext
- Conditional navbar UI (Login → User icon)
- Hover dropdown menu for authenticated users

---

## 🎨 UI / UX

- Built with TailwindCSS
- Responsive layout
- Sticky navbar
- Animated icons (hover & active states)
- Clean product card layout
- Absolute positioned wishlist heart icon

---

## 🧠 Technical Architecture

- React (Functional Components)
- React Router
- Context API
  - CartContext
  - WishlistContext
  - AuthContext
- Firebase Authentication
- Immutable state updates
- Object-based state management
- Toggle logic implementation

---

## 📂 Project Structure


```bash
src/
 ├─ app/
 │   ├─ App.jsx
 │
 ├─ components/
 │   ├─ Cart.jsx
 │   ├─ Footer.jsx
 │   ├─ Header.jsx
 │   ├─ Layout.jsx
 │   ├─ ProductCard.jsx
 │
 ├─ pages/
 │   ├─ About.jsx
 │   ├─ AuthPage.jsx
 │   ├─ Blog.jsx
 │   ├─ Home.jsx
 │   ├─ Login.jsx
 │   ├─ ProductDetail.jsx
 │   ├─ ProductPages.jsx
 │   ├─ WishlistPage.jsx
 │
 ├─ context/
 │   ├─ AuthContext.jsx
 │   ├─ CartContext.jsx
 │   ├─ WishlistContext.jsx
 │   ├─ ProductContext.jsx
 │
 ├─ services/
 ├─ hooks/
 ├─ types/
 ├─ main.jsx
 ├─ index.css
```


## 📌 What I Practiced

- Context API architecture
- Immutable state management
- Toggle logic design
- Conditional rendering
- Component-based structure
- Debugging render behavior
- Clean UI structuring

---

## 📈 Planned Improvements

- Persist cart & wishlist with localStorage
- Restrict wishlist to authenticated users
- Payment integration
- Performance optimization (React.memo)
- Feature-based folder structure
