<?php
declare(strict_types=1);

header('Content-Type: application/javascript; charset=UTF-8');

$portfolioRoot = realpath(__DIR__ . '/../portfolio');
$imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'avif'];

if ($portfolioRoot === false || !is_dir($portfolioRoot)) {
    http_response_code(500);
    echo "window.GALLERY_DATA = {\"generatedAt\":\"" . date('c') . "\",\"categories\":[]};";
    exit;
}

/**
 * Convert a string into a URL-friendly slug.
 */
function to_slug(string $value): string
{
    $slug = strtolower($value);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
    return trim($slug, '-');
}

/**
 * Convert folder/file labels into readable text.
 */
function to_label(string $value): string
{
    $label = preg_replace('/[-_]+/', ' ', $value) ?? $value;
    $label = preg_replace('/\s+/', ' ', $label) ?? $label;
    return trim($label);
}

$categories = [];
$categoryDirs = array_filter(glob($portfolioRoot . '/*'), 'is_dir');
natsort($categoryDirs);

foreach ($categoryDirs as $categoryDir) {
    $name = basename($categoryDir);
    $files = array_filter(glob($categoryDir . '/*'), 'is_file');
    natsort($files);

    $images = [];

    foreach ($files as $filePath) {
        $extension = strtolower((string) pathinfo($filePath, PATHINFO_EXTENSION));
        if (!in_array($extension, $imageExtensions, true)) {
            continue;
        }

        $relativePath = str_replace('\\', '/', substr($filePath, strlen(dirname(__DIR__)) + 1));
        $baseName = (string) pathinfo($filePath, PATHINFO_FILENAME);

        $images[] = [
            'src' => $relativePath,
            'alt' => to_label($baseName),
            'name' => basename($filePath),
        ];
    }

    $categories[] = [
        'slug' => to_slug($name),
        'name' => $name,
        'label' => to_label($name),
        'imageCount' => count($images),
        'images' => array_values($images),
    ];
}

$payload = [
    'generatedAt' => date('c'),
    'categories' => array_values($categories),
];

echo 'window.GALLERY_DATA = ' . json_encode(
    $payload,
    JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
) . ';';
