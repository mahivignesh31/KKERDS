// KK course curriculum: existing video courses and guided project-based learning paths.
window.KK_COURSES = [
  {
    "id": "python-fullstack",
    "title": "Full Stack Python",
    "page": "course-guide.html?course=python-fullstack",
    "category": "technology",
    "categoryLabel": "Technology",
    "image": "img/lms-python-fullstack.svg",
    "description": "Build web applications from the ground up with Python, frontend fundamentals, Django, and databases.",
    "tag": "Build real projects",
    "resource": null,
    "format": "Guided practice",
    "lessons": [
      {
        "id": "1",
        "title": "Python Foundations",
        "video": null,
        "body": "Start with variables, strings, numbers, and input. Use clear names and inspect values as you work.",
        "practice": "Create a bill calculator that takes an amount and a discount percentage, then displays the final price.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial"
      },
      {
        "id": "2",
        "title": "Control Flow & Functions",
        "video": null,
        "body": "Break a program into decisions, loops, and reusable functions. Check boundary cases instead of testing only the happy path.",
        "practice": "Write a function that assigns a grade from a score. Test the minimum, maximum, and invalid inputs.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial"
      },
      {
        "id": "3",
        "title": "Collections, Files & Exceptions",
        "video": null,
        "body": "Use lists and dictionaries to organize records. Handle expected file and input errors so a simple mistake does not end the workflow.",
        "practice": "Build a contact book that saves records to a JSON file and loads them when the program restarts.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial"
      },
      {
        "id": "4",
        "title": "HTML, CSS & Responsive Layouts",
        "video": null,
        "body": "Plan a page around semantic sections, labeled forms, and a layout that works on narrow screens. Keep structure and styling separate.",
        "practice": "Build a responsive portfolio page with a project grid, contact form labels, and visible keyboard focus.",
        "readingUrl": "https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "readingLabel": "MDN web development"
      },
      {
        "id": "5",
        "title": "JavaScript & Browser Interaction",
        "video": null,
        "body": "Connect buttons and forms to browser events. Validate input and show useful feedback before sending a request.",
        "practice": "Add a filterable project list to your portfolio using JavaScript and test it with a keyboard.",
        "readingUrl": "https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "readingLabel": "MDN web development"
      },
      {
        "id": "6",
        "title": "Django Projects, URLs & Views",
        "video": null,
        "body": "Map an incoming URL to a view and return a response. Build one small route at a time before adding templates and forms.",
        "practice": "Follow the Django tutorial to create a project and display a working page on a local development server.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/intro/tutorial01/",
        "readingLabel": "Django getting started"
      },
      {
        "id": "7",
        "title": "Database Models & CRUD",
        "video": null,
        "body": "Model the records your application needs. Plan create, read, update, and delete actions with validation for each change.",
        "practice": "Build a task model with a title and completion status. Add pages to create, list, edit, and delete tasks.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/intro/tutorial01/",
        "readingLabel": "Django getting started"
      },
      {
        "id": "8",
        "title": "Authentication & Authorization",
        "video": null,
        "body": "Keep identity separate from permission. Use framework authentication and check ownership on the server for every protected action.",
        "practice": "Add login to your task app. Verify that one user cannot read or edit another user’s task by changing its URL.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/topics/auth/",
        "readingLabel": "Django authentication"
      },
      {
        "id": "9",
        "title": "JSON APIs & Frontend Integration",
        "video": null,
        "body": "Define the shape of a request and response before connecting the frontend. Handle loading states and errors as part of the interface.",
        "practice": "Add a JSON endpoint for your tasks and use a browser fetch request to display them.",
        "readingUrl": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
        "readingLabel": "MDN Fetch guide"
      },
      {
        "id": "10",
        "title": "Testing & Portfolio Project",
        "video": null,
        "body": "Choose tests around behavior: valid actions, invalid inputs, and denied access. Document how someone else can run the application.",
        "practice": "Finish a task manager with authentication, database persistence, responsive UI, and a README. Add tests for ownership checks.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/topics/testing/",
        "readingLabel": "Django testing guide"
      }
    ],
    "quiz": [
      {
        "question": "Where must ownership be checked before updating a user’s task?",
        "options": [
          "Only in the browser",
          "On the server handling the request",
          "Only in CSS"
        ],
        "answer": 1,
        "explanation": "Server-side authorization must check that the signed-in user can update the task."
      },
      {
        "question": "What is a useful reason to write a function?",
        "options": [
          "To reuse a clearly defined operation",
          "To replace every database",
          "To remove all input validation"
        ],
        "answer": 0,
        "explanation": "Functions package a defined operation so it can be reused and tested."
      },
      {
        "question": "What does CRUD stand for?",
        "options": [
          "Copy, Run, Upload, Download",
          "Create, Read, Update, Delete",
          "Code, Review, Undo, Deploy"
        ],
        "answer": 1,
        "explanation": "CRUD describes the four common operations on stored records."
      },
      {
        "question": "Where should user passwords be stored in a web application?",
        "options": [
          "As plain text in the database",
          "Hashed with a secure password hashing method",
          "Inside the page CSS file"
        ],
        "answer": 1,
        "explanation": "Store only secure password hashes, never plain-text passwords."
      },
      {
        "question": "What does a URL route typically map to in Django?",
        "options": [
          "A view that returns a response",
          "A spreadsheet chart title",
          "A sewing machine setting"
        ],
        "answer": 0,
        "explanation": "Routes connect URLs to views that build and return the response."
      }
    ]
  },
  {
    "id": "data-analytics",
    "title": "Data Analytics",
    "page": "course-guide.html?course=data-analytics",
    "category": "analytics",
    "categoryLabel": "Data & BI",
    "image": "img/lms-data-analytics.svg",
    "description": "Turn raw data into useful decisions with spreadsheets, SQL, Python, and clear visual storytelling.",
    "tag": "From data to decisions",
    "resource": null,
    "format": "Guided practice",
    "lessons": [
      {
        "id": "1",
        "title": "Ask a Better Business Question",
        "video": null,
        "body": "Start with a specific decision and a measurable question. Define the time period, population, and unit of analysis before collecting data.",
        "practice": "Write three questions for a small retail business. For each, name the metric and the data needed.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "2",
        "title": "Spreadsheets & Data Quality",
        "video": null,
        "body": "Inspect column types, missing values, duplicates, and inconsistent labels. Keep a raw copy and record each cleaning decision.",
        "practice": "Create a small sales sheet with deliberate errors. Clean it and keep a log explaining which rows changed.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "3",
        "title": "SQL: Filter, Group & Summarize",
        "video": null,
        "body": "Think about the rows you need before choosing filters and aggregations. Check that each summary answers the original question.",
        "practice": "Create a sales table and write queries for monthly revenue, order count, and revenue by product.",
        "readingUrl": "https://www.postgresql.org/docs/current/tutorial-sql.html",
        "readingLabel": "PostgreSQL SQL tutorial"
      },
      {
        "id": "4",
        "title": "SQL Joins & Relationships",
        "video": null,
        "body": "Identify the key and expected row count before joining tables. A repeated key can multiply rows and distort a total.",
        "practice": "Join customers to orders. Compare the row count and revenue before and after the join.",
        "readingUrl": "https://www.postgresql.org/docs/current/tutorial-sql.html",
        "readingLabel": "PostgreSQL SQL tutorial"
      },
      {
        "id": "5",
        "title": "Python Data Analysis with pandas",
        "video": null,
        "body": "Load tabular data, inspect its structure, and select the columns you need. Make the steps repeatable in a notebook or script.",
        "practice": "Load a sales CSV with pandas, inspect types and missing values, then calculate revenue by category.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "6",
        "title": "Cleaning & Exploratory Analysis",
        "video": null,
        "body": "Compare distributions and groups, then investigate unusual values. Decide whether an outlier is an error or a real observation before changing it.",
        "practice": "Create a reproducible cleaning workflow and compare product sales across two months.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "7",
        "title": "Visualization & Insight Writing",
        "video": null,
        "body": "Choose a chart based on the comparison you want to show. Add units, a clear title, and a brief interpretation without claiming causation from correlation.",
        "practice": "Create a trend chart and a category comparison. Write one finding and one limitation for each.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "8",
        "title": "Capstone: Sales Insights Report",
        "video": null,
        "body": "Combine a business question, a documented dataset, reproducible analysis, and a recommendation. Explain assumptions and limitations alongside your findings.",
        "practice": "Deliver a notebook or spreadsheet, three charts, and a one-page sales summary with recommendations and caveats.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      }
    ],
    "quiz": [
      {
        "question": "What should you check before joining two tables?",
        "options": [
          "Only the chart colors",
          "The join key and expected row counts",
          "Only the file name"
        ],
        "answer": 1,
        "explanation": "Checking keys and row counts helps detect duplicated rows and inflated totals."
      },
      {
        "question": "How should you handle a missing value?",
        "options": [
          "Always replace it with zero",
          "Delete the entire dataset",
          "Investigate its meaning and document the chosen treatment"
        ],
        "answer": 2,
        "explanation": "Missingness needs context; zero and missing are not automatically interchangeable."
      },
      {
        "question": "Two metrics move together. What can you conclude immediately?",
        "options": [
          "One definitely causes the other",
          "There may be an association worth investigating",
          "Both metrics are invalid"
        ],
        "answer": 1,
        "explanation": "Correlation alone does not establish causation."
      },
      {
        "question": "What is a good first step when exploring a new dataset?",
        "options": [
          "Delete half of the rows at random",
          "Inspect columns, types, and a sample of values",
          "Publish a final dashboard immediately"
        ],
        "answer": 1,
        "explanation": "Understanding structure and sample values prevents mistakes later."
      },
      {
        "question": "Why should charts include clear labels and units?",
        "options": [
          "So readers can interpret the numbers correctly",
          "Only to make the file larger",
          "Because labels replace the need for accurate data"
        ],
        "answer": 0,
        "explanation": "Clear labels and units help people understand what the visual shows."
      }
    ]
  },
  {
    "id": "power-bi",
    "title": "Power BI",
    "page": "course-guide.html?course=power-bi",
    "category": "analytics",
    "categoryLabel": "Data & BI",
    "image": "img/lms-power-bi.svg",
    "description": "Transform data into interactive reports with Power Query, data modeling, DAX, and dashboard design.",
    "tag": "Make insights visible",
    "resource": null,
    "format": "Guided practice",
    "lessons": [
      {
        "id": "1",
        "title": "Power BI Workflow & Setup",
        "video": null,
        "body": "Plan a report from source data to a useful decision. This path uses Power BI Desktop on Windows; use a Windows machine or environment for the hands-on exercises.",
        "practice": "Open Power BI Desktop and sketch a report that answers three questions about monthly sales.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "2",
        "title": "Connect & Inspect Your Data",
        "video": null,
        "body": "Choose a source and inspect column names, types, and missing values before building visuals. Keep track of where the data came from.",
        "practice": "Import a small sales CSV and record the number of rows and the purpose of each column.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "3",
        "title": "Clean & Transform with Power Query",
        "video": null,
        "body": "Treat cleaning as a repeatable sequence of transformations. Check the result after changing types, removing duplicates, or splitting columns.",
        "practice": "Standardize product names, set date and numeric types, and inspect errors in the transformed sales table.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "4",
        "title": "Model Tables & Relationships",
        "video": null,
        "body": "Choose the grain of each table and identify unique keys. Keep descriptive dimensions separate from repeated sales transactions.",
        "practice": "Sketch a sales fact table and product and date dimensions. Check keys before defining relationships.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema",
        "readingLabel": "Microsoft Learn: star schema"
      },
      {
        "id": "5",
        "title": "DAX Measures & Filter Context",
        "video": null,
        "body": "Write measures for reusable calculations. Check how results change with filters rather than assuming every visual uses the same context.",
        "practice": "Create a Total Sales measure with SUM, then compare its result with and without a product filter.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-quickstart-learn-dax-basics",
        "readingLabel": "Microsoft Learn: DAX basics"
      },
      {
        "id": "6",
        "title": "Reports, Slicers & Visual Design",
        "video": null,
        "body": "Organize a report around the most useful questions. Use consistent formatting and test whether slicers change the intended visuals.",
        "practice": "Build a sales summary with a total, monthly trend, product comparison, and date slicer.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "7",
        "title": "Validate & Plan Sharing",
        "video": null,
        "body": "Reconcile your totals with the source and test filters. Review access requirements before sharing business data or publishing a report.",
        "practice": "Compare your report totals against the source and write a checklist for the intended audience and refresh process.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "8",
        "title": "Capstone: Interactive Sales Report",
        "video": null,
        "body": "Build a report that explains what changed, where it changed, and what to investigate next. Include source notes and refresh assumptions.",
        "practice": "Deliver a report with a summary page and a detail page. Document three findings and demonstrate the slicers to a reviewer.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      }
    ],
    "quiz": [
      {
        "question": "Which tool prepares and transforms data before loading it into the model?",
        "options": [
          "Power Query",
          "A chart legend",
          "A page title"
        ],
        "answer": 0,
        "explanation": "Power Query handles data connection and repeatable transformation steps."
      },
      {
        "question": "What does a sales fact table usually contain?",
        "options": [
          "Only report colors",
          "Transaction records and numeric values",
          "Only user passwords"
        ],
        "answer": 1,
        "explanation": "A fact table stores observations at a defined grain, such as sales transactions."
      },
      {
        "question": "What can change the result of a DAX measure in a visual?",
        "options": [
          "The filter context",
          "Only the page background",
          "Only the report file name"
        ],
        "answer": 0,
        "explanation": "Measures are evaluated in the filter context supplied by visuals, slicers, and other filters."
      },
      {
        "question": "What is a good use of a slicer in a Power BI report?",
        "options": [
          "Let readers filter the report interactively",
          "Hide all measures permanently",
          "Replace the need for a data model"
        ],
        "answer": 0,
        "explanation": "Slicers let users filter visuals without changing the underlying dataset design."
      },
      {
        "question": "Where should relationship keys typically live in a star schema?",
        "options": [
          "Between fact and dimension tables",
          "Only inside page titles",
          "Only in chart colors"
        ],
        "answer": 0,
        "explanation": "Fact and dimension tables connect through keys so filters can flow correctly."
      }
    ]
  },
  {
    "id": "computer",
    "page": "Computer.html",
    "title": "Essential Computer & IT Skills",
    "category": "technology",
    "categoryLabel": "Technology",
    "image": "img/Computer.jpeg",
    "description": "Build everyday confidence with computers, office tools, and the digital world.",
    "tag": "Beginner friendly",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Computer Hardware & Operating System Basics",
        "video": "https://www.youtube.com/embed/qfUZBKDh9BY"
      },
      {
        "id": "2",
        "title": "Mastering Microsoft Word",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o"
      },
      {
        "id": "3",
        "title": "Essentials of Microsoft Excel",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg"
      },
      {
        "id": "4",
        "title": "Professional Presentations with PowerPoint",
        "video": "https://www.youtube.com/embed/Fl2lYiRPsVc"
      },
      {
        "id": "5",
        "title": "Internet & Email Essentials",
        "video": "https://www.youtube.com/embed/1XctnF7C74s"
      },
      {
        "id": "6",
        "title": "Cybersecurity & Digital Safety Basics",
        "video": "https://www.youtube.com/embed/z5nc9MDbvkw"
      },
      {
        "id": "7",
        "title": "Networking Fundamentals",
        "video": "https://www.youtube.com/embed/bj-Yfakjllc"
      },
      {
        "id": "8",
        "title": "IT Support & Troubleshooting",
        "video": "https://www.youtube.com/embed/bj-Yfakjllc"
      },
      {
        "id": "9",
        "title": "Introduction to IT Project Management & Tools",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs"
      },
      {
        "id": "10",
        "title": "Career Development & Certification Pathways in IT",
        "video": "https://www.youtube.com/embed/fZmQ_aPXJAM"
      }
    ],
    "quiz": [
      {
        "question": "Which application is designed for spreadsheet calculations?",
        "options": [
          "Microsoft Excel",
          "Microsoft Word",
          "Microsoft PowerPoint"
        ],
        "answer": 0,
        "explanation": "Excel organizes data in cells and supports formulas and calculations."
      },
      {
        "question": "What is the safest response to an unexpected email asking for your password?",
        "options": [
          "Reply with the password",
          "Verify through a trusted channel without opening its links",
          "Forward your password to a colleague"
        ],
        "answer": 1,
        "explanation": "Use a known, trusted contact method. Never share your password by email."
      },
      {
        "question": "Which device stores files persistently?",
        "options": [
          "RAM",
          "A keyboard",
          "An SSD"
        ],
        "answer": 2,
        "explanation": "An SSD retains stored data when the power is off."
      },
      {
        "question": "What does an operating system primarily do?",
        "options": [
          "Manage hardware and run applications",
          "Replace the need for any storage",
          "Print documents without software"
        ],
        "answer": 0,
        "explanation": "The OS manages hardware resources and provides a platform for applications."
      },
      {
        "question": "Which practice improves file organization?",
        "options": [
          "Using clear folder names and consistent file names",
          "Saving everything to the desktop randomly",
          "Deleting documents without checking"
        ],
        "answer": 0,
        "explanation": "Clear naming and folders make files easier to find and share."
      }
    ]
  },
  {
    "id": "broadband",
    "page": "Broadband.html",
    "title": "Broadband Technician",
    "category": "technology",
    "categoryLabel": "Technology",
    "image": "img/board.jpeg",
    "description": "Connect people and possibilities. Learn cabling, networks, and troubleshooting.",
    "tag": "Career skills",
    "resource": "docs/Broadband Technician Material New (2).pdf",
    "lessons": [
      {
        "id": "1",
        "title": "Broadband Fundamentals & Network Basics",
        "video": "https://www.youtube.com/embed/_IOZ8_cPgu8?controls=0"
      },
      {
        "id": "2",
        "title": "Copper Cabling & DSL Technologies",
        "video": "https://www.youtube.com/embed/zoefzxHIfPc"
      },
      {
        "id": "3",
        "title": "Fiber Optic Communication & FTTx",
        "video": "https://www.youtube.com/embed/SwnXI2Da6G0"
      },
      {
        "id": "4",
        "title": "Wireless & Mobile Broadband Technologies",
        "video": "https://www.youtube.com/embed/UTj1moMe1t0"
      },
      {
        "id": "5",
        "title": "Customer Premises Equipment (CPE) & Installation",
        "video": "https://www.youtube.com/embed/o0IlCvRbVXM"
      },
      {
        "id": "6",
        "title": "Broadband Network Security Essentials",
        "video": "https://www.youtube.com/embed/o0IlCvRbVXM?controls=0"
      },
      {
        "id": "7",
        "title": "Advanced Troubleshooting & Diagnostics",
        "video": "https://www.youtube.com/embed/UTj1moMe1t0?controls=0"
      },
      {
        "id": "8",
        "title": "Customer Service & Field Operations",
        "video": "https://www.youtube.com/embed/SwnXI2Da6G0?controls=0"
      },
      {
        "id": "9",
        "title": "Network Monitoring & Maintenance",
        "video": "https://www.youtube.com/embed/zoefzxHIfPc?controls=0"
      },
      {
        "id": "10",
        "title": "Certification Prep & Career Pathways",
        "video": "https://www.youtube.com/embed/_IOZ8_cPgu8?controls=0"
      }
    ],
    "quiz": [
      {
        "question": "What carries information through a fiber optic cable?",
        "options": [
          "Light",
          "Water",
          "Sound"
        ],
        "answer": 0,
        "explanation": "Fiber optic cables transmit information using pulses of light."
      },
      {
        "question": "What is the primary role of a router?",
        "options": [
          "Print documents",
          "Forward data between networks",
          "Store electric charge"
        ],
        "answer": 1,
        "explanation": "A router forwards packets between networks."
      },
      {
        "question": "What should you do before changing a customer’s network configuration?",
        "options": [
          "Record the current configuration",
          "Erase all settings immediately",
          "Share the Wi-Fi password publicly"
        ],
        "answer": 0,
        "explanation": "Record settings and follow an approved change process so you can recover if needed."
      },
      {
        "question": "What does IP addressing help a network do?",
        "options": [
          "Identify and deliver data to devices",
          "Increase sewing machine speed",
          "Replace electrical earthing"
        ],
        "answer": 0,
        "explanation": "IP addresses identify devices so packets can be routed correctly."
      },
      {
        "question": "What is a common first step when a customer has no internet?",
        "options": [
          "Check power, cables, and basic link lights",
          "Delete the customer account immediately",
          "Ignore the modem status lights"
        ],
        "answer": 0,
        "explanation": "Basic power and cabling checks often reveal simple connectivity problems."
      }
    ]
  },
  {
    "id": "electrician",
    "page": "Electrician.html",
    "title": "Electrical Skills & Safety",
    "category": "trades",
    "categoryLabel": "Skilled trades",
    "image": "img/Electrician.jpeg",
    "description": "Explore electrical systems, safe working practices, and practical diagnostics.",
    "tag": "Practical learning",
    "resource": "BOOK Elictritions.pdf",
    "lessons": [
      {
        "id": "1",
        "title": "Electrical Fundamentals & Safety",
        "video": "https://www.youtube.com/embed/videoseries?list=PLRNS1x1jcKbGQ5lPyrSUJtxHzvKChrmOj"
      },
      {
        "id": "2",
        "title": "Residential Wiring & National Electrical Code (NEC)",
        "video": "https://www.youtube.com/embed/bsdt310LESw"
      },
      {
        "id": "3",
        "title": "Commercial & Industrial Electrical Systems",
        "video": "https://www.youtube.com/embed/QRZlLWqOC4k"
      },
      {
        "id": "4",
        "title": "Renewable Energy & Smart Home Systems",
        "video": "https://www.youtube.com/embed/wIvUiF1gdEE"
      },
      {
        "id": "5",
        "title": "Electrical Troubleshooting & Diagnostics",
        "video": "https://www.youtube.com/embed/nYuVSG89vg0"
      },
      {
        "id": "6",
        "title": "Blueprints, Schematics & Estimating",
        "video": "https://www.youtube.com/embed/ODbWYYGo_d0"
      },
      {
        "id": "7",
        "title": "Advanced Electrical Installations",
        "video": "https://www.youtube.com/embed/qM6VjTPTzVU"
      },
      {
        "id": "8",
        "title": "Professionalism & Customer Relations",
        "video": "https://www.youtube.com/embed/KwoKmPAnSl8"
      },
      {
        "id": "9",
        "title": "Business Practices & Regulations",
        "video": "https://www.youtube.com/embed/LXFPeUl6k3w"
      }
    ],
    "quiz": [
      {
        "question": "Who should perform hands-on electrical installation?",
        "options": [
          "Anyone who has watched a video",
          "A trained, authorized person following local requirements",
          "An unsupervised beginner"
        ],
        "answer": 1,
        "explanation": "Practical electrical work requires training, authorization, and compliance with local requirements."
      },
      {
        "question": "What must happen before work on an electrical circuit?",
        "options": [
          "Assume a switch makes it safe",
          "Use an approved isolation process and verify absence of voltage",
          "Touch the wire to test it"
        ],
        "answer": 1,
        "explanation": "Follow the approved isolation and verification procedure. Never assume a circuit is safe."
      },
      {
        "question": "What is the purpose of protective earthing?",
        "options": [
          "Provide a fault-current path to help protective devices operate",
          "Increase the normal operating voltage",
          "Replace all circuit breakers"
        ],
        "answer": 0,
        "explanation": "Protective earthing provides a path for fault current; it does not replace other protection."
      },
      {
        "question": "Why are PPE and safe work practices important?",
        "options": [
          "They reduce injury risk during electrical work",
          "They replace the need for training",
          "They increase circuit voltage"
        ],
        "answer": 0,
        "explanation": "Personal protective equipment and safe practices help prevent electrical injuries."
      },
      {
        "question": "What should you do if you are unsure about an electrical procedure?",
        "options": [
          "Stop and seek guidance from a qualified person",
          "Guess and continue working live",
          "Remove all protective devices"
        ],
        "answer": 0,
        "explanation": "Uncertainty is a stop signal—get qualified guidance before continuing."
      }
    ]
  },
  {
    "id": "sewing",
    "page": "SewingMachine.html",
    "title": "Sewing & Garment Making",
    "category": "creative",
    "categoryLabel": "Creative skills",
    "image": "img/Sewing.jpeg",
    "description": "Turn creativity into a craft with stitching, pattern making, and garment finishing.",
    "tag": "Create & grow",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Sewing Machine Basics & Fabric Handling",
        "video": "https://www.youtube.com/embed/oD_KpZm7OaM"
      },
      {
        "id": "2",
        "title": "Stitching Techniques & Seams",
        "video": "https://www.youtube.com/embed/OpQs91Wg_rs"
      },
      {
        "id": "3",
        "title": "Garment Cutting & Pattern Making",
        "video": "https://www.youtube.com/embed/0WVOhnq1cro"
      },
      {
        "id": "4",
        "title": "Industrial Sewing Machine Operation",
        "video": "https://www.youtube.com/embed/4r4p61Mk84w"
      },
      {
        "id": "5",
        "title": "Advanced Stitching & Decorative Work",
        "video": "https://www.youtube.com/embed/lmnDPB4rXN8"
      },
      {
        "id": "6",
        "title": "Garment Assembly (Collars, Sleeves, Waistbands)",
        "video": "https://www.youtube.com/embed/KTe4jVri2bU"
      },
      {
        "id": "7",
        "title": "Quality Control & Finishing",
        "video": "https://www.youtube.com/embed/U8ImBMATfPI"
      },
      {
        "id": "8",
        "title": "Working with Special Fabrics",
        "video": "https://www.youtube.com/embed/OtpqqDvEm3Q"
      },
      {
        "id": "9",
        "title": "Production Efficiency & Workstation Setup",
        "video": "https://www.youtube.com/embed/eCrPW3sORQI"
      },
      {
        "id": "10",
        "title": "Professional Skills & Career Readiness",
        "video": "https://www.youtube.com/embed/HPtd-054h60"
      }
    ],
    "quiz": [
      {
        "question": "What should you do before changing a sewing machine needle?",
        "options": [
          "Disconnect power following the manufacturer’s instructions",
          "Keep the foot pedal pressed",
          "Increase the machine speed"
        ],
        "answer": 0,
        "explanation": "Disconnect power and follow the manufacturer’s procedure before changing the needle."
      },
      {
        "question": "Why is a seam allowance included in a pattern?",
        "options": [
          "For joining fabric pieces",
          "To remove the need for stitching",
          "To measure machine speed"
        ],
        "answer": 0,
        "explanation": "The seam allowance provides fabric beyond the stitching line for joining pieces."
      },
      {
        "question": "What helps achieve a consistent seam on a new fabric?",
        "options": [
          "Skip all testing",
          "Test stitch length and tension on a scrap first",
          "Pull the fabric forcefully"
        ],
        "answer": 1,
        "explanation": "A test on a scrap helps you adjust settings before sewing the garment."
      },
      {
        "question": "Why should fabric be pressed at key stages?",
        "options": [
          "To set seams and improve finished shape",
          "To remove the need for stitching",
          "To increase machine motor speed"
        ],
        "answer": 0,
        "explanation": "Pressing helps seams lie flat and improves the garment’s final appearance."
      },
      {
        "question": "What should you check before cutting fabric from a pattern?",
        "options": [
          "Grainline, size markings, and fabric layout",
          "Only the thread color",
          "Only the machine brand"
        ],
        "answer": 0,
        "explanation": "Correct layout and markings prevent cutting mistakes that waste fabric."
      }
    ]
  }
];
