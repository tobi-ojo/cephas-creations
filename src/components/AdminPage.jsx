import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiTrash2, FiLock, FiLogOut, FiPlus, FiX } from 'react-icons/fi'
import { usePortfolioImages } from './Portfolio'

const ADMIN_PASSWORD = 'cephas2024' // owner can change this

export default function AdminPage({ onClose }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [images, setImages] = usePortfolioImages()
  const [adding, setAdding] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [urlError, setUrlError] = useState('')
  const fileRef = useRef(null)

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else { setPwError(true) }
  }

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id))
  }

  const addByUrl = () => {
    if (!newUrl.trim()) { setUrlError('Please enter an image URL'); return }
    if (!newLocation.trim()) { setUrlError('Please enter a location'); return }
    const newImg = { id: Date.now(), url: newUrl.trim(), location: newLocation.trim() }
    setImages([...images, newImg])
    setNewUrl('')
    setNewLocation('')
    setAdding(false)
    setUrlError('')
  }

  const addByFile = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const newImg = { id: Date.now() + Math.random(), url: ev.target.result, location: 'Abeokuta, Ogun State' }
        setImages(prev => [...prev, newImg])
      }
      reader.readAsDataURL(file)
    })
  }

  if (!authed) return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-dark-900/95 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-sm p-8 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-50 rounded-sm"><FiLock size={18} className="text-brand-600" /></div>
            <h2 className="font-serif text-xl font-bold text-dark-800">Admin Access</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
        </div>
        <p className="text-gray-500 text-sm mb-6">Enter the admin password to manage portfolio images.</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="Enter password" className="input-field mb-3" />
        {pwError && <p className="text-red-500 text-xs mb-3">Incorrect password. Try again.</p>}
        <button onClick={login} className="btn-gold w-full">Login</button>
      </motion.div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[999] bg-gray-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl font-bold text-dark-800">Portfolio Manager</h1>
            <p className="text-gray-500 text-sm mt-1">Add, remove, and manage your portfolio images</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">{images.length} images</span>
            <button onClick={onClose} className="flex items-center gap-2 text-gray-500 hover:text-dark-800 text-sm transition-colors">
              <FiLogOut size={16} /> Exit Admin
            </button>
          </div>
        </div>

        {/* Add buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-700 transition-colors">
            <FiUpload size={16} /> Upload from Computer
          </button>
          <button onClick={() => setAdding(!adding)}
            className="flex items-center gap-2 border border-brand-600 text-brand-600 px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-50 transition-colors">
            <FiPlus size={16} /> Add by Image URL
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={addByFile} />
        </div>

        {/* Add by URL panel */}
        <AnimatePresence>
          {adding && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
              <h3 className="font-medium text-dark-800 mb-4">Add Image by URL</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Image URL</label>
                  <input value={newUrl} onChange={e => setNewUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg" className="input-field" />
                </div>
                <div>
                  <label className="form-label">Location</label>
                  <input value={newLocation} onChange={e => setNewLocation(e.target.value)}
                    placeholder="e.g. Abeokuta, Ogun State" className="input-field" />
                </div>
              </div>
              {urlError && <p className="text-red-500 text-xs mb-3">{urlError}</p>}
              <div className="flex gap-3">
                <button onClick={addByUrl} className="btn-gold text-xs">Add Image</button>
                <button onClick={() => setAdding(false)} className="text-gray-500 text-sm hover:text-dark-800">Cancel</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="group relative bg-white border border-gray-200 rounded-sm overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={img.url} alt="Project" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-xs text-gray-600 truncate">📍 {img.location}</p>
                <button onClick={() => removeImage(img.id)}
                  className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors ml-2">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <FiUpload size={40} className="mx-auto mb-4 opacity-40" />
            <p className="text-sm">No images yet. Upload your first project photo.</p>
          </div>
        )}

        <p className="text-center text-gray-400 text-xs mt-8">
          Changes are saved automatically and appear live on the website portfolio section.
        </p>
      </div>
    </div>
  )
}
