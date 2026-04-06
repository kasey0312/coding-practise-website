import React, { useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code2,
  Filter,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Lightbulb,
  Target,
  FileCode2,
  Play,
  Loader2,
  Home,
  FolderKanban,
  TerminalSquare,
  Route,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const topics = [
  {
    topic: "Variables & Input/Output",
    color: "bg-blue-50",
    questions: [
      {
        title: "Coffee Shop Bill Generator",
        difficulty: "Beginner",
        concept: "variables, input(), print(), type conversion",
        prompt:
          "Build a small program that asks for a customer's name, coffee type, quantity, and price per cup, then prints a clean bill summary.",
        fullQuestion:
          "You are building a billing helper for a small coffee shop. Ask the user for customer name, coffee type, quantity, and price per cup. Calculate the total bill and display a neat invoice with all details in a readable format.",
        objectives: [
          "Take multiple inputs from the user",
          "Convert numeric input into the correct data type",
          "Compute total amount from quantity and unit price",
          "Print a clean formatted bill",
        ],
        exampleInput: "Name: Rahul\nCoffee: Cappuccino\nQuantity: 2\nPrice per cup: 180",
        exampleOutput: "Customer: Rahul\nItem: Cappuccino\nQuantity: 2\nPrice per cup: 180\nTotal: 360",
        starterCode: `def solve(name, coffee, quantity, price_per_cup):\n    # return a formatted bill string\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          {
            input: ["Rahul", "Cappuccino", 2, 180],
            expected: "Customer: Rahul\nItem: Cappuccino\nQuantity: 2\nPrice per cup: 180\nTotal: 360",
          },
          {
            input: ["Anita", "Latte", 3, 150],
            expected: "Customer: Anita\nItem: Latte\nQuantity: 3\nPrice per cup: 150\nTotal: 450",
          },
        ],
      },
      {
        title: "Visitor Entry Pass",
        difficulty: "Beginner",
        concept: "strings, user input, formatted output",
        prompt:
          "Take a visitor's name, company, purpose of visit, and meeting room number, then generate a welcome pass message.",
        fullQuestion:
          "Create a simple office reception program. It should collect a visitor's name, company, purpose of visit, and meeting room number, then print a professional entry pass message.",
        objectives: [
          "Practice taking string input",
          "Display formatted output",
          "Build confidence with real-world console programs",
        ],
        exampleInput: "Name: Neha\nCompany: Infosys\nPurpose: Interview\nRoom: A-12",
        exampleOutput: "Welcome Neha from Infosys. Purpose: Interview. Please proceed to room A-12.",
        starterCode: `def solve(name, company, purpose, room):\n    # return the pass message\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          {
            input: ["Neha", "Infosys", "Interview", "A-12"],
            expected: "Welcome Neha from Infosys. Purpose: Interview. Please proceed to room A-12.",
          },
          {
            input: ["Rohan", "TCS", "Client Meeting", "B-07"],
            expected: "Welcome Rohan from TCS. Purpose: Client Meeting. Please proceed to room B-07.",
          },
        ],
      },
    ],
  },
  {
    topic: "Conditions (if/elif/else)",
    color: "bg-emerald-50",
    questions: [
      {
        title: "Delivery Eligibility Checker",
        difficulty: "Beginner",
        concept: "if/elif/else, comparison operators",
        prompt:
          "A grocery app delivers only if the order amount is above ₹199 and the delivery location is within service range. Write a program to decide whether delivery is allowed.",
        fullQuestion:
          "A grocery delivery app wants to check whether an order qualifies for delivery. Take the order amount and whether the address is inside the service area. If amount is above ₹199 and the area is serviceable, allow delivery. Otherwise, show why it is rejected.",
        objectives: [
          "Use if/elif/else blocks",
          "Combine conditions with logical operators",
          "Show different messages for different cases",
        ],
        exampleInput: "Order amount: 250\nIn service area: yes",
        exampleOutput: "Delivery allowed",
        starterCode: `def solve(order_amount, in_service_area):\n    # in_service_area will be True or False\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [250, true], expected: "Delivery allowed" },
          { input: [150, true], expected: "Delivery rejected: minimum order amount not met" },
          { input: [250, false], expected: "Delivery rejected: address outside service area" },
        ],
      },
      {
        title: "Movie Ticket Pricing",
        difficulty: "Beginner",
        concept: "conditions, logical operators",
        prompt:
          "Set different ticket prices for child, adult, and senior citizen customers. Ask age and print the correct ticket amount.",
        fullQuestion:
          "Write a movie ticket pricing program. Ask the user's age and assign ticket prices based on age group: child, adult, or senior citizen.",
        objectives: [
          "Use comparison operators",
          "Apply age-based branching",
          "Print business-rule-based pricing",
        ],
        exampleInput: "Age: 65",
        exampleOutput: "Ticket price: ₹150",
        starterCode: `def solve(age):\n    # child < 13 => 120, adult 13-59 => 220, senior 60+ => 150\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [8], expected: "Ticket price: ₹120" },
          { input: [28], expected: "Ticket price: ₹220" },
          { input: [65], expected: "Ticket price: ₹150" },
        ],
      },
    ],
  },
  {
    topic: "Loops",
    color: "bg-amber-50",
    questions: [
      {
        title: "Attendance Counter",
        difficulty: "Beginner",
        concept: "for loop, counting",
        prompt:
          "Given a list of student attendance statuses like Present/Absent, count how many students are present.",
        fullQuestion:
          "You have a classroom attendance list containing values like Present and Absent. Write a program that loops through the list and counts how many students are present.",
        objectives: ["Use a for loop", "Maintain a counter", "Process list values one by one"],
        exampleInput: "['Present', 'Absent', 'Present', 'Present']",
        exampleOutput: "Present students: 3",
        starterCode: `def solve(statuses):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["Present", "Absent", "Present", "Present"]], expected: "Present students: 3" },
          { input: [["Absent", "Absent"]], expected: "Present students: 0" },
        ],
      },
      {
        title: "Restaurant Orders Until Exit",
        difficulty: "Beginner",
        concept: "while loop, sentinel values",
        prompt:
          "Keep taking food orders until the user types 'done'. At the end, show total number of items ordered.",
        fullQuestion:
          "Create a restaurant ordering program that keeps asking for item names until the user enters done. Then show how many items were ordered in total.",
        objectives: ["Use a while loop", "Work with sentinel values", "Track repeated input"],
        exampleInput: "['Burger', 'Pizza', 'Fries', 'done']",
        exampleOutput: "Total items ordered: 3",
        starterCode: `def solve(entries):\n    # entries is a list like ['Burger', 'Pizza', 'done']\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["Burger", "Pizza", "Fries", "done"]], expected: "Total items ordered: 3" },
          { input: [["done"]], expected: "Total items ordered: 0" },
        ],
      },
    ],
  },
  {
    topic: "Strings",
    color: "bg-rose-50",
    questions: [
      {
        title: "Email Username Extractor",
        difficulty: "Beginner",
        concept: "string methods, slicing",
        prompt:
          "Take an email address and extract the username and domain separately.",
        fullQuestion:
          "Ask the user for an email address and split it into two parts: username and domain. Display both clearly.",
        objectives: ["Work with string splitting", "Extract useful parts from text", "Display parsed results"],
        exampleInput: "rahul.dev@gmail.com",
        exampleOutput: "Username: rahul.dev\nDomain: gmail.com",
        starterCode: `def solve(email):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["rahul.dev@gmail.com"], expected: "Username: rahul.dev\nDomain: gmail.com" },
          { input: ["team@company.org"], expected: "Username: team\nDomain: company.org" },
        ],
      },
      {
        title: "Customer Review Cleaner",
        difficulty: "Beginner",
        concept: "strip(), replace(), lower()",
        prompt:
          "Normalize a review text by removing extra spaces, converting it to lowercase, and replacing forbidden words.",
        fullQuestion:
          "Take a customer review and clean it for storage. Remove leading and trailing spaces, convert all text to lowercase, and replace any blocked word with a safer alternative.",
        objectives: ["Use common string methods", "Normalize user-generated text", "Prepare text for storage or moderation"],
        exampleInput: "  This Product Is BAD  ",
        exampleOutput: "this product is poor",
        starterCode: `def solve(review):\n    # replace 'bad' with 'poor' after lowercasing\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["  This Product Is BAD  "], expected: "this product is poor" },
          { input: [" BAD service and BAD packaging "], expected: "poor service and poor packaging" },
        ],
      },
    ],
  },
  {
    topic: "Lists",
    color: "bg-violet-50",
    questions: [
      {
        title: "Shopping Cart Manager",
        difficulty: "Beginner",
        concept: "lists, append(), remove(), iteration",
        prompt:
          "Create a shopping cart where users can add items, remove items, and see the final cart contents.",
        fullQuestion:
          "Build a console-based shopping cart. Allow the user to add products, remove products, and finally display the cart contents.",
        objectives: ["Use list operations", "Modify a list dynamically", "Display final data cleanly"],
        exampleInput: "Actions: [('add', 'Milk'), ('add', 'Bread'), ('remove', 'Milk')]",
        exampleOutput: "Cart items: Bread",
        starterCode: `def solve(actions):\n    # actions is a list of tuples like [('add', 'Milk'), ('remove', 'Milk')]\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[["add", "Milk"], ["add", "Bread"], ["remove", "Milk"]]], expected: "Cart items: Bread" },
          { input: [[["add", "Apples"], ["add", "Bananas"]]], expected: "Cart items: Apples, Bananas" },
        ],
      },
      {
        title: "Top 3 Expenses",
        difficulty: "Beginner",
        concept: "lists, sort()",
        prompt:
          "Store monthly expenses in a list and print the 3 highest expenses.",
        fullQuestion:
          "Given a list of expense amounts, sort them and print the top 3 highest expenses.",
        objectives: ["Store numeric values in a list", "Sort data", "Slice the top entries"],
        exampleInput: "[2500, 900, 4200, 1500, 3100]",
        exampleOutput: "Top 3 expenses: [4200, 3100, 2500]",
        starterCode: `def solve(expenses):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[2500, 900, 4200, 1500, 3100]], expected: "Top 3 expenses: [4200, 3100, 2500]" },
          { input: [[100, 200]], expected: "Top 3 expenses: [200, 100]" },
        ],
      },
    ],
  },
  {
    topic: "Tuples & Sets",
    color: "bg-cyan-50",
    questions: [
      {
        title: "Store Location Coordinates",
        difficulty: "Intermediate",
        concept: "tuples",
        prompt:
          "Use tuples to represent map coordinates of delivery locations and print them clearly.",
        fullQuestion:
          "Represent delivery point coordinates using tuples such as latitude and longitude, then print them in a readable format.",
        objectives: ["Understand immutable tuple storage", "Represent paired values cleanly"],
        exampleInput: "(28.6139, 77.2090)",
        exampleOutput: "Delivery point: Latitude 28.6139, Longitude 77.209",
        starterCode: `def solve(coords):\n    lat, lon = coords\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[28.6139, 77.2090]], expected: "Delivery point: Latitude 28.6139, Longitude 77.209" },
          { input: [[12.9716, 77.5946]], expected: "Delivery point: Latitude 12.9716, Longitude 77.5946" },
        ],
      },
      {
        title: "Unique Website Visitors",
        difficulty: "Intermediate",
        concept: "sets, uniqueness",
        prompt:
          "Given repeated visitor IDs, store them in a set and find the count of unique visitors.",
        fullQuestion:
          "A website logs visitor IDs, but many visitors appear multiple times. Use a set to remove duplicates and count unique visitors.",
        objectives: ["Use set for deduplication", "Count unique values efficiently"],
        exampleInput: "[101, 102, 101, 103, 102]",
        exampleOutput: "Unique visitors: 3",
        starterCode: `def solve(visitor_ids):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[101, 102, 101, 103, 102]], expected: "Unique visitors: 3" },
          { input: [[9, 9, 9]], expected: "Unique visitors: 1" },
        ],
      },
    ],
  },
  {
    topic: "Dictionaries",
    color: "bg-orange-50",
    questions: [
      {
        title: "Employee Record Lookup",
        difficulty: "Beginner",
        concept: "dictionaries, key-value access",
        prompt:
          "Store employee details like name, department, and ID in a dictionary, then print selected fields.",
        fullQuestion:
          "Create a dictionary to store employee information such as name, department, and employee ID. Then print chosen values from the dictionary.",
        objectives: ["Store structured data using keys", "Retrieve values safely"],
        exampleInput: "{'name': 'Amit', 'department': 'HR', 'id': 1007}",
        exampleOutput: "Employee Amit works in HR with ID 1007",
        starterCode: `def solve(employee):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ name: "Amit", department: "HR", id: 1007 }], expected: "Employee Amit works in HR with ID 1007" },
          { input: [{ name: "Sara", department: "Finance", id: 204 }], expected: "Employee Sara works in Finance with ID 204" },
        ],
      },
      {
        title: "Inventory Stock Tracker",
        difficulty: "Intermediate",
        concept: "dictionary update, iteration",
        prompt:
          "Track stock quantities of products in a shop and update values when items are sold.",
        fullQuestion:
          "Manage store stock with a dictionary where keys are product names and values are quantities. When an item is sold, reduce the quantity and show updated stock.",
        objectives: ["Update dictionary values", "Use real-world key-value modeling"],
        exampleInput: "Stock: {'Rice': 20}\nSold: Rice 3",
        exampleOutput: "Updated stock: {'Rice': 17}",
        starterCode: `def solve(stock, product, sold_qty):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ Rice: 20 }, "Rice", 3], expected: "Updated stock: {'Rice': 17}" },
          { input: [{ Pen: 12 }, "Pen", 2], expected: "Updated stock: {'Pen': 10}" },
        ],
      },
    ],
  },
  {
    topic: "Functions",
    color: "bg-lime-50",
    questions: [
      {
        title: "Salary After Tax Calculator",
        difficulty: "Beginner",
        concept: "functions, parameters, return",
        prompt:
          "Write a function that takes basic salary and tax percentage, then returns final in-hand salary.",
        fullQuestion:
          "Create a function that accepts salary and tax percentage, calculates the deducted amount, and returns the final take-home salary.",
        objectives: ["Create reusable functions", "Pass arguments", "Return processed values"],
        exampleInput: "salary=50000, tax=10",
        exampleOutput: "45000",
        starterCode: `def solve(salary, tax_percent):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [50000, 10], expected: 45000 },
          { input: [72000, 20], expected: 57600 },
        ],
      },
      {
        title: "Password Strength Checker",
        difficulty: "Intermediate",
        concept: "functions, condition reuse",
        prompt:
          "Create a function that checks whether a password is strong based on length and character rules.",
        fullQuestion:
          "Write a reusable function that validates whether a password is strong based on conditions like minimum length, uppercase letters, lowercase letters, digits, and symbols.",
        objectives: ["Encapsulate logic in a function", "Combine multiple validation rules"],
        exampleInput: "Pass@123",
        exampleOutput: "Strong password",
        starterCode: `def solve(password):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["Pass@123"], expected: "Strong password" },
          { input: ["pass123"], expected: "Weak password" },
        ],
      },
    ],
  },
  {
    topic: "File Handling",
    color: "bg-sky-50",
    questions: [
      {
        title: "Save Customer Feedback",
        difficulty: "Intermediate",
        concept: "open(), write(), read()",
        prompt:
          "Take customer feedback input and save it into a text file. Then read the file and display all stored feedback.",
        fullQuestion:
          "Build a simple feedback recorder. Accept customer feedback, save it to a text file, and then read the file contents back to the user. For this browser playground, simulate the file with an in-memory list or string and return the stored feedback text.",
        objectives: ["Open a file", "Write text", "Read saved content"],
        exampleInput: "Feedback: Great support team",
        exampleOutput: "Stored feedback:\nGreat support team",
        starterCode: `def solve(feedback):\n    # simulate file storage and return the stored content\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["Great support team"], expected: "Stored feedback:\nGreat support team" },
          { input: ["Fast delivery"], expected: "Stored feedback:\nFast delivery" },
        ],
      },
      {
        title: "Daily Task Log",
        difficulty: "Intermediate",
        concept: "append mode, file reading",
        prompt:
          "Append completed tasks to a daily log file without deleting older entries.",
        fullQuestion:
          "Create a task logger that keeps adding completed task names to a text file using append mode, preserving old entries. In this browser playground, simulate append mode by joining tasks in order and returning the log content.",
        objectives: ["Use append mode", "Build persistent logs"],
        exampleInput: "['Submit report', 'Review PR']",
        exampleOutput: "Submit report\nReview PR",
        starterCode: `def solve(tasks):\n    # tasks is a list of completed task names\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["Submit report", "Review PR"]], expected: "Submit report\nReview PR" },
          { input: [["Deploy app"]], expected: "Deploy app" },
        ],
      },
    ],
  },
  {
    topic: "Exception Handling",
    color: "bg-fuchsia-50",
    questions: [
      {
        title: "Safe ATM Withdrawal",
        difficulty: "Intermediate",
        concept: "try/except",
        prompt:
          "Ask the user to enter withdrawal amount. Handle invalid numeric input gracefully without crashing.",
        fullQuestion:
          "Create a safe ATM input program. Ask the user for a withdrawal amount and handle cases where the input is not a valid number.",
        objectives: ["Prevent program crashes", "Use try/except blocks", "Show helpful error messages"],
        exampleInput: "abc",
        exampleOutput: "Invalid amount entered",
        starterCode: `def solve(value):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["abc"], expected: "Invalid amount entered" },
          { input: ["2500"], expected: "Withdrawal amount: 2500.0" },
        ],
      },
      {
        title: "CSV Age Reader",
        difficulty: "Intermediate",
        concept: "exceptions, data conversion",
        prompt:
          "Read ages from a file and skip rows where age is missing or invalid.",
        fullQuestion:
          "Read age values from a data source and safely skip rows with missing or invalid age values instead of failing completely.",
        objectives: ["Handle bad data", "Convert strings to integers safely"],
        exampleInput: "['21', 'N/A', '34']",
        exampleOutput: "Valid ages: 21, 34",
        starterCode: `def solve(rows):\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["21", "N/A", "34"]], expected: "Valid ages: 21, 34" },
          { input: [["x", "15", ""]], expected: "Valid ages: 15" },
        ],
      },
    ],
  },
  {
    topic: "Object-Oriented Programming",
    color: "bg-teal-50",
    questions: [
      {
        title: "Library Book System",
        difficulty: "Intermediate",
        concept: "classes, objects, methods",
        prompt:
          "Create a Book class with title, author, and availability status. Add methods to issue and return a book.",
        fullQuestion:
          "Design a Book class for a small library. It should track title, author, and availability status, and include methods to issue and return the book. In the playground, return the message after issuing the book.",
        objectives: ["Understand class design", "Create methods", "Model real-world entities"],
        exampleInput: "Issue book: Python Basics",
        exampleOutput: "Python Basics has been issued",
        starterCode: `class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.available = True\n\n    def issue(self):\n        pass\n\ndef solve(title, author):\n    book = Book(title, author)\n    return book.issue()`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["Python Basics", "Guido"], expected: "Python Basics has been issued" },
          { input: ["Data Structures", "Nina"], expected: "Data Structures has been issued" },
        ],
      },
      {
        title: "Food Delivery Agent",
        difficulty: "Intermediate",
        concept: "constructors, attributes",
        prompt:
          "Create a DeliveryAgent class that stores name, area, and current order count, and prints agent details.",
        fullQuestion:
          "Build a DeliveryAgent class with attributes like name, service area, and current order count. Create objects and print their details.",
        objectives: ["Use constructors", "Initialize attributes", "Create object instances"],
        exampleInput: "Agent(name='Ravi', area='Noida', orders=4)",
        exampleOutput: "Ravi serves Noida and has 4 active orders",
        starterCode: `class DeliveryAgent:\n    def __init__(self, name, area, orders):\n        self.name = name\n        self.area = area\n        self.orders = orders\n\n    def details(self):\n        pass\n\ndef solve(name, area, orders):\n    agent = DeliveryAgent(name, area, orders)\n    return agent.details()`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["Ravi", "Noida", 4], expected: "Ravi serves Noida and has 4 active orders" },
          { input: ["Mira", "Pune", 2], expected: "Mira serves Pune and has 2 active orders" },
        ],
      },
    ],
  },
  {
    topic: "Modules & Libraries",
    color: "bg-red-50",
    questions: [
      {
        title: "Current Date Invoice Stamp",
        difficulty: "Intermediate",
        concept: "datetime module",
        prompt:
          "Generate a timestamp for an invoice using Python's datetime module.",
        fullQuestion:
          "Use Python's datetime module to generate the current date and time and display it as an invoice timestamp.",
        objectives: ["Import standard modules", "Work with date and time"],
        exampleInput: "2026-04-06 10:45:00",
        exampleOutput: "Invoice generated at: 2026-04-06 10:45:00",
        starterCode: `def solve(timestamp):\n    # for deterministic tests, use the provided timestamp string\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["2026-04-06 10:45:00"], expected: "Invoice generated at: 2026-04-06 10:45:00" },
          { input: ["2026-01-01 00:00:00"], expected: "Invoice generated at: 2026-01-01 00:00:00" },
        ],
      },
      {
        title: "Random Coupon Code",
        difficulty: "Intermediate",
        concept: "random module",
        prompt:
          "Generate a random promotional coupon code for a shopping app.",
        fullQuestion:
          "Build a small utility that uses Python's random module to generate a random coupon code for users. In this browser playground, return a code of the requested length using uppercase letters and digits.",
        objectives: ["Use library functions", "Generate randomized values"],
        exampleInput: "Length: 8",
        exampleOutput: "Coupon code: 8 characters long",
        starterCode: `import random\nimport string\n\ndef solve(length):\n    pass`,
        functionName: "solve",
        resultMode: "custom",
        testCases: [
          { input: [8], validator: "lambda result: isinstance(result, str) and len(result) == 8 and result.isalnum() and result.upper() == result", description: "Return 8 uppercase alphanumeric characters" },
          { input: [6], validator: "lambda result: isinstance(result, str) and len(result) == 6 and result.isalnum() and result.upper() == result", description: "Return 6 uppercase alphanumeric characters" },
        ],
      },
    ],
  },
  {
    topic: "Comprehensions & Built-ins",
    color: "bg-indigo-50",
    questions: [
      {
        title: "Available Products Filter",
        difficulty: "Intermediate",
        concept: "list comprehensions",
        prompt:
          "From a list of products with stock counts, create a new list containing only products that are in stock.",
        fullQuestion:
          "Given product data with stock values, use a list comprehension to create a list of products that are available for purchase.",
        objectives: ["Practice list comprehensions", "Filter structured data concisely"],
        exampleInput: "[('Milk', 3), ('Bread', 0), ('Eggs', 12)]",
        exampleOutput: "Available: ['Milk', 'Eggs']",
        starterCode: `def solve(products):\n    # products is a list like [('Milk', 3), ('Bread', 0)]\n    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[["Milk", 3], ["Bread", 0], ["Eggs", 12]]], expected: "Available: ['Milk', 'Eggs']" },
          { input: [[["Pen", 0], ["Notebook", 5]]], expected: "Available: ['Notebook']" },
        ],
      },
      {
        title: "Email Domain Summary",
        difficulty: "Intermediate",
        concept: "set comprehension, built-ins",
        prompt:
          "Given a list of employee emails, create a set of unique email domains.",
        fullQuestion:
          "Take a list of employee email addresses and use a comprehension to extract a set of distinct email domains.",
        objectives: ["Use set comprehension", "Extract meaningful text patterns"],
        exampleInput: "['a@gmail.com', 'b@company.com', 'c@gmail.com']",
        exampleOutput: "{'company.com', 'gmail.com'}",
        starterCode: `def solve(emails):\n    pass`,
        functionName: "solve",
        resultMode: "custom",
        testCases: [
          { input: [["a@gmail.com", "b@company.com", "c@gmail.com"]], validator: "lambda result: set(result) == {'gmail.com', 'company.com'} if not isinstance(result, str) else result in [\"{'gmail.com', 'company.com'}\", \"{'company.com', 'gmail.com'}\"]", description: "Should contain gmail.com and company.com" },
          { input: [["x@team.io", "y@team.io"]], validator: "lambda result: set(result) == {'team.io'} if not isinstance(result, str) else result == \"{'team.io'}\"", description: "Should contain only team.io" },
        ],
      },
    ],
  },
  {
    topic: "Decorators, Generators & Iterators",
    color: "bg-yellow-50",
    questions: [
      {
        title: "Action Logger Decorator",
        difficulty: "Advanced",
        concept: "decorators",
        prompt:
          "Write a decorator that logs when a function starts and finishes, useful for tracking application actions.",
        fullQuestion:
          "Create a decorator that wraps another function and logs when execution starts and ends. This simulates logging in production-style applications. The solve function should return the logs as a list of strings.",
        objectives: ["Understand decorators", "Wrap existing behavior", "Improve code reuse"],
        exampleInput: "@log_action\ndef process_order(): ...",
        exampleOutput: "['process_order started', 'process_order finished']",
        starterCode: `def log_action(func):\n    pass\n\n@log_action\ndef process_order():\n    return \"done\"\n\ndef solve():\n    return process_order()`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [], expected: ["process_order started", "process_order finished"] },
        ],
      },
      {
        title: "Batch Order Generator",
        difficulty: "Advanced",
        concept: "generators",
        prompt:
          "Create a generator that yields customer orders one by one instead of loading all orders into memory at once.",
        fullQuestion:
          "Write a generator that processes large batches of customer orders one at a time, so memory usage stays low. The solve function should return a list created from the generator.",
        objectives: ["Use yield", "Build lazy sequences", "Understand memory-efficient iteration"],
        exampleInput: "[101, 102, 103]",
        exampleOutput: "[101, 102, 103]",
        starterCode: `def order_generator(orders):\n    pass\n\ndef solve(orders):\n    return list(order_generator(orders))`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[101, 102, 103]], expected: [101, 102, 103] },
          { input: [[7]], expected: [7] },
        ],
      },
    ],
  },
  {
    topic: "Backend Coding Questions",
    color: "bg-slate-100",
    questions: [
      {
        title: "HTTP Status Summary",
        difficulty: "Beginner",
        concept: "dictionaries, counting, loops",
        prompt: "Given a list of API response status codes, return how many times each status code appeared.",
        fullQuestion: "Backend logs often contain repeated HTTP status codes. Write a function that takes a list of status codes and returns a dictionary mapping each code to its frequency.",
        objectives: ["Count occurrences", "Use dictionaries", "Process log-style data"],
        exampleInput: "[200, 200, 404, 500, 404]",
        exampleOutput: "{200: 2, 404: 2, 500: 1}",
        starterCode: `def solve(status_codes):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[200, 200, 404, 500, 404]], expected: { 200: 2, 404: 2, 500: 1 } },
          { input: [[201, 201, 201]], expected: { 201: 3 } },
        ],
      },
      {
        title: "Request Latency Average",
        difficulty: "Beginner",
        concept: "lists, arithmetic, guard clauses",
        prompt: "Calculate the average response time of a list of API requests.",
        fullQuestion: "Write a function that receives a list of request latencies in milliseconds and returns the average latency. If the list is empty, return 0.",
        objectives: ["Work with numeric lists", "Handle empty input safely", "Compute averages"],
        exampleInput: "[120, 80, 100]",
        exampleOutput: "100.0",
        starterCode: `def solve(latencies):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[120, 80, 100]], expected: 100.0 },
          { input: [[]], expected: 0 },
        ],
      },
      {
        title: "Unique API Keys",
        difficulty: "Beginner",
        concept: "sets, uniqueness",
        prompt: "Return the number of unique API keys seen in request logs.",
        fullQuestion: "You are given a list of API key strings from incoming requests. Return the count of distinct keys.",
        objectives: ["Use sets", "Deduplicate values", "Summarize traffic"],
        exampleInput: "['k1', 'k2', 'k1']",
        exampleOutput: "2",
        starterCode: `def solve(api_keys):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["k1", "k2", "k1"]], expected: 2 },
          { input: [["prod", "prod", "prod"]], expected: 1 },
        ],
      },
      {
        title: "Sanitize Username for URL",
        difficulty: "Beginner",
        concept: "strings, replace, lower",
        prompt: "Convert a username into a URL-safe slug.",
        fullQuestion: "Given a username, trim extra spaces, convert it to lowercase, and replace internal spaces with hyphens so it can be used in a URL path.",
        objectives: ["Clean input strings", "Prepare path-safe values", "Apply string transformations"],
        exampleInput: "  Kevin Hart  ",
        exampleOutput: "kevin-hart",
        starterCode: `def solve(username):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["  Kevin Hart  "], expected: "kevin-hart" },
          { input: ["API Client"], expected: "api-client" },
        ],
      },
      {
        title: "Validate Required Payload Fields",
        difficulty: "Beginner",
        concept: "dictionaries, conditionals",
        prompt: "Check whether a request payload contains all required keys.",
        fullQuestion: "Write a function that takes a payload dictionary and a list of required field names. Return a list of missing fields in the same order as the required list.",
        objectives: ["Inspect dictionaries", "Validate payloads", "Return structured errors"],
        exampleInput: "payload={'name': 'A', 'email': 'a@x.com'}, required=['name', 'email', 'role']",
        exampleOutput: "['role']",
        starterCode: `def solve(payload, required_fields):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ name: "A", email: "a@x.com" }, ["name", "email", "role"]], expected: ["role"] },
          { input: [{ id: 1, active: true }, ["id", "active"]], expected: [] },
        ],
      },
      {
        title: "Build Query String",
        difficulty: "Intermediate",
        concept: "dictionaries, strings, sorting",
        prompt: "Convert a params dictionary into a deterministic query string.",
        fullQuestion: "Given a dictionary of query parameters, return a query string with keys sorted alphabetically, for example ?limit=10&sort=asc.",
        objectives: ["Serialize params", "Sort keys", "Format API-style strings"],
        exampleInput: "{'sort': 'asc', 'limit': 10}",
        exampleOutput: "?limit=10&sort=asc",
        starterCode: `def solve(params):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ sort: "asc", limit: 10 }], expected: "?limit=10&sort=asc" },
          { input: [{ page: 2 }], expected: "?page=2" },
        ],
      },
      {
        title: "Parse Bearer Token",
        difficulty: "Intermediate",
        concept: "strings, validation",
        prompt: "Extract the token from an Authorization header.",
        fullQuestion: "If the header starts with 'Bearer ' return the token part. Otherwise return 'Invalid header'.",
        objectives: ["Parse auth headers", "Validate prefixes", "Return fallback errors"],
        exampleInput: "Bearer abc123",
        exampleOutput: "abc123",
        starterCode: `def solve(auth_header):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["Bearer abc123"], expected: "abc123" },
          { input: ["Token abc123"], expected: "Invalid header" },
        ],
      },
      {
        title: "Paginate Results",
        difficulty: "Intermediate",
        concept: "lists, slicing",
        prompt: "Return the correct page of results from a list.",
        fullQuestion: "Given a list of items, a page number starting from 1, and a page size, return the items for that page.",
        objectives: ["Use slicing", "Implement pagination", "Handle API list patterns"],
        exampleInput: "items=[1,2,3,4,5], page=2, size=2",
        exampleOutput: "[3, 4]",
        starterCode: `def solve(items, page, page_size):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[1, 2, 3, 4, 5], 2, 2], expected: [3, 4] },
          { input: [["a", "b"], 2, 3], expected: [] },
        ],
      },
      {
        title: "Group Logs by Service",
        difficulty: "Intermediate",
        concept: "dictionaries, lists",
        prompt: "Group log messages under each service name.",
        fullQuestion: "Each log record is a dictionary with keys service and message. Return a dictionary where each service maps to a list of its messages in original order.",
        objectives: ["Group records", "Preserve order", "Handle backend logs"],
        exampleInput: "[{'service':'auth','message':'ok'},{'service':'billing','message':'fail'}]",
        exampleOutput: "{'auth': ['ok'], 'billing': ['fail']}",
        starterCode: `def solve(logs):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[{ service: "auth", message: "ok" }, { service: "billing", message: "fail" }, { service: "auth", message: "retry" }]], expected: { auth: ["ok", "retry"], billing: ["fail"] } },
          { input: [[{ service: "api", message: "up" }]], expected: { api: ["up"] } },
        ],
      },
      {
        title: "Rate Limit Remaining",
        difficulty: "Intermediate",
        concept: "math, max, conditionals",
        prompt: "Calculate how many requests are left in a rate limit window.",
        fullQuestion: "Given a request limit and the number of requests already used, return the remaining count, but never return a negative number.",
        objectives: ["Apply limits", "Prevent negative outputs", "Model rate limiting"],
        exampleInput: "limit=100, used=34",
        exampleOutput: "66",
        starterCode: `def solve(limit, used):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [100, 34], expected: 66 },
          { input: [10, 12], expected: 0 },
        ],
      },
      {
        title: "Merge Default Config",
        difficulty: "Intermediate",
        concept: "dictionaries, copy, update",
        prompt: "Overlay a user config on top of defaults.",
        fullQuestion: "Given a default configuration dictionary and an override dictionary, return a merged dictionary where override values replace defaults.",
        objectives: ["Merge dictionaries", "Preserve defaults", "Apply overrides"],
        exampleInput: "defaults={'timeout':30,'retries':2}, overrides={'timeout':10}",
        exampleOutput: "{'timeout': 10, 'retries': 2}",
        starterCode: `def solve(defaults, overrides):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ timeout: 30, retries: 2 }, { timeout: 10 }], expected: { timeout: 10, retries: 2 } },
          { input: [{ region: "us" }, { debug: true }], expected: { region: "us", debug: true } },
        ],
      },
      {
        title: "Normalize Header Names",
        difficulty: "Intermediate",
        concept: "dictionaries, strings",
        prompt: "Convert HTTP header keys to lowercase.",
        fullQuestion: "Given a headers dictionary, return a new dictionary with all keys converted to lowercase while keeping values unchanged.",
        objectives: ["Normalize request metadata", "Transform dictionary keys"],
        exampleInput: "{'Content-Type':'application/json','X-Trace-Id':'abc'}",
        exampleOutput: "{'content-type': 'application/json', 'x-trace-id': 'abc'}",
        starterCode: `def solve(headers):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ "Content-Type": "application/json", "X-Trace-Id": "abc" }], expected: { "content-type": "application/json", "x-trace-id": "abc" } },
          { input: [{ Accept: "*/*" }], expected: { accept: "*/*" } },
        ],
      },
      {
        title: "Detect Slow Endpoints",
        difficulty: "Intermediate",
        concept: "lists, filtering",
        prompt: "Return endpoint paths whose latency crosses a threshold.",
        fullQuestion: "Each record contains path and latency. Return a list of paths where latency is strictly greater than the threshold.",
        objectives: ["Filter structured data", "Model performance monitoring"],
        exampleInput: "records=[{'path':'/a','latency':120},{'path':'/b','latency':300}], threshold=200",
        exampleOutput: "['/b']",
        starterCode: `def solve(records, threshold):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[{ path: "/a", latency: 120 }, { path: "/b", latency: 300 }], 200], expected: ["/b"] },
          { input: [[{ path: "/health", latency: 20 }], 50], expected: [] },
        ],
      },
      {
        title: "Count Active Sessions",
        difficulty: "Intermediate",
        concept: "lists, booleans",
        prompt: "Count how many user sessions are still active.",
        fullQuestion: "Given a list of session dictionaries with an active field, return the number of active sessions.",
        objectives: ["Scan backend session data", "Count matching records"],
        exampleInput: "[{'active':True},{'active':False},{'active':True}]",
        exampleOutput: "2",
        starterCode: `def solve(sessions):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[{ active: true }, { active: false }, { active: true }]], expected: 2 },
          { input: [[{ active: false }]], expected: 0 },
        ],
      },
      {
        title: "Deduplicate Jobs by ID",
        difficulty: "Intermediate",
        concept: "sets, loops, dictionaries",
        prompt: "Remove duplicate jobs while preserving the first occurrence of each id.",
        fullQuestion: "You are given a list of job dictionaries, each with an id. Return a new list keeping only the first job for each id.",
        objectives: ["Deduplicate records", "Preserve order", "Handle queue-like data"],
        exampleInput: "[{'id':1,'task':'a'},{'id':1,'task':'b'},{'id':2,'task':'c'}]",
        exampleOutput: "[{'id': 1, 'task': 'a'}, {'id': 2, 'task': 'c'}]",
        starterCode: `def solve(jobs):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[{ id: 1, task: "a" }, { id: 1, task: "b" }, { id: 2, task: "c" }]], expected: [{ id: 1, task: "a" }, { id: 2, task: "c" }] },
          { input: [[{ id: 7, task: "x" }]], expected: [{ id: 7, task: "x" }] },
        ],
      },
      {
        title: "Retryable Error Checker",
        difficulty: "Intermediate",
        concept: "membership, sets, conditionals",
        prompt: "Return whether an HTTP status code should be retried.",
        fullQuestion: "Consider 429, 500, 502, 503, and 504 as retryable. Return True if the input status code is retryable, otherwise False.",
        objectives: ["Encode retry policies", "Use membership checks"],
        exampleInput: "503",
        exampleOutput: "True",
        starterCode: `def solve(status_code):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [503], expected: true },
          { input: [404], expected: false },
        ],
      },
      {
        title: "Response Cache Key",
        difficulty: "Intermediate",
        concept: "strings, sorting, dictionaries",
        prompt: "Create a stable cache key from method, path, and params.",
        fullQuestion: "Return a string cache key in the form METHOD:path:key1=value1&key2=value2 where params are sorted by key.",
        objectives: ["Build deterministic keys", "Serialize request identity"],
        exampleInput: "GET, /users, {'page':2,'limit':10}",
        exampleOutput: "GET:/users:limit=10&page=2",
        starterCode: `def solve(method, path, params):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["GET", "/users", { page: 2, limit: 10 }], expected: "GET:/users:limit=10&page=2" },
          { input: ["POST", "/login", {}], expected: "POST:/login:" },
        ],
      },
      {
        title: "Validate JSON Content Type",
        difficulty: "Intermediate",
        concept: "strings, conditionals",
        prompt: "Check whether a Content-Type header represents JSON.",
        fullQuestion: "Return True if the header contains application/json, even when charset information is present. Otherwise return False.",
        objectives: ["Inspect content types", "Handle common API header variants"],
        exampleInput: "application/json; charset=utf-8",
        exampleOutput: "True",
        starterCode: `def solve(content_type):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["application/json; charset=utf-8"], expected: true },
          { input: ["text/html"], expected: false },
        ],
      },
      {
        title: "Top N Endpoints",
        difficulty: "Advanced",
        concept: "sorting, dictionaries, slicing",
        prompt: "Return the top N most frequently requested endpoint paths.",
        fullQuestion: "Given a list of endpoint paths and a number N, return the top N paths ordered by descending frequency. Break ties alphabetically.",
        objectives: ["Rank by frequency", "Apply deterministic sorting"],
        exampleInput: "paths=['/a','/b','/a','/c','/b','/a'], n=2",
        exampleOutput: "['/a', '/b']",
        starterCode: `def solve(paths, n):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["/a", "/b", "/a", "/c", "/b", "/a"], 2], expected: ["/a", "/b"] },
          { input: [["/z", "/x", "/x", "/z"], 2], expected: ["/x", "/z"] },
        ],
      },
      {
        title: "Session Expiry Filter",
        difficulty: "Advanced",
        concept: "lists, comparisons, dictionaries",
        prompt: "Return only sessions that have not expired.",
        fullQuestion: "Each session dictionary has user and expires_at fields containing integer timestamps. Return sessions where expires_at is greater than now.",
        objectives: ["Filter timed records", "Work with backend session metadata"],
        exampleInput: "sessions=[{'user':'a','expires_at':200},{'user':'b','expires_at':100}], now=150",
        exampleOutput: "[{'user': 'a', 'expires_at': 200}]",
        starterCode: `def solve(sessions, now):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[{ user: "a", expires_at: 200 }, { user: "b", expires_at: 100 }], 150], expected: [{ user: "a", expires_at: 200 }] },
          { input: [[{ user: "x", expires_at: 10 }], 10], expected: [] },
        ],
      },
      {
        title: "Mini Router Match",
        difficulty: "Advanced",
        concept: "loops, tuples, control flow",
        prompt: "Match an HTTP method and path against a list of routes.",
        fullQuestion: "Routes are provided as tuples of (method, path, handler_name). Return the handler_name for an exact match, otherwise return '404'.",
        objectives: ["Simulate a tiny router", "Compare multiple request fields"],
        exampleInput: "routes=[('GET','/health','health_check')], request=('GET','/health')",
        exampleOutput: "health_check",
        starterCode: `def solve(routes, method, path):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[["GET", "/health", "health_check"], ["POST", "/login", "login_user"]], "POST", "/login"], expected: "login_user" },
          { input: [[["GET", "/users", "list_users"]], "DELETE", "/users"], expected: "404" },
        ],
      },
    ],
  },
  {
    topic: "Mixed Practical Challenges",
    color: "bg-stone-100",
    questions: [
      {
        title: "CSV Column Picker",
        difficulty: "Beginner",
        concept: "strings, split, lists",
        labels: ["File Processing", "Data Transformation"],
        prompt: "Given CSV rows as strings, extract one named column from every row.",
        fullQuestion: "The first row contains comma-separated column names. Return the values from the requested column for all remaining rows.",
        objectives: ["Parse simple CSV text", "Use header lookup", "Transform tabular data"],
        exampleInput: "rows=['name,email','A,a@x.com','B,b@x.com'], column='email'",
        exampleOutput: "['a@x.com', 'b@x.com']",
        starterCode: `def solve(rows, column_name):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["name,email", "A,a@x.com", "B,b@x.com"], "email"], expected: ["a@x.com", "b@x.com"] },
          { input: [["id,status", "1,ok", "2,fail"], "status"], expected: ["ok", "fail"] },
        ],
      },
      {
        title: "Mask Email Address",
        difficulty: "Beginner",
        concept: "strings, slicing",
        labels: ["Auth", "Utilities"],
        prompt: "Mask the local part of an email except its first and last character.",
        fullQuestion: "Return a masked email where the domain stays unchanged and the local part becomes first character + stars + last character.",
        objectives: ["Manipulate strings", "Protect sensitive values"],
        exampleInput: "kevin@example.com",
        exampleOutput: "k***n@example.com",
        starterCode: `def solve(email):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["kevin@example.com"], expected: "k***n@example.com" },
          { input: ["ab@test.com"], expected: "a***b@test.com" },
        ],
      },
      {
        title: "JSON Field Flattener",
        difficulty: "Intermediate",
        concept: "dictionaries, loops",
        labels: ["Data Transformation", "Backend"],
        prompt: "Flatten a one-level nested dictionary using dot notation keys.",
        fullQuestion: "For nested dictionaries one level deep, convert {'user': {'id': 1}} into {'user.id': 1}. Non-dictionary values stay as they are.",
        objectives: ["Transform structured data", "Build flattened output"],
        exampleInput: "{'user': {'id': 1}, 'active': True}",
        exampleOutput: "{'user.id': 1, 'active': True}",
        starterCode: `def solve(payload):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ user: { id: 1 }, active: true }], expected: { "user.id": 1, active: true } },
          { input: [{ config: { region: "us" }, debug: false }], expected: { "config.region": "us", debug: false } },
        ],
      },
      {
        title: "Webhook Event Filter",
        difficulty: "Beginner",
        concept: "lists, filtering",
        labels: ["API", "Validation"],
        prompt: "Return only webhook events of the requested type.",
        fullQuestion: "Each event is a dictionary with a type field. Return the original event dictionaries whose type matches the requested one.",
        objectives: ["Filter event streams", "Work with dictionaries"],
        exampleInput: "events=[{'type':'order.created'},{'type':'order.failed'}], target='order.created'",
        exampleOutput: "[{'type': 'order.created'}]",
        starterCode: `def solve(events, target_type):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[{ type: "order.created" }, { type: "order.failed" }], "order.created"], expected: [{ type: "order.created" }] },
          { input: [[{ type: "ping" }], "pong"], expected: [] },
        ],
      },
      {
        title: "Cookie Parser",
        difficulty: "Intermediate",
        concept: "strings, split, dictionaries",
        labels: ["Parsing", "Backend"],
        prompt: "Convert a Cookie header string into a dictionary.",
        fullQuestion: "The cookie string contains key=value pairs separated by semicolons. Return a dictionary of parsed cookie values with surrounding spaces trimmed.",
        objectives: ["Parse headers", "Normalize whitespace"],
        exampleInput: "session=abc; theme=dark",
        exampleOutput: "{'session': 'abc', 'theme': 'dark'}",
        starterCode: `def solve(cookie_header):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: ["session=abc; theme=dark"], expected: { session: "abc", theme: "dark" } },
          { input: ["token=x"], expected: { token: "x" } },
        ],
      },
      {
        title: "Audit Trail Formatter",
        difficulty: "Beginner",
        concept: "f-strings, loops",
        labels: ["Logging", "Utilities"],
        prompt: "Format audit log entries into readable sentences.",
        fullQuestion: "Each record contains user, action, and resource. Return a list of strings like 'alice updated invoice'.",
        objectives: ["Format log data", "Build readable summaries"],
        exampleInput: "[{'user':'alice','action':'updated','resource':'invoice'}]",
        exampleOutput: "['alice updated invoice']",
        starterCode: `def solve(records):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [[{ user: "alice", action: "updated", resource: "invoice" }]], expected: ["alice updated invoice"] },
          { input: [[{ user: "bob", action: "deleted", resource: "draft" }]], expected: ["bob deleted draft"] },
        ],
      },
      {
        title: "Token Expiry Checker",
        difficulty: "Intermediate",
        concept: "comparisons, dictionaries",
        labels: ["Auth", "Sessions"],
        prompt: "Return whether an auth token is expired.",
        fullQuestion: "A token dictionary contains expires_at as an integer timestamp. Return True when expires_at is less than or equal to now.",
        objectives: ["Check token lifetime", "Model auth behavior"],
        exampleInput: "token={'expires_at':100}, now=100",
        exampleOutput: "True",
        starterCode: `def solve(token, now):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ expires_at: 100 }, 100], expected: true },
          { input: [{ expires_at: 101 }, 100], expected: false },
        ],
      },
      {
        title: "Remove Null Fields",
        difficulty: "Beginner",
        concept: "dictionaries, comprehensions",
        labels: ["Data Transformation", "Validation"],
        prompt: "Return a copy of a dictionary without None values.",
        fullQuestion: "Given a payload dictionary, remove every key whose value is None and return the cleaned dictionary.",
        objectives: ["Clean payloads", "Use dictionary comprehensions"],
        exampleInput: "{'name':'A','age':None}",
        exampleOutput: "{'name': 'A'}",
        starterCode: `def solve(payload):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ name: "A", age: null }], expected: { name: "A" } },
          { input: [{ active: true, note: null, id: 2 }], expected: { active: true, id: 2 } },
        ],
      },
      {
        title: "File Extension Counter",
        difficulty: "Beginner",
        concept: "strings, dictionaries",
        labels: ["File Processing", "Utilities"],
        prompt: "Count how many files belong to each extension.",
        fullQuestion: "Given a list of filenames, return a dictionary counting extensions like txt, csv, and json. Use the text after the final dot as the extension.",
        objectives: ["Extract extensions", "Count grouped values"],
        exampleInput: "['a.txt','b.csv','c.txt']",
        exampleOutput: "{'txt': 2, 'csv': 1}",
        starterCode: `def solve(filenames):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [["a.txt", "b.csv", "c.txt"]], expected: { txt: 2, csv: 1 } },
          { input: [["x.json"]], expected: { json: 1 } },
        ],
      },
      {
        title: "API Error Message Builder",
        difficulty: "Intermediate",
        concept: "dictionaries, lists",
        labels: ["API", "Validation"],
        prompt: "Build a standard API error response from field errors.",
        fullQuestion: "Given a dictionary of field errors, return a response dictionary with status='error' and errors as a list of 'field: message' strings sorted by field name.",
        objectives: ["Standardize error payloads", "Sort fields deterministically"],
        exampleInput: "{'email':'invalid','name':'required'}",
        exampleOutput: "{'status': 'error', 'errors': ['email: invalid', 'name: required']}",
        starterCode: `def solve(field_errors):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ email: "invalid", name: "required" }], expected: { status: "error", errors: ["email: invalid", "name: required"] } },
          { input: [{}], expected: { status: "error", errors: [] } },
        ],
      },
      {
        title: "Session User Lookup",
        difficulty: "Intermediate",
        concept: "dictionaries, membership",
        labels: ["Sessions", "Backend"],
        prompt: "Look up a user id from a session store.",
        fullQuestion: "Given a session map of session_id to user_id, return the user id for the requested session. Return 'Unknown session' when it does not exist.",
        objectives: ["Read key-value stores", "Handle missing sessions"],
        exampleInput: "store={'s1':101}, session='s1'",
        exampleOutput: "101",
        starterCode: `def solve(session_store, session_id):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ s1: 101 }, "s1"], expected: 101 },
          { input: [{ s1: 101 }, "s2"], expected: "Unknown session" },
        ],
      },
      {
        title: "Merge User Preferences",
        difficulty: "Intermediate",
        concept: "dictionaries, nested access",
        labels: ["Backend", "Utilities"],
        prompt: "Overlay user preferences on default preferences.",
        fullQuestion: "Return a merged preferences dictionary where user preferences replace default values for matching keys.",
        objectives: ["Merge settings", "Apply overrides safely"],
        exampleInput: "defaults={'theme':'light','lang':'en'}, user={'theme':'dark'}",
        exampleOutput: "{'theme': 'dark', 'lang': 'en'}",
        starterCode: `def solve(defaults, user_prefs):
    pass`,
        functionName: "solve",
        resultMode: "function",
        testCases: [
          { input: [{ theme: "light", lang: "en" }, { theme: "dark" }], expected: { theme: "dark", lang: "en" } },
          { input: [{ timezone: "UTC" }, {}], expected: { timezone: "UTC" } },
        ],
      },
    ],
  }
];

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const labelStyles = {
  "API": "bg-blue-100 text-blue-800",
  "Backend": "bg-slate-100 text-slate-800",
  "Auth": "bg-purple-100 text-purple-800",
  "Sessions": "bg-teal-100 text-teal-800",
  "Data Transformation": "bg-amber-100 text-amber-800",
  "File Processing": "bg-sky-100 text-sky-800",
  "Validation": "bg-rose-100 text-rose-800",
  "Parsing": "bg-emerald-100 text-emerald-800",
  "Logging": "bg-orange-100 text-orange-800",
  "Utilities": "bg-indigo-100 text-indigo-800",
};

function LabelBadge({ label }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${labelStyles[label] || "bg-slate-100 text-slate-700"}`}>{label}</span>;
}
const STORAGE_KEY = "python-practice-progress-v1";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const withMeta = (section, question) => ({
  ...question,
  topic: section.topic,
  color: section.color,
  topicSlug: slugify(section.topic),
  slug: slugify(`${section.topic}-${question.title}`),
  labels: question.labels || [section.topic],
});

const flattenQuestions = () => topics.flatMap((section) => section.questions.map((q) => withMeta(section, q)));
const topicCards = () => topics.map((section) => ({ ...section, topicSlug: slugify(section.topic) }));

function getHashRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  return hash.startsWith("/") ? hash : `/${hash}`;
}

function navigateTo(path) {
  window.location.hash = path;
}

function useHashRoute() {
  const [route, setRoute] = useState(typeof window !== "undefined" ? getHashRoute() : "/");

  useEffect(() => {
    const onHashChange = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function parseRoute(route, allQuestions) {
  if (route === "/") return { type: "home" };
  const parts = route.split("/").filter(Boolean);

  if (parts[0] === "topics") {
    if (parts.length === 1) return { type: "topics" };
    const topic = topicCards().find((item) => item.topicSlug === parts[1]);
    if (!topic) return { type: "not-found" };
    return { type: "topic-detail", topic };
  }

  if (parts[0] === "questions" && parts[1]) {
    const question = allQuestions.find((item) => item.slug === parts[1]);
    if (!question) return { type: "not-found" };
    return { type: "question-detail", question };
  }

  return { type: "not-found" };
}

function useLocalProgress(allQuestions) {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {}
  }, [completed]);

  const completedCount = Object.values(completed).filter(Boolean).length;
  const total = allQuestions.length;
  const progressValue = total ? Math.round((completedCount / total) * 100) : 0;

  return {
    completed,
    completedCount,
    total,
    progressValue,
    markComplete: (slug) => setCompleted((prev) => ({ ...prev, [slug]: true })),
  };
}

function Breadcrumbs({ items }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.path ? (
            <button onClick={() => navigateTo(item.path)} className="transition hover:text-slate-900">
              {item.label}
            </button>
          ) : (
            <span className="text-slate-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <Card className="rounded-3xl border-0 shadow-md">
      <CardContent className="p-6">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function TopicCard({ topic, color, questions, progressMap }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="h-full rounded-2xl border-0 shadow-md">
        <CardHeader className={`${color} rounded-t-2xl`}>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-5 w-5" />
            {topic}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          {questions.map((q) => (
            <button
              key={q.slug}
              onClick={() => navigateTo(`/questions/${q.slug}`)}
              className="w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-semibold text-slate-900">{q.title}</h3>
                <div className="flex items-center gap-2">
                  {progressMap[q.slug] && <Badge className="bg-emerald-600">Solved</Badge>}
                  <Badge variant="secondary">{q.difficulty}</Badge>
                </div>
              </div>
              <p className="mb-3 text-sm text-slate-600">{q.prompt}</p>
              <div className="mb-3 flex flex-wrap gap-2">
                {(q.labels || []).slice(0, 3).map((label) => <LabelBadge key={label} label={label} />)}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Covers: {q.concept}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                  Open <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuestionListItem({ question, progressMap }) {
  return (
    <button
      onClick={() => navigateTo(`/questions/${question.slug}`)}
      className="w-full rounded-2xl border p-4 text-left transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">{question.title}</p>
          <p className="text-xs text-slate-500">{question.topic}</p>
        </div>
        <div className="flex items-center gap-2">
          {progressMap[question.slug] && <Badge className="bg-emerald-600">Solved</Badge>}
          <Badge variant="secondary">{question.difficulty}</Badge>
        </div>
      </div>
      <p className="text-sm text-slate-600">{question.prompt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(question.labels || []).map((label) => <LabelBadge key={label} label={label} />)}
      </div>
    </button>
  );
}

function HomePage({ search, setSearch, selectedDifficulty, setSelectedDifficulty, filteredTopics, stats, progress }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
              <Code2 className="h-4 w-4" />
              Python Practice Website
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Python basic coding questions with real-life examples
            </h1>
            <p className="max-w-3xl text-base text-slate-300 md:text-lg">
              Practice Python through billing systems, carts, logs, employee records, delivery apps, feedback files, and more — not repetitive math drills.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-2xl" onClick={() => navigateTo("/topics")}>Browse topics</Button>
              <Button variant="outline" className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10" onClick={() => navigateTo(`/questions/${filteredTopics[0]?.questions[0]?.slug || flattenQuestions()[0]?.slug}`)}>
                Start practicing
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <StatCard label="Topics Covered" value={stats.topicCount} />
            <StatCard label="Practice Questions" value={stats.totalQuestions} />
            <Card className="rounded-3xl border-0 shadow-md">
              <CardContent className="p-6">
                <p className="text-sm text-slate-500">Your Progress</p>
                <p className="mt-2 text-3xl font-bold">{progress.completedCount}/{progress.total}</p>
                <Progress value={progress.progressValue} className="mt-4" />
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <Card className="mb-8 rounded-3xl border-0 shadow-md">
          <CardContent className="p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by topic, concept, or question..." className="h-11 rounded-2xl pl-10" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-1 flex items-center gap-2 text-sm text-slate-500">
                  <Filter className="h-4 w-4" /> Difficulty
                </div>
                {difficulties.map((level) => (
                  <Button key={level} variant={selectedDifficulty === level ? "default" : "outline"} className="rounded-2xl" onClick={() => setSelectedDifficulty(level)}>
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Question Bank</h2>
            <p className="text-slate-600">Now organized as a route-based practice app with topic and question pages.</p>
          </div>
          <Badge className="rounded-full px-4 py-2 text-sm">
            {filteredTopics.reduce((acc, item) => acc + item.questions.length, 0)} results
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTopics.map((section) => (
            <TopicCard key={section.topic} topic={section.topic} color={section.color} questions={section.questions} progressMap={progress.completed} />
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <Card className="rounded-3xl border-0 shadow-md">
            <CardContent className="p-10 text-center">
              <p className="text-lg font-semibold">No questions matched your search.</p>
              <p className="mt-2 text-slate-600">Try another keyword or switch the difficulty filter.</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

function TopicsPage({ progressMap }) {
  const sections = topicCards();
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Topics" }]} />
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">All topics</h1>
          <p className="mt-2 text-slate-600">Choose a topic to see every question inside it.</p>
        </div>
        <Button variant="outline" className="rounded-2xl" onClick={() => navigateTo("/")}>Back home</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => {
          const questions = section.questions.map((q) => withMeta(section, q));
          const solved = questions.filter((q) => progressMap[q.slug]).length;
          return (
            <button key={section.topicSlug} onClick={() => navigateTo(`/topics/${section.topicSlug}`)} className="rounded-3xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className={`mb-4 inline-flex rounded-full ${section.color} px-3 py-1 text-sm font-medium text-slate-800`}>
                <FolderKanban className="mr-2 h-4 w-4" /> {section.topic}
              </div>
              <p className="text-3xl font-bold">{questions.length}</p>
              <p className="mt-1 text-sm text-slate-600">questions</p>
              <div className="mt-4">
                <Progress value={questions.length ? Math.round((solved / questions.length) * 100) : 0} />
                <p className="mt-2 text-xs text-slate-500">{solved} solved</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TopicDetailPage({ topic, progressMap }) {
  const questions = topic.questions.map((q) => withMeta(topic, q));
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Topics", path: "/topics" }, { label: topic.topic }]} />
      <div className="mb-8 rounded-3xl border-0 bg-white p-8 shadow-md">
        <div className={`mb-4 inline-flex rounded-full ${topic.color} px-3 py-1 text-sm font-medium`}>
          <Route className="mr-2 h-4 w-4" /> Topic page
        </div>
        <h1 className="text-3xl font-bold">{topic.topic}</h1>
        <p className="mt-3 text-slate-600">Practice realistic, non-math Python questions focused on {topic.topic.toLowerCase()}.</p>
      </div>
      <div className="space-y-4">
        {questions.map((question) => <QuestionListItem key={question.slug} question={question} progressMap={progressMap} />)}
      </div>
    </div>
  );
}

function formatResultPreview(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function pythonLiteral(value) {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "True" : "False";
  if (value === null) return "None";
  if (Array.isArray(value)) return `[${value.map((item) => pythonLiteral(item)).join(", ")}]`;
  if (typeof value === "object") {
    return `{${Object.entries(value)
      .map(([key, val]) => `${pythonLiteral(key)}: ${pythonLiteral(val)}`)
      .join(", ")}}`;
  }
  return String(value);
}

function stdinFromInput(input) {
  return (input || []).map((item) => pythonLiteral(item)).join("\n");
}

function expectedStdoutFromCase(testCase) {
  if (typeof testCase.expected === "string") return testCase.expected;
  return formatResultPreview(testCase.expected);
}

function buildDefaultStdinStarter(question) {
  const firstCase = question.testCases?.[0];
  const argCount = firstCase?.input?.length || 1;
  const inputs = Array.from({ length: argCount }, (_, index) => `value_${index + 1} = input()`);
  return `${inputs.join("\n")}\n\n# parse the input values as needed\n# example: age = int(value_1)\n\nprint("write your output here")`;
}

function PythonPlayground({ question, onSolved }) {
  const defaultMode = question.executionMode || "function";
  const [executionMode, setExecutionMode] = useState(defaultMode);
  const [functionCode, setFunctionCode] = useState(question.starterCode || "");
  const [stdinCode, setStdinCode] = useState(question.stdinStarterCode || buildDefaultStdinStarter(question));
  const [runtimeStatus, setRuntimeStatus] = useState("idle");
  const [runStatus, setRunStatus] = useState("idle");
  const [runResults, setRunResults] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const pyodideRef = useRef(null);

  useEffect(() => {
    setExecutionMode(question.executionMode || "function");
    setFunctionCode(question.starterCode || "");
    setStdinCode(question.stdinStarterCode || buildDefaultStdinStarter(question));
    setRunResults([]);
    setConsoleOutput("");
    setRunStatus("idle");
    setActiveCaseIndex(0);
  }, [question.slug]);

  useEffect(() => {
    let cancelled = false;

    async function ensurePyodide() {
      if (pyodideRef.current) {
        setRuntimeStatus("ready");
        return;
      }
      setRuntimeStatus("loading");
      try {
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const existing = document.querySelector('script[data-pyodide="true"]');
            if (existing) {
              existing.addEventListener("load", resolve, { once: true });
              existing.addEventListener("error", reject, { once: true });
              return;
            }
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
            script.async = true;
            script.dataset.pyodide = "true";
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }
        const instance = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
        if (!cancelled) {
          pyodideRef.current = instance;
          setRuntimeStatus("ready");
        }
      } catch (error) {
        if (!cancelled) {
          setRuntimeStatus("error");
          setConsoleOutput(`Runtime failed to load. ${error?.message || "Please check your internet connection in preview."}`);
        }
      }
    }

    ensurePyodide();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCode = executionMode === "function" ? functionCode : stdinCode;

  const normalizedCases = useMemo(() => {
    if (executionMode === "function") return question.testCases || [];
    return (question.stdinTestCases || question.testCases || []).map((testCase) => ({
      stdin: testCase.stdin || stdinFromInput(testCase.input || []),
      expectedStdout: testCase.expectedStdout || expectedStdoutFromCase(testCase),
      description: testCase.description,
    }));
  }, [executionMode, question]);

  const runTests = async () => {
    if (!pyodideRef.current) return;
    setRunStatus("running");
    setRunResults([]);
    setConsoleOutput("");

    try {
      const pyodide = pyodideRef.current;
      const payload = JSON.stringify({
        mode: executionMode,
        code: selectedCode,
        functionName: question.functionName || "solve",
        testCases: normalizedCases,
      });

      pyodide.globals.set("__runner_payload", payload);
      const raw = await pyodide.runPythonAsync(`
import json, io, contextlib, traceback, builtins
payload = json.loads(__runner_payload)
mode = payload["mode"]
code = payload["code"]
function_name = payload["functionName"]
test_cases = payload["testCases"]
results = []
compile_error = None
bootstrap_stdout = io.StringIO()

if mode == "function":
    namespace = {}
    try:
        with contextlib.redirect_stdout(bootstrap_stdout):
            exec(code, namespace, namespace)
    except Exception:
        compile_error = traceback.format_exc()

    if compile_error is None:
        if function_name not in namespace:
            compile_error = f"Function '{function_name}' was not found in your code."
        else:
            target = namespace[function_name]
            for case in test_cases:
                case_stdout = io.StringIO()
                try:
                    with contextlib.redirect_stdout(case_stdout):
                        result = target(*case.get("input", []))
                    if case.get("validator"):
                        validator = eval(case["validator"], {}, {})
                        passed = bool(validator(result))
                        expected_preview = case.get("description", "Custom validation")
                    else:
                        expected = case.get("expected")
                        passed = result == expected
                        expected_preview = expected
                    results.append({
                        "passed": passed,
                        "input": case.get("input", []),
                        "expected": expected_preview,
                        "received": result,
                        "stdout": case_stdout.getvalue(),
                    })
                except Exception:
                    results.append({
                        "passed": False,
                        "input": case.get("input", []),
                        "expected": case.get("expected", case.get("description", "Custom validation")),
                        "received": traceback.format_exc(),
                        "stdout": case_stdout.getvalue(),
                    })
else:
    for case in test_cases:
        stdin_text = case.get("stdin", "")
        expected_stdout = case.get("expectedStdout", "")
        namespace = {"__name__": "__main__"}
        input_lines = iter(stdin_text.splitlines())
        captured_stdout = io.StringIO()
        original_input = builtins.input
        def fake_input(prompt=""):
            try:
                return next(input_lines)
            except StopIteration:
                raise EOFError("No more input available")
        builtins.input = fake_input
        try:
            with contextlib.redirect_stdout(captured_stdout):
                exec(code, namespace, namespace)
            actual_stdout = captured_stdout.getvalue().rstrip("\n")
            passed = actual_stdout == expected_stdout.rstrip("\n")
            results.append({
                "passed": passed,
                "input": stdin_text,
                "expected": expected_stdout,
                "received": actual_stdout,
                "stdout": actual_stdout,
            })
        except Exception:
            results.append({
                "passed": False,
                "input": stdin_text,
                "expected": expected_stdout,
                "received": traceback.format_exc(),
                "stdout": captured_stdout.getvalue(),
            })
        finally:
            builtins.input = original_input

json.dumps({
    "compile_error": compile_error,
    "results": results,
    "stdout": bootstrap_stdout.getvalue(),
}, default=str)
      `);

      const parsed = JSON.parse(raw);
      if (parsed.compile_error) {
        setConsoleOutput(parsed.compile_error);
        setRunStatus("error");
        return;
      }

      setRunResults(parsed.results || []);
      const allPassed = (parsed.results || []).length > 0 && (parsed.results || []).every((item) => item.passed);
      setRunStatus(allPassed ? "passed" : "failed");
      const debugOutput = [
        parsed.stdout || "",
        ...(parsed.results || []).map((item, index) => item.stdout ? `Case ${index + 1} stdout:\n${item.stdout}` : "").filter(Boolean),
      ].filter(Boolean).join("\n\n");
      setConsoleOutput(debugOutput);
      if (allPassed) onSolved(question.slug);
    } catch (error) {
      setRunStatus("error");
      setConsoleOutput(error?.message || "Unexpected runtime error.");
    }
  };

  const passedCount = runResults.filter((item) => item.passed).length;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="rounded-3xl border-0 shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TerminalSquare className="h-5 w-5" /> Python playground
            </CardTitle>
            <p className="mt-2 text-sm text-slate-500">Use Monaco editor and run either function-based solutions or stdin/print programs.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{runtimeStatus === "ready" ? "Runtime ready" : runtimeStatus === "loading" ? "Loading runtime" : runtimeStatus === "error" ? "Runtime error" : "Idle"}</Badge>
            <Button className="rounded-2xl" onClick={runTests} disabled={runtimeStatus !== "ready" || runStatus === "running"}>
              {runStatus === "running" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Run tests
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Button variant={executionMode === "function" ? "default" : "outline"} className="rounded-2xl" onClick={() => setExecutionMode("function")}>
                Function mode
              </Button>
              <Button variant={executionMode === "stdin" ? "default" : "outline"} className="rounded-2xl" onClick={() => setExecutionMode("stdin")}>
                Stdin mode
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              {executionMode === "function"
                ? "Implement solve(...) and return the expected value."
                : "Read from input() and print the final output exactly."}
            </p>
          </div>
          <div className="h-[560px] w-full bg-slate-950">
            <Editor
              height="100%"
              defaultLanguage="python"
              language="python"
              theme="vs-dark"
              value={selectedCode}
              onChange={(value) => {
                const nextValue = value || "";
                if (executionMode === "function") setFunctionCode(nextValue);
                else setStdinCode(nextValue);
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: "on",
                padding: { top: 16 },
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Test results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between gap-3">
              <Badge className={runStatus === "passed" ? "bg-emerald-600" : runStatus === "failed" ? "bg-amber-600" : runStatus === "error" ? "bg-red-600" : ""}>
                {runStatus === "passed" ? "All passed" : runStatus === "failed" ? "Some failed" : runStatus === "error" ? "Execution error" : "Not run yet"}
              </Badge>
              <p className="text-sm text-slate-500">{passedCount}/{normalizedCases.length || 0} passed</p>
            </div>
            <div className="space-y-3">
              {normalizedCases.map((testCase, index) => {
                const result = runResults[index];
                return (
                  <button key={index} onClick={() => setActiveCaseIndex(index)} className={`w-full rounded-2xl border p-4 text-left transition ${activeCaseIndex === index ? "border-slate-900" : "hover:border-slate-300"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-slate-900">Test case {index + 1}</p>
                      {result ? (
                        <Badge className={result.passed ? "bg-emerald-600" : "bg-red-600"}>{result.passed ? "Passed" : "Failed"}</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {executionMode === "function"
                        ? `Input: ${JSON.stringify(testCase.input)}`
                        : `Stdin: ${JSON.stringify(testCase.stdin)}`}
                    </p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Selected test case details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Input</p>
              <pre className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{executionMode === "function" ? JSON.stringify(normalizedCases?.[activeCaseIndex]?.input, null, 2) : normalizedCases?.[activeCaseIndex]?.stdin || ""}</pre>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Expected</p>
              <pre className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{executionMode === "function" ? formatResultPreview(normalizedCases?.[activeCaseIndex]?.expected || normalizedCases?.[activeCaseIndex]?.description || "") : formatResultPreview(normalizedCases?.[activeCaseIndex]?.expectedStdout || normalizedCases?.[activeCaseIndex]?.description || "")}</pre>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Received</p>
              <pre className="whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{formatResultPreview(runResults?.[activeCaseIndex]?.received ?? "Run tests to see output")}</pre>
            </div>
            {runResults?.[activeCaseIndex]?.stdout ? (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Stdout</p>
                <pre className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{runResults[activeCaseIndex].stdout}</pre>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Runtime console</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="min-h-[120px] whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{consoleOutput || "No runtime logs yet."}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuestionDetail({ question, relatedQuestions, onSolved, progressMap }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Topics", path: "/topics" }, { label: question.topic, path: `/topics/${question.topicSlug}` }, { label: question.title }]} />

      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="outline" className="rounded-2xl" onClick={() => navigateTo(`/topics/${question.topicSlug}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to topic
        </Button>
        <Button variant="outline" className="rounded-2xl" onClick={() => navigateTo("/")}>
          <Home className="mr-2 h-4 w-4" /> Home
        </Button>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader className={`${question.color} rounded-t-3xl space-y-4`}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{question.topic}</Badge>
              <Badge variant="secondary">{question.difficulty}</Badge>
              {(question.labels || []).map((label) => <LabelBadge key={label} label={label} />)}
              {progressMap[question.slug] && <Badge className="bg-emerald-600">Solved</Badge>}
            </div>
            <CardTitle className="text-3xl leading-tight">{question.title}</CardTitle>
            <p className="text-sm text-slate-700">Concepts: {question.concept}</p>
          </CardHeader>
          <CardContent className="space-y-8 p-6 md:p-8">
            <section>
              <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <FileCode2 className="h-5 w-5" /> Full question
              </div>
              <p className="leading-7 text-slate-700">{question.fullQuestion}</p>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Target className="h-5 w-5" /> What this question tests
              </div>
              <div className="space-y-3">
                {question.objectives.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl border p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5" /> Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>Start with the exact return format shown in the example output.</p>
              <p>Write the simplest working version first, then improve it.</p>
              <p>Run tests often so you can catch formatting mistakes early.</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Examples</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Example input</p>
                <pre className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{question.exampleInput}</pre>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Example output</p>
                <pre className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{question.exampleOutput}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Related questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedQuestions.length === 0 ? (
                <p className="text-sm text-slate-500">No related questions found.</p>
              ) : (
                relatedQuestions.map((item) => (
                  <button key={item.slug} onClick={() => navigateTo(`/questions/${item.slug}`)} className="w-full rounded-2xl border p-4 text-left transition hover:border-slate-300 hover:shadow-sm">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500">{item.topic}</p>
                  </button>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="mb-6 rounded-2xl">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="testcases">Test cases</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <PythonPlayground question={question} onSolved={onSolved} />
        </TabsContent>
        <TabsContent value="testcases">
          <Card className="rounded-3xl border-0 shadow-md">
            <CardHeader>
              <CardTitle>Built-in test cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[420px] pr-4">
                <div className="space-y-4">
                  {(question.testCases || []).map((testCase, index) => (
                    <div key={index} className="rounded-2xl border p-4">
                      <p className="font-medium text-slate-900">Test case {index + 1}</p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">Input</p>
                      <pre className="mt-1 whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">{JSON.stringify(testCase.input, null, 2)}</pre>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">Expected</p>
                      <pre className="mt-1 whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">{formatResultPreview(testCase.expected || testCase.description)}</pre>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full rounded-3xl border-0 shadow-md">
        <CardContent className="p-10 text-center">
          <p className="text-3xl font-bold">Page not found</p>
          <p className="mt-3 text-slate-600">That route does not exist in this practice app.</p>
          <Button className="mt-6 rounded-2xl" onClick={() => navigateTo("/")}>Go home</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PythonQuestionsWebsite() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const allQuestions = useMemo(() => flattenQuestions(), []);
  const route = useHashRoute();
  const parsedRoute = useMemo(() => parseRoute(route, allQuestions), [route, allQuestions]);
  const progress = useLocalProgress(allQuestions);

  const filteredTopics = useMemo(() => {
    return topics
      .map((section) => ({
        ...section,
        topicSlug: slugify(section.topic),
        questions: section.questions
          .map((q) => withMeta(section, q))
          .filter((q) => {
            const matchesSearch =
              section.topic.toLowerCase().includes(search.toLowerCase()) ||
              q.title.toLowerCase().includes(search.toLowerCase()) ||
              q.prompt.toLowerCase().includes(search.toLowerCase()) ||
              q.concept.toLowerCase().includes(search.toLowerCase()) ||
              (q.labels || []).some((label) => label.toLowerCase().includes(search.toLowerCase()));
            const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
            return matchesSearch && matchesDifficulty;
          }),
      }))
      .filter((section) => section.questions.length > 0);
  }, [search, selectedDifficulty]);

  const stats = {
    topicCount: topics.length,
    totalQuestions: allQuestions.length,
  };

  const relatedQuestions = useMemo(() => {
    if (parsedRoute.type !== "question-detail") return [];
    return allQuestions
      .filter(
        (item) =>
          item.slug !== parsedRoute.question.slug &&
          (item.topic === parsedRoute.question.topic || item.difficulty === parsedRoute.question.difficulty)
      )
      .slice(0, 4);
  }, [parsedRoute, allQuestions]);

  return (
    <AnimatePresence mode="wait">
      {parsedRoute.type === "home" && (
        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HomePage
            search={search}
            setSearch={setSearch}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            filteredTopics={filteredTopics}
            stats={stats}
            progress={progress}
          />
        </motion.div>
      )}

      {parsedRoute.type === "topics" && (
        <motion.div key="topics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TopicsPage progressMap={progress.completed} />
        </motion.div>
      )}

      {parsedRoute.type === "topic-detail" && (
        <motion.div key={`topic-${parsedRoute.topic.topicSlug}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TopicDetailPage topic={parsedRoute.topic} progressMap={progress.completed} />
        </motion.div>
      )}

      {parsedRoute.type === "question-detail" && (
        <QuestionDetail
          key={parsedRoute.question.slug}
          question={parsedRoute.question}
          relatedQuestions={relatedQuestions}
          onSolved={progress.markComplete}
          progressMap={progress.completed}
        />
      )}

      {parsedRoute.type === "not-found" && (
        <motion.div key="not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <NotFoundPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
