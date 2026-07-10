*** Settings ***
Documentation    Test suite untuk Dashboard Functionality
Resource    ../resources/common.resource
Resource    ../resources/locators.resource

Suite Setup    Run Keywords    Open Application With Retry    AND    Login As Admin
Suite Teardown    Close Application With Log
Test Teardown    Run Keyword If Test Failed    Take Screenshot On Failure

*** Test Cases ***
TC-DASH-001: Verify Dashboard Elements
    [Documentation]    Verifikasi semua elemen di dashboard
    [Tags]    dashboard    smoke    critical
    Log    🔍 Verifying dashboard elements...
    Wait For Element    ${DASHBOARD_WELCOME}
    Wait For Element    ${DASHBOARD_USER_NAME}
    Wait For Element    ${DASHBOARD_LOGOUT}
    Wait For Element    ${STAT_MAHASISWA}
    Wait For Element    ${STAT_REKAM_MEDIS}
    Wait For Element    ${STAT_JADWAL}
    Wait For Element    ${STAT_KONSULTASI}
    Log    ✅ All dashboard elements are present

TC-DASH-002: Verify Admin Menu Items
    [Documentation]    Verifikasi menu untuk admin
    [Tags]    dashboard    admin
    Log    🔍 Verifying admin menu items...
    Wait For Element    ${MENU_MAHASISWA}
    Wait For Element    ${MENU_REKAM_MEDIS}
    Wait For Element    ${MENU_JADWAL}
    Wait For Element    ${MENU_KONSULTASI}
    Wait For Element    ${MENU_OBAT}
    Wait For Element    ${MENU_PENGATURAN}
    Log    ✅ All admin menu items are present

TC-DASH-003: Verify Statistics Display
    [Documentation]    Verifikasi statistik di dashboard
    [Tags]    dashboard
    Log    🔍 Verifying statistics...
    ${stat_mahasiswa}=    Get Element Text With Retry    ${STAT_MAHASISWA}
    ${stat_rekam}=    Get Element Text With Retry    ${STAT_REKAM_MEDIS}
    ${stat_jadwal}=    Get Element Text With Retry    ${STAT_JADWAL}
    ${stat_konsultasi}=    Get Element Text With Retry    ${STAT_KONSULTASI}
    Log    ✅ Statistics: Mahasiswa=${stat_mahasiswa}, Rekam=${stat_rekam}, Jadwal=${stat_jadwal}, Konsultasi=${stat_konsultasi}

TC-DASH-004: Logout Functionality
    [Documentation]    Test tombol logout
    [Tags]    dashboard    logout    critical
    Log    🔐 Testing logout...
    Click Element    ${DASHBOARD_LOGOUT}
    Wait For Element    ${LOGIN_SIGNIN_BUTTON}    ${LONG_TIMEOUT}
    Page Should Contain Element    ${LOGIN_EMAIL_INPUT}
    Log    ✅ Logout successful!

TC-DASH-005: Navigate to Mahasiswa Menu
    [Documentation]    Navigasi ke menu Mahasiswa
    [Tags]    dashboard    navigation
    Log    🧭 Navigating to Mahasiswa...
    Navigate To Mahasiswa
    Page Should Contain Element    ${MAHASISWA_TITLE}
    Log    ✅ Navigation to Mahasiswa successful!

TC-DASH-006: Navigate to Rekam Medis Menu
    [Documentation]    Navigasi ke menu Rekam Medis
    [Tags]    dashboard    navigation
    Log    🧭 Navigating to Rekam Medis...
    Navigate To RekamMedis
    Page Should Contain Element    ${RM_TITLE}
    Log    ✅ Navigation to Rekam Medis successful!

TC-DASH-007: Navigate to Jadwal Menu
    [Documentation]    Navigasi ke menu Jadwal
    [Tags]    dashboard    navigation
    Log    🧭 Navigating to Jadwal...
    Navigate To Jadwal
    Page Should Contain Element    ${JADWAL_TITLE}
    Log    ✅ Navigation to Jadwal successful!

TC-DASH-008: Navigate to Konsultasi Menu
    [Documentation]    Navigasi ke menu Konsultasi
    [Tags]    dashboard    navigation
    Log    🧭 Navigating to Konsultasi...
    Navigate To Konsultasi
    Page Should Contain Element    ${KONSULTASI_TITLE}
    Log    ✅ Navigation to Konsultasi successful!

TC-DASH-009: Navigate to Obat Menu
    [Documentation]    Navigasi ke menu Obat
    [Tags]    dashboard    navigation
    Log    🧭 Navigating to Obat...
    Navigate To Obat
    Page Should Contain Element    ${OBAT_TITLE}
    Log    ✅ Navigation to Obat successful!