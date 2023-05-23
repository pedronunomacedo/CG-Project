<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// SQLite database file
$databaseFile = 'init.db';

// Create a new SQLite database connection
$db = new SQLite3($databaseFile);

// Fetch the cookies from the GET request
$name = $_REQUEST['name'] ?? '';
$value = $_REQUEST['value'] ?? '';

// Log a message to a file
$logFile = 'log.txt';
$logMessage = 'save_cookies.php executed with name: ' . $name . ', value: ' . $value . ' at ' . date('Y-m-d H:i:s') . PHP_EOL;
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Insert the cookie into the database
$query = 'INSERT INTO cookies (name, value) VALUES (:name, :value)';
$stmt = $db->prepare($query);
$stmt->bindValue(':name', $name, SQLITE3_TEXT);
$stmt->bindValue(':value', $value, SQLITE3_TEXT);
$result = $stmt->execute();

// Check if the cookie was successfully inserted
if ($result) {
    echo 'Cookie saved!';
} else {
    echo 'Failed to save cookie.';
}

// Close the database connection
$db->close();
?>
