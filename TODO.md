# TODO: Buatkan Tampilan untuk Halaman Saldo

## Tasks
- [x] Create Saldo.jsx component with balance display, transaction history, and withdrawal requests
- [x] Add route for /saldo in Router.jsx
- [ ] Test the saldo page navigation and display

## Information Gathered
- The project is a React frontend for an admin panel of Go-Pintar.
- Dashboard structure uses SideNav with Sidebar and NavbarUser.
- Content.jsx shows a dashboard with balance card, stats, action buttons, withdrawal requests, and transaction history.
- Saldo page should be similar but focused on balance management.
- Menu items include "/saldo" path with Wallet icon.
- Router.jsx has routes for dashboard, profil, etc., protected by ProtectedRoute.

## Plan
- Create Saldo.jsx in adminfrontend/src/user/saldo/ with components for:
  - Balance display (similar to dashboard)
  - Transaction history (saldo masuk and keluar)
  - Withdrawal requests management
- Add route in Router.jsx: <Route path="/saldo" element={<ProtectedRoute><Saldo /></ProtectedRoute>}/>
- Import Saldo component in Router.jsx

## Dependent Files
- adminfrontend/src/user/saldo/Saldo.jsx (to be created)
- adminfrontend/src/router/Router.jsx (to add route)

## Followup Steps
- Test navigation to /saldo
- Verify component renders correctly
- Check if any hooks or API calls are needed for data fetching
