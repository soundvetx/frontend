import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '@/pages/Login'
import { RegisterPage } from '@/pages/Register'
import { ProfilePage } from '@/pages/Profile'
import { ExamRequestPage } from '@/pages/ExamRequest'
import { UsersPage } from '@/pages/Users'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<ExamRequestPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </>
  );
}
