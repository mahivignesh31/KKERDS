<?php
// Enable error reporting for debugging. On a live site, you would log these to a file instead of displaying them.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set the content type to JSON so the browser knows what to expect.
header('Content-Type: application/json');

// --- 1. DATABASE CONNECTION DETAILS ---
$servername = "localhost";
$username   = "u632285770_LOGIN"; 
$password   = "Ravi@1234";      
$dbname     = "u632285770_LOGIN";

// --- 2. CREATE AND CHECK THE CONNECTION ---
$conn = new mysqli($servername, $username, $password, $dbname);

// If the connection fails, return a JSON error and stop the script.
if ($conn->connect_error) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'Database Connection Failed: ' . $conn->connect_error
    ]);
    exit(); // Use exit() or die() to stop script execution
}

// --- 3. VALIDATE FORM DATA ---
if (empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['email']) || empty($_POST['purpose'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'All form fields are required. Please fill out the form completely.'
    ]);
    exit();
}

// --- 4. SANITIZE AND GET FORM DATA ---
$name    = trim($_POST['name']);
$phone   = trim($_POST['phone']);
$email   = trim($_POST['email']);
$purpose = trim($_POST['purpose']);

// --- 5. PREPARE THE SQL INSERT STATEMENT ---
// Using a prepared statement is the best way to prevent SQL injection.
// The `NOW()` function inserts the current date and time.
$stmt = $conn->prepare("INSERT INTO inquiries (name, phone, email, purpose, submission_date) VALUES (?, ?, ?, ?, NOW())");

// Check if the prepare statement failed (e.g., table or column name is wrong)
if ($stmt === false) {
    echo json_encode([
        'status' => 'error',
        'message' => 'SQL Error: Failed to prepare statement. Check table/column names. Error: ' . $conn->error
    ]);
    $conn->close();
    exit();
}

// Bind the variables to the prepared statement as strings ("ssss").
$stmt->bind_param("ssss", $name, $phone, $email, $purpose);

// --- 6. EXECUTE THE STATEMENT AND SEND RESPONSE ---
if ($stmt->execute()) {
    // SUCCESS!
    echo json_encode([
        'status' => 'success',
        'message' => 'Inquiry submitted successfully!'
    ]);
} else {
    // FAILURE!
    echo json_encode([
        'status' => 'error',
        'message' => 'Database Error: Failed to execute query. Error: ' . $stmt->error
    ]);
}

// --- 7. CLOSE THE STATEMENT AND CONNECTION ---
$stmt->close();
$conn->close();

?>