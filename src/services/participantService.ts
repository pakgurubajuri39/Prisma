import { 
  collection, doc, setDoc, getDoc, getDocs, updateDoc, 
  query, orderBy, limit 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { MBTIType } from '../types/psychometrics';

export interface ParticipantRecord {
  id: string;
  fullName: string;
  birthDate: string;
  phone: string;
  mbtiType: MBTIType;
  scores: {
    pctI: number;
    pctE: number;
    pctN: number;
    pctS: number;
    pctT: number;
    pctF: number;
    pctJ: number;
    pctP: number;
  };
  status: 'pending' | 'sent';
  createdAt: string;
  sentAt?: string;
}

const DEFAULT_ADMIN_PHONE = '6281234567890';

// Simpan data peserta dan hasil tes ke Firestore
export async function saveParticipantResult(data: {
  fullName: string;
  birthDate: string;
  phone: string;
  mbtiType: MBTIType;
  scores: any;
}): Promise<string> {
  const participantId = `part_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const docRef = doc(db, 'participants', participantId);
  const payload: ParticipantRecord = {
    id: participantId,
    fullName: data.fullName.trim(),
    birthDate: data.birthDate,
    phone: data.phone.trim(),
    mbtiType: data.mbtiType,
    scores: data.scores,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(docRef, payload);
    return participantId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `participants/${participantId}`);
    // Save to localStorage as defensive fallback if offline
    try {
      const localList = JSON.parse(localStorage.getItem('pakguru_participants') || '[]');
      localList.unshift(payload);
      localStorage.setItem('pakguru_participants', JSON.stringify(localList));
    } catch {
      // ignore
    }
    return participantId;
  }
}

// Ambil semua daftar peserta untuk Admin Panel
export async function getAllParticipants(): Promise<ParticipantRecord[]> {
  try {
    const q = query(collection(db, 'participants'));
    const snapshot = await getDocs(q);
    const list: ParticipantRecord[] = [];
    snapshot.forEach(docSnap => {
      const d = docSnap.data() as ParticipantRecord;
      list.push({ ...d, id: docSnap.id });
    });

    // Urutkan terbaru di atas
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'participants');
    // Fallback dari localStorage
    try {
      return JSON.parse(localStorage.getItem('pakguru_participants') || '[]');
    } catch {
      return [];
    }
  }
}

// Update status pengiriman laporan ke peserta
export async function updateParticipantStatus(id: string, status: 'pending' | 'sent'): Promise<void> {
  try {
    const docRef = doc(db, 'participants', id);
    await updateDoc(docRef, {
      status,
      sentAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `participants/${id}`);
    try {
      const localList: ParticipantRecord[] = JSON.parse(localStorage.getItem('pakguru_participants') || '[]');
      const updated = localList.map(p => p.id === id ? { ...p, status, sentAt: new Date().toISOString() } : p);
      localStorage.setItem('pakguru_participants', JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
}

// Ambil nomor WhatsApp Admin
export async function getAdminConfig(): Promise<{ adminPhone: string }> {
  try {
    const docRef = doc(db, 'settings', 'adminConfig');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as { adminPhone: string };
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'settings/adminConfig');
  }

  // Cek fallback localStorage
  const local = localStorage.getItem('pakguru_admin_phone');
  return { adminPhone: local || DEFAULT_ADMIN_PHONE };
}

// Simpan nomor WhatsApp Admin
export async function saveAdminConfig(adminPhone: string): Promise<void> {
  const cleanPhone = adminPhone.replace(/[^0-9]/g, '');
  try {
    const docRef = doc(db, 'settings', 'adminConfig');
    await setDoc(docRef, {
      adminPhone: cleanPhone,
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem('pakguru_admin_phone', cleanPhone);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/adminConfig');
    localStorage.setItem('pakguru_admin_phone', cleanPhone);
  }
}
