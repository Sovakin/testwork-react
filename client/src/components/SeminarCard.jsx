import { motion } from 'framer-motion'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

const SeminarCard = ({ seminar, onDelete, onEdit }) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="apple-card h-full"
    >
        <div className="relative h-52">
            <img
                src={seminar.photo}
                alt={seminar.title}
                className="w-full h-full object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
        </div>

        <div className="p-5">
            <h3 className="text-xl font-semibold text-neutral-900 truncate mb-2">
                {seminar.title}
            </h3>
            <p className="text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                {seminar.description}
            </p>

            <div className="flex items-center justify-between text-sm text-neutral-500">
                <span>{seminar.date}</span>
                <span>{seminar.time}</span>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
                <button
                    onClick={() => onEdit(seminar)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <FiEdit className="w-5 h-5 text-neutral-600" />
                </button>
                <button
                    onClick={() => onDelete(seminar.id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                    <FiTrash2 className="w-5 h-5 text-red-500" />
                </button>
            </div>
        </div>
    </motion.div>
)

export default SeminarCard