# run_tests.ps1 - Complete Test Runner
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Robot Framework Test Execution" -ForegroundColor Cyan
Write-Host "  Sistem Manajemen Kesehatan Mahasiswa" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Create report directories
New-Item -ItemType Directory -Path "reports\html" -Force | Out-Null
New-Item -ItemType Directory -Path "reports\logs" -Force | Out-Null

# Function to run tests
function Run-Suite {
    param($suite_name)
    
    Write-Host "🚀 Running $suite_name tests..." -ForegroundColor Yellow
    
    $result = robot -d reports/ `
          -l logs/${suite_name}_log.html `
          -r reports/${suite_name}_report.html `
          -o output_${suite_name}.xml `
          -L TRACE `
          suites/${suite_name}_tests.robot
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $suite_name tests passed!" -ForegroundColor Green
        $global:PASSED_SUITES++
    } else {
        Write-Host "❌ $suite_name tests failed!" -ForegroundColor Red
        $global:FAILED_SUITES++
    }
    Write-Host ""
}

$global:PASSED_SUITES = 0
$global:FAILED_SUITES = 0

# Check if suites directory exists
if (-not (Test-Path "suites")) {
    Write-Host "❌ Error: 'suites' directory not found!" -ForegroundColor Red
    Write-Host "Please create test files in the 'suites' directory." -ForegroundColor Yellow
    exit 1
}

# Get list of test files
$test_files = Get-ChildItem -Path "suites" -Filter "*_tests.robot" | ForEach-Object { $_.BaseName -replace '_tests$', '' }

if ($test_files.Count -eq 0) {
    Write-Host "❌ No test files found in 'suites' directory!" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Found ${test_files.Count} test suites:" -ForegroundColor Cyan
foreach ($suite in $test_files) {
    Write-Host "  - $suite" -ForegroundColor White
}
Write-Host ""

# Ask user which tests to run
Write-Host "Select test execution mode:" -ForegroundColor Yellow
Write-Host "  1. Run All Tests" -ForegroundColor White
Write-Host "  2. Run Smoke Tests (login, dashboard)" -ForegroundColor White
Write-Host "  3. Run CRUD Tests (mahasiswa, rekam_medis, jadwal, konsultasi, obat)" -ForegroundColor White
Write-Host "  4. Run Specific Suite" -ForegroundColor White
Write-Host "  5. Run Tests by Tag" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "🔥 Running ALL Tests..." -ForegroundColor Magenta
        foreach ($suite in $test_files) {
            Run-Suite $suite
        }
    }
    "2" {
        Write-Host "🔥 Running Smoke Tests..." -ForegroundColor Magenta
        Run-Suite "login"
        Run-Suite "dashboard"
    }
    "3" {
        Write-Host "📋 Running CRUD Tests..." -ForegroundColor Magenta
        $crud_suites = @("mahasiswa", "rekam_medis", "jadwal", "konsultasi", "obat")
        foreach ($suite in $crud_suites) {
            if ($test_files -contains $suite) {
                Run-Suite $suite
            }
        }
    }
    "4" {
        Write-Host "Available suites:" -ForegroundColor Yellow
        $index = 1
        foreach ($suite in $test_files) {
            Write-Host "  ${index}. $suite" -ForegroundColor White
            $index++
        }
        $suite_choice = Read-Host "Enter suite number"
        $selected_suite = $test_files[$suite_choice - 1]
        if ($selected_suite) {
            Run-Suite $selected_suite
        } else {
            Write-Host "❌ Invalid choice!" -ForegroundColor Red
        }
    }
    "5" {
        $tag = Read-Host "Enter tag name (e.g., smoke, critical, crud, negative)"
        Write-Host "Running tests with tag: $tag" -ForegroundColor Yellow
        robot -d reports/ -L TRACE --include $tag suites/
    }
    default {
        Write-Host "❌ Invalid choice! Running All Tests..." -ForegroundColor Red
        foreach ($suite in $test_files) {
            Run-Suite $suite
        }
    }
}

# Generate combined report if there are results
if (Test-Path "reports\*.xml") {
    Write-Host "📊 Generating Combined Report..." -ForegroundColor Cyan
    rebot --outputdir reports/ `
          --name "QA Test Report - Health App" `
          --loglevel DEBUG `
          reports/*.xml
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Test Execution Complete!" -ForegroundColor Green
Write-Host "  ✅ Passed Suites: ${PASSED_SUITES}" -ForegroundColor Green
Write-Host "  ❌ Failed Suites: ${FAILED_SUITES}" -ForegroundColor Red
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Reports generated in: reports/"
if (Test-Path "reports\report.html") {
    Write-Host "  - HTML Report: reports/report.html"
    Start-Process "reports\report.html"
}
if (Test-Path "reports\log.html") {
    Write-Host "  - Log File: reports/log.html"
}
if (Test-Path "reports\output.xml") {
    Write-Host "  - XML Output: reports/output.xml"
}
Write-Host ""