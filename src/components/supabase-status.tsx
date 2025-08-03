'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')

  useEffect(() => {
    async function checkConnection() {
      // Check if environment variables are set
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setStatus('error')
        return
      }

      try {
        const { data, error } = await supabase.from('_dummy_table_').select('*').limit(1)
        
        if (error && error.code === 'PGRST116') {
          // This error means the table doesn't exist, but the connection is working
          setStatus('connected')
        } else if (error) {
          setStatus('error')
        } else {
          setStatus('connected')
        }
      } catch (error) {
        setStatus('error')
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Supabase Connection Status</h3>
      <div className="flex items-center space-x-2">
        <div 
          className={`w-3 h-3 rounded-full ${
            status === 'loading' ? 'bg-yellow-500' :
            status === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="text-sm">
          {status === 'loading' && 'Checking connection...'}
          {status === 'connected' && 'Connected to Supabase'}
          {status === 'error' && 'Connection failed - check your environment variables'}
        </span>
      </div>
      {status === 'error' && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          Make sure you have set up your .env.local file with the correct Supabase credentials.
        </p>
      )}
    </div>
  )
} 