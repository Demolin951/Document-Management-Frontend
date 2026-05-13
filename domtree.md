# Dashboard Component Tree

```text
App
└── AppLayout
    └── div.app-shell
        ├── Sidebar
        │   └── aside
        │       └── div.sidebar-container
        │           ├── div.logo-section
        │           │   └── div.logo-row
        │           │       ├── div.logo-icon
        │           │       └── div.logo-text
        │           │           ├── h1
        │           │           └── p
        │           │
        │           ├── nav.sidebar-nav
        │           │   └── ul
        │           │       ├── SidebarNavItem
        │           │       │   └── li
        │           │       │       └── button
        │           │       │           ├── Icon
        │           │       │           └── span
        │           │       ├── SidebarNavItem
        │           │       ├── SidebarNavItem
        │           │       ├── SidebarNavItem
        │           │       ├── SidebarNavItem
        │           │       └── SidebarNavItem
        │           │
        │           ├── div.spacer
        │           │
        │           └── div.profile-section
        │               └── div.profile-row
        │                   ├── div.avatar
        │                   └── div.profile-text
        │                       ├── p.name
        │                       └── p.role
        │
        └── main
            └── div.content-wrapper
                ├── Topbar
                │   └── header
                │       ├── div.title-block
                │       │   ├── h1
                │       │   └── p
                │       └── Button
                │           └── button
                │
                └── DashboardPage
                    └── div.dashboard-page
                        ├── DashboardStats
                        │   └── section
                        │       └── div.stats-grid
                        │           ├── StatCard
                        │           │   └── article
                        │           │       ├── div.icon-wrapper
                        │           │       ├── p.title
                        │           │       ├── p.value
                        │           │       └── p.subtitle
                        │           ├── StatCard
                        │           ├── StatCard
                        │           └── StatCard
                        │
                        └── div.dashboard-grid
                            ├── RecentDocuments
                            │   └── SectionCard
                            │       └── section
                            │           ├── div.section-header
                            │           │   ├── h2
                            │           │   └── button
                            │           └── div.document-list
                            │               ├── DocumentListItem
                            │               │   └── div
                            │               │       ├── div.file-icon
                            │               │       ├── div.document-info
                            │               │       │   ├── p.filename
                            │               │       │   └── p.date
                            │               │       └── span.version-badge
                            │               └── ...
                            │
                            └── RecentActivity
                                └── SectionCard
                                    └── section
                                        ├── div.section-header
                                        │   ├── h2
                                        │   └── button
                                        └── div.activity-list
                                            ├── ActivityItem
                                            │   └── div
                                            │       ├── div.activity-icon
                                            │       └── div.activity-text
                                            │           ├── p.description
                                            │           └── p.timestamp
                                            └── ...
```