<?php
/**
 * Router for PHP's built-in dev server — replaces the old dev-server.js,
 * which could only serve static files and cannot execute PHP.
 *
 *   php -S 127.0.0.1:8000 router.php
 *
 * Serves real files (css, js, assets) directly and sends everything else
 * to index.php, matching the .htaccess rules used in production.
 */

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $path;

if ($path !== '/' && is_file($file)) {
    return false; // let the built-in server serve the asset as-is
}

require __DIR__ . '/index.php';
