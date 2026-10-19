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
    "tools": [
      "video",
      "python-lab",
      "web-lab",
      "lesson-quiz"
    ],
    "lessons": [
      {
        "id": "1",
        "title": "Python Foundations",
        "video": "https://www.youtube.com/embed/kqtD5dpn9C8",
        "lab": "python",
        "starterCode": "# Bill calculator practice\namount = float(input(\"Bill amount: \"))\ndiscount = float(input(\"Discount %: \"))\nfinal_price = amount - (amount * discount / 100)\nprint(\"Final price:\", round(final_price, 2))\n",
        "body": "Start with variables, strings, numbers, and input. Use clear names and inspect values as you work.",
        "practice": "In the Python lab below, create a bill calculator that takes an amount and a discount percentage, then displays the final price.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial",
        "quiz": [
          {
            "question": "Which type is best for a whole count of items?",
            "options": [
              "str",
              "int",
              "dict"
            ],
            "answer": 1,
            "explanation": "Whole counts are stored as integers."
          },
          {
            "question": "What does input() return by default?",
            "options": [
              "An integer",
              "A string",
              "A list"
            ],
            "answer": 1,
            "explanation": "input() returns text; convert it when you need a number."
          },
          {
            "question": "Which name is clearest for a discounted total?",
            "options": [
              "x",
              "final_price",
              "a1"
            ],
            "answer": 1,
            "explanation": "Clear names make programs easier to read and fix."
          },
          {
            "question": "What operator finds a percentage of an amount?",
            "options": [
              "amount + discount",
              "amount * discount / 100",
              "amount / 0"
            ],
            "answer": 1,
            "explanation": "Multiply by the percent and divide by 100."
          },
          {
            "question": "Why print intermediate values while learning?",
            "options": [
              "To inspect what the program is doing",
              "To delete variables",
              "To skip errors"
            ],
            "answer": 0,
            "explanation": "Printing helps you check values as you build."
          }
        ]
      },
      {
        "id": "2",
        "title": "Control Flow & Functions",
        "video": "https://www.youtube.com/embed/f4KOjWS_KZs",
        "lab": "python",
        "starterCode": "def grade_for(score):\n    if score < 0 or score > 100:\n        return \"Invalid\"\n    if score >= 90:\n        return \"A\"\n    if score >= 75:\n        return \"B\"\n    if score >= 50:\n        return \"C\"\n    return \"D\"\n\nfor value in [100, 75, 49, -1, 101]:\n    print(value, \"->\" , grade_for(value))\n",
        "body": "Break a program into decisions, loops, and reusable functions. Check boundary cases instead of testing only the happy path.",
        "practice": "Write a function that assigns a grade from a score. Test the minimum, maximum, and invalid inputs in the lab.",
        "readingUrl": "https://docs.python.org/3/tutorial/controlflow.html",
        "readingLabel": "Python control flow",
        "quiz": [
          {
            "question": "What keyword starts a reusable block of code?",
            "options": [
              "function",
              "def",
              "fun"
            ],
            "answer": 1,
            "explanation": "Python uses def to define a function."
          },
          {
            "question": "Which statement chooses between paths?",
            "options": [
              "print",
              "if / elif / else",
              "import"
            ],
            "answer": 1,
            "explanation": "Conditional branches use if/elif/else."
          },
          {
            "question": "Why test invalid inputs?",
            "options": [
              "To confirm the function handles edge cases",
              "To make the file larger",
              "To remove the function"
            ],
            "answer": 0,
            "explanation": "Edge cases reveal bugs before users do."
          },
          {
            "question": "What does return do in a function?",
            "options": [
              "Sends a result back to the caller",
              "Deletes the function",
              "Prints only"
            ],
            "answer": 0,
            "explanation": "return provides the function’s output value."
          },
          {
            "question": "A loop is useful when you need to…",
            "options": [
              "Repeat work for many values",
              "Rename a file once",
              "Close the browser"
            ],
            "answer": 0,
            "explanation": "Loops repeat a process over items or counts."
          }
        ]
      },
      {
        "id": "3",
        "title": "Collections, Files & Exceptions",
        "video": "https://www.youtube.com/embed/W8KRzm-HUcc",
        "lab": "python",
        "starterCode": "contacts = {\"Ada\": \"111-222\", \"Grace\": \"333-444\"}\n\ndef show():\n    for name, phone in contacts.items():\n        print(name, phone)\n\nshow()\nname = input(\"Name to add: \")\nphone = input(\"Phone: \")\ncontacts[name] = phone\nprint(\"Updated list:\")\nshow()\n",
        "body": "Use lists and dictionaries to organize records. Handle expected file and input errors so a simple mistake does not end the workflow.",
        "practice": "Build a small contact book with a dictionary in the lab. Add a contact and print the updated list.",
        "readingUrl": "https://docs.python.org/3/tutorial/datastructures.html",
        "readingLabel": "Python data structures",
        "quiz": [
          {
            "question": "Which structure maps keys to values?",
            "options": [
              "list",
              "dictionary",
              "integer"
            ],
            "answer": 1,
            "explanation": "Dictionaries store key → value pairs."
          },
          {
            "question": "What do try / except help with?",
            "options": [
              "Handling expected errors safely",
              "Speeding up the CPU",
              "Hiding all bugs forever"
            ],
            "answer": 0,
            "explanation": "Exceptions let you recover from expected failures."
          },
          {
            "question": "JSON files are useful because they…",
            "options": [
              "Store structured data as text",
              "Replace the need for variables",
              "Only work offline"
            ],
            "answer": 0,
            "explanation": "JSON is a common text format for structured records."
          },
          {
            "question": "contacts[\"Ada\"] reads…",
            "options": [
              "The value for key Ada",
              "Only the first list item",
              "A random phone"
            ],
            "answer": 0,
            "explanation": "Dictionary access uses the key."
          },
          {
            "question": "Why keep records in a collection?",
            "options": [
              "To organize and update many items",
              "To avoid naming anything",
              "To disable input"
            ],
            "answer": 0,
            "explanation": "Collections group related data."
          }
        ]
      },
      {
        "id": "4",
        "title": "HTML, CSS & Responsive Layouts",
        "video": "https://www.youtube.com/embed/UB1O30fR-EE",
        "lab": "web",
        "starterCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Portfolio</title>\n  <style>\n    body { font-family: sans-serif; margin: 0; padding: 24px; }\n    .grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }\n    article { border: 1px solid #ccc; padding: 12px; }\n    a:focus { outline: 3px solid #164c39; }\n  </style>\n</head>\n<body>\n  <h1>My Projects</h1>\n  <div class=\"grid\">\n    <article><h2>Project one</h2><p>Short description</p></article>\n    <article><h2>Project two</h2><p>Short description</p></article>\n  </div>\n  <form>\n    <label>Name <input name=\"name\" required></label>\n    <button type=\"submit\">Send</button>\n  </form>\n</body>\n</html>\n",
        "body": "Plan a page around semantic sections, labeled forms, and a layout that works on narrow screens. Keep structure and styling separate.",
        "practice": "Use the web lab to build a responsive portfolio page with a project grid, contact form labels, and visible keyboard focus.",
        "readingUrl": "https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "readingLabel": "MDN web development",
        "quiz": [
          {
            "question": "What does semantic HTML help with?",
            "options": [
              "Meaning and accessibility",
              "Faster Wi-Fi",
              "Database passwords"
            ],
            "answer": 0,
            "explanation": "Semantic tags describe content structure."
          },
          {
            "question": "CSS is mainly used to…",
            "options": [
              "Style and layout pages",
              "Store passwords",
              "Compile Python"
            ],
            "answer": 0,
            "explanation": "CSS controls presentation."
          },
          {
            "question": "A responsive layout should…",
            "options": [
              "Adapt to narrow and wide screens",
              "Only work on one monitor size",
              "Hide all labels"
            ],
            "answer": 0,
            "explanation": "Responsive design works across viewports."
          },
          {
            "question": "Why label form fields?",
            "options": [
              "So users and assistive tech know the purpose",
              "To remove validation",
              "To hide the input"
            ],
            "answer": 0,
            "explanation": "Labels improve usability and accessibility."
          },
          {
            "question": "Visible focus styles help…",
            "options": [
              "Keyboard users see where they are",
              "Increase font files",
              "Disable CSS"
            ],
            "answer": 0,
            "explanation": "Focus outlines support keyboard navigation."
          }
        ]
      },
      {
        "id": "5",
        "title": "JavaScript & Browser Interaction",
        "video": "https://www.youtube.com/embed/W6NZfCO5SIk",
        "lab": "web",
        "starterCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<body>\n  <input id=\"filter\" placeholder=\"Filter projects\" aria-label=\"Filter projects\">\n  <ul id=\"list\">\n    <li>Portfolio site</li>\n    <li>Task manager</li>\n    <li>Shop dashboard</li>\n  </ul>\n  <script>\n    const input = document.getElementById(\"filter\");\n    const items = [...document.querySelectorAll(\"#list li\")];\n    input.addEventListener(\"input\", () => {\n      const q = input.value.toLowerCase();\n      items.forEach(li => {\n        li.hidden = !li.textContent.toLowerCase().includes(q);\n      });\n    });\n  </script>\n</body>\n</html>\n",
        "body": "Connect buttons and forms to browser events. Validate input and show useful feedback before sending a request.",
        "practice": "In the web lab, add a filterable project list and test it with keyboard input.",
        "readingUrl": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting",
        "readingLabel": "MDN JavaScript",
        "quiz": [
          {
            "question": "addEventListener is used to…",
            "options": [
              "Respond to user actions",
              "Install Django",
              "Format CSS only"
            ],
            "answer": 0,
            "explanation": "It attaches handlers to events like click or input."
          },
          {
            "question": "document.getElementById finds…",
            "options": [
              "An element in the page",
              "A Python package",
              "A database row"
            ],
            "answer": 0,
            "explanation": "It selects a DOM node by id."
          },
          {
            "question": "Client-side validation should…",
            "options": [
              "Help users fix input early",
              "Replace all server checks",
              "Hide errors forever"
            ],
            "answer": 0,
            "explanation": "It improves UX but server checks remain required."
          },
          {
            "question": "Why keep feedback visible after input?",
            "options": [
              "Users understand what happened",
              "It slows the network",
              "It deletes the form"
            ],
            "answer": 0,
            "explanation": "Clear feedback guides the next action."
          },
          {
            "question": "querySelectorAll returns…",
            "options": [
              "A list of matching elements",
              "One CSS file",
              "A SQL table"
            ],
            "answer": 0,
            "explanation": "It selects multiple DOM nodes."
          }
        ]
      },
      {
        "id": "6",
        "title": "Django Projects, URLs & Views",
        "video": "https://www.youtube.com/embed/rHux0gMZ3Eg",
        "lab": "python",
        "starterCode": "# Practice the request → route → view idea in plain Python\ndef home(request):\n    return \"Hello from the home view\"\n\ndef about(request):\n    return \"About this project\"\n\nroutes = {\n    \"/\": home,\n    \"/about/\": about,\n}\n\npath = input(\"Path ( / or /about/ ): \").strip() or \"/\"\nview = routes.get(path)\nprint(view(path) if view else \"404 Not Found\")\n",
        "body": "Map an incoming URL to a view and return a response. Build one small route at a time before adding templates and forms.",
        "practice": "Use the lab to model routes and views. Then follow the Django tutorial on your computer to create a real project.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/intro/tutorial01/",
        "readingLabel": "Django getting started",
        "quiz": [
          {
            "question": "A URL route typically maps to…",
            "options": [
              "A view that returns a response",
              "A CSS color",
              "A video codec"
            ],
            "answer": 0,
            "explanation": "Routes connect paths to view callables."
          },
          {
            "question": "What should you build first in Django?",
            "options": [
              "One working page/route",
              "Every feature at once",
              "Only production servers"
            ],
            "answer": 0,
            "explanation": "Start small and confirm the path works."
          },
          {
            "question": "runserver is used to…",
            "options": [
              "Run a local development server",
              "Delete migrations",
              "Compile CSS"
            ],
            "answer": 0,
            "explanation": "It serves your project while you develop."
          },
          {
            "question": "Why separate URLs and views?",
            "options": [
              "Clear structure and reuse",
              "To avoid HTML",
              "To hide Python"
            ],
            "answer": 0,
            "explanation": "Routing and response logic stay organized."
          },
          {
            "question": "A 404 means…",
            "options": [
              "No matching route was found",
              "The password is wrong",
              "CSS failed"
            ],
            "answer": 0,
            "explanation": "Unknown paths return not found."
          }
        ]
      },
      {
        "id": "7",
        "title": "Database Models & CRUD",
        "video": "https://www.youtube.com/embed/F5mRW0jo-U4",
        "lab": "python",
        "starterCode": "# Mini CRUD in memory (Django does this with models + ORM)\ntasks = []\nnext_id = 1\n\ndef create(title):\n    global next_id\n    task = {\"id\": next_id, \"title\": title, \"done\": False}\n    next_id += 1\n    tasks.append(task)\n    return task\n\ndef list_tasks():\n    for task in tasks:\n        print(task)\n\ncreate(\"Study Django models\")\ncreate(\"Add edit and delete later\")\nlist_tasks()\n",
        "body": "Model the records your application needs. Plan create, read, update, and delete actions with validation for each change.",
        "practice": "Practice CRUD in the lab, then build a Task model in Django with create/list/edit/delete pages.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/intro/tutorial02/",
        "readingLabel": "Django models tutorial",
        "quiz": [
          {
            "question": "CRUD stands for…",
            "options": [
              "Create, Read, Update, Delete",
              "Copy, Run, Upload, Deploy",
              "Cache, Route, Use, Drop"
            ],
            "answer": 0,
            "explanation": "CRUD is the common set of data operations."
          },
          {
            "question": "A model describes…",
            "options": [
              "The shape of stored records",
              "Only button colors",
              "Video playback speed"
            ],
            "answer": 0,
            "explanation": "Models define fields and behavior for data."
          },
          {
            "question": "Validation belongs with…",
            "options": [
              "Each create/update action",
              "Only the browser title",
              "Random CSS"
            ],
            "answer": 0,
            "explanation": "Validate before saving bad data."
          },
          {
            "question": "An ORM helps you…",
            "options": [
              "Work with the database through Python",
              "Replace HTML",
              "Skip authentication"
            ],
            "answer": 0,
            "explanation": "ORM maps objects to tables."
          },
          {
            "question": "Why list records after creating one?",
            "options": [
              "To confirm the create worked",
              "To erase the database",
              "To disable forms"
            ],
            "answer": 0,
            "explanation": "Read-back checks the write path."
          }
        ]
      },
      {
        "id": "8",
        "title": "Authentication & Authorization",
        "video": "https://www.youtube.com/embed/rHux0gMZ3Eg",
        "lab": "python",
        "starterCode": "users = {\"ada\": \"tasks-ada\", \"grace\": \"tasks-grace\"}\nownership = {\"1\": \"ada\", \"2\": \"grace\"}\n\ndef can_edit(user, task_id):\n    return ownership.get(task_id) == user\n\nuser = input(\"User (ada/grace): \").strip()\ntask_id = input(\"Task id (1/2): \").strip()\nprint(\"Allowed\" if can_edit(user, task_id) else \"Denied\")\n",
        "body": "Keep identity separate from permission. Use framework authentication and check ownership on the server for every protected action.",
        "practice": "In the lab, deny edits when the user does not own the task. Then add real Django login and ownership checks.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/topics/auth/",
        "readingLabel": "Django authentication",
        "quiz": [
          {
            "question": "Where must ownership be checked?",
            "options": [
              "On the server handling the request",
              "Only in CSS",
              "Only in the page title"
            ],
            "answer": 0,
            "explanation": "Authorization must be enforced server-side."
          },
          {
            "question": "Authentication answers…",
            "options": [
              "Who the user is",
              "Which color to use",
              "How long a video is"
            ],
            "answer": 0,
            "explanation": "Authentication establishes identity."
          },
          {
            "question": "Authorization answers…",
            "options": [
              "What the user may do",
              "How to center text",
              "Which CDN to use"
            ],
            "answer": 0,
            "explanation": "Authorization grants or denies actions."
          },
          {
            "question": "Passwords should be stored…",
            "options": [
              "Hashed with a secure method",
              "In plain text",
              "Inside CSS"
            ],
            "answer": 0,
            "explanation": "Never store plain-text passwords."
          },
          {
            "question": "Changing another user’s task URL should…",
            "options": [
              "Be denied by the server",
              "Always succeed",
              "Only update CSS"
            ],
            "answer": 0,
            "explanation": "Ownership checks block cross-user edits."
          }
        ]
      },
      {
        "id": "9",
        "title": "JSON APIs & Frontend Integration",
        "video": "https://www.youtube.com/embed/PoRJizFvM7s",
        "lab": "python",
        "starterCode": "import json\n\ntasks = [\n    {\"id\": 1, \"title\": \"Learn fetch\", \"done\": False},\n    {\"id\": 2, \"title\": \"Handle errors\", \"done\": True},\n]\n\n# Pretend API response\npayload = json.dumps({\"tasks\": tasks})\nprint(\"API JSON:\")\nprint(payload)\n\ndata = json.loads(payload)\nfor task in data[\"tasks\"]:\n    print(\"-\", task[\"title\"], \"(done)\" if task[\"done\"] else \"(open)\")\n",
        "body": "Define the shape of a request and response before connecting the frontend. Handle loading states and errors as part of the interface.",
        "practice": "Shape a JSON payload in the lab, then use fetch in your project to display tasks from an endpoint.",
        "readingUrl": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
        "readingLabel": "MDN Fetch guide",
        "quiz": [
          {
            "question": "JSON is commonly used to…",
            "options": [
              "Exchange structured data with APIs",
              "Style buttons",
              "Host videos"
            ],
            "answer": 0,
            "explanation": "APIs often send and receive JSON."
          },
          {
            "question": "fetch() in the browser is used to…",
            "options": [
              "Request data from a URL",
              "Compile Python",
              "Edit CSS variables only"
            ],
            "answer": 0,
            "explanation": "fetch performs HTTP requests."
          },
          {
            "question": "Why show a loading state?",
            "options": [
              "Users know work is in progress",
              "It replaces authentication",
              "It deletes JSON"
            ],
            "answer": 0,
            "explanation": "Loading feedback improves trust and clarity."
          },
          {
            "question": "API errors should be…",
            "options": [
              "Handled and shown clearly",
              "Ignored silently always",
              "Stored in CSS"
            ],
            "answer": 0,
            "explanation": "Users need a path when requests fail."
          },
          {
            "question": "Agreeing on response shape first helps…",
            "options": [
              "Frontend and backend stay compatible",
              "Avoid HTML",
              "Skip testing"
            ],
            "answer": 0,
            "explanation": "A shared contract prevents mismatches."
          }
        ]
      },
      {
        "id": "10",
        "title": "Testing & Portfolio Project",
        "video": "https://www.youtube.com/embed/6tNS--WetLI",
        "lab": "python",
        "starterCode": "def can_edit(user, owner):\n    return user == owner\n\ndef test_owner_can_edit():\n    assert can_edit(\"ada\", \"ada\") is True\n\ndef test_other_user_denied():\n    assert can_edit(\"grace\", \"ada\") is False\n\ntest_owner_can_edit()\ntest_other_user_denied()\nprint(\"All ownership tests passed\")\n",
        "body": "Choose tests around behavior: valid actions, invalid inputs, and denied access. Document how someone else can run the application.",
        "practice": "Write ownership tests in the lab, then finish your task manager with auth, persistence, UI, README, and Django tests.",
        "readingUrl": "https://docs.djangoproject.com/en/5.2/topics/testing/",
        "readingLabel": "Django testing guide",
        "quiz": [
          {
            "question": "Good tests focus on…",
            "options": [
              "Behavior users care about",
              "Only file names",
              "Random colors"
            ],
            "answer": 0,
            "explanation": "Behavior tests catch real regressions."
          },
          {
            "question": "An ownership test should prove…",
            "options": [
              "Other users cannot edit your records",
              "CSS is minified",
              "Videos autoplay"
            ],
            "answer": 0,
            "explanation": "Authorization bugs are high impact."
          },
          {
            "question": "A README should explain…",
            "options": [
              "How to run the project",
              "Your Wi-Fi password",
              "Private API keys"
            ],
            "answer": 0,
            "explanation": "Clear setup steps help others use your work."
          },
          {
            "question": "assert in a test checks…",
            "options": [
              "That a condition is true",
              "That HTML is pretty",
              "That a CDN exists"
            ],
            "answer": 0,
            "explanation": "Failed asserts fail the test."
          },
          {
            "question": "Testing denied access matters because…",
            "options": [
              "Security bugs are serious",
              "It improves font loading",
              "It replaces backups"
            ],
            "answer": 0,
            "explanation": "Access control must be verified."
          }
        ]
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
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Start with a specific decision and a measurable question. Define the time period, population, and unit of analysis before collecting data.",
        "practice": "Write three questions for a small retail business. For each, name the metric and the data needed.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "2",
        "title": "Spreadsheets & Data Quality",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Inspect column types, missing values, duplicates, and inconsistent labels. Keep a raw copy and record each cleaning decision.",
        "practice": "Create a small sales sheet with deliberate errors. Clean it and keep a log explaining which rows changed.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "3",
        "title": "SQL: Filter, Group & Summarize",
        "video": "https://www.youtube.com/embed/HXV3zeQKqGY",
        "body": "Think about the rows you need before choosing filters and aggregations. Check that each summary answers the original question.",
        "practice": "Create a sales table and write queries for monthly revenue, order count, and revenue by product.",
        "readingUrl": "https://www.postgresql.org/docs/current/tutorial-sql.html",
        "readingLabel": "PostgreSQL SQL tutorial"
      },
      {
        "id": "4",
        "title": "SQL Joins & Relationships",
        "video": "https://www.youtube.com/embed/HXV3zeQKqGY",
        "body": "Identify the key and expected row count before joining tables. A repeated key can multiply rows and distort a total.",
        "practice": "Join customers to orders. Compare the row count and revenue before and after the join.",
        "readingUrl": "https://www.postgresql.org/docs/current/tutorial-sql.html",
        "readingLabel": "PostgreSQL SQL tutorial"
      },
      {
        "id": "5",
        "title": "Python Data Analysis with pandas",
        "video": "https://www.youtube.com/embed/vmEHCJofslg",
        "body": "Load tabular data, inspect its structure, and select the columns you need. Make the steps repeatable in a notebook or script.",
        "practice": "Load a sales CSV with pandas, inspect types and missing values, then calculate revenue by category.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "6",
        "title": "Cleaning & Exploratory Analysis",
        "video": "https://www.youtube.com/embed/vmEHCJofslg",
        "body": "Compare distributions and groups, then investigate unusual values. Decide whether an outlier is an error or a real observation before changing it.",
        "practice": "Create a reproducible cleaning workflow and compare product sales across two months.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "7",
        "title": "Visualization & Insight Writing",
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Choose a chart based on the comparison you want to show. Add units, a clear title, and a brief interpretation without claiming causation from correlation.",
        "practice": "Create a trend chart and a category comparison. Write one finding and one limitation for each.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/",
        "readingLabel": "pandas learning tutorials"
      },
      {
        "id": "8",
        "title": "Capstone: Sales Insights Report",
        "video": "https://www.youtube.com/embed/rfscVS0vtbw",
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
        "video": "https://www.youtube.com/embed/NNSHu0rkew8",
        "body": "Plan a report from source data to a useful decision. This path uses Power BI Desktop on Windows; use a Windows machine or environment for the hands-on exercises.",
        "practice": "Open Power BI Desktop and sketch a report that answers three questions about monthly sales.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "2",
        "title": "Connect & Inspect Your Data",
        "video": "https://www.youtube.com/embed/AGrl-H87pRU",
        "body": "Choose a source and inspect column names, types, and missing values before building visuals. Keep track of where the data came from.",
        "practice": "Import a small sales CSV and record the number of rows and the purpose of each column.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "3",
        "title": "Clean & Transform with Power Query",
        "video": "https://www.youtube.com/embed/6cV3OwFrOkk",
        "body": "Treat cleaning as a repeatable sequence of transformations. Check the result after changing types, removing duplicates, or splitting columns.",
        "practice": "Standardize product names, set date and numeric types, and inspect errors in the transformed sales table.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "4",
        "title": "Model Tables & Relationships",
        "video": "https://www.youtube.com/embed/NNSHu0rkew8",
        "body": "Choose the grain of each table and identify unique keys. Keep descriptive dimensions separate from repeated sales transactions.",
        "practice": "Sketch a sales fact table and product and date dimensions. Check keys before defining relationships.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema",
        "readingLabel": "Microsoft Learn: star schema"
      },
      {
        "id": "5",
        "title": "DAX Measures & Filter Context",
        "video": "https://www.youtube.com/embed/AGrl-H87pRU",
        "body": "Write measures for reusable calculations. Check how results change with filters rather than assuming every visual uses the same context.",
        "practice": "Create a Total Sales measure with SUM, then compare its result with and without a product filter.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-quickstart-learn-dax-basics",
        "readingLabel": "Microsoft Learn: DAX basics"
      },
      {
        "id": "6",
        "title": "Reports, Slicers & Visual Design",
        "video": "https://www.youtube.com/embed/6cV3OwFrOkk",
        "body": "Organize a report around the most useful questions. Use consistent formatting and test whether slicers change the intended visuals.",
        "practice": "Build a sales summary with a total, monthly trend, product comparison, and date slicer.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "7",
        "title": "Validate & Plan Sharing",
        "video": "https://www.youtube.com/embed/NNSHu0rkew8",
        "body": "Reconcile your totals with the source and test filters. Review access requirements before sharing business data or publishing a report.",
        "practice": "Compare your report totals against the source and write a checklist for the intended audience and refresh process.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started",
        "readingLabel": "Microsoft Learn: getting started"
      },
      {
        "id": "8",
        "title": "Capstone: Interactive Sales Report",
        "video": "https://www.youtube.com/embed/AGrl-H87pRU",
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
        "video": "https://www.youtube.com/embed/nYuVSG89vg0"
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
        "video": "https://www.youtube.com/embed/lmnDPB4rXN8"
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
        "video": "https://www.youtube.com/embed/OpQs91Wg_rs"
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
  },
  {
    "id": "advanced-excel-power-bi",
    "title": "Advanced Excel & Power BI",
    "page": "course-guide.html?course=advanced-excel-power-bi",
    "category": "analytics",
    "categoryLabel": "Data & BI",
    "image": "img/lms-power-bi.svg",
    "description": "Build advanced spreadsheets, dashboards, and Power BI reports used in high-demand analyst roles.",
    "tag": "High demand",
    "track": "professional",
    "demand": "High",
    "duration": "60–90 hours",
    "careers": "MIS Executive, Reporting Analyst, Junior Business Analyst",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Excel foundations for analysts",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Refresh formulas, tables, and clean data habits used in daily MIS work.",
        "practice": "Build a sales table with totals, averages, and percentage growth.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "2",
        "title": "Lookups, pivots & dashboards",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Use lookup functions and PivotTables to summarise business questions quickly.",
        "practice": "Create a PivotTable dashboard for monthly revenue by product.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "3",
        "title": "Power BI Desktop setup",
        "video": "https://www.youtube.com/embed/NNSHu0rkew8",
        "body": "Install and navigate Power BI Desktop. Plan a report from source to insight.",
        "practice": "Sketch three questions your first sales report should answer.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      },
      {
        "id": "4",
        "title": "Power Query cleaning",
        "video": "https://www.youtube.com/embed/AGrl-H87pRU",
        "body": "Transform messy files into trusted tables with repeatable Power Query steps.",
        "practice": "Clean a sample CSV: fix types, remove blanks, standardise names.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      },
      {
        "id": "5",
        "title": "Model & DAX measures",
        "video": "https://www.youtube.com/embed/6cV3OwFrOkk",
        "body": "Relate tables and write measures that respond correctly to filters.",
        "practice": "Create a Total Sales measure and test it with a slicer.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      },
      {
        "id": "6",
        "title": "Executive reporting project",
        "video": "https://www.youtube.com/embed/NNSHu0rkew8",
        "body": "Design a clear report page for managers with trend, comparison, and filter controls.",
        "practice": "Deliver a one-page executive view and list three insights.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Advanced Excel & Power BI?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "ai-tools-automation",
    "title": "AI Tools & Workplace Automation",
    "page": "course-guide.html?course=ai-tools-automation",
    "category": "technology",
    "categoryLabel": "Technology",
    "image": "img/lms-python-fullstack.svg",
    "description": "Use AI assistants and automation habits to speed up office work while staying accurate and secure.",
    "tag": "High demand",
    "track": "professional",
    "demand": "High",
    "duration": "45–60 hours",
    "careers": "Operations Executive, Admin Associate, Productivity Specialist",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "AI at work: safe & useful",
        "video": "https://www.youtube.com/embed/fZmQ_aPXJAM",
        "body": "Understand where AI helps knowledge work and where human review is required.",
        "practice": "List five tasks in your target role that AI can draft vs must verify.",
        "readingUrl": "https://www.microsoft.com/en-us/microsoft-365/copilot",
        "readingLabel": "Microsoft Copilot overview"
      },
      {
        "id": "2",
        "title": "Prompting for office outputs",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Write clear prompts for emails, summaries, and checklists with tone and constraints.",
        "practice": "Draft a customer reply prompt and refine it twice for clarity.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "3",
        "title": "Document & spreadsheet acceleration",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Combine AI drafts with Excel and Word workflows for faster first versions.",
        "practice": "Generate a meeting summary template and convert action items into a tracker table.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "4",
        "title": "Automation thinking",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Map repetitive processes and decide what to automate vs keep manual.",
        "practice": "Draw a simple flowchart for an invoice or leave-request process.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-automate/",
        "readingLabel": "Power Automate Learn"
      },
      {
        "id": "5",
        "title": "Quality, privacy & review",
        "video": "https://www.youtube.com/embed/z5nc9MDbvkw",
        "body": "Protect confidential data and validate AI outputs before sending externally.",
        "practice": "Create a 6-point review checklist for AI-assisted workplace documents.",
        "readingUrl": "https://www.microsoft.com/en-us/trust-center",
        "readingLabel": "Trust Center"
      },
      {
        "id": "6",
        "title": "Capstone: productive week plan",
        "video": "https://www.youtube.com/embed/fZmQ_aPXJAM",
        "body": "Design a personal AI-assisted weekly workflow for an office role.",
        "practice": "Submit a one-page plan covering tools, prompts, and review steps.",
        "readingUrl": "https://www.microsoft.com/en-us/microsoft-365",
        "readingLabel": "Microsoft 365"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting AI Tools & Workplace Automation?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "digital-marketing-seo",
    "title": "Digital Marketing & SEO",
    "page": "course-guide.html?course=digital-marketing-seo",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "image": "img/lms-data-analytics.svg",
    "description": "Learn search, content, and campaign fundamentals used in high-demand digital marketing roles.",
    "tag": "High demand",
    "track": "professional",
    "demand": "High",
    "duration": "60–90 hours",
    "careers": "Marketing Executive, SEO Executive, Content Marketer",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Digital marketing landscape",
        "video": "https://www.youtube.com/embed/xsVTqzratPs",
        "body": "Map channels: search, social, email, and paid — and how they support business goals.",
        "practice": "Pick a local business and write goals for awareness, leads, and sales.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Google Search docs"
      },
      {
        "id": "2",
        "title": "SEO fundamentals",
        "video": "https://www.youtube.com/embed/xsVTqzratPs",
        "body": "Learn how search engines crawl, index, and rank pages.",
        "practice": "List on-page SEO checks for a service page title, headings, and meta description.",
        "readingUrl": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        "readingLabel": "SEO starter guide"
      },
      {
        "id": "3",
        "title": "Keyword research basics",
        "video": "https://www.youtube.com/embed/qX6Q8DQGyRU",
        "body": "Find searchable phrases with intent and realistic competition.",
        "practice": "Build a 15-keyword list grouped by informational vs commercial intent.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Google Search docs"
      },
      {
        "id": "4",
        "title": "Content that ranks & converts",
        "video": "https://www.youtube.com/embed/xsVTqzratPs",
        "body": "Structure pages for clarity, trust, and conversion.",
        "practice": "Outline a landing page with H1–H3, CTA, and FAQ.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Google Search docs"
      },
      {
        "id": "5",
        "title": "Analytics & iteration",
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Read basic traffic and conversion signals to improve campaigns.",
        "practice": "Define 5 KPIs for a monthly SEO report.",
        "readingUrl": "https://support.google.com/analytics",
        "readingLabel": "Google Analytics help"
      },
      {
        "id": "6",
        "title": "Campaign capstone",
        "video": "https://www.youtube.com/embed/qX6Q8DQGyRU",
        "body": "Plan a 30-day organic growth sprint for a sample brand.",
        "practice": "Deliver keyword map, content calendar, and success metrics.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Google Search docs"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Digital Marketing & SEO?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "python-beginners",
    "title": "Python for Beginners",
    "page": "course-guide.html?course=python-beginners",
    "category": "technology",
    "categoryLabel": "Technology",
    "image": "img/lms-python-fullstack.svg",
    "description": "Start programming with Python for technical and automation-oriented career paths.",
    "tag": "High in technical roles",
    "track": "professional",
    "demand": "High",
    "duration": "90–120 hours",
    "careers": "Junior Developer Trainee, Automation Assistant, Data Associate",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Python setup & first programs",
        "video": "https://www.youtube.com/embed/kqtD5dpn9C8",
        "body": "Install Python mindset: variables, input/output, and clear naming.",
        "practice": "Write a program that calculates simple interest.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial"
      },
      {
        "id": "2",
        "title": "Decisions & loops",
        "video": "https://www.youtube.com/embed/f4KOjWS_KZs",
        "body": "Use if/else and loops to handle repeated workplace logic.",
        "practice": "Grade scores and print pass/fail with validation.",
        "readingUrl": "https://docs.python.org/3/tutorial/controlflow.html",
        "readingLabel": "Control flow"
      },
      {
        "id": "3",
        "title": "Functions & reuse",
        "video": "https://www.youtube.com/embed/rfscVS0vtbw",
        "body": "Package logic into functions you can test and reuse.",
        "practice": "Create functions for discount price and invoice total.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial"
      },
      {
        "id": "4",
        "title": "Lists & dictionaries",
        "video": "https://www.youtube.com/embed/W8KRzm-HUcc",
        "body": "Store collections of records for mini business tools.",
        "practice": "Build an in-memory product price catalogue.",
        "readingUrl": "https://docs.python.org/3/tutorial/datastructures.html",
        "readingLabel": "Data structures"
      },
      {
        "id": "5",
        "title": "Files & errors",
        "video": "https://www.youtube.com/embed/rfscVS0vtbw",
        "body": "Read/write simple files and handle expected errors safely.",
        "practice": "Save contacts to a text/JSON-like structure and reload them.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial"
      },
      {
        "id": "6",
        "title": "Beginner project",
        "video": "https://www.youtube.com/embed/kqtD5dpn9C8",
        "body": "Combine skills into a small utility script.",
        "practice": "Deliver an expense tracker CLI with add/list/total commands.",
        "readingUrl": "https://docs.python.org/3/tutorial/",
        "readingLabel": "Python tutorial"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Python for Beginners?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "hr-recruitment-payroll",
    "title": "HR Recruitment & Payroll",
    "page": "course-guide.html?course=hr-recruitment-payroll",
    "category": "business",
    "categoryLabel": "Business & HR",
    "image": "img/board.jpeg",
    "description": "Learn hiring workflows and payroll fundamentals with broad office-sector applicability.",
    "tag": "Office-sector ready",
    "track": "professional",
    "demand": "Broad applicability",
    "duration": "60 hours",
    "careers": "HR Assistant, Payroll Executive, Recruitment Coordinator",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "HR function overview",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Understand recruitment, onboarding, attendance, and payroll touchpoints.",
        "practice": "Map an employee lifecycle from offer to first salary.",
        "readingUrl": "https://www.ilo.org/",
        "readingLabel": "Workplace standards reference"
      },
      {
        "id": "2",
        "title": "Job descriptions & sourcing",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Write clear JD criteria and source candidates ethically.",
        "practice": "Draft a JD for an Accounts Executive role.",
        "readingUrl": "https://www.ilo.org/",
        "readingLabel": "Workplace standards reference"
      },
      {
        "id": "3",
        "title": "Screening & interviews",
        "video": "https://www.youtube.com/embed/fZmQ_aPXJAM",
        "body": "Plan structured interviews and fair evaluation scorecards.",
        "practice": "Create a 8-question interview scorecard.",
        "readingUrl": "https://www.ilo.org/",
        "readingLabel": "Workplace standards reference"
      },
      {
        "id": "4",
        "title": "Offer & onboarding docs",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Organise joining checklists, document collection, and induction basics.",
        "practice": "Build an onboarding checklist for week one.",
        "readingUrl": "https://support.microsoft.com/word",
        "readingLabel": "Word help"
      },
      {
        "id": "5",
        "title": "Payroll components",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Learn earnings, deductions, and payslip structure at a conceptual level.",
        "practice": "Prepare a sample payslip sheet with basic earnings and deductions.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "6",
        "title": "HR operations capstone",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Connect recruitment and payroll into one monthly operations calendar.",
        "practice": "Submit a monthly HR ops calendar with owners and due dates.",
        "readingUrl": "https://www.ilo.org/",
        "readingLabel": "Workplace standards reference"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting HR Recruitment & Payroll?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "data-analytics-fundamentals",
    "title": "Data Analytics Fundamentals",
    "page": "course-guide.html?course=data-analytics-fundamentals",
    "category": "analytics",
    "categoryLabel": "Data & BI",
    "image": "img/lms-data-analytics.svg",
    "description": "Build analytical thinking with spreadsheets, SQL, and Python for high-demand analyst roles.",
    "tag": "High in analytical roles",
    "track": "professional",
    "demand": "High",
    "duration": "90–120 hours",
    "careers": "Data Analyst Trainee, Business Analyst Associate, Reporting Analyst",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Ask better business questions",
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Define metrics, time windows, and decision outcomes before analysis.",
        "practice": "Write three measurable questions for a retail business.",
        "readingUrl": "https://pandas.pydata.org/docs/",
        "readingLabel": "pandas docs"
      },
      {
        "id": "2",
        "title": "Spreadsheet analysis",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Clean columns, create summaries, and validate totals.",
        "practice": "Build a monthly KPI sheet with trend formulas.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "3",
        "title": "SQL foundations",
        "video": "https://www.youtube.com/embed/HXV3zeQKqGY",
        "body": "Query tables with SELECT, WHERE, GROUP BY, and JOIN patterns.",
        "practice": "Write queries for top products and monthly revenue.",
        "readingUrl": "https://www.w3schools.com/sql/",
        "readingLabel": "SQL tutorial"
      },
      {
        "id": "4",
        "title": "Python & pandas intro",
        "video": "https://www.youtube.com/embed/vmEHCJofslg",
        "body": "Load tabular data and compute basic aggregates in Python.",
        "practice": "Load a CSV and print shape, null counts, and group totals.",
        "readingUrl": "https://pandas.pydata.org/docs/getting_started/",
        "readingLabel": "pandas getting started"
      },
      {
        "id": "5",
        "title": "Visual storytelling",
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Choose charts that answer the question without misleading scales.",
        "practice": "Create three charts and a five-line insight summary.",
        "readingUrl": "https://pandas.pydata.org/docs/",
        "readingLabel": "pandas docs"
      },
      {
        "id": "6",
        "title": "Analytics capstone",
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Deliver an end-to-end mini analysis with caveats and recommendations.",
        "practice": "Submit notebook/sheet, charts, and a one-page brief.",
        "readingUrl": "https://pandas.pydata.org/docs/",
        "readingLabel": "pandas docs"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Data Analytics Fundamentals?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "banking-finance-operations",
    "title": "Banking & Finance Operations",
    "page": "course-guide.html?course=banking-finance-operations",
    "category": "finance",
    "categoryLabel": "Finance",
    "image": "img/board.jpeg",
    "description": "Understand banking operations, compliance basics, and finance-sector workplace processes.",
    "tag": "Finance-sector",
    "track": "professional",
    "demand": "Finance-sector specific",
    "duration": "60–90 hours",
    "careers": "Banking Operations Associate, Finance Operations Executive",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Banking ecosystem overview",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Learn deposits, lending, payments, and customer lifecycle basics.",
        "practice": "Diagram how a customer account request moves through a branch.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      },
      {
        "id": "2",
        "title": "KYC & documentation",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Follow document accuracy and verification habits for onboarding.",
        "practice": "Create a KYC checklist for individual vs business accounts.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      },
      {
        "id": "3",
        "title": "Payments & reconciliation",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Track entries, mismatches, and daily reconciliation discipline.",
        "practice": "Build a sample reconciliation sheet with matched/unmatched rows.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "4",
        "title": "Risk, fraud & controls",
        "video": "https://www.youtube.com/embed/z5nc9MDbvkw",
        "body": "Recognise common control points and escalation paths.",
        "practice": "Write a red-flag list for suspicious transaction patterns.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      },
      {
        "id": "5",
        "title": "Customer service in finance",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Communicate clearly under policy constraints.",
        "practice": "Draft a polite email explaining a failed transaction next step.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "6",
        "title": "Operations capstone",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Design a daily ops checklist for a junior banking associate.",
        "practice": "Submit opening, mid-day, and closing task lists.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Banking & Finance Operations?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "office-admin-mis",
    "title": "Office Administration & MIS",
    "page": "course-guide.html?course=office-admin-mis",
    "category": "business",
    "categoryLabel": "Business & HR",
    "image": "img/board.jpeg",
    "description": "Master office coordination, documentation, and MIS reporting for entry-level professional roles.",
    "tag": "Entry-level ready",
    "track": "professional",
    "demand": "Broad entry-level applicability",
    "duration": "60 hours",
    "careers": "Office Administrator, MIS Executive, Admin Coordinator",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Office administration essentials",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Organise files, calendars, and professional communication standards.",
        "practice": "Create a shared folder naming convention and weekly calendar template.",
        "readingUrl": "https://support.microsoft.com/word",
        "readingLabel": "Word help"
      },
      {
        "id": "2",
        "title": "Business communication",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Write clear emails, minutes, and follow-ups.",
        "practice": "Draft minutes for a 30-minute status meeting.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "3",
        "title": "Spreadsheets for MIS",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Track KPIs and maintain clean MIS trackers.",
        "practice": "Build an attendance/task tracker with summary counts.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "4",
        "title": "Presenting MIS updates",
        "video": "https://www.youtube.com/embed/Fl2lYiRPsVc",
        "body": "Turn tables into concise management slides.",
        "practice": "Create a 5-slide weekly MIS pack.",
        "readingUrl": "https://support.microsoft.com/powerpoint",
        "readingLabel": "PowerPoint help"
      },
      {
        "id": "5",
        "title": "Process & escalation",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Document SOPs and escalation paths for common admin issues.",
        "practice": "Write an SOP for vendor invoice submission.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "6",
        "title": "Admin capstone",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Run a mock week of admin + MIS reporting.",
        "practice": "Submit tracker, minutes, and MIS slides as one pack.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Office Administration & MIS?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "graphic-design-content",
    "title": "Graphic Design & Content Creation",
    "page": "course-guide.html?course=graphic-design-content",
    "category": "creative",
    "categoryLabel": "Creative skills",
    "image": "img/lms-data-analytics.svg",
    "description": "Create marketing visuals and content assets for marketing and creative career paths.",
    "tag": "Marketing & creative",
    "track": "professional",
    "demand": "Marketing and creative roles",
    "duration": "60–90 hours",
    "careers": "Content Creator, Design Executive, Social Media Designer",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Design basics for marketers",
        "video": "https://www.youtube.com/embed/Fl2lYiRPsVc",
        "body": "Learn layout, contrast, hierarchy, and brand consistency.",
        "practice": "Redesign a messy flyer layout on paper/slide with clear hierarchy.",
        "readingUrl": "https://www.canva.com/learn/design/",
        "readingLabel": "Canva design school"
      },
      {
        "id": "2",
        "title": "Brand kits & templates",
        "video": "https://www.youtube.com/embed/Fl2lYiRPsVc",
        "body": "Build reusable templates for posts, stories, and posters.",
        "practice": "Create 3 on-brand social post templates.",
        "readingUrl": "https://www.canva.com/learn/design/",
        "readingLabel": "Canva design school"
      },
      {
        "id": "3",
        "title": "Content writing for visuals",
        "video": "https://www.youtube.com/embed/xsVTqzratPs",
        "body": "Write short copy that fits visual formats and CTAs.",
        "practice": "Write captions for 5 product posts with CTA variants.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Search/content guidance"
      },
      {
        "id": "4",
        "title": "Web & creative production flow",
        "video": "https://www.youtube.com/embed/UB1O30fR-EE",
        "body": "Understand asset sizes, export formats, and handoff to web/social tools.",
        "practice": "Export a checklist of sizes for Instagram, LinkedIn, and website banner.",
        "readingUrl": "https://developer.mozilla.org/",
        "readingLabel": "MDN"
      },
      {
        "id": "5",
        "title": "Campaign content pack",
        "video": "https://www.youtube.com/embed/qX6Q8DQGyRU",
        "body": "Plan a mini campaign with matching visuals and copy.",
        "practice": "Deliver 6 creatives + caption sheet for a launch week.",
        "readingUrl": "https://www.canva.com/learn/design/",
        "readingLabel": "Canva design school"
      },
      {
        "id": "6",
        "title": "Portfolio capstone",
        "video": "https://www.youtube.com/embed/fZmQ_aPXJAM",
        "body": "Present your best work with process notes.",
        "practice": "Publish a one-page portfolio PDF with 6 pieces and outcomes.",
        "readingUrl": "https://www.canva.com/learn/design/",
        "readingLabel": "Canva design school"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Graphic Design & Content Creation?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "communication-interview-skills",
    "title": "Communication & Interview Skills",
    "page": "course-guide.html?course=communication-interview-skills",
    "category": "career",
    "categoryLabel": "Career skills",
    "image": "img/board.jpeg",
    "description": "Build workplace communication and interview readiness essential across industries.",
    "tag": "Essential across industries",
    "track": "professional",
    "demand": "Essential",
    "duration": "30–45 hours",
    "careers": "All entry-level professional roles",
    "format": "Industry course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Professional communication basics",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Write clear, respectful workplace messages.",
        "practice": "Rewrite a vague email into a clear request with deadline.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "2",
        "title": "Meetings & spoken clarity",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Prepare agendas, speak concisely, and capture actions.",
        "practice": "Record a 60-second self-introduction for your target role.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "3",
        "title": "Resume & LinkedIn story",
        "video": "https://www.youtube.com/embed/fZmQ_aPXJAM",
        "body": "Translate projects into quantified achievements.",
        "practice": "Write 5 bullet achievements using action + result format.",
        "readingUrl": "https://www.linkedin.com/help/",
        "readingLabel": "LinkedIn help"
      },
      {
        "id": "4",
        "title": "Interview frameworks",
        "video": "https://www.youtube.com/embed/fZmQ_aPXJAM",
        "body": "Use STAR stories for behavioural questions.",
        "practice": "Prepare 4 STAR stories covering teamwork, conflict, deadline, and learning.",
        "readingUrl": "https://www.linkedin.com/help/",
        "readingLabel": "LinkedIn help"
      },
      {
        "id": "5",
        "title": "Mock interview lab",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Practise common HR and role questions with feedback notes.",
        "practice": "Complete a timed mock interview script and self-score.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "6",
        "title": "Offer & workplace etiquette",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Handle follow-ups, offer communication, and first-week professionalism.",
        "practice": "Draft a thank-you email and a first-week learning plan.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Communication & Interview Skills?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "tally-prime-gst",
    "title": "Tally Prime with GST",
    "page": "course-guide.html?course=tally-prime-gst",
    "category": "finance",
    "categoryLabel": "Finance",
    "image": "img/board.jpeg",
    "description": "Internship-oriented accounting practice with Tally Prime and GST workflow fundamentals.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "Accounts & billing",
    "duration": "60 hours",
    "careers": "Accounts Executive, Billing Executive",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Accounting basics for Tally",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Understand ledgers, vouchers, and debit/credit in practice terms.",
        "practice": "Classify 10 sample transactions into ledger types.",
        "readingUrl": "https://tallysolutions.com/tally/tallyprime/",
        "readingLabel": "TallyPrime overview"
      },
      {
        "id": "2",
        "title": "Company setup concepts",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Learn company creation fields and master data discipline.",
        "practice": "Draft a company master checklist for a trading firm.",
        "readingUrl": "https://tallysolutions.com/tally/tallyprime/",
        "readingLabel": "TallyPrime overview"
      },
      {
        "id": "3",
        "title": "GST fundamentals",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Map CGST/SGST/IGST concepts to invoice scenarios.",
        "practice": "Prepare 5 sample invoices with correct GST type notes.",
        "readingUrl": "https://www.gst.gov.in/",
        "readingLabel": "GST portal"
      },
      {
        "id": "4",
        "title": "Billing & receivables",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Track invoices, receipts, and outstanding balances.",
        "practice": "Build an outstanding receivables aging sheet.",
        "readingUrl": "https://tallysolutions.com/tally/tallyprime/",
        "readingLabel": "TallyPrime overview"
      },
      {
        "id": "5",
        "title": "Reports for accounts teams",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Read trial-related summaries and day books conceptually.",
        "practice": "Create a daily billing MIS for a fictional shop.",
        "readingUrl": "https://tallysolutions.com/tally/tallyprime/",
        "readingLabel": "TallyPrime overview"
      },
      {
        "id": "6",
        "title": "Internship simulation",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Run a week of billing + GST documentation tasks.",
        "practice": "Submit voucher log, GST invoice set, and outstanding report.",
        "readingUrl": "https://www.gst.gov.in/",
        "readingLabel": "GST portal"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Tally Prime with GST?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "accounting-taxation",
    "title": "Accounting & Taxation",
    "page": "course-guide.html?course=accounting-taxation",
    "category": "finance",
    "categoryLabel": "Finance",
    "image": "img/board.jpeg",
    "description": "Internship pathway into junior accounting and tax support roles.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "Accounting & tax",
    "duration": "60–90 hours",
    "careers": "Junior Accountant, Tax Assistant",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Bookkeeping foundations",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Record transactions accurately and maintain audit-friendly notes.",
        "practice": "Post 12 transactions into a simple journal sheet.",
        "readingUrl": "https://www.icai.org/",
        "readingLabel": "ICAI resources"
      },
      {
        "id": "2",
        "title": "Ledgers & trial concepts",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Link journal entries to ledger views and balancing checks.",
        "practice": "Prepare ledger extracts and a mini trial balance.",
        "readingUrl": "https://www.icai.org/",
        "readingLabel": "ICAI resources"
      },
      {
        "id": "3",
        "title": "Taxation orientation",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Understand direct/indirect tax touchpoints for junior roles.",
        "practice": "Create a glossary of 15 tax terms used in offices.",
        "readingUrl": "https://www.incometax.gov.in/",
        "readingLabel": "Income Tax portal"
      },
      {
        "id": "4",
        "title": "GST documentation support",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Support invoice and return documentation workflows.",
        "practice": "Build a GST document checklist for monthly filing support.",
        "readingUrl": "https://www.gst.gov.in/",
        "readingLabel": "GST portal"
      },
      {
        "id": "5",
        "title": "Excel for accountants",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Use spreadsheets for reconciliations and schedules.",
        "practice": "Reconcile bank-like sample data and list mismatches.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "6",
        "title": "Junior accountant simulation",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Complete a month-end support pack.",
        "practice": "Submit journal, trial, GST checklist, and reconciliation notes.",
        "readingUrl": "https://www.icai.org/",
        "readingLabel": "ICAI resources"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Accounting & Taxation?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "advanced-excel-mis",
    "title": "Advanced Excel & MIS Reporting",
    "page": "course-guide.html?course=advanced-excel-mis",
    "category": "analytics",
    "categoryLabel": "Data & BI",
    "image": "img/lms-power-bi.svg",
    "description": "Internship track for MIS and reporting analyst roles using advanced Excel.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "MIS & reporting",
    "duration": "60 hours",
    "careers": "MIS Executive, Reporting Analyst",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "MIS data standards",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Define clean columns, owners, and refresh cadence.",
        "practice": "Design a data dictionary for a sales MIS.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "2",
        "title": "Advanced formulas",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Use lookup and logical formulas for automated reports.",
        "practice": "Build a commission calculator with tier logic.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "3",
        "title": "Pivot reporting",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Create management pivots with slicers and layouts.",
        "practice": "Produce region × product monthly pivots.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "4",
        "title": "Dashboard packaging",
        "video": "https://www.youtube.com/embed/Fl2lYiRPsVc",
        "body": "Present MIS insights for weekly reviews.",
        "practice": "Create a one-page MIS dashboard slide.",
        "readingUrl": "https://support.microsoft.com/powerpoint",
        "readingLabel": "PowerPoint help"
      },
      {
        "id": "5",
        "title": "Automation habits",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Reduce manual refresh errors with checklists.",
        "practice": "Write a daily MIS refresh SOP.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "6",
        "title": "MIS internship simulation",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Deliver a full weekly MIS pack.",
        "practice": "Submit raw sheet, pivot, dashboard, and insight notes.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Advanced Excel & MIS Reporting?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "banking-financial-services",
    "title": "Banking & Financial Services",
    "page": "course-guide.html?course=banking-financial-services",
    "category": "finance",
    "categoryLabel": "Finance",
    "image": "img/board.jpeg",
    "description": "Internship preparation for banking operations and finance associate roles.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "Banking & finance",
    "duration": "60–90 hours",
    "careers": "Banking Operations, Finance Associate",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "BFS industry map",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Explore retail banking, payments, and support functions.",
        "practice": "Compare three entry roles and required skills.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      },
      {
        "id": "2",
        "title": "Customer onboarding ops",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Practise form accuracy and checklist culture.",
        "practice": "Create an account opening document pack list.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      },
      {
        "id": "3",
        "title": "Transaction support",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Track entries and exception queues.",
        "practice": "Build an exception register with aging.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "4",
        "title": "Compliance awareness",
        "video": "https://www.youtube.com/embed/z5nc9MDbvkw",
        "body": "Understand confidentiality and escalation basics.",
        "practice": "Write do/don’t guidelines for customer data handling.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      },
      {
        "id": "5",
        "title": "Stakeholder communication",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Communicate status to supervisors and customers clearly.",
        "practice": "Draft two status emails: delay notice and resolution notice.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "6",
        "title": "BFS internship simulation",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Complete a day-in-the-life operations pack.",
        "practice": "Submit checklist, exception log, and communication samples.",
        "readingUrl": "https://www.rbi.org.in/",
        "readingLabel": "RBI resources"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Banking & Financial Services?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "business-analytics-power-bi",
    "title": "Business Analytics with Power BI",
    "page": "course-guide.html?course=business-analytics-power-bi",
    "category": "analytics",
    "categoryLabel": "Data & BI",
    "image": "img/lms-power-bi.svg",
    "description": "Internship track to junior business analyst skills with Power BI storytelling.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "Business analytics",
    "duration": "60–90 hours",
    "careers": "Junior Business Analyst",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "BA mindset",
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Translate business problems into measurable analytics questions.",
        "practice": "Write problem → metric → decision for two scenarios.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      },
      {
        "id": "2",
        "title": "Power BI for analysts",
        "video": "https://www.youtube.com/embed/NNSHu0rkew8",
        "body": "Build analyst-ready reports from cleaned tables.",
        "practice": "Import sample data and create a draft report page.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      },
      {
        "id": "3",
        "title": "Metrics & DAX lite",
        "video": "https://www.youtube.com/embed/AGrl-H87pRU",
        "body": "Define KPIs and simple measures.",
        "practice": "Create conversion rate and growth measures.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      },
      {
        "id": "4",
        "title": "Insight writing",
        "video": "https://www.youtube.com/embed/6cV3OwFrOkk",
        "body": "Turn visuals into recommendations leaders can act on.",
        "practice": "Write five insight bullets tied to visuals.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      },
      {
        "id": "5",
        "title": "Stakeholder demo",
        "video": "https://www.youtube.com/embed/Fl2lYiRPsVc",
        "body": "Present findings with assumptions and next questions.",
        "practice": "Prepare a 6-minute demo script.",
        "readingUrl": "https://support.microsoft.com/powerpoint",
        "readingLabel": "PowerPoint help"
      },
      {
        "id": "6",
        "title": "BA internship simulation",
        "video": "https://www.youtube.com/embed/NNSHu0rkew8",
        "body": "Deliver an analyst starter pack.",
        "practice": "Submit PBIX-style screenshots/notes, insights, and demo script.",
        "readingUrl": "https://learn.microsoft.com/en-us/power-bi/",
        "readingLabel": "Power BI Learn"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Business Analytics with Power BI?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "digital-marketing-ecommerce",
    "title": "Digital Marketing & E-Commerce",
    "page": "course-guide.html?course=digital-marketing-ecommerce",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "image": "img/lms-data-analytics.svg",
    "description": "Internship preparation for marketing executive roles across digital and e-commerce channels.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "Digital marketing",
    "duration": "60–90 hours",
    "careers": "Marketing Executive",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "E-commerce funnel basics",
        "video": "https://www.youtube.com/embed/xsVTqzratPs",
        "body": "Map awareness → consideration → purchase → retention.",
        "practice": "Diagram a funnel for an online store niche.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Google Search docs"
      },
      {
        "id": "2",
        "title": "SEO for product pages",
        "video": "https://www.youtube.com/embed/xsVTqzratPs",
        "body": "Optimise titles, descriptions, and category structure.",
        "practice": "Rewrite 5 product titles/meta descriptions.",
        "readingUrl": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        "readingLabel": "SEO starter guide"
      },
      {
        "id": "3",
        "title": "Campaign content ops",
        "video": "https://www.youtube.com/embed/qX6Q8DQGyRU",
        "body": "Plan calendars for social and email support assets.",
        "practice": "Build a 2-week content calendar.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Google Search docs"
      },
      {
        "id": "4",
        "title": "Offers & landing pages",
        "video": "https://www.youtube.com/embed/UB1O30fR-EE",
        "body": "Structure landing pages that convert.",
        "practice": "Wireframe a festival sale landing page.",
        "readingUrl": "https://developer.mozilla.org/",
        "readingLabel": "MDN"
      },
      {
        "id": "5",
        "title": "Performance reading",
        "video": "https://www.youtube.com/embed/PSNXoAs2FtQ",
        "body": "Interpret basic campaign and store KPIs.",
        "practice": "Define KPI dashboard fields for weekly review.",
        "readingUrl": "https://support.google.com/analytics",
        "readingLabel": "Google Analytics help"
      },
      {
        "id": "6",
        "title": "Marketing internship simulation",
        "video": "https://www.youtube.com/embed/qX6Q8DQGyRU",
        "body": "Deliver a launch campaign pack.",
        "practice": "Submit funnel map, SEO copy, calendar, and KPI sheet.",
        "readingUrl": "https://developers.google.com/search/docs",
        "readingLabel": "Google Search docs"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Digital Marketing & E-Commerce?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "hr-payroll-management",
    "title": "HR & Payroll Management",
    "page": "course-guide.html?course=hr-payroll-management",
    "category": "business",
    "categoryLabel": "Business & HR",
    "image": "img/board.jpeg",
    "description": "Internship track for HR assistant and payroll executive responsibilities.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "HR & payroll",
    "duration": "60 hours",
    "careers": "HR Assistant, Payroll Executive",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "HR operations calendar",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Plan monthly HR cycles: attendance, payroll inputs, compliance reminders.",
        "practice": "Build a monthly HR calendar with owners.",
        "readingUrl": "https://www.ilo.org/",
        "readingLabel": "Workplace standards reference"
      },
      {
        "id": "2",
        "title": "Employee master data",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Maintain accurate employee records and change logs.",
        "practice": "Design an employee master sheet with validation fields.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "3",
        "title": "Attendance to payroll inputs",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Convert attendance into payroll-ready summaries.",
        "practice": "Create attendance-to-payable days logic in Excel.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "4",
        "title": "Payslip communication",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Handle payroll queries professionally and confidentially.",
        "practice": "Draft responses for late salary and deduction questions.",
        "readingUrl": "https://support.microsoft.com/",
        "readingLabel": "Microsoft support"
      },
      {
        "id": "5",
        "title": "Statutory awareness",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Learn documentation habits around common statutory deductions at a conceptual level.",
        "practice": "Prepare a statutory document checklist for new joiners.",
        "readingUrl": "https://www.epfindia.gov.in/",
        "readingLabel": "EPFO"
      },
      {
        "id": "6",
        "title": "HR/payroll internship simulation",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Run a mock payroll week.",
        "practice": "Submit master data, attendance summary, payslip notes, and query emails.",
        "readingUrl": "https://www.ilo.org/",
        "readingLabel": "Workplace standards reference"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting HR & Payroll Management?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "financial-modelling",
    "title": "Financial Modelling",
    "page": "course-guide.html?course=financial-modelling",
    "category": "finance",
    "categoryLabel": "Finance",
    "image": "img/lms-power-bi.svg",
    "description": "Internship track into finance analyst trainee work using Excel models.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "Finance analysis",
    "duration": "60–90 hours",
    "careers": "Finance Analyst Trainee",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "Model design principles",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Separate inputs, calculations, and outputs for auditable models.",
        "practice": "Build a 3-section workbook skeleton with colour conventions.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "2",
        "title": "Revenue & cost drivers",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Link drivers to statements with transparent assumptions.",
        "practice": "Create a driver table for price, volume, and cost inflation.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "3",
        "title": "Three-statement thinking",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Connect P&L, balance sheet, and cash flow conceptually.",
        "practice": "Map how profit flows into cash in a simple example.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "4",
        "title": "Scenarios & sensitivity",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Test best/base/worst cases for decisions.",
        "practice": "Add scenario toggles and a sensitivity table.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "5",
        "title": "Model checks",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Balance checks, error flags, and documentation.",
        "practice": "Add a checks dashboard with pass/fail indicators.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      },
      {
        "id": "6",
        "title": "Modelling internship simulation",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Deliver a starter financial model pack.",
        "practice": "Submit model, assumption log, and scenario summary.",
        "readingUrl": "https://support.microsoft.com/excel",
        "readingLabel": "Excel help"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting Financial Modelling?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  },
  {
    "id": "sap-fico-fundamentals",
    "title": "SAP FICO Fundamentals",
    "page": "course-guide.html?course=sap-fico-fundamentals",
    "category": "finance",
    "categoryLabel": "Finance",
    "image": "img/board.jpeg",
    "description": "Internship orientation to SAP FICO concepts for ERP finance support trainees.",
    "tag": "Internship track",
    "track": "internship",
    "demand": "ERP finance",
    "duration": "60 hours",
    "careers": "ERP Finance Support Trainee",
    "format": "Internship course",
    "resource": null,
    "lessons": [
      {
        "id": "1",
        "title": "ERP & FICO overview",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Understand how FI/CO supports enterprise finance processes.",
        "practice": "Draw FI vs CO responsibilities in a one-page map.",
        "readingUrl": "https://www.sap.com/products/financial-management.html",
        "readingLabel": "SAP finance overview"
      },
      {
        "id": "2",
        "title": "Org structure concepts",
        "video": "https://www.youtube.com/embed/2MCmnr2L50o",
        "body": "Learn company code, chart of accounts, and controlling area ideas.",
        "practice": "Create a glossary of 12 SAP FICO org terms.",
        "readingUrl": "https://help.sap.com/",
        "readingLabel": "SAP Help"
      },
      {
        "id": "3",
        "title": "Document posting mindset",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Connect business events to financial documents and periods.",
        "practice": "Classify 10 events into FI document types conceptually.",
        "readingUrl": "https://help.sap.com/",
        "readingLabel": "SAP Help"
      },
      {
        "id": "4",
        "title": "Master data discipline",
        "video": "https://www.youtube.com/embed/wbJcJCkBcMg",
        "body": "Appreciate vendor/customer/GL master accuracy.",
        "practice": "Design a master-data change request form.",
        "readingUrl": "https://help.sap.com/",
        "readingLabel": "SAP Help"
      },
      {
        "id": "5",
        "title": "Reporting & support tickets",
        "video": "https://www.youtube.com/embed/1XctnF7C74s",
        "body": "Handle end-user issues with clear reproduction steps.",
        "practice": "Write 3 sample support tickets with steps and impact.",
        "readingUrl": "https://help.sap.com/",
        "readingLabel": "SAP Help"
      },
      {
        "id": "6",
        "title": "FICO internship simulation",
        "video": "https://www.youtube.com/embed/ZKOL-rZ79gs",
        "body": "Prepare an ERP finance support starter kit.",
        "practice": "Submit term glossary, process map, and ticket pack.",
        "readingUrl": "https://www.sap.com/products/financial-management.html",
        "readingLabel": "SAP finance overview"
      }
    ],
    "quiz": [
      {
        "question": "What is the best first step when starting SAP FICO Fundamentals?",
        "options": [
          "Skip all practice",
          "Learn core concepts then practise with real examples",
          "Only watch the final lesson"
        ],
        "answer": 1,
        "explanation": "Build foundations first, then apply them."
      },
      {
        "question": "Why should you practise with real workplace examples?",
        "options": [
          "To build job-ready confidence",
          "To avoid learning",
          "To skip assessments"
        ],
        "answer": 0,
        "explanation": "Practical examples connect training to job tasks."
      },
      {
        "question": "How should you treat confidential workplace data?",
        "options": [
          "Share it publicly",
          "Follow company policy and keep it secure",
          "Post it on social media"
        ],
        "answer": 1,
        "explanation": "Data protection is a core workplace responsibility."
      },
      {
        "question": "What helps you improve after a mistake?",
        "options": [
          "Ignore feedback",
          "Review the process and correct the error",
          "Delete all files"
        ],
        "answer": 1,
        "explanation": "Reflection and correction build professional skill."
      },
      {
        "question": "When is a knowledge check considered passed here?",
        "options": [
          "Any one answer correct",
          "At least 3 of 5 answers correct",
          "Only perfect scores forever"
        ],
        "answer": 1,
        "explanation": "Pass mark is 3 or more correct out of 5."
      }
    ]
  }
];
