'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')

  useEffect(() => {
    async function checkConnection() {
      console.log('Checking Supabase connection...')
      
      // Add a timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.log('Connection timeout - setting to error')
        setStatus('error')
      }, 10000) // 10 second timeout
      
      try {
        const { data, error } = await supabase.from('_dummy_table_').select('*').limit(1)
        
        clearTimeout(timeoutId)
        console.log('Supabase response:', { data, error })
        
        if (error && (error.code === 'PGRST116' || error.code === '42P01')) {
          // These error codes mean the table doesn't exist, but the connection is working
          console.log('Connection successful - table does not exist (expected)')
          setStatus('connected')
        } else if (error) {
          console.log('Connection failed:', error)
          setStatus('error')
        } else {
          console.log('Connection successful - unexpected success')
          setStatus('connected')
        }
      } catch (error) {
        clearTimeout(timeoutId)
        console.log('Connection error:', error)
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