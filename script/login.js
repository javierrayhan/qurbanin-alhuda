// import { supabase } from '../config/supabaseClient.js'

// document.addEventListener('DOMContentLoaded', () => {
//   const loginBtn = document.getElementById('login-button')
//   loginBtn.addEventListener('click', handleLogin)
// })

// async function handleLogin() {
//   const username = document.getElementById('input-username').value.trim()
//   const pin = document.getElementById('input-pin').value.trim()
//   const status = document.getElementById('login-status')

//   if (!username || pin.length !== 4) {
//     status.textContent = 'Username dan PIN (4 digit) wajib diisi!'
//     status.style.color = 'red'
//     return
//   }

//   try {
//     const { data, error } = await supabase
//       .from('users_database')
//       .select('*')
//       .eq('username', username)
//       .eq('pin', pin)
//       .maybeSingle()

//     if (error || !data) {
//       console.warn('⚠️ Login gagal:', error)
//       status.textContent = 'Login gagal. Username atau PIN salah.'
//       status.style.color = 'red'
//     } else {
//       console.log('✅ Login berhasil:', data)
//       status.textContent = `Selamat datang, ${data.nama_lengkap || data.username}!`
//       status.style.color = 'green'
//     }

//   } catch (err) {
//     console.error('🔥 Error login:', err)
//     status.textContent = '💥 Error sistem. Coba lagi nanti.'
//     status.style.color = 'orange'
//   }
// }

import { supabase } from '../config/supabaseClient.js'

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-button')
  loginBtn.addEventListener('click', handleLogin)
})

async function handleLogin() {
  const username = document.getElementById('input-username').value.trim()
  const pin = document.getElementById('input-pin').value.trim()
  const status = document.getElementById('login-status')

  if (!username || pin.length !== 4) {
    status.textContent = 'Username dan PIN (4 digit) wajib diisi!'
    status.style.color = 'red'
    return
  }

  try {
    const { data, error } = await supabase
      .from('users_database')
      .select('*')
      .eq('username', username)
      .eq('pin', pin)
      .maybeSingle()

    if (error || !data) {
      console.warn('⚠️ Login gagal:', error)
      status.textContent = 'Login gagal. Username atau PIN salah.'
      status.style.color = 'red'
    } else {
      console.log('✅ Login berhasil:', data)
      status.textContent = `Selamat datang, ${data.nama_lengkap || data.username}!`
      status.style.color = 'green'

      // ✅ Simpan user ke localStorage
      localStorage.setItem('currentUser', JSON.stringify(data))

      // ✅ Arahkan ke halaman berikutnya
      window.location.href = '/dashboard.html'
    }

  } catch (err) {
    console.error('🔥 Error login:', err)
    status.textContent = '💥 Error sistem. Coba lagi nanti.'
    status.style.color = 'orange'
  }
}
