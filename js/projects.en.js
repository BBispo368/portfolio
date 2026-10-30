// English translations of projects.js — keyed by project id. Keep in sync when editing projects.
window.CATEGORIES_EN = {
  web: "Web: clients & personal",
  corp: "Business systems",
  mobile: "Mobile (Android)",
  auto: "Desktop & automation",
};
window.PROJECTS_EN = {
  "crm-vendas": {
    title: "Sales CRM for a Commercial Team",
    summary: "Web CRM with a sales funnel, per-seller targets and real-time updates.",
    description:
      "Single-page CRM built for a client's sales team. It uses email login, data synced in real time across sellers and row-level security in the database, with no server of its own to maintain.",
    features: [
      "Contact management and deal funnel",
      "Sales tracking with a target dashboard and charts by day and by seller",
      "Role-based permissions, including a read-only role",
      "User invitations and password reset by email",
      "Row Level Security in Postgres and automated tests",
    ],
  },
  "redwings": {
    title: "RedWings Adventure",
    summary: "Trail running coaching website with an SEO-optimized blog and an admin panel.",
    description:
      "Website for a trail and mountain running training program. Blog posts are rendered on the server so Google can index them, with a dynamically generated sitemap and robots file. A centralized config file lets the site be reused for another client.",
    features: [
      "Training plans overview (Beginner, Competitor, Elite & Ultra)",
      "Blog with friendly URLs and SSR through serverless functions",
      "Admin panel for articles and events",
      "Dynamic sitemap/robots and Vercel Analytics",
      "Configuration file for white-labeling",
    ],
  },
  "provedor-atendimentos": {
    title: "Service Call Management for an Internet Provider",
    summary: "Tracking of technical visits, installations and transfers with repeat-issue alerts.",
    description:
      "System that helps an internet provider organize field service: who handled the call, the reason, which customer, and how many times the problem came back.",
    features: [
      "Service calls by type and reason (signal, slow speed, installation...)",
      "Automatic repeat-issue alert per customer",
      "Management of customers, plans and installation points",
      "Technician records with direct WhatsApp contact",
      "Dashboard with statistics and reports",
    ],
  },
  "casamento": {
    title: "Wedding Website with RSVP",
    summary: "Wedding site with a gift list, PIX payment by QR code and attendance confirmation.",
    description:
      "Personal project, published with automatic deployment. Guests pick a gift, pay with a PIX QR code generated in the browser, and confirm attendance through a form that writes directly to a spreadsheet.",
    features: [
      "Gift list with images",
      "PIX QR code generated on the client",
      "RSVP with a Google Apps Script backend",
      "Photo gallery",
      "Continuous deployment with GitHub Actions + GitHub Pages",
    ],
  },
  "catalogo": {
    title: "Product Catalog with Shopping Cart",
    summary: "Front-end e-commerce with filters, cart, checkout and light/dark theme.",
    description:
      "Front-end certification project that consumes a REST API of products, with route-based navigation and persisted cart state.",
    features: [
      "Category filter and search",
      "Product detail page",
      "Side cart, checkout and order history",
      "Persisted light/dark theme",
    ],
  },
  "microblog": {
    title: "Microblog",
    summary: "Twitter-style social network with posts of up to 280 characters.",
    description: "Server-side web application built to study Flask, ORM and session authentication.",
    features: ["Sign-up with photo and bio", "Login/logout with Flask-Login", "Post feed", "Jinja templates"],
  },
  "hub-comercial": {
    title: "Sales & Production Hub",
    summary: "Single portal with sales, quotes, price table, planning and a workshop Kanban.",
    description:
      "Internal portal that brought together tools that used to be scattered spreadsheets. Each user sees only the modules enabled for their role.",
    features: [
      "Sales and quote tracking",
      "Price table and commercial planning",
      "Workshop production Kanban",
      "Per-module permissions and PBKDF2-hashed passwords",
      "PDF export and data-loading scripts",
    ],
  },
  "fluxo-caixa": {
    title: "Cash Flow with a Data-Collection Bot",
    summary: "Bank balance forecast fed automatically by a bot that extracts data from the ERP.",
    description:
      "A Python bot logs into the ERP, downloads the transactions and sends them to the database. The web dashboard shows the day-by-day balance forecast and allows manual adjustments.",
    features: [
      "Selenium bot that extracts and cleans ERP data",
      "Heatmap calendar showing the forecast balance",
      "Manual entries and forecasts",
      "Updates with no manual data entry",
    ],
  },
  "controle-os": {
    title: "Work Order Control Dashboard",
    summary: "Imports the ERP work order report (PDF/Excel) and turns it into an interactive dashboard.",
    description:
      "Removes the manual review of the ERP report: the file is read and parsed in the browser, then shown in a dashboard with charts and filters.",
    features: [
      "PDF and Excel parser in the browser",
      "Charts and indicators for work orders",
      "Column-level and user-level permissions",
      "Installable PWA",
    ],
  },
  "acompanhamento-os": {
    title: "Yard Work Order Tracking",
    summary: "Real-time dashboard of work orders with status, deadlines and PDF output.",
    description: "Shared view of work order progress between the workshop and the office, with editing roles.",
    features: ["Real-time status and deadlines", "PDF generation", "Admin and editor roles", "Login with Firebase Auth"],
  },
  "kanban-producao": {
    title: "Production Kanban",
    summary: "Kanban board for the workshop's disassembly, assembly and testing stages.",
    description: "First digital version of the production board, later merged into the Sales & Production Hub.",
    features: ["Draggable production stages", "Real-time sync", "Per-work-order view"],
  },
  "requisicoes": {
    title: "Purchase Requests with Approval",
    summary: "Purchasing workflow with multi-step approval, per-department budget and invoices.",
    description: "Replaced email and paper requests with a traceable workflow, from the request to the receipt of the invoice.",
    features: [
      "5 access roles with an approval workflow",
      "Budget control per department",
      "Invoice attachments",
      "PDF and Excel export and a statistics dashboard",
    ],
  },
  "nf-agro": {
    title: "Invoice Entry: Agribusiness",
    summary: "Control of invoices and installments for the farming operation, with tax ID lookup.",
    description: "Centralizes the farm's invoices and installment due dates, preventing duplicate entries.",
    features: ["Duplicate invoice blocking", "Installment control", "Automatic company tax ID (CNPJ) lookup (BrasilAPI)", "Reports"],
  },
  "inventario-ti": {
    title: "IT Inventory & Management",
    summary: "Equipment inventory with machine usage logging, across web, desktop and tablet.",
    description:
      "Solution on three fronts: a web inventory dashboard, an identification app on workstations (executable) and a tablet app, with an offline queue when there is no network.",
    features: [
      "Web inventory dashboard",
      "Executable that logs access on workstations",
      "Tablet app",
      "Offline queue with later sync",
    ],
  },
  "chat-whatsapp": {
    title: "Internal Chat with WhatsApp Bridge",
    summary: "Corporate chat with conversations, groups and two-way WhatsApp integration.",
    description: "Centralized internal communication, with WhatsApp messages coming in and going out through the same system.",
    features: ["Direct and group conversations", "WhatsApp integration webhook", "Media sending", "Automated deployment"],
  },
  "checklist-veiculos": {
    title: "Digital Vehicle Checklist",
    summary: "Intake and fleet inspections with photos, video, signatures and a PDF report.",
    description:
      "Application migrated from a no-code platform to a custom stack, reducing dependency and cost. It includes damage marking on a vehicle diagram and gamification to engage the team.",
    features: [
      "Photos, video and digital signature",
      "Visual damage marking",
      "PDF report",
      "Inspector gamification",
      "Full migration off a no-code platform",
    ],
  },
  "paineis-tv": {
    title: "Production TV Dashboards",
    summary: "Shop-floor screens with work orders in progress and an auto-scrolling Kanban.",
    description: "Two dashboards for the workshop TVs: one showing the work order in progress with automatic rotation, the other showing the production Kanban with urgent items highlighted.",
    features: ["Automatic rotation and scrolling", "Urgency highlighting", "Logos by equipment brand", "PWA with admin"],
  },
  "site-institucional": {
    title: "Corporate Website with CMS",
    summary: "Public company website with a blog, product catalog and content panel.",
    description: "Corporate website with an admin area where the team can publish posts and products without relying on a developer.",
    features: ["9 public pages", "CMS for posts and products", "Contact message inbox", "SEO and Open Graph"],
  },
  "fichas-faciais": {
    title: "Meal Logging with Face Recognition",
    summary: "Offline Android kiosk app that logs employee meals by face.",
    description:
      "Replaces paper meal slips at a company restaurant. All recognition runs on the device, with an encrypted database and a consent flow compliant with LGPD (Brazil's data protection law).",
    features: [
      "Face check-in with a time window",
      "On-device recognition (MobileFaceNet) with no internet",
      "Database encrypted with SQLCipher",
      "LGPD consent form and audit trail",
      "PDF/CSV reports, backup and kiosk mode",
      "~120 unit tests",
    ],
  },
  "vistoria-android": {
    title: "Vehicle Inspection App",
    summary: "Inspection with photos, 360° video and signature, assisted by generative AI.",
    description: "Native Android version of the vehicle checklist, with local storage and AI features.",
    features: ["Photos and 360° video", "On-screen signature", "Room local database", "Gemini integration"],
  },
  "autosale": {
    title: "AutoSale Desktop",
    summary: "Desktop prospecting app: finds businesses on Google Maps and sends WhatsApp messages.",
    description:
      "Sales prospecting tool with a Windows installer. It searches for businesses by niche and region, builds an offline lead base and sends personalized messages with anti-ban controls.",
    features: [
      "Business search by niche and region",
      "Offline lead base with Excel/CSV import and export",
      "Messages with dynamic tags and spintax",
      "Random intervals, daily limit and time window",
      ".exe installer built with electron-builder",
    ],
  },
  "autoclicker": {
    title: "AutoClicker Pro",
    summary: "Mouse and keyboard automation triggered by pixel color or image recognition.",
    description: "Desktop tool with a modern interface for automating repetitive tasks in any program.",
    features: ["Pixel or image trigger (OpenCV)", "Global F6 hotkey", "CustomTkinter interface", "Standalone executable"],
  },
  "downloader": {
    title: "Media Downloader",
    summary: "Desktop app for downloading videos and audio, with a promotional website.",
    description: "Graphical interface on top of yt-dlp, with audio conversion through ffmpeg and a published landing page.",
    features: ["Video and audio download", "Conversion with ffmpeg", "Modern graphical interface", "Promotional landing page"],
  },
  "carimbo-pdf": {
    title: "Batch PDF Stamping",
    summary: "Applies a header, customer data and logo to batches of work order PDFs.",
    description: "Automates a task that used to be done file by file, processing entire folders in seconds.",
    features: ["Batch processing", "Text and logo overlay", "Keeps the original PDF intact"],
  },
  "suite-ahk": {
    title: "AutoHotkey Automation Suite",
    summary: "IT support panel, quick menus, shift sirens and production target alerts.",
    description:
      "Set of scripts used day to day at the company: tech support shortcuts, automatic shift-change sirens and PPE reminders, a sound alert when the production spreadsheet reaches its target, and control of the TV tablets through ADB.",
    features: [
      "IT panel (Ctrl+Alt+T): ipconfig, sfc, DISM, gpupdate...",
      "Quick menu on the middle mouse button",
      "Shift sirens and safety reminders",
      "Target alert that reads an Excel spreadsheet",
      "Turns tablets on and off via ADB",
    ],
  },
  "scripts-windows": {
    title: "Windows Maintenance Scripts",
    summary: "Memory cleanup and TLS configuration on workstations.",
    description: "Support scripts that standardize and speed up maintenance of the company's machines.",
    features: ["RAM standby list cleanup", "TLS enablement through the registry (HKLM/HKCU)"],
  },
};
