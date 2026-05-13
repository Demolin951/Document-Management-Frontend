# Dashboard UI ToDo

## 1. Base Layout

- [✅] Build AppLayout shell
- [✅] Create fixed left Sidebar
- [✅] Create Topbar / Header
- [✅] Create main content area
- [✅] Add responsive page spacing

Expected:
Sidebar | Main Content

---

## 2. Sidebar

- [✅] Add application logo / title
- [✅] Add navigation menu items
  - [✅] Dashboard
  - [✅] Documents
  - [✅] Shared with me
  - [✅] All Versions
  - [✅] Users
  - [✅] Audit Log
  - [✅] Settings
- [✅] Add active menu state
- [✅] Add bottom user profile section

## 2.1 Sidebar update

- [✅] replace hardcoded items with config
- [✅] add routing support
- [✅] add icons
- [✅] proper active styling

Expected:
matches dashboard design left navigation

---

## 3. Topbar

- [✅] Add dashboard title
- [✅] Add welcome message
- [✅] Add notification icon placeholder
- [✅] Add upload document button

Expected:
top horizontal navigation

---

## 4. Dashboard Content Structure

- [✅] Create DashboardPage layout
- [✅] Add content wrapper
- [✅] Split dashboard into sections:
  - [✅] Stats
  - [✅] Recent Documents
  - [✅] Recent Activity

Expected:
clean dashboard composition

---

## 5. Stats Section

- [✅] Create StatCard component
- [✅] Define props:
  - [✅] title
  - [✅] value
  - [✅] subtitle
  - [✅] icon
- [✅] Build 4 stat cards
  - [✅] Total Documents
  - [✅] Total Users
  - [✅] Latest Uploads
  - [✅] Ownership Transfers
- [✅] Add grid layout

Expected:
4 dashboard summary cards

---

## 6. Recent Documents Section

- [✅] Create SectionCard container
- [✅] Add section title
- [✅] Add document list item component
- [✅] Add document icon
- [✅] Add filename
- [✅] Add upload date
- [✅] Add version badge
- [✅] Add "View all documents" link

Expected:
left dashboard content block

---

## 7. Recent Activity Section

- [ ] Create activity list component
- [ ] Add activity item component
- [ ] Add activity icons
- [ ] Add activity description
- [ ] Add timestamps
- [ ] Add "View audit log" link

Expected:
right dashboard content block

---

## 8. Mock Data

- [ ] Create dashboard types
- [ ] Create stats mock data
- [ ] Create recent documents mock data
- [ ] Create recent activity mock data

---

## 9. Styling Polish

- [ ] Shadows
- [ ] Rounded corners
- [ ] Hover states
- [ ] Icon alignment
- [ ] Consistent spacing
- [ ] Typography hierarchy
- [ ] Colors matching design

---

## 10. Responsive Behavior

- [ ] Test desktop layout
- [ ] Handle smaller widths
- [ ] Sidebar collapse strategy (later optional)

---

Definition of Done:
Dashboard visually matches chosen design mockup with static mock data.

Legenda:
✅ - Fertig
🔄 - Im Prozess
