import mongoose from 'mongoose'

const mentorSchema = mongoose.Schema({
  newInfo: {},
  profileStatus: {
    type: String,
    enum: ['REJECTED', 'PENDING', 'ACCEPTED'],
    default: 'PENDING'
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MentorType',
    required: true
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const _MentorRequestProfile = new mongoose.model(
  'MentorRequestProfile',
  mentorSchema
)

export default _MentorRequestProfile