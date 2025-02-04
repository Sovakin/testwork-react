import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import SeminarCard from './components/SeminarCard'
import EditModal from './components/EditModal'
import Loader from './components/Loader'

const API_URL = 'http://localhost:3001/seminars'

const App = () => {
  const [seminars, setSeminars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(API_URL)
        setSeminars(data)
      } catch (err) {
        setError('Failed to load seminars')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this seminar?')) return
    try {
      await axios.delete(`${API_URL}/${id}`)
      setSeminars(seminars.filter(s => s.id !== id))
    } catch (err) {
      setError('Delete failed')
    }
  }

  const handleUpdate = async (updated) => {
    try {
      await axios.put(`${API_URL}/${updated.id}`, updated)
      setSeminars(seminars.map(s => s.id === updated.id ? updated : s))
      setSelected(null)
    } catch (err) {
      setError('Update failed')
    }
  }

  if (loading) return <Loader />

  return (
      <div className="min-h-screen">
        <header className="pt-16 pb-12 text-center">
          <h1 className="text-5xl font-semibold text-neutral-900 mb-2">
            Professional Seminars
          </h1>
          <p className="text-xl text-neutral-500">
            Elevate your expertise
          </p>
        </header>

        <main className="max-w-7xl mx-auto px-4 pb-20">
          {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 text-center">
                {error}
              </div>
          )}

          <AnimatePresence>
            <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
              {seminars.map(seminar => (
                  <SeminarCard
                      key={seminar.id}
                      seminar={seminar}
                      onDelete={handleDelete}
                      onEdit={setSelected}
                  />
              ))}
            </motion.div>
          </AnimatePresence>

          {selected && (
              <EditModal
                  seminar={selected}
                  onClose={() => setSelected(null)}
                  onSave={handleUpdate}
              />
          )}
        </main>
      </div>
  )
}

export default App