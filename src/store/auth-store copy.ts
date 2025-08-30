// store/auth-store.ts
import { create } from 'zustand'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),

  signOut: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null, session: null, isLoading: false })
  },
}))

// Initialize auth state automatically
const initializeAuth = async () => {
  const supabase = createClient()
  const { setUser, setSession, setLoading } = useAuthStore.getState()
  
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const { data: { user } } = await supabase.auth.getUser()
    
    setSession(session)
    setUser(user)
    setLoading(false)
  } catch (error) {
    console.error('Auth initialization error:', error)
    setUser(null)
    setSession(null)
    setLoading(false)
  }
}

// Set up auth state change listener
const supabase = createClient()
supabase.auth.onAuthStateChange((event, session) => {
  const { setUser, setSession } = useAuthStore.getState()
  
  if (event === 'SIGNED_OUT') {
    setUser(null)
    setSession(null)
  } else if (session) {
    setSession(session)
    setUser(session.user)
  }
})

// Initialize auth on store creation
initializeAuth()