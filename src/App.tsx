import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataUsers from "./pages/DataUsers";
import DataSiswa from "./pages/DataSiswa";
import DataGuru from "./pages/DataGuru";
import DataKelas from "./pages/DataKelas";
import DataMapel from "./pages/DataMapel";
import AbsensiSiswa from "./pages/AbsensiSiswa";
import AbsensiGuru from "./pages/AbsensiGuru";
import JurnalGuru from "./pages/JurnalGuru";
import NilaiSiswa from "./pages/NilaiSiswa";
import Laporan from "./pages/Laporan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<DataUsers />} />
            <Route path="/siswa" element={<DataSiswa />} />
            <Route path="/guru" element={<DataGuru />} />
            <Route path="/kelas" element={<DataKelas />} />
            <Route path="/mapel" element={<DataMapel />} />
            <Route path="/absensi-siswa" element={<AbsensiSiswa />} />
            <Route path="/absensi-guru" element={<AbsensiGuru />} />
            <Route path="/jurnal-guru" element={<JurnalGuru />} />
            <Route path="/nilai-siswa" element={<NilaiSiswa />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
