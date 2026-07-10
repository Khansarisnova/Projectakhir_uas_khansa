*** Settings ***
Documentation    Common resources and keywords for all test suites
Library    AppiumLibrary
Library    String
Library    Collections
Library    BuiltIn
Library    DateTime

*** Variables ***
# App Configuration
${APP_PACKAGE}    com.umuka.healthapp
${APP_ACTIVITY}    MainActivity
${PLATFORM_NAME}    Android
${DEVICE_NAME}    emulator-5554
${AUTOMATION_NAME}    UiAutomator2
${APP_WAIT_ACTIVITY}    *

# Timeout
${DEFAULT_TIMEOUT}    10s
${LONG_TIMEOUT}    30s
${SHORT_TIMEOUT}    5s

# Credentials
${ADMIN_EMAIL}    admin@gmail.com
${ADMIN_PASSWORD}    123admin
${USER_EMAIL}    mahasiswa@gmail.com
${USER_PASSWORD}    123

# URLs
${BASE_URL}    http://localhost:19000
${API_BASE_URL}    http://localhost:3000/api

# Test Data
${TEST_NAMA_MAHASISWA}    Test Mahasiswa Auto
${TEST_NAMA_DOKTER}    dr. Test Automation
${TEST_SPESIALIS}    Spesialis Test
${TEST_KELUHAN}    Sakit kepala dan demam tinggi

*** Keywords ***
# =====================
# APP MANAGEMENT
# =====================
Open Application With Retry
    [Documentation]    Open application with retry mechanism
    Log    📱 Opening application...
    ${count}=    Set Variable    0
    FOR    ${i}    IN RANGE    1    4
        TRY
            Open Application    http://localhost:4723
            ...    platformName=${PLATFORM_NAME}
            ...    deviceName=${DEVICE_NAME}
            ...    appPackage=${APP_PACKAGE}
            ...    appActivity=${APP_ACTIVITY}
            ...    automationName=${AUTOMATION_NAME}
            ...    autoGrantPermissions=True
            ...    noReset=False
            Log    ✅ Application opened successfully    level=INFO
            RETURN
        EXCEPT    Exception
            Log    ❌ Attempt ${i} failed: ${EXCEPTION}    level=WARN
            Sleep    3s
        END
    END
    Fail    Failed to open application after 3 attempts

Close Application With Log
    [Documentation]    Close application with logging
    Log    🔴 Closing application...
    Close Application

# =====================
# LOGIN KEYWORDS
# =====================
Login As Admin
    [Documentation]    Login as admin user
    Click Element    ${LOGIN_ADMIN_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${ADMIN_EMAIL}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${ADMIN_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${DASHBOARD_TITLE}    ${LONG_TIMEOUT}
    Log    ✅ Admin logged in

Login As Mahasiswa
    [Documentation]    Login as mahasiswa user
    Click Element    ${LOGIN_USER_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${USER_EMAIL}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${USER_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${DASHBOARD_TITLE}    ${LONG_TIMEOUT}
    Log    ✅ Mahasiswa logged in

Login As User With Credentials
    [Arguments]    ${email}    ${password}    ${role}=user
    [Documentation]    Login with custom credentials
    Run Keyword If    '${role}' == 'admin'    Click Element    ${LOGIN_ADMIN_ROLE}
    ...    ELSE    Click Element    ${LOGIN_USER_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${email}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${password}
    Click Element    ${LOGIN_SIGNIN_BUTTON}

# =====================
# NAVIGATION KEYWORDS
# =====================
Navigate To Menu
    [Arguments]    ${menu_locator}
    [Documentation]    Navigate to a menu item
    Scroll To Element    ${menu_locator}
    Click Element    ${menu_locator}
    Sleep    2s

Navigate To Mahasiswa
    Navigate To Menu    ${MENU_MAHASISWA}
    Wait For Element    ${MAHASISWA_TITLE}    ${LONG_TIMEOUT}

Navigate To RekamMedis
    Navigate To Menu    ${MENU_REKAM_MEDIS}
    Wait For Element    ${RM_TITLE}    ${LONG_TIMEOUT}

Navigate To Jadwal
    Navigate To Menu    ${MENU_JADWAL}
    Wait For Element    ${JADWAL_TITLE}    ${LONG_TIMEOUT}

Navigate To Konsultasi
    Navigate To Menu    ${MENU_KONSULTASI}
    Wait For Element    ${KONSULTASI_TITLE}    ${LONG_TIMEOUT}

Navigate To Obat
    Navigate To Menu    ${MENU_OBAT}
    Wait For Element    ${OBAT_TITLE}    ${LONG_TIMEOUT}

Navigate To Setting
    Navigate To Menu    ${MENU_PENGATURAN}
    Wait For Element    ${SETTING_TITLE}    ${LONG_TIMEOUT}

# =====================
# ELEMENT KEYWORDS
# =====================
Wait For Element
    [Arguments]    ${locator}    ${timeout}=${DEFAULT_TIMEOUT}
    [Documentation]    Wait for element to appear
    Wait Until Page Contains Element    ${locator}    timeout=${timeout}

Tap Element
    [Arguments]    ${locator}    ${timeout}=${DEFAULT_TIMEOUT}
    [Documentation]    Tap on element
    Wait For Element    ${locator}    ${timeout}
    Click Element    ${locator}

Input Text Into Field
    [Arguments]    ${locator}    ${text}    ${timeout}=${DEFAULT_TIMEOUT}
    [Documentation]    Input text into field
    Wait For Element    ${locator}    ${timeout}
    Clear Text    ${locator}
    Input Text    ${locator}    ${text}

Get Element Text With Retry
    [Arguments]    ${locator}    ${timeout}=${DEFAULT_TIMEOUT}
    [Documentation]    Get element text with retry
    Wait For Element    ${locator}    ${timeout}
    ${text}=    Get Text    ${locator}
    RETURN    ${text}

Scroll To Element
    [Arguments]    ${locator}    ${max_swipes}=5
    [Documentation]    Scroll to element
    ${is_visible}=    Run Keyword And Return Status    Page Should Contain Element    ${locator}
    Run Keyword Unless    ${is_visible}    Swipe Down Until Element    ${locator}

Swipe Down Until Element
    [Arguments]    ${locator}    ${max_swipes}=5
    FOR    ${i}    IN RANGE    1    ${max_swipes}+1
        ${found}=    Run Keyword And Return Status    Page Should Contain Element    ${locator}
        Exit For Loop If    ${found}
        Swipe    500    800    500    400
        Sleep    0.5s
    END
    Run Keyword If    not ${found}    Fail    Element ${locator} not found after swiping

# =====================
# DATA GENERATION
# =====================
Generate Random Name
    [Documentation]    Generate random name for testing
    ${random}=    Generate Random String    6    [LETTERS]
    ${name}=    Set Variable    Test User ${random}
    RETURN    ${name}

Generate Random Date
    [Documentation]    Generate current date for testing
    ${date}=    Get Current Date    result_format=%Y-%m-%d
    RETURN    ${date}

Generate Random Keluhan
    [Documentation]    Generate random keluhan for testing
    ${keluhan_list}=    Create List
    ...    Sakit kepala dan demam
    ...    Flu dan batuk berdahak
    ...    Nyeri pada perut
    ...    Cedera saat olahraga
    ...    Sakit gigi
    ${index}=    Evaluate    random.randint(0, 4)
    ${keluhan}=    Get From List    ${keluhan_list}    ${index}
    RETURN    ${keluhan}

# =====================
# ASSERTION KEYWORDS
# =====================
Assert Element Text Contains
    [Arguments]    ${locator}    ${expected_text}
    [Documentation]    Assert element text contains expected text
    ${actual_text}=    Get Element Text With Retry    ${locator}
    Should Contain    ${actual_text}    ${expected_text}

Assert Element Text Equals
    [Arguments]    ${locator}    ${expected_text}
    [Documentation]    Assert element text equals expected text
    ${actual_text}=    Get Element Text With Retry    ${locator}
    Should Be Equal As Strings    ${actual_text}    ${expected_text}

# =====================
# SCREENSHOT
# =====================
Take Screenshot On Failure
    [Documentation]    Take screenshot when test fails
    Capture Page Screenshot    failure_${SUITE_NAME}_${TEST_NAME}_${TIMESTAMP}.png

# =====================
# CLEANUP
# =====================
Cleanup Test Data
    [Documentation]    Cleanup test data after test
    Log    🧹 Cleaning up test data...
    # Implement cleanup logic here