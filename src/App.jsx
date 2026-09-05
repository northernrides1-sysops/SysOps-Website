import { useState, useEffect } from "react";

// 5 FIXED TRIPOD CANARY WHARF STAGES
const SKYLINE_STAGES = [
  {
    id: "dawn",
    label: "Dawn",
    timeWindow: "05:00 – 07:00",
    imageUrl: encodeURI("/Dawn 5am - 7am.jfif"),
  },
  {
    id: "morning",
    label: "Morning",
    timeWindow: "07:00 – 11:00",
    imageUrl: encodeURI("/Morning (7am–11am).jfif"),
  },
  {
    id: "midday",
    label: "Midday",
    timeWindow: "11:00 – 17:00",
    imageUrl: encodeURI("/Midday (11am–4pm).jfif"),
  },
  {
    id: "evening",
    label: "Evening",
    timeWindow: "17:00 – 19:00",
    imageUrl: encodeURI("/Evening 5 PM–7 PM.jfif"),
  },
  {
    id: "night",
    label: "Night",
    timeWindow: "19:00 – 05:00",
    imageUrl: encodeURI("/Night (7pm–10pm).jfif"),
  },
];

const RIBBON_ITEMS = [
  "24/7 UK & Ireland Operations Desk Active",
  "Sage 50 & Cloud Payroll Native",
  "DBS & Worker Vetting Compliance",
  "Automated Invoice & Credit Control",
  "Power BI Real-Time Management Packs",
  "Right-to-Work Lifecycle Verification",
  "Dedicated Named Operations Manager",
  "SLA-Backed 3-Hour Enquiry Response",
];

export default function SysOpsWebsite() {
  // NAVIGATION: 'home' | 'services' | 'contact'
  const [currentPage, setCurrentPage] = useState("home");

  // REAL-TIME SKYLINE TIME
  const [activeStageId, setActiveStageId] = useState("midday");
  const [londonTimeStr, setLondonTimeStr] = useState("");

  // UNIFIED CONTACT ACTION: 'quote' | 'call'
  const [contactMode, setContactMode] = useState("quote");

  // UNIFIED FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    actionType: "Request a Proposal",
    service: "Full Ops Package",
    preferredDate: "",
    preferredTime: "11:00 AM GMT",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const FORM_ENDPOINT = "https://formspree.io/f/myegdyej";

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getStageForHour = (hourFloat) => {
    if (hourFloat >= 5.0 && hourFloat < 7.0) return "dawn";
    if (hourFloat >= 7.0 && hourFloat < 11.0) return "morning";
    if (hourFloat >= 11.0 && hourFloat < 17.0) return "midday";
    if (hourFloat >= 17.0 && hourFloat < 19.0) return "evening";
    return "night";
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hour = 12;
      let minute = 0;
      let formatted = "12:00";

      try {
        const dFmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        formatted = dFmt.format(now);
        setLondonTimeStr(formatted);
        const [hStr, mStr] = formatted.split(":");
        hour = parseInt(hStr, 10);
        minute = parseInt(mStr, 10);
      } catch (e) {
        hour = now.getUTCHours();
        minute = now.getUTCMinutes();
        formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        setLondonTimeStr(formatted);
      }

      const currentFloat = hour + minute / 60;
      setActiveStageId(getStageForHour(currentFloat));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const payload = {
      ...formData,
      actionType: contactMode === "call" ? "15-Min Discovery Call" : "Written Proposal Request",
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  // ALL 6 CORE SERVICES (PRESERVED 100%)
  const services = [
    {
      number: "01",
      icon: "ri-file-list-3-line",
      title: "Invoice & Billing Management",
      description:
        "End-to-end invoice generation, tracking and reconciliation. Overdue payment chasing, credit control support and billing query resolution.",
      tags: ["Invoice Generation", "Credit Control", "Reconciliation"],
      details: [
        "Automated sales invoice creation matched against purchase orders and approved timesheets",
        "Structured credit control schedule with courteous, firm payment chasing",
        "Weekly aged debtors reporting & reconciliation against live bank feeds",
        "Supplier billing query resolution within 4 business hours",
      ],
      systems: "Sage 50, Xero, QuickBooks, BrightPay, Excel Macro Feeds",
      sla: "Invoices processed & dispatched within 24 hours of timesheet sign-off",
    },
    {
      number: "02",
      icon: "ri-money-pound-circle-line",
      title: "Payroll & Timesheet Processing",
      description:
        "Complete payroll cycles managed end-to-end — timesheet validation, payslip generation, deductions and reconciliation.",
      tags: ["Sage Payroll", "Timesheets", "Payslips"],
      details: [
        "Weekly, fortnightly or monthly gross-to-net payroll computation",
        "Real-time RTI submissions to HMRC / Revenue Ireland",
        "Electronic payslips distribution via secure worker portal",
        "Pension auto-enrolment management (Nest, The People's Pension, Smart Pension)",
      ],
      systems: "Sage Payroll (Native), BrightPay, Iris, Staffology, Xero Payroll",
      sla: "Zero-error payroll calculation with 48-hour cut-off compliance",
    },
    {
      number: "03",
      icon: "ri-shield-check-line",
      title: "Compliance & Documentation",
      description:
        "Worker documentation, certification tracking, renewal reminders, vetting coordination and audit-ready records.",
      tags: ["DBS / Vetting", "Certifications", "Audit Records"],
      details: [
        "Continuous DBS Update Service & Garda Vetting checks",
        "CSCS, Gas Safe, CPC, NMC and mandatory certification tracking",
        "Automated 30/60-day expiry notifications to workers & management",
        "Instant exportable audit-ready digital folders for regulatory inspections",
      ],
      systems: "TrustID, Disclosure Services, Home Office RTW Tool, BrightHR",
      sla: "100% compliance audit readiness with zero non-compliant workers rostered",
    },
    {
      number: "04",
      icon: "ri-bar-chart-2-line",
      title: "Data Analysis & Reporting",
      description:
        "Power BI dashboards, KPI tracking, workforce utilisation reports and management packs that make operational data useful.",
      tags: ["Power BI", "KPI Dashboards", "Management Reports"],
      details: [
        "Interactive Power BI executive dashboards refreshed on your schedule",
        "Worker utilisation, overtime trends and client profitability packs",
        "Monthly financial summaries comparing budget vs. operational reality",
        "Automated KPI alerts for management exceptions and margin drops",
      ],
      systems: "Microsoft Power BI, DAX, Excel Power Query, SQL Data Warehousing",
      sla: "Executive management reporting packs delivered by the 2nd of each month",
    },
    {
      number: "05",
      icon: "ri-settings-3-line",
      title: "Remote Business Operations",
      description:
        "Scheduling, placement coordination, worker database management, client liaison and day-to-day back-office execution.",
      tags: ["Scheduling", "Database", "Operations"],
      details: [
        "Shift roster management and short-notice relief cover coordination",
        "Centralised CRM & worker database hygiene maintenance",
        "Client liaison for booking confirmations and shift confirmations",
        "Back-office ticket desk answering daily operational communications",
      ],
      systems: "Bullhorn, Vincere, Deputy, Rotacloud, Monday.com, ClickUp",
      sla: "Dedicated operations manager available Mon–Fri 08:00–18:00 GMT",
    },
    {
      number: "06",
      icon: "ri-user-add-line",
      title: "Worker Onboarding & Lifecycle",
      description:
        "Managing the full worker journey — registration, documentation, right-to-work checks, contracts and offboarding administration.",
      tags: ["Onboarding", "Right-to-Work", "Contracts"],
      details: [
        "Digital candidate registration packs and contract signing administration",
        "Statutory Right-to-Work share code and passport identity verification",
        "Emergency contact, bank detail verification and P45 collection",
        "Offboarding administration, holiday pay reconciliation and archiving",
      ],
      systems: "DocuSign, Adobe Sign, Home Office Verification Portal, Formstack",
      sla: "Candidates verified & cleared for deployment within 6 hours of submission",
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

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #f7f7f4; color: #171717; font-family: 'DM Sans', Arial, sans-serif; }
        a { color: inherit; }

        .sys-site { min-height: 100vh; background: #f7f7f4; color: #171717; overflow-x: hidden; }
        .container { width: min(1240px, calc(100% - 64px)); margin: 0 auto; }
        .section { padding: 110px 0; }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 9px; font-size: 11px;
          font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #747474;
        }
        .eyebrow::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #16866f; }

        h1, h2, h3, .brand { font-family: 'Manrope', Arial, sans-serif; }

        /* NAVBAR */
        .navbar {
          position: sticky; top: 0; z-index: 100; height: 76px;
          background: rgba(247,247,244,.94); backdrop-filter: blur(18px); border-bottom: 1px solid #e6e6e1;
        }
        .nav-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
        .brand-wrap { display: flex; align-items: center; gap: 12px; text-decoration: none; cursor: pointer; }
        .brand-name { font-size: 16px; font-weight: 800; letter-spacing: .13em; }
        .brand-sub { font-size: 8px; letter-spacing: .18em; color: #8b8b87; text-transform: uppercase; margin-top: 2px; }

        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links button, .nav-links a {
          background: transparent; border: 0; padding: 0; cursor: pointer;
          color: #666662; font-size: 13px; font-weight: 500; font-family: inherit; transition: color .2s;
        }
        .nav-links button.active, .nav-links button:hover, .nav-links a:hover { color: #111; font-weight: 700; }

        /* CLEAN SINGLE ACTION BUTTON */
        .nav-button {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 24px; background: #171717; color: #fff; border-radius: 4px;
          font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; border: 0; transition: transform .2s, background .2s;
        }
        .nav-button:hover { background: #303030; transform: translateY(-1px); }

        /* HERO */
        .hero { padding: 34px 0 0; background: #f7f7f4; }
        .hero-card {
          min-height: 690px; position: relative; overflow: hidden; border-radius: 4px;
          background: #06080d; display: flex; align-items: center;
        }
        .hero-bg-layer {
          position: absolute; inset: -12px; background-size: cover; background-position: center;
          filter: blur(2.5px) brightness(0.92); transform: scale(1.04);
          transition: opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1); will-change: opacity;
        }
        .hero-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(6,8,13,0.92) 0%, rgba(6,8,13,0.72) 46%, rgba(6,8,13,0.22) 100%);
          z-index: 3; pointer-events: none;
        }
        .hero-time-badge {
          position: absolute; top: 24px; right: 28px; z-index: 10;
          display: inline-flex; align-items: center; gap: 7px; padding: 6px 13px;
          background: rgba(6,8,13,0.75); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px; backdrop-filter: blur(10px); font-size: 11px;
          letter-spacing: 0.08em; color: #e2e8f0; font-weight: 500;
        }
        .hero-time-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981;
        }
        .hero-content {
          position: relative; z-index: 5; width: min(1240px, calc(100% - 100px));
          margin: 0 auto; padding: 100px 0 150px; color: #fff;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 9px; padding: 8px 13px;
          border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.06);
          backdrop-filter: blur(8px); border-radius: 3px; font-size: 10px;
          letter-spacing: .17em; text-transform: uppercase; color: rgba(255,255,255,.9); margin-bottom: 28px;
        }
        .hero-eyebrow span { width: 6px; height: 6px; border-radius: 50%; background: #6ed5bb; }
        .hero h1 {
          max-width: 760px; margin: 0; font-size: clamp(50px, 7vw, 88px);
          line-height: .98; letter-spacing: -.055em; font-weight: 700;
        }
        .hero-text {
          max-width: 610px; margin: 30px 0 36px; font-size: 17px; line-height: 1.75; color: rgba(255,255,255,.8);
        }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .button-light, .button-outline {
          display: inline-flex; align-items: center; gap: 9px; padding: 14px 22px;
          border-radius: 4px; font-size: 12px; font-weight: 600; text-decoration: none;
          letter-spacing: .05em; text-transform: uppercase; transition: .2s; cursor: pointer; border: 0;
        }
        .button-light { background: #fff; color: #151515; }
        .button-outline {
          border: 1px solid rgba(255,255,255,.3); color: #fff; background: rgba(255,255,255,.05); backdrop-filter: blur(6px);
        }
        .button-light:hover, .button-outline:hover { transform: translateY(-2px); }

        .hero-stats {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: min(1120px, calc(100% - 100px)); display: grid; grid-template-columns: repeat(4, 1fr);
          background: #fff; color: #171717; box-shadow: 0 18px 50px rgba(0,0,0,.16); z-index: 6;
        }
        .hero-stat { padding: 24px 26px; border-right: 1px solid #e8e8e4; }
        .hero-stat:last-child { border-right: 0; }
        .hero-stat strong { display: block; font-family: 'Manrope'; font-size: 28px; letter-spacing: -.04em; }
        .hero-stat span {
          display: block; margin-top: 5px; color: #777773; font-size: 10px; line-height: 1.4;
          text-transform: uppercase; letter-spacing: .12em;
        }

        /* RIBBON */
        .ops-ribbon {
          width: 100%; background: #101216; border-top: 1px solid #20242c; border-bottom: 1px solid #20242c;
          padding: 13px 0; overflow: hidden; display: flex; user-select: none;
        }
        .ops-ribbon:hover .ops-ribbon-track { animation-play-state: paused; }
        .ops-ribbon-track {
          display: flex; align-items: center; gap: 40px; white-space: nowrap;
          animation: tickerScroll 52s linear infinite; will-change: transform;
        }
        .ops-ribbon-item {
          display: inline-flex; align-items: center; gap: 12px; font-size: 11px;
          font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #cbd5e1;
        }
        .ops-ribbon-dot { width: 5px; height: 5px; border-radius: 50%; background: #10b981; }

        @keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* INTRO */
        .intro { padding: 140px 0 110px; }
        .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: end; }
        .intro h2 {
          max-width: 700px; margin: 20px 0 0; font-size: clamp(38px, 5vw, 62px);
          line-height: 1.02; letter-spacing: -.055em; font-weight: 700;
        }
        .intro h2 span { color: #a0a09a; }
        .intro-copy { max-width: 490px; font-size: 16px; line-height: 1.85; color: #6d6d68; }

        /* SERVICES OVERVIEW */
        .services { background: #fff; border-top: 1px solid #e7e7e2; border-bottom: 1px solid #e7e7e2; }
        .section-heading { display: flex; justify-content: space-between; gap: 50px; align-items: end; margin-bottom: 58px; }
        .section-heading h2 { margin: 16px 0 0; font-size: clamp(38px, 4.5vw, 58px); line-height: 1.03; letter-spacing: -.055em; }
        .section-heading p { max-width: 400px; margin: 0; color: #777772; font-size: 15px; line-height: 1.75; }

        .service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #deded9; border: 1px solid #deded9; }
        .service-card {
          background: #fff; padding: 38px 34px; min-height: 340px; position: relative;
          transition: all 0.3s ease; cursor: pointer;
        }
        .service-card:hover { background: #fbfbf9; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .service-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 55px; }
        .service-icon {
          width: 48px; height: 48px; border-radius: 50%; background: #f0f0eb;
          display: flex; align-items: center; justify-content: center; color: #222; font-size: 20px;
        }
        .service-number { font-size: 11px; letter-spacing: .15em; color: #aaa9a3; font-weight: 600; }
        .service-card h3 { margin: 0 0 14px; font-size: 19px; line-height: 1.25; letter-spacing: -.02em; }
        .service-card p { margin: 0; color: #74746f; font-size: 13px; line-height: 1.75; }
        .service-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 24px; }
        .service-tag { padding: 5px 9px; border: 1px solid #e3e3de; border-radius: 3px; font-size: 9px; color: #85857f; letter-spacing: .06em; }

        /* WHY */
        .why { background: #f0f1ee; }
        .why-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 100px; align-items: center; }
        .why-image {
          min-height: 640px; border-radius: 3px;
          background: linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.35)),
            url("https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=85") center/cover;
          position: relative;
        }
        .why-image-card {
          position: absolute; bottom: 28px; right: -28px; width: 245px; padding: 25px;
          background: #fff; box-shadow: 0 20px 50px rgba(0,0,0,.15);
        }
        .why-image-card strong { display: block; font-family: 'Manrope'; font-size: 37px; letter-spacing: -.05em; }
        .why-image-card span { display: block; color: #777; font-size: 11px; line-height: 1.55; margin-top: 7px; }
        .why-content h2 { max-width: 620px; margin: 18px 0 24px; font-size: clamp(38px, 4.5vw, 58px); line-height: 1.02; letter-spacing: -.055em; }
        .why-content > p { max-width: 580px; color: #70706b; font-size: 15px; line-height: 1.8; }
        .advantage-list { margin-top: 42px; border-top: 1px solid #d8d8d3; }
        .advantage { display: grid; grid-template-columns: 42px 1fr; gap: 17px; padding: 20px 0; border-bottom: 1px solid #d8d8d3; }
        .advantage-icon {
          width: 38px; height: 38px; border-radius: 50%; background: #fff;
          display: flex; align-items: center; justify-content: center; color: #555;
        }
        .advantage h3 { margin: 1px 0 5px; font-size: 14px; }
        .advantage p { margin: 0; color: #777; font-size: 12px; line-height: 1.65; }

        /* INDUSTRIES */
        .industries { background: #171717; color: #fff; }
        .industries .eyebrow { color: #aaa; }
        .industries .eyebrow::before { background: #76c9b4; }
        .industries-heading { display: grid; grid-template-columns: 1.1fr .9fr; gap: 80px; margin-bottom: 58px; align-items: end; }
        .industries h2 { margin: 16px 0 0; font-size: clamp(38px, 4.5vw, 60px); line-height: 1.02; letter-spacing: -.055em; }
        .industries-heading p { color: #92928e; font-size: 15px; line-height: 1.8; }
        .industry-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #343434; border-left: 1px solid #343434; }
        .industry { min-height: 240px; padding: 30px; border-right: 1px solid #343434; border-bottom: 1px solid #343434; transition: background .2s; }
        .industry:hover { background: #242424; }
        .industry-icon { font-size: 21px; color: #a9aaa5; margin-bottom: 45px; }
        .industry h3 { margin: 0 0 10px; font-size: 17px; }
        .industry p { margin: 0; color: #8e8e8a; font-size: 12px; line-height: 1.75; }

        /* PACKAGES */
        .packages { background: #f7f7f4; }
        .packages-heading { text-align: center; max-width: 720px; margin: 0 auto 60px; }
        .packages-heading h2 { margin: 16px 0; font-size: clamp(38px, 4.5vw, 58px); letter-spacing: -.055em; line-height: 1.02; }
        .package-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1080px; margin: 0 auto; align-items: stretch; }
        .package { background: #fff; border: 1px solid #deded9; padding: 34px; position: relative; transition: all .3s; }
        .package:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .package.featured { background: #171717; color: #fff; border-color: #171717; transform: translateY(-10px); box-shadow: 0 20px 50px rgba(0,0,0,.12); }
        .popular {
          position: absolute; top: -12px; left: 28px; padding: 5px 10px; background: #76c9b4;
          color: #13211d; font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
        }
        .package-tier { color: #8b8b85; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; margin-bottom: 14px; }
        .package.featured .package-tier { color: #999; }
        .package h3 { margin: 0; font-size: 22px; letter-spacing: -.025em; }
        .package-price { margin: 28px 0 6px; font-family: 'Manrope'; font-size: 43px; font-weight: 700; letter-spacing: -.055em; }
        .package-price span { font-family: 'DM Sans'; font-size: 12px; font-weight: 400; color: #999; }
        .package-description { min-height: 56px; margin: 0 0 26px; color: #777; font-size: 12px; line-height: 1.65; }
        .package.featured .package-description { color: #999; }
        .package-features { padding-top: 22px; border-top: 1px solid #e5e5e0; }
        .package.featured .package-features { border-color: #333; }
        .package-feature { display: flex; gap: 9px; margin-bottom: 12px; color: #60605b; font-size: 12px; line-height: 1.5; }
        .package.featured .package-feature { color: #c1c1bd; }
        .package-feature i { margin-top: 2px; color: #16866f; }
        .package-button {
          display: block; margin-top: 30px; padding: 13px; text-align: center; text-decoration: none;
          border: 1px solid #d8d8d3; font-size: 11px; font-weight: 600; letter-spacing: .08em;
          text-transform: uppercase; cursor: pointer; transition: all .2s; background: transparent; width: 100%;
        }
        .package-button:hover { background: #171717; color: #fff; }
        .package.featured .package-button { background: #fff; border-color: #fff; color: #171717; }

        /* PROCESS */
        .process { background: #fff; border-top: 1px solid #e7e7e2; border-bottom: 1px solid #e7e7e2; }
        .process-heading { max-width: 650px; margin-bottom: 60px; }
        .process-heading h2 { margin: 16px 0; font-size: clamp(38px, 4.5vw, 58px); line-height: 1.02; letter-spacing: -.055em; }
        .process-grid { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 1px solid #deded9; border-left: 1px solid #deded9; }
        .process-step {
          min-height: 280px; padding: 28px; border-right: 1px solid #deded9; border-bottom: 1px solid #deded9;
          cursor: pointer; transition: background .2s;
        }
        .process-step:hover { background: #fbfbf8; }
        .process-number { font-size: 10px; letter-spacing: .18em; color: #aaa; font-weight: 700; }
        .process-icon { margin: 55px 0 25px; font-size: 22px; color: #777; transition: transform .2s, color .2s; }
        .process-step:hover .process-icon { color: #16866f; transform: translateY(-3px); }
        .process-step h3 { margin: 0 0 10px; font-size: 16px; }
        .process-step p { margin: 0; color: #777; font-size: 12px; line-height: 1.7; }

        /* STANDALONE SERVICES SPECS PAGE */
        .services-detail-hero {
          padding: 80px 0 50px; background: #111317; color: #fff; border-bottom: 1px solid #232730;
        }
        .services-detail-hero h1 { font-size: clamp(40px, 5.5vw, 68px); margin: 16px 0 20px; line-height: 1.05; }
        .service-spec-card {
          background: #fff; border: 1px solid #deded9; border-radius: 4px; padding: 44px;
          margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .service-spec-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 50px; align-items: start; }
        .spec-checklist { list-style: none; padding: 0; margin: 20px 0 0; }
        .spec-checklist li { display: flex; gap: 12px; font-size: 14px; line-height: 1.6; margin-bottom: 12px; color: #444; }
        .spec-checklist li i { color: #16866f; font-size: 18px; margin-top: 2px; }
        .spec-meta-box { background: #f7f7f4; border: 1px solid #e8e8e3; border-radius: 4px; padding: 24px; }

        /* ======================================================== */
        /* UNIFIED "HOSTPRO STYLE" MINIMALIST CONTACT VIEW          */
        /* ======================================================== */
        .contact-view-hero {
          padding: 75px 0 45px; background: #111317; color: #fff; text-align: center; border-bottom: 1px solid #232730;
        }
        .contact-view-hero h1 { font-size: clamp(36px, 5vw, 56px); margin: 16px auto 14px; line-height: 1.08; max-width: 700px; }
        .contact-view-hero p { max-width: 540px; margin: 0 auto; color: #94a3b8; font-size: 15px; line-height: 1.6; }

        .unified-contact-container {
          max-width: 680px; margin: -30px auto 100px; position: relative; z-index: 10;
        }
        .unified-card {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 44px 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
        }

        /* DUAL ACTION TOGGLE (HostPro Style Selector) */
        .mode-toggle-wrap {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f1f5f9;
          padding: 5px; border-radius: 6px; margin-bottom: 30px;
        }
        .mode-toggle-btn {
          border: 0; background: transparent; padding: 12px 16px; border-radius: 4px;
          font-size: 13px; font-weight: 600; color: #64748b; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s ease;
        }
        .mode-toggle-btn.active {
          background: #ffffff; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .mode-toggle-btn i { font-size: 16px; }

        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-group { margin-bottom: 18px; }
        .form-group label {
          display: block; margin-bottom: 6px; font-size: 11px; font-weight: 700;
          color: #475569; letter-spacing: .08em; text-transform: uppercase;
        }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%; border: 1px solid #cbd5e1; background: #f8fafc; padding: 12px 14px;
          border-radius: 4px; outline: none; font-family: inherit; font-size: 14px; color: #0f172a;
          transition: all .2s ease;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #0f172a; background: #ffffff; box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }
        .form-group textarea { resize: vertical; min-height: 100px; }

        .unified-submit-btn {
          width: 100%; border: 0; background: #0f172a; color: #ffffff; padding: 16px;
          border-radius: 4px; font-family: inherit; font-size: 13px; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
          transition: background .2s, transform .2s; margin-top: 10px;
        }
        .unified-submit-btn:hover { background: #1e293b; transform: translateY(-1px); }

        .contact-direct-tray {
          display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
          margin-top: 36px; padding-top: 28px; border-top: 1px solid #f1f5f9;
        }
        .tray-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b; }
        .tray-item i { color: #10b981; font-size: 15px; }

        /* FOOTER */
        footer { background: #171717; color: #fff; padding: 46px 0; }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; gap: 30px; }
        .footer-brand { display: flex; align-items: center; gap: 12px; }
        .footer-name { font-size: 13px; font-weight: 700; letter-spacing: .15em; }
        .footer-sub { font-size: 8px; color: #777; letter-spacing: .15em; text-transform: uppercase; margin-top: 3px; }
        .footer-links { display: flex; gap: 25px; }
        .footer-links button, .footer-links a {
          color: #999; font-size: 11px; text-decoration: none; background: transparent;
          border: 0; cursor: pointer; font-family: inherit;
        }
        .footer-links button:hover, .footer-links a:hover { color: #fff; }
        .footer-copy { color: #666; font-size: 10px; text-align: right; line-height: 1.6; }

        /* RESPONSIVE */
        @media (max-width: 1000px) {
          .nav-links { display: none; }
          .intro-grid, .why-grid, .service-spec-grid { grid-template-columns: 1fr; gap: 40px; }
          .service-grid, .industry-grid, .process-grid { grid-template-columns: repeat(2, 1fr); }
          .package-grid { grid-template-columns: 1fr; max-width: 600px; }
        }
        @media (max-width: 650px) {
          .hero-content { padding: 80px 0 200px; }
          .hero-stats { grid-template-columns: 1fr 1fr; width: calc(100% - 36px); }
          .service-grid, .industry-grid, .process-grid { grid-template-columns: 1fr; }
          .form-grid-2 { grid-template-columns: 1fr; }
          .unified-card { padding: 28px 20px; }
          .footer-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* GLOBAL NAVBAR */}
      <header className="navbar">
        <div className="container nav-inner">
          <div className="brand-wrap" onClick={() => setCurrentPage("home")}>
            <img src="/SYS_Dark.png" alt="SYS Ops" style={{ height: "36px", width: "auto" }} />
            <div>
              <div className="brand-name">SYS OPS</div>
              <div className="brand-sub">Remote Operations Specialist</div>
            </div>
          </div>

          <nav className="nav-links">
            <button
              className={currentPage === "home" ? "active" : ""}
              onClick={() => setCurrentPage("home")}
            >
              Home
            </button>
            <button
              className={currentPage === "services" ? "active" : ""}
              onClick={() => setCurrentPage("services")}
            >
              Services
            </button>
            <button onClick={() => { setCurrentPage("home"); setTimeout(() => { document.getElementById("industries")?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>
              Industries
            </button>
            <button onClick={() => { setCurrentPage("home"); setTimeout(() => { document.getElementById("packages")?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>
              Packages
            </button>
            <button onClick={() => { setCurrentPage("home"); setTimeout(() => { document.getElementById("process")?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>
              Process
            </button>
          </nav>

          {/* UNIFIED SINGLE ACTION BUTTON */}
          <button
            onClick={() => setCurrentPage("contact")}
            className="nav-button"
          >
            Contact Us
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 1. HOMEPAGE VIEW                                        */}
      {/* ======================================================== */}
      {currentPage === "home" && (
        <>
          {/* REAL-TIME CANARY WHARF HERO */}
          <section className="hero">
            <div className="hero-card">
              {SKYLINE_STAGES.map((stage) => {
                const isVisible = activeStageId === stage.id;
                return (
                  <div
                    key={stage.id}
                    className="hero-bg-layer"
                    style={{
                      backgroundImage: `url("${stage.imageUrl}")`,
                      opacity: isVisible ? 1 : 0,
                      zIndex: isVisible ? 2 : 1,
                    }}
                  />
                );
              })}

              <div className="hero-scrim" />

              <div className="hero-time-badge">
                <span className="hero-time-dot" />
                LONDON {londonTimeStr || "12:00"} GMT
              </div>

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
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="button-light"
                  >
                    Contact Us
                    <i className="ri-arrow-right-line" />
                  </button>

                  <button
                    onClick={() => setCurrentPage("services")}
                    className="button-outline"
                  >
                    Explore Services
                  </button>
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

          {/* MEASURED CALM TICKER RIBBON (52s) */}
          <div className="ops-ribbon" aria-hidden="true">
            <div className="ops-ribbon-track">
              {RIBBON_ITEMS.concat(RIBBON_ITEMS).map((item, idx) => (
                <div className="ops-ribbon-item" key={idx}>
                  <span className="ops-ribbon-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

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
                  <strong>SYS Ops is a specialist remote operations partner.</strong>
                </p>
                <p>
                  We take ownership of the operational work that keeps
                  workforce-led businesses moving — from payroll and compliance
                  through to invoicing, reporting and administration.
                </p>
                <p>
                  Instead of adding another full-time hire, you get an experienced
                  operational function that integrates directly into your business.
                </p>
              </div>
            </div>
          </section>

          {/* 6 CORE SERVICES OVERVIEW */}
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

                <div style={{ textAlign: "right" }}>
                  <p style={{ marginBottom: "16px" }}>
                    Practical back-office capability for businesses that manage
                    workers, contractors, field teams and complex operational
                    workflows.
                  </p>
                  <button
                    onClick={() => setCurrentPage("services")}
                    style={{
                      background: "none",
                      border: "0",
                      color: "#16866f",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    View All Service Specs & SLAs →
                  </button>
                </div>
              </div>

              <div className="service-grid">
                {services.map((service) => (
                  <div
                    className="service-card"
                    key={service.number}
                    onClick={() => setCurrentPage("services")}
                  >
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
                    {pkg.featured && <div className="popular">Most Popular</div>}
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

                    <button
                      onClick={() => {
                        updateField("service", pkg.title);
                        setCurrentPage("contact");
                      }}
                      className="package-button"
                    >
                      Discuss This Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section id="process" className="section process">
            <div className="container process-heading">
              <div className="eyebrow">How It Works</div>
              <h2>From conversation to operation.</h2>
              <p>
                A straightforward onboarding process designed to get your
                operational support running quickly and with minimal disruption.
              </p>
            </div>

            <div className="container">
              <div className="process-grid">
                {process.map((step, index) => (
                  <div
                    className="process-step"
                    key={step.number}
                    onClick={() => setCurrentPage("contact")}
                  >
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
        </>
      )}

      {/* ======================================================== */}
      {/* 2. STANDALONE SERVICES & SPECS PAGE                      */}
      {/* ======================================================== */}
      {currentPage === "services" && (
        <div>
          <div className="services-detail-hero">
            <div className="container">
              <div className="eyebrow" style={{ color: "#94a3b8" }}>
                Operational Portfolio
              </div>
              <h1>
                Comprehensive Back-Office
                <br />
                <span style={{ color: "#76c9b4" }}>Capabilities & SLAs.</span>
              </h1>
              <p style={{ maxWidth: "680px", color: "#cbd5e1", fontSize: "16px", lineHeight: "1.7" }}>
                Explore the exact deliverables, guaranteed turnaround SLAs, and native software integrations across all 6 core operational divisions.
              </p>
            </div>
          </div>

          <div className="container section">
            {services.map((service) => (
              <div className="service-spec-card" key={service.number}>
                <div className="service-spec-grid">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                      <div className="service-icon" style={{ width: "42px", height: "42px" }}>
                        <i className={service.icon} />
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#888" }}>
                        SERVICE DIVISION {service.number}
                      </span>
                    </div>

                    <h2 style={{ fontSize: "28px", margin: "0 0 12px", letterSpacing: "-0.03em" }}>
                      {service.title}
                    </h2>
                    <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.7", margin: "0 0 24px" }}>
                      {service.description}
                    </p>

                    <h4 style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#111", margin: "0 0 12px" }}>
                      Included Operational Deliverables:
                    </h4>
                    <ul className="spec-checklist">
                      {service.details.map((item, idx) => (
                        <li key={idx}>
                          <i className="ri-checkbox-circle-fill" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="spec-meta-box">
                    <div style={{ marginBottom: "20px" }}>
                      <small style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#888", marginBottom: "4px" }}>
                        Turnaround SLA
                      </small>
                      <strong style={{ fontSize: "14px", color: "#111", lineHeight: 1.4, display: "block" }}>
                        {service.sla}
                      </strong>
                    </div>

                    <div style={{ marginBottom: "26px" }}>
                      <small style={{ display: "block", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#888", marginBottom: "4px" }}>
                        Supported Systems
                      </small>
                      <span style={{ fontSize: "13px", color: "#555" }}>
                        {service.systems}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        updateField("service", service.title);
                        setCurrentPage("contact");
                      }}
                      className="nav-button"
                      style={{ width: "100%", padding: "14px" }}
                    >
                      Inquire About {service.title}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CLEAN UNIFIED "HOSTPRO STYLE" CONTACT VIEW            */}
      {/* ======================================================== */}
      {currentPage === "contact" && (
        <div>
          <div className="contact-view-hero">
            <div className="container">
              <div className="eyebrow" style={{ color: "#94a3b8" }}>
                Direct Connection
              </div>
              <h1>Let's Discuss Your Operations</h1>
              <p>
                Fill in your details below, then choose whether you'd like a formal proposal or a 15-minute discovery call.
              </p>
            </div>
          </div>

          <div className="container">
            <div className="unified-contact-container">
              <div className="unified-card">

                {/* THE UNIFIED ACTION TOGGLE */}
                <div className="mode-toggle-wrap">
                  <button
                    type="button"
                    className={`mode-toggle-btn ${contactMode === "quote" ? "active" : ""}`}
                    onClick={() => setContactMode("quote")}
                  >
                    <i className="ri-file-text-line" />
                    Request a Proposal
                  </button>

                  <button
                    type="button"
                    className={`mode-toggle-btn ${contactMode === "call" ? "active" : ""}`}
                    onClick={() => setContactMode("call")}
                  >
                    <i className="ri-phone-line" />
                    Book 15-Min Call
                  </button>
                </div>

                {submitted ? (
                  <div style={{ textAlign: "center", padding: "50px 20px" }}>
                    <div style={{
                      width: "60px", height: "60px", borderRadius: "50%", background: "#ecfdf5",
                      color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px", fontSize: "28px"
                    }}>
                      <i className="ri-check-line" />
                    </div>
                    <h3 style={{ fontSize: "24px", margin: "0 0 10px", color: "#0f172a" }}>
                      {contactMode === "call" ? "Call Request Confirmed" : "Enquiry Received"}
                    </h3>
                    <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "420px", margin: "0 auto 24px", lineHeight: "1.6" }}>
                      Thank you, {formData.name}. We have received your request and will follow up with you within 3 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setCurrentPage("home"); }}
                      className="nav-button"
                    >
                      Return to Homepage
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* STEP 1: ESSENTIAL CLIENT INFO */}
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Your Name *</label>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="John Smith"
                        />
                      </div>

                      <div className="form-group">
                        <label>Company Name</label>
                        <input
                          value={formData.company}
                          onChange={(e) => updateField("company", e.target.value)}
                          placeholder="Acme Ltd"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Work Email *</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="john@company.co.uk"
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone / WhatsApp</label>
                        <input
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+44 7123 456789"
                        />
                      </div>
                    </div>

                    {/* STEP 2: DYNAMIC ADAPTIVE FIELDS */}
                    {contactMode === "quote" ? (
                      <>
                        <div className="form-group">
                          <label>Service Area of Interest</label>
                          <select
                            value={formData.service}
                            onChange={(e) => updateField("service", e.target.value)}
                          >
                            <option value="Full Ops Package">Full Ops Package (£450/month) — Most Popular</option>
                            <option value="Compliance Core">Compliance Core (£300/month)</option>
                            <option value="Dedicated Ops Manager">Dedicated Ops Manager (£600/month)</option>
                            <option value="Invoice & Billing Management">Invoice & Billing Management</option>
                            <option value="Payroll & Timesheet Processing">Payroll & Timesheet Processing</option>
                            <option value="Compliance & Documentation">Compliance & Documentation</option>
                            <option value="Data Analysis & Power BI">Data Analysis & Reporting (Power BI)</option>
                            <option value="Remote Business Operations">Remote Business Operations</option>
                            <option value="Worker Onboarding & Lifecycle">Worker Onboarding & Lifecycle</option>
                            <option value="Custom Scope">Custom Scope / Undecided</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Operational Context / Requirements</label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => updateField("message", e.target.value)}
                            placeholder="Briefly tell us about your workforce size, current software (Sage, Xero, etc.), or key operational pain points..."
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-grid-2">
                          <div className="form-group">
                            <label>Preferred Date *</label>
                            <input
                              type="date"
                              required
                              value={formData.preferredDate}
                              onChange={(e) => updateField("preferredDate", e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label>Time Slot (GMT)</label>
                            <select
                              value={formData.preferredTime}
                              onChange={(e) => updateField("preferredTime", e.target.value)}
                            >
                              <option>09:30 AM GMT</option>
                              <option>11:00 AM GMT</option>
                              <option>02:00 PM GMT</option>
                              <option>04:30 PM GMT</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Discussion Focus</label>
                          <select
                            value={formData.service}
                            onChange={(e) => updateField("service", e.target.value)}
                          >
                            <option value="Sage Payroll Review">Sage Payroll & Timesheets Audit</option>
                            <option value="Compliance & Vetting">Worker Vetting & Compliance Audit</option>
                            <option value="Billing & Debtor Days">Billing & Credit Control Overhaul</option>
                            <option value="Full Back-Office Review">General Operational Assessment</option>
                          </select>
                        </div>
                      </>
                    )}

                    <button type="submit" className="unified-submit-btn" disabled={sending}>
                      {sending
                        ? "Sending..."
                        : contactMode === "call"
                        ? "Schedule 15-Min Call →"
                        : "Submit Proposal Request →"}
                    </button>

                    <p style={{ margin: "14px 0 0", color: "#94a3b8", fontSize: "11px", textAlign: "center" }}>
                      🔒 SLA guarantee: We respond within 3 business hours. No spam.
                    </p>
                  </form>
                )}

                {/* BOTTOM TRAY: DIRECT REACH */}
                <div className="contact-direct-tray">
                  <div className="tray-item">
                    <i className="ri-mail-line" />
                    <span>sysops.enquiries@gmail.com</span>
                  </div>
                  <div className="tray-item">
                    <i className="ri-phone-line" />
                    <span>+92 336 824 2425</span>
                  </div>
                  <div className="tray-item">
                    <i className="ri-shield-check-line" />
                    <span>UK & Ireland Coverage</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL FOOTER */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-brand" onClick={() => setCurrentPage("home")} style={{ cursor: "pointer" }}>
            <img src="/SYS.png" alt="SYS Ops" style={{ height: "32px", width: "auto" }} />
            <div>
              <div className="footer-name">SYS OPS</div>
              <div className="footer-sub">Remote Operations Specialist</div>
            </div>
          </div>

          <div className="footer-links">
            <button onClick={() => setCurrentPage("home")}>Home</button>
            <button onClick={() => setCurrentPage("services")}>Services</button>
            <button onClick={() => setCurrentPage("contact")}>Contact Us</button>
          </div>

          <div className="footer-copy">
            UK · Ireland · Remote Operations
            <br />
            sysops.enquiries@gmail.com
          </div>
        </div>
      </footer>
    </div>
  );
}
