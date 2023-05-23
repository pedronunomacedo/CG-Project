<?php
// SQLite database file
$databaseFile = 'cookies.db';

// Create a new SQLite database connection
$db = new SQLite3($databaseFile);

// Query to fetch the stored cookies
$query = 'SELECT name, value FROM cookies';
$result = $db->query($query);

// Display the stored cookies
echo '<h2>Stored Cookies</h2>';
echo '<ul>';
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    echo '<li>' . $row['name'] . ': ' . $row['value'] . '</li>';
}
echo '</ul>';

// Close the database connection
$db->close();
