*** Settings ***
Documentation    Test suite untuk Login Functionality
Resource    ../resources/common.resource
Resource    ../resources/locators.resource

Suite Setup    Open Application With Retry
Suite Teardown    Close Application With Log
Test Teardown    Run Keyword If Test Failed    Take Screenshot On Failure

*** Variables ***
${INVALID_EMAIL}    wrong@gmail.com
${INVALID_PASSWORD}    wrongpass
${EMPTY_EMAIL}    ${EMPTY}
${EMPTY_PASSWORD}    ${EMPTY}

*** Test Cases ***
TC-LOGIN-001: Verify Login Page Elements
    [Documentation]    Verifikasi semua elemen di halaman login
    [Tags]    login    smoke    critical
    Log    🔍 Verifying login page elements...
    Wait For Element    ${LOGIN_EMAIL_INPUT}
    Wait For Element    ${LOGIN_PASSWORD_INPUT}
    Wait For Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${LOGIN_ADMIN_ROLE}
    Wait For Element    ${LOGIN_USER_ROLE}
    Log    ✅ All login page elements are present

TC-LOGIN-002: Login as Admin with Valid Credentials
    [Documentation]    Test login admin berhasil
    [Tags]    login    smoke    critical
    Log    🔐 Testing admin login...
    Click Element    ${LOGIN_ADMIN_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${ADMIN_EMAIL}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${ADMIN_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${DASHBOARD_TITLE}    ${LONG_TIMEOUT}
    ${user_name}=    Get Element Text With Retry    ${DASHBOARD_USER_NAME}
    Should Contain    ${user_name}    Admin
    Log    ✅ Admin login successful!

TC-LOGIN-003: Login as Mahasiswa with Valid Credentials
    [Documentation]    Test login mahasiswa berhasil
    [Tags]    login    smoke    critical
    Log    🔐 Testing mahasiswa login...
    Click Element    ${LOGIN_USER_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${USER_EMAIL}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${USER_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${DASHBOARD_TITLE}    ${LONG_TIMEOUT}
    ${user_name}=    Get Element Text With Retry    ${DASHBOARD_USER_NAME}
    Should Contain    ${user_name}    Bintang
    Log    ✅ Mahasiswa login successful!

TC-LOGIN-004: Login with Invalid Email
    [Documentation]    Test login dengan email tidak valid
    [Tags]    login    negative
    Log    🔐 Testing invalid email...
    Click Element    ${LOGIN_ADMIN_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${INVALID_EMAIL}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${ADMIN_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${LOGIN_ERROR_ALERT}
    Log    ✅ Error alert displayed for invalid email

TC-LOGIN-005: Login with Wrong Password
    [Documentation]    Test login dengan password salah
    [Tags]    login    negative
    Log    🔐 Testing wrong password...
    Click Element    ${LOGIN_ADMIN_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${ADMIN_EMAIL}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${INVALID_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${LOGIN_ERROR_ALERT}
    Log    ✅ Error alert displayed for wrong password

TC-LOGIN-006: Login with Wrong Role Selection
    [Documentation]    Test login dengan role yang salah
    [Tags]    login    negative
    Log    🔐 Testing wrong role selection...
    Click Element    ${LOGIN_USER_ROLE}
    Input Text Into Field    ${LOGIN_EMAIL_INPUT}    ${ADMIN_EMAIL}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${ADMIN_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${LOGIN_ERROR_ALERT}
    Log    ✅ Error alert displayed for wrong role

TC-LOGIN-007: Login with Empty Email
    [Documentation]    Test login dengan email kosong
    [Tags]    login    negative
    Log    🔐 Testing empty email...
    Click Element    ${LOGIN_ADMIN_ROLE}
    Clear Text    ${LOGIN_EMAIL_INPUT}
    Input Text Into Field    ${LOGIN_PASSWORD_INPUT}    ${ADMIN_PASSWORD}
    Click Element    ${LOGIN_SIGNIN_BUTTON}
    Wait For Element    ${LOGIN_ERROR_ALERT}
    Log    ✅ Error alert displayed for empty email