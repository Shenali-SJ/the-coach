import { cn } from '@/lib/utils'
import SupabaseStatus from '@/components/supabase-status'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to The Coach
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your personal coaching platform powered by Next.js and Supabase
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <div className="text-left space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium">Set up your environment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Copy <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">env.example</code> to <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">.env.local</code> and add your Supabase credentials
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium">Install dependencies</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Run <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">npm install</code> to install all required packages
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium">Start development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Run <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">npm run dev</code> to start the development server
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <SupabaseStatus />
        </div>
      </div>
    </div>
  )
} 