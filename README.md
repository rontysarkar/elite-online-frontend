# ⚡ Elite Online

**A simple way for local internet providers to manage customers, monthly bills and payment collection, all in one place.**

| | |
|---|---|
| 🌐 **Live site** | [https://elite-online-frontend.vercel.app/](https://elite-online-frontend.vercel.app/) |
| 🛠️ **Backend repository** | [https://github.com/rontysarkar/elite-online-backend](https://github.com/rontysarkar/elite-online-backend) |

---

## 📖 About the Project

**Elite Online** is a web application built for a local Internet Service Provider (ISP).

Small internet providers often run their business with paper registers, spreadsheets and phone calls. Elite Online replaces all of that with one system:

- A person who wants internet can **apply for a connection online**.
- The provider's team **approves the request** and keeps every customer's record in one place.
- **Monthly bills are generated automatically** for every active customer.
- Field **collectors collect cash** in their own areas using their phone.
- Customers can **see their bills, pay online (bKash) and download proof of payment** as an invoice.

Everyone sees only what they need, and nothing is lost in a notebook.

---

## 🎯 The Real-World Problem

Local ISPs usually face the same everyday problems:

| Problem | How Elite Online solves it |
|---|---|
| Customer details are scattered across notebooks, Excel files and phone contacts | One central database for all users, customers, areas and packages |
| Bills are written by hand every month, so mistakes and missed customers are common | Admin generates all monthly bills with a single click |
| Nobody knows exactly how much money is collected, pending or overdue | Live dashboard with total billed, paid, unpaid, overdue and collection rate |
| Collectors need a quick way to find who owes money in their area | Mobile-friendly bill list with search and filters (status, month, year, area) and a one-tap **Pay** action |
| Customers have to call or visit the office to ask about their bill | Customers can check bills and pay online at any time |
| Disputes about "I already paid" | Every payment is recorded with method, date, transaction ID and a printable invoice |
| New connection requests get lost | Online request form with email verification, reviewed and accepted by the admin |

---

## 👥 Who Uses It

| Role | What they can do |
|---|---|
| **Visitor** | Request a new connection (choose area and package) and verify their email |
| **Admin** | See the billing dashboard, manage users, customers, collectors and connection requests, and generate monthly bills |
| **Collector** | See and search bills of their assigned areas and record cash payments |
| **Customer** | View pending and paid bills, pay online, open invoices and manage their profile |

---

## 🔄 How It Works

1. **Request:** A visitor fills in the *Request a Connection* form (name, phone, email, address, area, package) and verifies their email with a one-time code.
2. **Approve:** The admin reviews the request and accepts it. A customer account is created.
3. **Bill:** At the start of each month the admin clicks **Generate monthly bills**. A bill is created for every active customer.
4. **Pay:** The customer pays online with bKash, **or** the area collector collects cash and marks the bill as paid.
5. **Track:** The admin dashboard updates instantly with totals, payment methods and the collection rate. The customer gets an invoice for every paid bill.

---

## ✨ Features

### 🔐 Authentication & Security
- Login, **forgot password** and **reset password** with an email code (OTP)
- **Email verification** with a one-time code and resend timer
- **Change password** from the profile page
- Role-based access control: `AuthGuard`, `RoleGuard` and route protection, so users can only open pages meant for their role (anything else shows a 404 page)

### 🛡️ Admin
- **Dashboard:** total billed, paid, unpaid and overdue amounts, collection rate ring, bill status breakdown and payment methods (cash vs bKash). Filter by **year, month and collector**
- **Users:** search, filter by role, see active and deleted counts, delete users, pagination
- **Customers:** search and filter by collector, area and status, **create customer**, activate or deactivate, click a customer to see full details and their bill history
- **Connection requests:** review details, check email verification status and **accept** requests
- **Collectors:** see every collector with their areas and number of customers
- **Generate monthly bills** with a confirmation step

### 💼 Collector
- Dedicated **Bills** page designed for mobile use
- Search by name, phone or address
- Filter by **status** (Paid / Unpaid / Overdue), **month**, **year** and **area** (defaults to the current month)
- One-tap **Pay bill** with a confirmation dialog

### 🙋 Customer
- Total due amount and number of pending months at the top of the page
- **Pending** and **Paid** bills listed separately
- **Pay online** for unpaid or overdue bills
- **Invoice** for every paid bill (amount, month, payment method, transaction ID or collector name, date and time)
- Payment success and failure pages

### 🌍 General
- Fully **responsive** (mobile, tablet, desktop)
- **Light and dark mode**
- Loading skeletons, empty states and friendly error messages
- Filters and pagination are stored in the URL, so pages can be refreshed or shared

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js** (App Router) | Framework, routing and layouts |
| **React** + **TypeScript** | UI and type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui** (Base UI) | Accessible UI components |
| **TanStack Query** | Fetching, caching and refreshing data |
| **TanStack Form** + **Zod** | Forms and validation |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** + **TypeScript** | REST API |
| **Prisma ORM** | Database access |

> Full backend details are in the [backend repository](https://github.com/rontysarkar/elite-online-backend).

---

## 🔑 Demo Credentials

Use these accounts to explore the live site.

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@gmail.com` | `12345678` |
| **Collector** | `rabby@gmail.com` | `12345678` |

> These are demo accounts for testing only.


## 🚀 Run Locally

### Prerequisites
- Node.js 18 or newer
- The [backend](https://github.com/rontysarkar/elite-online-backend) running locally (follow its README)

### Steps

```bash
git clone <your-frontend-repository-url>
cd elite-online-frontend
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

> Change the URL to match where your backend is running.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
app/
├── (dashboard)/
│   ├── admin/          # Admin pages
│   ├── collector/      # Collector pages
│   └── customer/       # Customer pages
├── login/ · request-connection/ · verify-email/ ...
└── not-found.tsx       # 404 page
components/
├── dashboard/          # Dashboard UI (shell, tables, modals, cards)
├── guards/             # AuthGuard, RoleGuard, AuthLoading
└── ui/                 # shadcn/ui components
hooks/                  # TanStack Query hooks
config/                 # Sidebar navigation per role
```

---

## 🔭 Future Improvements

- SMS reminders for due and overdue bills
- Downloadable PDF invoices
- Automatic monthly bill generation
- More payment gateways
- Reports export (Excel / PDF)

---

## 👨‍💻 Author

Built by [**rontysarkar**](https://github.com/rontysarkar) as an assignment project.