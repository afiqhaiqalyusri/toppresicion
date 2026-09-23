# Product Requirements Document (PRD)
## Top Precision Manufacturing Website

### 1. Product Overview
**Project Name:** Top Precision Manufacturing Corporate Website
**Company:** Top Precision Manufacturing Sdn. Bhd.
**Tagline:** Engineering Precision. Delivering Excellence.
**Description:** A professional, responsive corporate website designed to showcase Top Precision Manufacturing's capabilities in CNC machining, sheet metal fabrication, and box build assembly. The website aims to attract B2B industrial clients across sectors such as Industrial Equipment, Electrical Enclosures, Precision Components, and Custom Assemblies.

### 2. Objectives & Goals
* **Establish Online Presence:** Provide a modern, clean, and professional digital storefront for the company established in March 2024.
* **Lead Generation:** Drive inquiries and Request for Quotes (RFQs) through prominent Call-To-Action (CTA) buttons and a contact form.
* **Showcase Capabilities:** Clearly communicate the company's core services (CNC Machining, Sheet Metal Fabrication, Box Build Assembly) with supporting details like machine specifications and materials.
* **Build Trust:** Highlight ISO 9001:2015, AS9100, and ISO 14001:2015 certifications, as well as company policies (Quality, Environmental, Health & Safety).
* **Recruitment:** Provide a dedicated careers page to attract talent for manufacturing and engineering roles.

### 3. Target Audience
* **Primary:** Procurement managers, engineers, and operations directors in sectors like Automation/Robotics, Semiconductor, Automotive, Medical, and Oil & Gas.
* **Secondary:** Potential employees, investors, and business partners.

### 4. Key Features & Pages
#### 4.1. Public-Facing Pages
* **Home Page:** High-impact hero section, overview of services, industries served, and strong CTAs ("Request a Quote").
* **About Us:** Company history, mission/vision, core values, and facilities overview.
* **Services / Capabilities:** Detailed breakdown of core capabilities (CNC Machining, Box Build Assembly). Includes machine lists, materials, and tolerances.
* **Quality & Facilities:** Information on quality policies, certifications (ISO), and manufacturing environment.
* **Careers:** Job listings (CNC Machinist, Quality Inspector, etc.) and internship programs.
* **Contact Us:** Factory address, Google Maps embed, phone number, and email addresses (RFQ & General Enquiry).

#### 4.2. Admin & Content Management
* **Data Source:** Website content is primarily driven by a structured JSON file (`data/siteContent.json`), enabling easy updates to text, services, jobs, and policies without editing code directly.
* **Admin Dashboard:** An administrative interface (`/admin/dashboard`) to manage site content, view inquiries, and handle updates efficiently.

### 5. Technical Requirements
#### 5.1. Tech Stack
* **Frontend:** HTML5, CSS3 (Vanilla or custom styling), JavaScript. Responsive design for mobile, tablet, and desktop viewing.
* **Backend:** PHP (Custom routing system via `router.php` and `api.php`).
* **Data Storage:** JSON-based data management (`data/siteContent.json`).
* **Server:** Apache (production via `.htaccess`) / PHP Built-in Server (local testing).

#### 5.2. Performance & SEO
* **SEO:** Meta tags, semantic HTML, and descriptive URLs (slug-based routing for services).
* **Performance:** Optimized images, deferred loading of non-critical JS, and fast server response times.

### 6. Content Strategy
* **Messaging:** Focus on "Precision," "Quality," and "Integrated Solutions." Tone should be professional, technical, and trustworthy.
* **Visuals:** High-quality imagery of CNC workshops, cleanrooms, and specific industry applications.

### 7. Future Enhancements
* Content Management System (CMS) integration with a database (e.g., MySQL) for scalable data handling.
* Client portal for tracking RFQ status and order progress.
* Multi-language support to target broader Southeast Asian markets.
