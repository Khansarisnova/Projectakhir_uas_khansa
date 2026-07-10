import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// ============ TIPE DATA ============
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  image: string | null;
  tanggal: string;
  status: 'menunggu' | 'diproses' | 'selesai' | 'ditolak';
  userId: number;
};

// ============ DATA AWAL ============
const initialUsers: User[] = [
  { id: 1, name: 'Admin Sistem', email: 'admin@gmail.com', password: '123admin', role: 'admin' },
  { id: 2, name: 'khansa risnova', email: 'khansa@gmail.com', password: '123', role: 'user' },
  { id: 3, name: 'naila izati', email: 'naila@gmail.com', password: '123', role: 'user' },
];

const initialLaporan: Laporan[] = [
  {
    id: 1,
    nama: 'Khansa Risnova Astiara',
    lokasi: 'Gedung A Lantai 3',
    deskripsi: 'Lampu ruang kelas mati dan AC tidak dingin',
    image: null,
    tanggal: '2026-07-09 10:30',
    status: 'menunggu',
    userId: 2,
  },
  {
    id: 2,
    nama: 'Naila Izati',
    lokasi: 'Parkiran Belakang',
    deskripsi: 'Jalanan rusak berlubang dan berbahaya',
    image: null,
    tanggal: '2026-07-08 14:15',
    status: 'diproses',
    userId: 3,
  },
  {
    id: 3,
    nama: 'Almaira Choirulnisa nurazizah',
    lokasi: 'Kantin Kampus',
    deskripsi: 'Makanan tidak higienis dan ada serangga',
    image: null,
    tanggal: '2026-07-07 09:00',
    status: 'selesai',
    userId: 2,
  },
    {
    id: 3,
    nama: 'Almaira Choirulnisa nurazizah',
    lokasi: 'area aula Kampus',
    deskripsi: 'tempat sampah sudah penuh perlu dibersikan segera',
    image: null,
    tanggal: '2026-03-25 03:25',
    status: 'selesai',
    userId: 3,
  },
];

export default function App() {
  // ============ STATE LOGIN ============
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useState<User[]>(initialUsers);

  // ============ STATE LAPORAN ============
  const [laporan, setLaporan] = useState<Laporan[]>(initialLaporan);
  const [currentScreen, setCurrentScreen] = useState<string>('Dashboard');

  // ============ STATE FORM LAPORAN ============
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ============ STATE FILTER ============
  const [filterStatus, setFilterStatus] = useState<string>('semua');

  // ============ FUNGSI LOGIN ============
  const handleLogin = (): void => {
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
    
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Error', 'Email atau password salah!');
    }
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentScreen('Dashboard');
  };

  const isAdmin = currentUser?.role === 'admin';
  const isUser = currentUser?.role === 'user';

  // ============ FUNGSI IMAGE PICKER ============
  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted') {
        Alert.alert('Izin Ditolak', 'Aplikasi memerlukan izin kamera untuk mengambil foto.');
        return false;
      }
      
      if (mediaStatus !== 'granted') {
        Alert.alert('Izin Ditolak', 'Aplikasi memerlukan izin galeri untuk memilih foto.');
        return false;
      }
      
      return true;
    } catch (error) {
      Alert.alert('Error', 'Gagal meminta izin.');
      return false;
    }
  };

  const takePhoto = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      setIsLoading(true);
      
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        Alert.alert('Berhasil', 'Foto berhasil diambil!');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil foto. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      setIsLoading(true);
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        Alert.alert('Berhasil', 'Foto berhasil dipilih dari galeri!');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memilih foto. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    Alert.alert(
      'Hapus Foto',
      'Apakah Anda yakin ingin menghapus foto ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => {
          setImage(null);
          setSelectedImage(null);
          setModalVisible(false);
        }}
      ]
    );
  };

  const viewImage = () => {
    if (image) {
      setSelectedImage(image);
      setModalVisible(true);
    }
  };

  // ============ FUNGSI LAPORAN ============
  const handleSubmitLaporan = () => {
    if (!nama || !deskripsi) {
      Alert.alert('Error', 'Nama dan deskripsi masalah wajib diisi!');
      return;
    }

    const newLaporan: Laporan = {
      id: laporan.length + 1,
      nama: nama,
      lokasi: lokasi || 'Tidak disebutkan',
      deskripsi: deskripsi,
      image: image,
      tanggal: new Date().toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'menunggu',
      userId: currentUser?.id || 0,
    };

    setLaporan([newLaporan, ...laporan]);
    setNama('');
    setLokasi('');
    setDeskripsi('');
    setImage(null);
    
    Alert.alert(
      'Berhasil!',
      'Laporan Anda telah terkirim dan akan segera diproses.',
      [{ text: 'OK' }]
    );
  };

  const handleUpdateStatus = (id: number, status: Laporan['status']) => {
    setLaporan(laporan.map(l => 
      l.id === id ? { ...l, status: status } : l
    ));
    Alert.alert('Berhasil', `Status laporan telah diupdate menjadi ${status}`);
  };

  const handleDeleteLaporan = (id: number) => {
    Alert.alert(
      'Hapus Laporan',
      'Apakah Anda yakin ingin menghapus laporan ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => {
          setLaporan(laporan.filter(l => l.id !== id));
          Alert.alert('Berhasil', 'Laporan berhasil dihapus!');
        }}
      ]
    );
  };

  // ============ GET FILTERED LAPORAN ============
  const getFilteredLaporan = () => {
    let filtered = laporan;
    
    if (!isAdmin) {
      filtered = filtered.filter(l => l.userId === currentUser?.id);
    }
    
    if (filterStatus !== 'semua') {
      filtered = filtered.filter(l => l.status === filterStatus);
    }
    
    return filtered;
  };

  // ============ STATISTIK ============
  const userLaporan = laporan.filter(l => l.userId === currentUser?.id);
  const totalLaporan = isAdmin ? laporan.length : userLaporan.length;
  const menunggu = (isAdmin ? laporan : userLaporan).filter(l => l.status === 'menunggu').length;
  const diproses = (isAdmin ? laporan : userLaporan).filter(l => l.status === 'diproses').length;
  const selesai = (isAdmin ? laporan : userLaporan).filter(l => l.status === 'selesai').length;
  const ditolak = (isAdmin ? laporan : userLaporan).filter(l => l.status === 'ditolak').length;

  // ============ GET STATUS COLOR ============
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'menunggu': return '#f59e0b';
      case 'diproses': return '#3b82f6';
      case 'selesai': return '#10b981';
      case 'ditolak': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'menunggu': return 'time-outline';
      case 'diproses': return 'refresh-outline';
      case 'selesai': return 'checkmark-circle-outline';
      case 'ditolak': return 'close-circle-outline';
      default: return 'ellipse-outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'menunggu': return 'Menunggu';
      case 'diproses': return 'Diproses';
      case 'selesai': return 'Selesai';
      case 'ditolak': return 'Ditolak';
      default: return status;
    }
  };

  // ============ HALAMAN LOGIN ============
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#2563eb" translucent={false} />
        
        <View style={styles.loginHeader}>
          <View style={styles.loginLogoContainer}>
            <Ionicons name="clipboard" size={60} color="white" />
          </View>
          <Text style={styles.loginTitle}>Sistem Pelaporan</Text>
          <Text style={styles.loginSubtitle}>Laporkan masalah dengan mudah</Text>
        </View>

        <View style={styles.loginCard}>
          <Text style={styles.loginCardTitle}>Masuk</Text>
          
          <Text style={styles.loginLabel}>Email</Text>
          <View style={styles.loginInputContainer}>
            <Ionicons name="mail-outline" size={20} color="#9ca3af" style={styles.loginInputIcon} />
            <TextInput
              style={styles.loginInput}
              placeholder="Masukkan email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.loginLabel}>Password</Text>
          <View style={styles.loginInputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" style={styles.loginInputIcon} />
            <TextInput
              style={styles.loginInput}
              placeholder="Masukkan password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          <View style={styles.loginDemo}>
            <Text style={styles.loginDemoTitle}>📋 Akun Demo:</Text>
            <View style={styles.loginDemoItem}>
              <View style={[styles.loginDemoBadge, { backgroundColor: '#2563eb' }]}>
                <Text style={styles.loginDemoBadgeText}>Admin</Text>
              </View>
              <Text style={styles.loginDemoText}>admin@gmail.com</Text>
              <Text style={styles.loginDemoPass}>123admin</Text>
            </View>
            <View style={styles.loginDemoItem}>
              <View style={[styles.loginDemoBadge, { backgroundColor: '#10b981' }]}>
                <Text style={styles.loginDemoBadgeText}>User</Text>
              </View>
              <Text style={styles.loginDemoText}>user@gmail.com</Text>
              <Text style={styles.loginDemoPass}>123</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ============ HALAMAN DASHBOARD ============
  if (currentScreen === 'Dashboard') {
    const filteredData = getFilteredLaporan();

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2563eb" translucent={false} />
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Selamat Datang,</Text>
            <Text style={styles.headerName}>{currentUser?.name}</Text>
            <View style={styles.headerRole}>
              <Ionicons name={isAdmin ? "shield-checkmark" : "person"} size={16} color="white" />
              <Text style={styles.headerRoleText}>{isAdmin ? 'Administrator' : 'User'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.statNumber}>{totalLaporan}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
              <Text style={styles.statNumber}>{menunggu}</Text>
              <Text style={styles.statLabel}>Menunggu</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.statNumber}>{diproses}</Text>
              <Text style={styles.statLabel}>Diproses</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#d1fae5' }]}>
              <Text style={styles.statNumber}>{selesai}</Text>
              <Text style={styles.statLabel}>Selesai</Text>
            </View>
          </View>

          {/* Menu */}
          <View style={styles.menuGrid}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setNama(currentUser?.name || '');
                setCurrentScreen('LaporanBaru');
              }}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#dbeafe' }]}>
                <Ionicons name="add-circle" size={32} color="#2563eb" />
              </View>
              <Text style={styles.menuTitle}>Laporan Baru</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => setCurrentScreen('DaftarLaporan')}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#d1fae5' }]}>
                <Ionicons name="list" size={32} color="#10b981" />
              </View>
              <Text style={styles.menuTitle}>Daftar Laporan</Text>
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => setCurrentScreen('KelolaLaporan')}
              >
                <View style={[styles.menuIcon, { backgroundColor: '#fef3c7' }]}>
                  <Ionicons name="settings" size={32} color="#f59e0b" />
                </View>
                <Text style={styles.menuTitle}>Kelola Laporan</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Recent Reports */}
          <View style={styles.recentContainer}>
            <Text style={styles.recentTitle}>📋 Laporan Terbaru</Text>
            {filteredData.slice(0, 3).map((item) => (
              <View key={item.id} style={styles.recentItem}>
                <View style={styles.recentHeader}>
                  <Text style={styles.recentName}>{item.nama}</Text>
                  <View style={[styles.recentStatus, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.recentStatusText}>{getStatusLabel(item.status)}</Text>
                  </View>
                </View>
                <Text style={styles.recentDesc} numberOfLines={2}>{item.deskripsi}</Text>
                <View style={styles.recentFooter}>
                  <Ionicons name="location-outline" size={12} color="#9ca3af" />
                  <Text style={styles.recentLocation}>{item.lokasi}</Text>
                  <Text style={styles.recentDate}>{item.tanggal}</Text>
                </View>
              </View>
            ))}
            {filteredData.length === 0 && (
              <View style={styles.emptyRecent}>
                <Text style={styles.emptyRecentText}>Belum ada laporan</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ============ HALAMAN LAPORAN BARU ============
  if (currentScreen === 'LaporanBaru') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2563eb" translucent={false} />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('Dashboard')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Laporan Baru</Text>
          <View style={{ width: 40 }} />
        </View>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Memproses...</Text>
          </View>
        )}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.label}>Nama Pelapor *</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama Anda"
              placeholderTextColor="#9ca3af"
              value={nama}
              onChangeText={setNama}
            />

            <Text style={styles.label}>Lokasi Masalah</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan lokasi kejadian"
              placeholderTextColor="#9ca3af"
              value={lokasi}
              onChangeText={setLokasi}
            />

            <Text style={styles.label}>Deskripsi Masalah *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Jelaskan masalah secara detail"
              placeholderTextColor="#9ca3af"
              value={deskripsi}
              onChangeText={setDeskripsi}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Bukti Foto</Text>
            
            <View style={styles.photoActionContainer}>
              <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.photoButtonText}>Ambil Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.photoButton, styles.galleryButton]} onPress={pickImage}>
                <Ionicons name="images" size={24} color="white" />
                <Text style={styles.photoButtonText}>Galeri</Text>
              </TouchableOpacity>
            </View>

            {image && (
              <View style={styles.imagePreviewContainer}>
                <TouchableOpacity onPress={viewImage} activeOpacity={0.9}>
                  <Image source={{ uri: image }} style={styles.previewImage} resizeMode="cover" />
                </TouchableOpacity>
                <View style={styles.imageActions}>
                  <TouchableOpacity style={styles.imageActionBtn} onPress={removeImage}>
                    <Ionicons name="trash" size={20} color="#ef4444" />
                    <Text style={[styles.imageActionText, { color: '#ef4444' }]}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitLaporan}>
              <Text style={styles.submitButtonText}>Kirim Laporan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Image Preview Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pratinjau Foto</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color="white" />
              </TouchableOpacity>
            </View>
            
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
            )}
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: '#ef4444' }]} onPress={removeImage}>
                <Ionicons name="trash" size={24} color="white" />
                <Text style={styles.modalActionText}>Hapus Foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // ============ HALAMAN DAFTAR LAPORAN ============
  if (currentScreen === 'DaftarLaporan') {
    const filteredData = getFilteredLaporan();

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2563eb" translucent={false} />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('Dashboard')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Daftar Laporan</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'semua' && styles.filterChipActive]}
              onPress={() => setFilterStatus('semua')}
            >
              <Text style={[styles.filterText, filterStatus === 'semua' && styles.filterTextActive]}>Semua</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'menunggu' && styles.filterChipActive]}
              onPress={() => setFilterStatus('menunggu')}
            >
              <Text style={[styles.filterText, filterStatus === 'menunggu' && styles.filterTextActive]}>Menunggu</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'diproses' && styles.filterChipActive]}
              onPress={() => setFilterStatus('diproses')}
            >
              <Text style={[styles.filterText, filterStatus === 'diproses' && styles.filterTextActive]}>Diproses</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'selesai' && styles.filterChipActive]}
              onPress={() => setFilterStatus('selesai')}
            >
              <Text style={[styles.filterText, filterStatus === 'selesai' && styles.filterTextActive]}>Selesai</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'ditolak' && styles.filterChipActive]}
              onPress={() => setFilterStatus('ditolak')}
            >
              <Text style={[styles.filterText, filterStatus === 'ditolak' && styles.filterTextActive]}>Ditolak</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.listHeader}>
                <Text style={styles.listName}>{item.nama}</Text>
                <View style={[styles.listStatus, { backgroundColor: getStatusColor(item.status) }]}>
                  <Ionicons name={getStatusIcon(item.status)} size={14} color="white" />
                  <Text style={styles.listStatusText}>{getStatusLabel(item.status)}</Text>
                </View>
              </View>
              <View style={styles.listLocation}>
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text style={styles.listLocationText}>{item.lokasi}</Text>
              </View>
              <Text style={styles.listDesc}>{item.deskripsi}</Text>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.listImage} resizeMode="cover" />
              )}
              <Text style={styles.listDate}>{item.tanggal}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={64} color="#d1d5db" />
              <Text style={styles.emptyText}>Tidak ada laporan</Text>
              <Text style={styles.emptySubText}>Buat laporan baru untuk memulai</Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }

  // ============ HALAMAN KELOLA LAPORAN (ADMIN ONLY) ============
  if (currentScreen === 'KelolaLaporan' && isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2563eb" translucent={false} />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('Dashboard')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kelola Laporan</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'semua' && styles.filterChipActive]}
              onPress={() => setFilterStatus('semua')}
            >
              <Text style={[styles.filterText, filterStatus === 'semua' && styles.filterTextActive]}>Semua</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'menunggu' && styles.filterChipActive]}
              onPress={() => setFilterStatus('menunggu')}
            >
              <Text style={[styles.filterText, filterStatus === 'menunggu' && styles.filterTextActive]}>Menunggu</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'diproses' && styles.filterChipActive]}
              onPress={() => setFilterStatus('diproses')}
            >
              <Text style={[styles.filterText, filterStatus === 'diproses' && styles.filterTextActive]}>Diproses</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'selesai' && styles.filterChipActive]}
              onPress={() => setFilterStatus('selesai')}
            >
              <Text style={[styles.filterText, filterStatus === 'selesai' && styles.filterTextActive]}>Selesai</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, filterStatus === 'ditolak' && styles.filterChipActive]}
              onPress={() => setFilterStatus('ditolak')}
            >
              <Text style={[styles.filterText, filterStatus === 'ditolak' && styles.filterTextActive]}>Ditolak</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
          data={getFilteredLaporan()}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.listHeader}>
                <Text style={styles.listName}>{item.nama}</Text>
                <View style={[styles.listStatus, { backgroundColor: getStatusColor(item.status) }]}>
                  <Ionicons name={getStatusIcon(item.status)} size={14} color="white" />
                  <Text style={styles.listStatusText}>{getStatusLabel(item.status)}</Text>
                </View>
              </View>
              <View style={styles.listLocation}>
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text style={styles.listLocationText}>{item.lokasi}</Text>
              </View>
              <Text style={styles.listDesc}>{item.deskripsi}</Text>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.listImage} resizeMode="cover" />
              )}
              <Text style={styles.listDate}>{item.tanggal}</Text>
              
              <View style={styles.adminActions}>
                {item.status === 'menunggu' && (
                  <TouchableOpacity 
                    style={[styles.adminAction, styles.actionProses]}
                    onPress={() => handleUpdateStatus(item.id, 'diproses')}
                  >
                    <Ionicons name="refresh" size={16} color="white" />
                    <Text style={styles.adminActionText}>Proses</Text>
                  </TouchableOpacity>
                )}
                {item.status !== 'selesai' && item.status !== 'ditolak' && (
                  <TouchableOpacity 
                    style={[styles.adminAction, styles.actionSelesai]}
                    onPress={() => handleUpdateStatus(item.id, 'selesai')}
                  >
                    <Ionicons name="checkmark" size={16} color="white" />
                    <Text style={styles.adminActionText}>Selesai</Text>
                  </TouchableOpacity>
                )}
                {item.status !== 'ditolak' && item.status !== 'selesai' && (
                  <TouchableOpacity 
                    style={[styles.adminAction, styles.actionTolak]}
                    onPress={() => handleUpdateStatus(item.id, 'ditolak')}
                  >
                    <Ionicons name="close" size={16} color="white" />
                    <Text style={styles.adminActionText}>Tolak</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.adminAction, styles.actionHapus]}
                  onPress={() => handleDeleteLaporan(item.id)}
                >
                  <Ionicons name="trash" size={16} color="white" />
                  <Text style={styles.adminActionText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={64} color="#d1d5db" />
              <Text style={styles.emptyText}>Tidak ada laporan</Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }

  return null;
}

// ============ STYLES ============
const styles = StyleSheet.create({
  // ===== LOGIN STYLES =====
  loginContainer: {
    flex: 1,
    backgroundColor: '#2563eb',
  },
  loginHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  loginLogoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#dbeafe',
    marginTop: 4,
  },
  loginCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingTop: 32,
  },
  loginCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  loginLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  loginInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    backgroundColor: '#f9fafb',
    marginBottom: 16,
  },
  loginInputIcon: {
    paddingLeft: 12,
  },
  loginInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: '#1f2937',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginDemo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },
  loginDemoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  loginDemoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 8,
  },
  loginDemoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 50,
  },
  loginDemoBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginDemoText: {
    fontSize: 12,
    color: '#4b5563',
    flex: 1,
  },
  loginDemoPass: {
    fontSize: 11,
    color: '#9ca3af',
  },

  // ===== MAIN STYLES =====
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerGreeting: {
    fontSize: 14,
    color: '#dbeafe',
  },
  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
  headerRole: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  headerRoleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  backButton: {
    padding: 8,
  },

  // ===== CONTENT =====
  content: {
    padding: 16,
  },

  // ===== STATS =====
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -16,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },

  // ===== MENU =====
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  menuItem: {
    alignItems: 'center',
    width: '30%',
  },
  menuIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 12,
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },

  // ===== RECENT =====
  recentContainer: {
    marginTop: 24,
    marginBottom: 30,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  recentItem: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  recentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  recentStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  recentDesc: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  recentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  recentLocation: {
    fontSize: 11,
    color: '#9ca3af',
    flex: 1,
  },
  recentDate: {
    fontSize: 11,
    color: '#9ca3af',
  },
  emptyRecent: {
    padding: 20,
    alignItems: 'center',
  },
  emptyRecentText: {
    color: '#9ca3af',
    fontSize: 14,
  },

  // ===== CARD & FORM =====
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f9fafb',
    color: '#1f2937',
  },
  textArea: {
    height: 100,
  },

  // ===== PHOTO =====
  photoActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginRight: 5,
  },
  galleryButton: {
    backgroundColor: '#10b981',
    marginRight: 0,
    marginLeft: 5,
  },
  photoButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  imagePreviewContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9fafb',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  imageActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  imageActionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },

  // ===== SUBMIT =====
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ===== LOADING =====
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },

  // ===== FILTER =====
  filterContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterTextActive: {
    color: 'white',
    fontWeight: '600',
  },

  // ===== LIST =====
  listContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  listStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listStatusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  listLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  listLocationText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 4,
  },
  listDesc: {
    fontSize: 14,
    color: '#374151',
    marginVertical: 4,
  },
  listImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  listDate: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 8,
  },

  // ===== ADMIN ACTIONS =====
  adminActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 6,
  },
  adminAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: '22%',
  },
  adminActionText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionProses: {
    backgroundColor: '#3b82f6',
  },
  actionSelesai: {
    backgroundColor: '#10b981',
  },
  actionTolak: {
    backgroundColor: '#ef4444',
  },
  actionHapus: {
    backgroundColor: '#6b7280',
  },

  // ===== EMPTY =====
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 13,
    color: '#d1d5db',
    marginTop: 4,
  },

  // ===== MODAL =====
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalImage: {
    flex: 1,
    width: '100%',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalActionText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});