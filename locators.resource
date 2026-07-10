*** Settings ***
Resource    common.resource

*** Variables ***
# ============================
# LOGIN PAGE LOCATORS
# ============================
${LOGIN_EMAIL_INPUT}    //android.widget.EditText[@content-desc="email-input"]
${LOGIN_PASSWORD_INPUT}    //android.widget.EditText[@content-desc="password-input"]
${LOGIN_SIGNIN_BUTTON}    //android.widget.Button[@content-desc="signin-button"]
${LOGIN_ADMIN_ROLE}    //android.view.View[@content-desc="admin-role"]
${LOGIN_USER_ROLE}    //android.view.View[@content-desc="user-role"]
${LOGIN_ERROR_ALERT}    //android.widget.TextView[@text="Error"]
${LOGIN_SUCCESS_ALERT}    //android.widget.TextView[@text="Sukses"]

# ============================
# DASHBOARD LOCATORS
# ============================
${DASHBOARD_TITLE}    //android.widget.TextView[@text="Selamat Datang,"]
${DASHBOARD_WELCOME}    //android.widget.TextView[@content-desc="welcome-text"]
${DASHBOARD_LOGOUT}    //android.view.View[@content-desc="logout-button"]
${DASHBOARD_USER_NAME}    //android.widget.TextView[@content-desc="user-name"]
${DASHBOARD_ROLE_BADGE}    //android.view.View[@content-desc="role-badge"]

# Stat Cards
${STAT_MAHASISWA}    //android.view.View[@content-desc="stat-mahasiswa"]
${STAT_REKAM_MEDIS}    //android.view.View[@content-desc="stat-rekammedis"]
${STAT_JADWAL}    //android.view.View[@content-desc="stat-jadwal"]
${STAT_KONSULTASI}    //android.view.View[@content-desc="stat-konsultasi"]

# Menu Items
${MENU_MAHASISWA}    //android.view.View[@content-desc="menu-mahasiswa"]
${MENU_REKAM_MEDIS}    //android.view.View[@content-desc="menu-rekammedis"]
${MENU_JADWAL}    //android.view.View[@content-desc="menu-jadwal"]
${MENU_KONSULTASI}    //android.view.View[@content-desc="menu-konsultasi"]
${MENU_OBAT}    //android.view.View[@content-desc="menu-obat"]
${MENU_PENGATURAN}    //android.view.View[@content-desc="menu-setting"]

# ============================
# MAHASISWA PAGE LOCATORS
# ============================
${MAHASISWA_TITLE}    //android.widget.TextView[@text="Data Mahasiswa"]
${MAHASISWA_ADD_BUTTON}    //android.view.View[@content-desc="add-button"]
${MAHASISWA_BACK_BUTTON}    //android.view.View[@content-desc="back-button"]
${MAHASISWA_LIST}    //android.widget.ScrollView
${MAHASISWA_ITEM}    //android.view.View[@content-desc="mahasiswa-item"]
${MAHASISWA_NAME}    //android.widget.TextView[@content-desc="mahasiswa-name"]
${MAHASISWA_GENDER}    //android.widget.TextView[@content-desc="mahasiswa-gender"]
${MAHASISWA_JENJANG}    //android.widget.TextView[@content-desc="mahasiswa-jenjang"]
${MAHASISWA_EDIT_BTN}    //android.view.View[@content-desc="edit-button"]
${MAHASISWA_DELETE_BTN}    //android.view.View[@content-desc="delete-button"]
${MAHASISWA_EMPTY}    //android.widget.TextView[@text="Tidak ada data"]

# Filter
${FILTER_JENJANG}    //android.view.View[@content-desc="filter-jenjang"]
${FILTER_GENDER}    //android.view.View[@content-desc="filter-gender"]
${FILTER_SEMUA}    //android.widget.TextView[@text="Semua"]
${FILTER_KULIAH}    //android.widget.TextView[@text="Kuliah"]
${FILTER_SMA}    //android.widget.TextView[@text="SMA"]
${FILTER_SMP}    //android.widget.TextView[@text="SMP"]
${FILTER_LAKILAKI}    //android.widget.TextView[@text="Laki-laki"]
${FILTER_PEREMPUAN}    //android.widget.TextView[@text="Perempuan"]

# Modal Mahasiswa
${MODAL_TITLE}    //android.widget.TextView[@content-desc="modal-title"]
${MODAL_NAME_INPUT}    //android.widget.EditText[@content-desc="modal-name"]
${MODAL_GENDER_LAKI}    //android.widget.Button[@content-desc="modal-gender-laki"]
${MODAL_GENDER_PEREMPUAN}    //android.widget.Button[@content-desc="modal-gender-perempuan"]
${MODAL_JENJANG_KULIAH}    //android.widget.Button[@content-desc="modal-jenjang-kuliah"]
${MODAL_JENJANG_SMA}    //android.widget.Button[@content-desc="modal-jenjang-sma"]
${MODAL_JENJANG_SMP}    //android.widget.Button[@content-desc="modal-jenjang-smp"]
${MODAL_SAVE_BUTTON}    //android.widget.Button[@content-desc="modal-save"]
${MODAL_CANCEL_BUTTON}    //android.widget.Button[@content-desc="modal-cancel"]

# ============================
# REKAM MEDIS LOCATORS
# ============================
${RM_TITLE}    //android.widget.TextView[@text="Rekam Medis"]
${RM_ADD_BUTTON}    //android.view.View[@content-desc="rm-add-button"]
${RM_BACK_BUTTON}    //android.view.View[@content-desc="rm-back-button"]
${RM_ITEM}    //android.view.View[@content-desc="rm-item"]
${RM_NAMA}    //android.widget.TextView[@content-desc="rm-nama"]
${RM_TANGGAL}    //android.widget.TextView[@content-desc="rm-tanggal"]
${RM_DIAGNOSA}    //android.widget.TextView[@content-desc="rm-diagnosa"]
${RM_TINDAKAN}    //android.widget.TextView[@content-desc="rm-tindakan"]
${RM_STATUS}    //android.widget.TextView[@content-desc="rm-status"]
${RM_EDIT_BTN}    //android.view.View[@content-desc="rm-edit-button"]
${RM_DELETE_BTN}    //android.view.View[@content-desc="rm-delete-button"]

# Modal Rekam Medis
${RM_MODAL_TITLE}    //android.widget.TextView[@content-desc="rm-modal-title"]
${RM_MODAL_NAMA}    //android.widget.EditText[@content-desc="rm-modal-nama"]
${RM_MODAL_TANGGAL}    //android.widget.EditText[@content-desc="rm-modal-tanggal"]
${RM_MODAL_DIAGNOSA}    //android.widget.EditText[@content-desc="rm-modal-diagnosa"]
${RM_MODAL_TINDAKAN}    //android.widget.EditText[@content-desc="rm-modal-tindakan"]
${RM_MODAL_STATUS_PROses}    //android.widget.Button[@content-desc="rm-status-proses"]
${RM_MODAL_STATUS_SEMBUH}    //android.widget.Button[@content-desc="rm-status-sembuh"]
${RM_MODAL_STATUS_RUJUK}    //android.widget.Button[@content-desc="rm-status-rujuk"]
${RM_MODAL_SAVE}    //android.widget.Button[@content-desc="rm-modal-save"]
${RM_MODAL_CANCEL}    //android.widget.Button[@content-desc="rm-modal-cancel"]

# ============================
# JADWAL DOKTER LOCATORS
# ============================
${JADWAL_TITLE}    //android.widget.TextView[@text="Jadwal Dokter"]
${JADWAL_ADD_BUTTON}    //android.view.View[@content-desc="jd-add-button"]
${JADWAL_BACK_BUTTON}    //android.view.View[@content-desc="jd-back-button"]
${JADWAL_ITEM}    //android.view.View[@content-desc="jd-item"]
${JADWAL_DOKTER}    //android.widget.TextView[@content-desc="jd-dokter"]
${JADWAL_SPESIALIS}    //android.widget.TextView[@content-desc="jd-spesialis"]
${JADWAL_HARI}    //android.widget.TextView[@content-desc="jd-hari"]
${JADWAL_JAM}    //android.widget.TextView[@content-desc="jd-jam"]
${JADWAL_KUOTA}    //android.widget.TextView[@content-desc="jd-kuota"]
${JADWAL_EDIT_BTN}    //android.view.View[@content-desc="jd-edit-button"]
${JADWAL_DELETE_BTN}    //android.view.View[@content-desc="jd-delete-button"]
${JADWAL_PESAN_BUTTON}    //android.view.View[@content-desc="jd-pesan-button"]

# Modal Jadwal
${JD_MODAL_TITLE}    //android.widget.TextView[@content-desc="jd-modal-title"]
${JD_MODAL_DOKTER}    //android.widget.EditText[@content-desc="jd-modal-dokter"]
${JD_MODAL_SPESIALIS}    //android.widget.EditText[@content-desc="jd-modal-spesialis"]
${JD_MODAL_HARI}    //android.widget.EditText[@content-desc="jd-modal-hari"]
${JD_MODAL_JAM}    //android.widget.EditText[@content-desc="jd-modal-jam"]
${JD_MODAL_KUOTA}    //android.widget.EditText[@content-desc="jd-modal-kuota"]
${JD_MODAL_SAVE}    //android.widget.Button[@content-desc="jd-modal-save"]
${JD_MODAL_CANCEL}    //android.widget.Button[@content-desc="jd-modal-cancel"]

# ============================
# KONSULTASI LOCATORS
# ============================
${KONSULTASI_TITLE}    //android.widget.TextView[@text="Konsultasi"]
${KONSULTASI_ADD_BUTTON}    //android.view.View[@content-desc="ks-add-button"]
${KONSULTASI_BACK_BUTTON}    //android.view.View[@content-desc="ks-back-button"]
${KONSULTASI_ITEM}    //android.view.View[@content-desc="ks-item"]
${KONSULTASI_NAMA}    //android.widget.TextView[@content-desc="ks-nama"]
${KONSULTASI_KELUHAN}    //android.widget.TextView[@content-desc="ks-keluhan"]
${KONSULTASI_TANGGAL}    //android.widget.TextView[@content-desc="ks-tanggal"]
${KONSULTASI_STATUS}    //android.widget.TextView[@content-desc="ks-status"]
${KONSULTASI_BALASAN}    //android.widget.TextView[@content-desc="ks-balasan"]
${KONSULTASI_EDIT_BTN}    //android.view.View[@content-desc="ks-edit-button"]
${KONSULTASI_DELETE_BTN}    //android.view.View[@content-desc="ks-delete-button"]
${KONSULTASI_BALAS_BTN}    //android.view.View[@content-desc="ks-balas-button"]

# Modal Konsultasi
${KS_MODAL_TITLE}    //android.widget.TextView[@content-desc="ks-modal-title"]
${KS_MODAL_NAMA}    //android.widget.EditText[@content-desc="ks-modal-nama"]
${KS_MODAL_KELUHAN}    //android.widget.EditText[@content-desc="ks-modal-keluhan"]
${KS_MODAL_SAVE}    //android.widget.Button[@content-desc="ks-modal-save"]
${KS_MODAL_CANCEL}    //android.widget.Button[@content-desc="ks-modal-cancel"]

# Modal Balasan
${BALAS_MODAL_TITLE}    //android.widget.TextView[@content-desc="balas-modal-title"]
${BALAS_TEXT_INPUT}    //android.widget.EditText[@content-desc="balas-text-input"]
${BALAS_KIRIM_BUTTON}    //android.widget.Button[@content-desc="balas-kirim-button"]
${BALAS_CANCEL_BUTTON}    //android.widget.Button[@content-desc="balas-cancel-button"]

# ============================
# OBAT LOCATORS
# ============================
${OBAT_TITLE}    //android.widget.TextView[@text="Obat & Resep"]
${OBAT_ADD_BUTTON}    //android.view.View[@content-desc="ob-add-button"]
${OBAT_BACK_BUTTON}    //android.view.View[@content-desc="ob-back-button"]
${OBAT_ITEM}    //android.view.View[@content-desc="ob-item"]
${OBAT_NAMA}    //android.widget.TextView[@content-desc="ob-nama"]
${OBAT_JENIS}    //android.widget.TextView[@content-desc="ob-jenis"]
${OBAT_STOK}    //android.widget.TextView[@content-desc="ob-stok"]
${OBAT_HARGA}    //android.widget.TextView[@content-desc="ob-harga"]
${OBAT_EDIT_BTN}    //android.view.View[@content-desc="ob-edit-button"]
${OBAT_DELETE_BTN}    //android.view.View[@content-desc="ob-delete-button"]

# Modal Obat
${OB_MODAL_TITLE}    //android.widget.TextView[@content-desc="ob-modal-title"]
${OB_MODAL_NAMA}    //android.widget.EditText[@content-desc="ob-modal-nama"]
${OB_MODAL_JENIS}    //android.widget.EditText[@content-desc="ob-modal-jenis"]
${OB_MODAL_STOK}    //android.widget.EditText[@content-desc="ob-modal-stok"]
${OB_MODAL_HARGA}    //android.widget.EditText[@content-desc="ob-modal-harga"]
${OB_MODAL_SAVE}    //android.widget.Button[@content-desc="ob-modal-save"]
${OB_MODAL_CANCEL}    //android.widget.Button[@content-desc="ob-modal-cancel"]

# ============================
# SETTING/PROFILE LOCATORS
# ============================
${SETTING_TITLE}    //android.widget.TextView[@text="Pengaturan"]
${PROFILE_NAME}    //android.widget.TextView[@content-desc="profile-name"]
${PROFILE_EMAIL}    //android.widget.TextView[@content-desc="profile-email"]
${PROFILE_NIM}    //android.widget.TextView[@content-desc="profile-nim"]
${PROFILE_JENJANG}    //android.widget.TextView[@content-desc="profile-jenjang"]
${SETTING_LOGOUT}    //android.view.View[@content-desc="setting-logout"]
${SETTING_BACK}    //android.view.View[@content-desc="setting-back"]