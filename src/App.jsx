import { useState } from "react";

export default function SysOpsWebsite() {
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const FORM_ENDPOINT = "https://formspree.io/f/myegdyej";

  const updateField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
  setSubmitted(true);
  setFormData({
    service: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
}
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const services = [
    {
      number: "01",
      icon: "ri-file-list-3-line",
      title: "Invoice & Billing Management",
      description:
        "End-to-end invoice generation, tracking and reconciliation. Overdue payment chasing, credit control support and billing query resolution.",
      tags: ["Invoice Generation", "Credit Control", "Reconciliation"],
    },
    {
      number: "02",
      icon: "ri-money-pound-circle-line",
      title: "Payroll & Timesheet Processing",
      description:
        "Complete payroll cycles managed end-to-end — timesheet validation, payslip generation, deductions and reconciliation.",
      tags: ["Sage Payroll", "Timesheets", "Payslips"],
    },
    {
      number: "03",
      icon: "ri-shield-check-line",
      title: "Compliance & Documentation",
      description:
        "Worker documentation, certification tracking, renewal reminders, vetting coordination and audit-ready records.",
      tags: ["DBS / Vetting", "Certifications", "Audit Records"],
    },
    {
      number: "04",
      icon: "ri-bar-chart-2-line",
      title: "Data Analysis & Reporting",
      description:
        "Power BI dashboards, KPI tracking, workforce utilisation reports and management packs that make operational data useful.",
      tags: ["Power BI", "KPI Dashboards", "Management Reports"],
    },
    {
      number: "05",
      icon: "ri-settings-3-line",
      title: "Remote Business Operations",
      description:
        "Scheduling, placement coordination, worker database management, client liaison and day-to-day back-office execution.",
      tags: ["Scheduling", "Database", "Operations"],
    },
    {
      number: "06",
      icon: "ri-user-add-line",
      title: "Worker Onboarding & Lifecycle",
      description:
        "Managing the full worker journey — registration, documentation, right-to-work checks, contracts and offboarding administration.",
      tags: ["Onboarding", "Right-to-Work", "Contracts"],
    },
  ];

  const industries = [
    {
      icon: "ri-team-line",
      title: "Staffing & Recruitment",
      text: "Payroll, compliance, onboarding and operational support for temporary, contract and permanent staffing businesses.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Social Care",
      text: "Operational support for home care, residential and supported-living providers with complex workforce requirements.",
    },
    {
      icon: "ri-building-2-line",
      title: "Construction & Labour",
      text: "Worker administration, variable payroll, subcontractor invoicing and site compliance for labour-led businesses.",
    },
    {
      icon: "ri-flashlight-line",
      title: "Utilities & Field Services",
      text: "Certification tracking, workforce payroll and multi-site operational coordination for field engineering teams.",
    },
    {
      icon: "ri-truck-line",
      title: "Transport & Logistics",
      text: "Driver compliance, licence renewals, shift payroll and administration for fleet and logistics operators.",
    },
    {
      icon: "ri-community-line",
      title: "Facilities Management",
      text: "Back-office support for cleaning, security and maintenance companies managing distributed workforces.",
    },
  ];

  const advantages = [
    {
      icon: "ri-award-line",
      title: "9 years of operational experience",
      text: "Practical experience across staffing operations, workforce compliance and payroll coordination.",
    },
    {
      icon: "ri-tools-line",
      title: "Sage-native capability",
      text: "Experienced with Sage Payroll and related operational workflows from day one.",
    },
    {
      icon: "ri-shield-star-line",
      title: "Compliance-led execution",
      text: "DBS, Garda Vetting, CSCS, Gas Safe, CPC and other workforce compliance requirements.",
    },
    {
      icon: "ri-pie-chart-2-line",
      title: "Power BI reporting",
      text: "Operational dashboards and management reporting designed around the information decision-makers actually need.",
    },
    {
      icon: "ri-check-double-line",
      title: "Built around accountability",
      text: "Clear ownership, structured processes and consistent communication rather than generic outsourced support.",
    },
  ];

  const packages = [
    {
      tier: "Tier One",
      title: "Compliance Core",
      price: "£300",
      description:
        "For growing businesses establishing a reliable compliance foundation.",
      features: [
        "Compliance & documentation management",
        "Worker onboarding & lifecycle administration",
        "Digital records & audit preparation",
        "Monthly compliance summary",
      ],
    },
    {
      tier: "Tier Two",
      title: "Full Ops Package",
      price: "£450",
      featured: true,
      description:
        "For businesses ready to outsource their core back-office operations.",
      features: [
        "Everything in Compliance Core",
        "Payroll & timesheet processing",
        "Invoice & billing management",
        "Remote business operations",
        "Power BI KPI dashboard",
      ],
    },
    {
      tier: "Tier Three",
      title: "Dedicated Ops Manager",
      price: "£600",
      description:
        "For higher-volume operations requiring dedicated operational leadership.",
      features: [
        "Everything in Full Ops Package",
        "Dedicated named operations manager",
        "Priority response & escalation",
        "Weekly reporting & reviews",
        "Custom data analysis & dashboards",
      ],
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery",
      text: "We understand your operation, volumes, systems and current pain points.",
    },
    {
      number: "02",
      title: "Proposal",
      text: "You receive a clear scope, recommended structure and transparent pricing.",
    },
    {
      number: "03",
      title: "Onboarding",
      text: "Systems, access, processes and communication workflows are established.",
    },
    {
      number: "04",
      title: "Integration",
      text: "SYS Ops becomes part of your operational workflow without unnecessary disruption.",
    },
    {
      number: "05",
      title: "Go Live",
      text: "We take ownership of agreed processes and begin delivering from day one.",
    },
  ];

  return (
    <div className="sys-site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f7f7f4;
          color: #171717;
          font-family: 'DM Sans', Arial, sans-serif;
        }

        a {
          color: inherit;
        }

        .sys-site {
          min-height: 100vh;
          background: #f7f7f4;
          color: #171717;
          overflow-x: hidden;
        }

        .container {
          width: min(1240px, calc(100% - 64px));
          margin: 0 auto;
        }

        .section {
          padding: 120px 0;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #747474;
        }

        .eyebrow::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16866f;
        }

        h1,
        h2,
        h3,
        .brand {
          font-family: 'Manrope', Arial, sans-serif;
        }

        /* NAV */

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 76px;
          background: rgba(247,247,244,.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #e6e6e1;
        }

        .nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-mark {
          width: 38px;
          height: 38px;
          border: 1.5px solid #171717;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Manrope';
          font-size: 11px;
          font-weight: 800;
          letter-spacing: -.04em;
        }

        .brand-name {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: .13em;
        }

        .brand-sub {
          font-size: 8px;
          letter-spacing: .18em;
          color: #8b8b87;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links a {
          text-decoration: none;
          color: #666662;
          font-size: 13px;
          font-weight: 500;
          transition: color .2s;
        }

        .nav-links a:hover {
          color: #111;
        }

        .nav-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 21px;
          background: #171717;
          color: #fff;
          border-radius: 5px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .04em;
          transition: transform .2s, background .2s;
        }

        .nav-button:hover {
          background: #303030;
          transform: translateY(-1px);
        }

        /* HERO */

        .hero {
          padding: 34px 0 0;
          background: #f7f7f4;
        }

        .hero-card {
          min-height: 690px;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          background:
            linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.65) 45%, rgba(0,0,0,.22) 100%),
            url("https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85")
            center/cover;
          display: flex;
          align-items: center;
        }

        .hero-content {
          width: min(1240px, calc(100% - 100px));
          margin: 0 auto;
          padding: 100px 0 150px;
          color: #fff;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 13px;
          border: 1px solid rgba(255,255,255,.22);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(8px);
          border-radius: 3px;
          font-size: 10px;
          letter-spacing: .17em;
          text-transform: uppercase;
          color: rgba(255,255,255,.72);
          margin-bottom: 28px;
        }

        .hero-eyebrow span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6ed5bb;
        }

        .hero h1 {
          max-width: 760px;
          margin: 0;
          font-size: clamp(50px, 7vw, 88px);
          line-height: .98;
          letter-spacing: -.055em;
          font-weight: 700;
        }

        .hero h1 span {
          color: rgba(255,255,255,.58);
        }

        .hero-text {
          max-width: 610px;
          margin: 30px 0 36px;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(255,255,255,.7);
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .button-light,
        .button-outline {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 22px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: .05em;
          text-transform: uppercase;
          transition: .2s;
        }

        .button-light {
          background: #fff;
          color: #151515;
        }

        .button-outline {
          border: 1px solid rgba(255,255,255,.25);
          color: #fff;
          background: rgba(255,255,255,.04);
        }

        .button-light:hover,
        .button-outline:hover {
          transform: translateY(-2px);
        }

        .hero-stats {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(1120px, calc(100% - 100px));
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #fff;
          color: #171717;
          box-shadow: 0 18px 50px rgba(0,0,0,.16);
        }

        .hero-stat {
          padding: 24px 26px;
          border-right: 1px solid #e8e8e4;
        }

        .hero-stat:last-child {
          border-right: 0;
        }

        .hero-stat strong {
          display: block;
          font-family: 'Manrope';
          font-size: 28px;
          letter-spacing: -.04em;
        }

        .hero-stat span {
          display: block;
          margin-top: 5px;
          color: #777773;
          font-size: 10px;
          line-height: 1.4;
          text-transform: uppercase;
          letter-spacing: .12em;
        }

        /* INTRO */

        .intro {
          padding: 150px 0 120px;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: end;
        }

        .intro h2 {
          max-width: 700px;
          margin: 20px 0 0;
          font-size: clamp(38px, 5vw, 62px);
          line-height: 1.02;
          letter-spacing: -.055em;
          font-weight: 700;
        }

        .intro h2 span {
          color: #a0a09a;
        }

        .intro-copy {
          max-width: 490px;
          font-size: 16px;
          line-height: 1.85;
          color: #6d6d68;
        }

        .intro-copy strong {
          color: #222;
          font-weight: 600;
        }

        /* SERVICES */

        .services {
          background: #fff;
          border-top: 1px solid #e7e7e2;
          border-bottom: 1px solid #e7e7e2;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          gap: 50px;
          align-items: end;
          margin-bottom: 58px;
        }

        .section-heading h2 {
          margin: 16px 0 0;
          font-size: clamp(38px, 4.5vw, 58px);
          line-height: 1.03;
          letter-spacing: -.055em;
        }

        .section-heading p {
          max-width: 400px;
          margin: 0;
          color: #777772;
          font-size: 15px;
          line-height: 1.75;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #deded9;
          border: 1px solid #deded9;
        }

        .service-card {
          background: #fff;
          padding: 36px 32px;
          min-height: 340px;
          position: relative;
          transition: background .25s, transform .25s;
        }

        .service-card:hover {
          background: #f8f8f5;
        }

        .service-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 55px;
        }

        .service-icon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #f0f0eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222;
          font-size: 20px;
        }

        .service-number {
          font-size: 11px;
          letter-spacing: .15em;
          color: #aaa9a3;
        }

        .service-card h3 {
          margin: 0 0 14px;
          font-size: 19px;
          line-height: 1.25;
          letter-spacing: -.02em;
        }

        .service-card p {
          margin: 0;
          color: #74746f;
          font-size: 13px;
          line-height: 1.75;
        }

        .service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 24px;
        }

        .service-tag {
          padding: 5px 9px;
          border: 1px solid #e3e3de;
          border-radius: 3px;
          font-size: 9px;
          color: #85857f;
          letter-spacing: .06em;
        }

        /* SPLIT / WHY */

        .why {
          background: #f0f1ee;
        }

        .why-grid {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 100px;
          align-items: center;
        }

        .why-image {
          min-height: 640px;
          border-radius: 3px;
          background:
            linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.35)),
            url("https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=85")
            center/cover;
          position: relative;
        }

        .why-image-card {
          position: absolute;
          bottom: 28px;
          right: -28px;
          width: 245px;
          padding: 25px;
          background: #fff;
          box-shadow: 0 15px 45px rgba(0,0,0,.13);
        }

        .why-image-card strong {
          display: block;
          font-family: 'Manrope';
          font-size: 37px;
          letter-spacing: -.05em;
        }

        .why-image-card span {
          display: block;
          color: #777;
          font-size: 11px;
          line-height: 1.55;
          margin-top: 7px;
        }

        .why-content h2 {
          max-width: 620px;
          margin: 18px 0 24px;
          font-size: clamp(38px, 4.5vw, 58px);
          line-height: 1.02;
          letter-spacing: -.055em;
        }

        .why-content > p {
          max-width: 580px;
          color: #70706b;
          font-size: 15px;
          line-height: 1.8;
        }

        .advantage-list {
          margin-top: 42px;
          border-top: 1px solid #d8d8d3;
        }

        .advantage {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 17px;
          padding: 20px 0;
          border-bottom: 1px solid #d8d8d3;
        }

        .advantage-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
        }

        .advantage h3 {
          margin: 1px 0 5px;
          font-size: 14px;
        }

        .advantage p {
          margin: 0;
          color: #777;
          font-size: 12px;
          line-height: 1.65;
        }

        /* INDUSTRIES */

        .industries {
          background: #171717;
          color: #fff;
        }

        .industries .eyebrow {
          color: #aaa;
        }

        .industries .eyebrow::before {
          background: #76c9b4;
        }

        .industries-heading {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 80px;
          margin-bottom: 58px;
          align-items: end;
        }

        .industries h2 {
          margin: 16px 0 0;
          font-size: clamp(38px, 4.5vw, 60px);
          line-height: 1.02;
          letter-spacing: -.055em;
        }

        .industries-heading p {
          color: #92928e;
          font-size: 15px;
          line-height: 1.8;
        }

        .industry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #343434;
          border-left: 1px solid #343434;
        }

        .industry {
          min-height: 240px;
          padding: 30px;
          border-right: 1px solid #343434;
          border-bottom: 1px solid #343434;
          transition: background .2s;
        }

        .industry:hover {
          background: #202020;
        }

        .industry-icon {
          font-size: 21px;
          color: #a9aaa5;
          margin-bottom: 45px;
        }

        .industry h3 {
          margin: 0 0 10px;
          font-size: 17px;
        }

        .industry p {
          margin: 0;
          color: #8e8e8a;
          font-size: 12px;
          line-height: 1.75;
        }

        /* PACKAGES */

        .packages {
          background: #f7f7f4;
        }

        .packages-heading {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 60px;
        }

        .packages-heading h2 {
          margin: 16px 0;
          font-size: clamp(38px, 4.5vw, 58px);
          letter-spacing: -.055em;
          line-height: 1.02;
        }

        .packages-heading p {
          color: #777772;
          font-size: 15px;
        }

        .package-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1080px;
          margin: 0 auto;
          align-items: stretch;
        }

        .package {
          background: #fff;
          border: 1px solid #deded9;
          padding: 34px;
          position: relative;
        }

        .package.featured {
          background: #171717;
          color: #fff;
          border-color: #171717;
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0,0,0,.12);
        }

        .popular {
          position: absolute;
          top: -12px;
          left: 28px;
          padding: 5px 10px;
          background: #76c9b4;
          color: #13211d;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .package-tier {
          color: #8b8b85;
          font-size: 9px;
          letter-spacing: .18em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .package.featured .package-tier {
          color: #999;
        }

        .package h3 {
          margin: 0;
          font-size: 22px;
          letter-spacing: -.025em;
        }

        .package-price {
          margin: 28px 0 6px;
          font-family: 'Manrope';
          font-size: 43px;
          font-weight: 700;
          letter-spacing: -.055em;
        }

        .package-price span {
          font-family: 'DM Sans';
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0;
          color: #999;
        }

        .package-description {
          min-height: 56px;
          margin: 0 0 26px;
          color: #777;
          font-size: 12px;
          line-height: 1.65;
        }

        .package.featured .package-description {
          color: #999;
        }

        .package-features {
          padding-top: 22px;
          border-top: 1px solid #e5e5e0;
        }

        .package.featured .package-features {
          border-color: #333;
        }

        .package-feature {
          display: flex;
          gap: 9px;
          margin-bottom: 12px;
          color: #60605b;
          font-size: 12px;
          line-height: 1.5;
        }

        .package.featured .package-feature {
          color: #c1c1bd;
        }

        .package-feature i {
          margin-top: 2px;
          color: #16866f;
        }

        .package-button {
          display: block;
          margin-top: 30px;
          padding: 13px;
          text-align: center;
          text-decoration: none;
          border: 1px solid #d8d8d3;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .package.featured .package-button {
          background: #fff;
          border-color: #fff;
          color: #171717;
        }

        /* PROCESS */

        .process {
          background: #fff;
          border-top: 1px solid #e7e7e2;
          border-bottom: 1px solid #e7e7e2;
        }

        .process-heading {
          max-width: 650px;
          margin-bottom: 60px;
        }

        .process-heading h2 {
          margin: 16px 0;
          font-size: clamp(38px, 4.5vw, 58px);
          line-height: 1.02;
          letter-spacing: -.055em;
        }

        .process-heading p {
          margin: 0;
          color: #777;
          font-size: 15px;
          line-height: 1.75;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border-top: 1px solid #deded9;
          border-left: 1px solid #deded9;
        }

        .process-step {
          min-height: 280px;
          padding: 28px;
          border-right: 1px solid #deded9;
          border-bottom: 1px solid #deded9;
        }

        .process-number {
          font-size: 10px;
          letter-spacing: .18em;
          color: #aaa;
        }

        .process-icon {
          margin: 55px 0 25px;
          font-size: 22px;
          color: #777;
        }

        .process-step h3 {
          margin: 0 0 10px;
          font-size: 16px;
        }

        .process-step p {
          margin: 0;
          color: #777;
          font-size: 12px;
          line-height: 1.7;
        }

        /* CONTACT */

        .contact {
          background: #eef0ed;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 90px;
          align-items: start;
        }

        .contact h2 {
          max-width: 600px;
          margin: 18px 0 22px;
          font-size: clamp(40px, 5vw, 64px);
          line-height: 1;
          letter-spacing: -.06em;
        }

        .contact-copy {
          max-width: 490px;
          color: #70706b;
          font-size: 15px;
          line-height: 1.8;
        }

        .contact-details {
          margin-top: 42px;
        }

        .contact-detail {
          display: flex;
          gap: 13px;
          margin-bottom: 21px;
        }

        .contact-detail-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .contact-detail small {
          display: block;
          color: #8b8b85;
          font-size: 9px;
          letter-spacing: .13em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .contact-detail span {
          font-size: 13px;
          color: #333;
        }

        .contact-form {
          background: #fff;
          padding: 40px;
          border: 1px solid #deded9;
          box-shadow: 0 18px 50px rgba(0,0,0,.05);
        }

        .contact-form h3 {
          margin: 0 0 28px;
          font-size: 22px;
          letter-spacing: -.025em;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: block;
          margin-bottom: 7px;
          font-size: 9px;
          font-weight: 600;
          color: #777;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          border: 1px solid #deded9;
          background: #fafaf8;
          padding: 13px 14px;
          border-radius: 3px;
          outline: none;
          font-family: inherit;
          font-size: 13px;
          color: #222;
          transition: border .2s, background .2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #777;
          background: #fff;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          width: 100%;
          border: 0;
          background: #171717;
          color: #fff;
          padding: 15px 20px;
          border-radius: 3px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, transform .2s;
        }

        .submit-button:hover {
          background: #333;
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: .6;
          cursor: not-allowed;
          transform: none;
        }

        .form-note {
          margin: 13px 0 0;
          color: #999;
          font-size: 10px;
          line-height: 1.6;
        }

        .success {
          text-align: center;
          padding: 80px 20px;
        }

        .success-icon {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #e3f3ee;
          color: #16866f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 25px;
        }

        .success h3 {
          font-size: 22px;
          margin: 0 0 8px;
        }

        .success p {
          color: #777;
          font-size: 13px;
        }

        /* FOOTER */

        footer {
          background: #171717;
          color: #fff;
          padding: 46px 0;
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-mark {
          width: 36px;
          height: 36px;
          border: 1px solid #777;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
        }

        .footer-name {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .15em;
        }

        .footer-sub {
          font-size: 8px;
          color: #777;
          letter-spacing: .15em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .footer-links {
          display: flex;
          gap: 25px;
        }

        .footer-links a {
          color: #999;
          font-size: 11px;
          text-decoration: none;
        }

        .footer-links a:hover {
          color: #fff;
        }

        .footer-copy {
          color: #666;
          font-size: 10px;
          text-align: right;
          line-height: 1.6;
        }

        /* MOBILE */

        @media (max-width: 1000px) {
          .nav-links {
            display: none;
          }

          .hero-card {
            min-height: 700px;
          }

          .hero-stats {
            width: calc(100% - 50px);
          }

          .hero-content {
            width: calc(100% - 70px);
          }

          .intro-grid,
          .why-grid,
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .why-image {
            min-height: 500px;
          }

          .service-grid,
          .industry-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .package-grid {
            grid-template-columns: 1fr;
            max-width: 620px;
          }

          .package.featured {
            transform: none;
          }

          .industries-heading {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }

        @media (max-width: 650px) {
          .container {
            width: min(100% - 36px, 1240px);
          }

          .section {
            padding: 82px 0;
          }

          .navbar {
            height: 68px;
          }

          .brand-sub {
            display: none;
          }

          .nav-button {
            padding: 10px 14px;
            font-size: 10px;
          }

          .hero {
            padding: 0;
          }

          .hero-card {
            min-height: 760px;
            border-radius: 0;
            background:
              linear-gradient(180deg, rgba(0,0,0,.75), rgba(0,0,0,.82)),
              url("https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85")
              center/cover;
          }

          .hero-content {
            width: calc(100% - 36px);
            padding: 90px 0 220px;
          }

          .hero h1 {
            font-size: 49px;
          }

          .hero-text {
            font-size: 15px;
          }

          .hero-stats {
            width: calc(100% - 36px);
            grid-template-columns: 1fr 1fr;
          }

          .hero-stat {
            padding: 17px;
          }

          .hero-stat:nth-child(2) {
            border-right: 0;
          }

          .hero-stat:nth-child(-n+2) {
            border-bottom: 1px solid #e8e8e4;
          }

          .hero-stat strong {
            font-size: 23px;
          }

          .intro {
            padding: 90px 0;
          }

          .intro-grid {
            gap: 30px;
          }

          .section-heading {
            display: block;
            margin-bottom: 40px;
          }

          .section-heading p {
            margin-top: 25px;
          }

          .service-grid,
          .industry-grid,
          .process-grid {
            grid-template-columns: 1fr;
          }

          .service-card {
            min-height: auto;
          }

          .why-image {
            min-height: 430px;
          }

          .why-image-card {
            right: 15px;
            bottom: 15px;
          }

          .contact-form {
            padding: 25px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-links {
            flex-wrap: wrap;
          }

          .footer-copy {
            text-align: left;
          }
        }
      `}</style>

      {/* NAVIGATION */}

      <header className="navbar">
        <div className="container nav-inner">
          <a href="#" className="brand-wrap">
  <img src="/SYS_Dark.png" alt="SYS Ops" style={{height: "36px", width: "auto"}} />

            <div>
              <div className="brand-name">SYS OPS</div>
              <div className="brand-sub">
                Remote Operations Specialist
              </div>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#why">Why SYS</a>
            <a href="#packages">Packages</a>
            <a href="#process">Process</a>
          </nav>

          <a href="#contact" className="nav-button">
            Get a Quote
          </a>
        </div>
      </header>

      {/* HERO */}

      <section className="hero">
        <div className="hero-card">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span />
              UK & Ireland Operations Partner
            </div>

            <h1>
              The operations behind
              <br />
              <span>your business.</span>
            </h1>

            <p className="hero-text">
              SYS Ops provides specialist payroll, compliance, billing,
              reporting and back-office operational support for workforce-led
              businesses across the UK & Ireland.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="button-light">
                Request a Proposal
                <i className="ri-arrow-right-line" />
              </a>

              <a href="#services" className="button-outline">
                Explore Services
              </a>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>9+</strong>
              <span>Years Experience</span>
            </div>

            <div className="hero-stat">
              <strong>50+</strong>
              <span>Professionals Managed</span>
            </div>

            <div className="hero-stat">
              <strong>UK + IE</strong>
              <span>Markets Supported</span>
            </div>

            <div className="hero-stat">
              <strong>60–75%</strong>
              <span>Potential Cost Saving</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="intro">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">About SYS Ops</div>

            <h2>
              Specialist execution.
              <br />
              <span>Without the overhead.</span>
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              <strong>
                SYS Ops is a specialist remote operations partner.
              </strong>
            </p>

            <p>
              We take ownership of the operational work that keeps
              workforce-led businesses moving — from payroll and compliance
              through to invoicing, reporting and administration.
            </p>

            <p>
              Instead of adding another full-time hire, you get an experienced
              operational function that integrates directly into your
              business.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section id="services" className="section services">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">What We Do</div>

              <h2>
                Operational support
                <br />
                that actually works.
              </h2>
            </div>

            <p>
              Practical back-office capability for businesses that manage
              workers, contractors, field teams and complex operational
              workflows.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <div className="service-card" key={service.number}>
                <div className="service-top">
                  <div className="service-icon">
                    <i className={service.icon} />
                  </div>

                  <div className="service-number">{service.number}</div>
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span className="service-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SYS */}

      <section id="why" className="section why">
        <div className="container why-grid">
          <div className="why-image">
            <div className="why-image-card">
              <strong>60–75%</strong>
              <span>
                Potential cost saving compared with a full-time UK/Ireland
                back-office hire.
              </span>
            </div>
          </div>

          <div className="why-content">
            <div className="eyebrow">Why SYS Ops</div>

            <h2>
              Not generic outsourcing.
              <br />
              <span>Specialist execution.</span>
            </h2>

            <p>
              Every part of our model is built around operational ownership.
              You are not handed to a generic support queue. You get a
              structured partner who understands your processes, systems and
              workforce.
            </p>

            <div className="advantage-list">
              {advantages.map((item) => (
                <div className="advantage" key={item.title}>
                  <div className="advantage-icon">
                    <i className={item.icon} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}

      <section id="industries" className="section industries">
        <div className="container">
          <div className="industries-heading">
            <div>
              <div className="eyebrow">Who We Serve</div>

              <h2>
                Built for businesses
                <br />
                that run on people.
              </h2>
            </div>

            <p>
              Our experience is particularly suited to workforce-led
              businesses where compliance, payroll, billing and administration
              have to work together.
            </p>
          </div>

          <div className="industry-grid">
            {industries.map((industry) => (
              <div className="industry" key={industry.title}>
                <div className="industry-icon">
                  <i className={industry.icon} />
                </div>

                <h3>{industry.title}</h3>

                <p>{industry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}

      <section id="packages" className="section packages">
        <div className="container">
          <div className="packages-heading">
            <div className="eyebrow">Ways to Work With Us</div>

            <h2>Structured for every scale.</h2>

            <p>
              Transparent monthly retainers. No unnecessary setup fees. No
              complicated outsourcing contracts.
            </p>
          </div>

          <div className="package-grid">
            {packages.map((pkg) => (
              <div
                className={`package ${pkg.featured ? "featured" : ""}`}
                key={pkg.title}
              >
                {pkg.featured && (
                  <div className="popular">Most Popular</div>
                )}

                <div className="package-tier">{pkg.tier}</div>

                <h3>{pkg.title}</h3>

                <div className="package-price">
                  {pkg.price}
                  <span>/month</span>
                </div>

                <p className="package-description">{pkg.description}</p>

                <div className="package-features">
                  {pkg.features.map((feature) => (
                    <div className="package-feature" key={feature}>
                      <i className="ri-check-line" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a href="#contact" className="package-button">
                  Discuss This Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}

      <section id="process" className="section process">
        <div className="container">
          <div className="process-heading">
            <div className="eyebrow">How It Works</div>

            <h2>From conversation to operation.</h2>

            <p>
              A straightforward onboarding process designed to get your
              operational support running quickly and with minimal disruption.
            </p>
          </div>

          <div className="process-grid">
            {process.map((step, index) => (
              <div className="process-step" key={step.number}>
                <div className="process-number">{step.number}</div>

                <div className="process-icon">
                  <i
                    className={[
                      "ri-search-line",
                      "ri-file-text-line",
                      "ri-settings-3-line",
                      "ri-links-line",
                      "ri-rocket-line",
                    ][index]}
                  />
                </div>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section id="contact" className="section contact">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow">Start a Conversation</div>

            <h2>
              Let's simplify
              <br />
              your operations.
            </h2>

            <p className="contact-copy">
              Tell us what is taking up your time. We will look at your
              operation, understand where the pressure points are and show you
              where SYS Ops can take ownership.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <i className="ri-user-line" />
                </div>

                <div>
                  <small>Managing Director</small>
                  <span>Yasir Awan</span>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <i className="ri-mail-line" />
                </div>

                <div>
                  <small>Email</small>
                  <span>sysops.enquiries@gmail.com</span>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <i className="ri-phone-line" />
                </div>

                <div>
                  <small>Phone / WhatsApp</small>
                  <span>+92 336 824 2425</span>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  <i className="ri-global-line" />
                </div>

                <div>
                  <small>Website</small>
                  <span>www.sysops.com</span>
                </div>
              </div>
              <div className="contact-detail">
  <div className="contact-detail-icon">
    <i className="ri-linkedin-box-line" />
  </div>
  <div>
    <small>LinkedIn</small>
    <span>linkedin.com/company/sys-ops</span>
  </div>
</div>
            </div>
          </div>

          <div className="contact-form">
            {submitted ? (
              <div className="success">
                <div className="success-icon">
                  <i className="ri-check-line" />
                </div>

                <h3>Enquiry received.</h3>

                <p>
                  Thank you. We will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3>Request a proposal</h3>

                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name</label>

                      <input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          updateField("name", e.target.value)
                        }
                        placeholder="Your name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Company</label>

                      <input
                        value={formData.company}
                        onChange={(e) =>
                          updateField("company", e.target.value)
                        }
                        placeholder="Company name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>

                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          updateField("email", e.target.value)
                        }
                        placeholder="you@company.com"
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone</label>

                      <input
                        value={formData.phone}
                        onChange={(e) =>
                          updateField("phone", e.target.value)
                        }
                        placeholder="+44 / +353..."
                      />
                    </div>

                    <div className="form-group full">
                      <label>Service Required</label>

                      <select
                        value={formData.service}
                        onChange={(e) =>
                          updateField("service", e.target.value)
                        }
                      >
                        <option value="">Select a service</option>
                        <option value="compliance">
                          Compliance Core — £300/month
                        </option>
                        <option value="fullops">
                          Full Ops Package — £450/month
                        </option>
                        <option value="dedicated">
                          Dedicated Ops Manager — £600/month
                        </option>
                        <option value="custom">
                          Custom / Not sure yet
                        </option>
                      </select>
                    </div>

                    <div className="form-group full">
                      <label>Tell Us About Your Requirements</label>

                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          updateField("message", e.target.value)
                        }
                        placeholder="Tell us about your business, workforce and the operational support you need..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Submit Enquiry"}
                  </button>

                  <p className="form-note">
                    We respond to all enquiries within 24 hours. Your
                    information is treated confidentially.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
           <img src="/SYS.png" alt="SYS Ops" style={{height: "32px", width: "auto"}} />

            <div>
              <div className="footer-name">SYS OPS</div>
              <div className="footer-sub">
                Remote Operations Specialist
              </div>
            </div>
          </div>

          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#why">Why SYS</a>
            <a href="#packages">Packages</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-copy">
            UK · Ireland · Remote
            <br />
            sysops.enquiries@gmail.com
          </div>
        </div>
      </footer>

      {/* Remix Icons */}

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
      />
    </div>
  );
}
