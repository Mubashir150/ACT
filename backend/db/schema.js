import mongoose, { Schema, Document } from 'mongoose';

/**
 * ==========================================
 * 1. REUSABLE SUB-SCHEMAS (Do not export models for these)
 * ==========================================
 */

// Atomic response for any question
const QuestionResponseSchema = new Schema({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  label: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// Granular step-level logging
const SessionStepProgressSchema = new Schema({
  stepId: { type: String, required: true },
  stepTitle: { type: String },
  status: { type: String, enum: ['VIEWED', 'STARTED', 'COMPLETED'], default: 'VIEWED' },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  inputs: [QuestionResponseSchema]
});

// Psychometric Test History
const PsychometricTestSchema = new Schema({
  templateId: { type: Schema.Types.ObjectId, ref: 'AssessmentTemplate' },
  testType: { type: String, required: true },
  items: [QuestionResponseSchema],
  totalScore: { type: Number },
  interpretation: { type: String },
  completedAt: { type: Date, default: Date.now }
});

// Session Results
const SessionResultSchema = new Schema({
  sessionNumber: { type: Number, required: true },
  sessionTitle: { type: String },
  status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'PAUSED', 'ABANDONED'], default: 'IN_PROGRESS' },
  timestamp: { type: Date, default: Date.now },
  totalDurationMinutes: { type: Number, default: 0 },
  interruptionCount: { type: Number, default: 0 },
  moodBefore: { type: Number },
  moodAfter: { type: Number },
  reflections: { type: Schema.Types.Mixed, default: {} },
  stepProgress: [SessionStepProgressSchema],
  metadata: {
    device: String,
    browser: String,
    version: String
  }
});

// Clinical Notes
const ClinicalNoteSchema = new Schema({
  therapistId: { type: Schema.Types.ObjectId, ref: 'User' },
  sessionNumber: { type: Number },
  noteText: { type: String, required: true },
  isPrivate: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

/**
 * ==========================================
 * 2. INDEPENDENT MODEL SCHEMAS
 * ==========================================
 */

// --- CLINIC SCHEMA ---
const ClinicSchema = new Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  plan: { type: String, enum: ['Basic', 'Professional', 'Enterprise'], default: 'Basic' },
  status: { type: String, enum: ['Live', 'Setup', 'Review'], default: 'Setup' },
}, { timestamps: true });

// --- ASSESSMENT TEMPLATE SCHEMA ---
const AssessmentTemplateSchema = new Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  version: { type: String, default: '1.0' },
  questions: [{
    id: String,
    text: String,
    type: { type: String, enum: ['LIKERT', 'TEXT', 'MULTIPLE_CHOICE', 'BOOLEAN'] },
    options: [{ label: String, value: Schema.Types.Mixed }]
  }],
  active: { type: Boolean, default: true }
}, { timestamps: true });

// --- SESSION TEMPLATE SCHEMA ---
const SessionTemplateSchema = new Schema({
  sessionNumber: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  moduleKey: { type: String, required: true },
  steps: [{
    stepId: String,
    title: String,
    type: { type: String, enum: ['INTRO', 'EXERCISE', 'QUESTIONNAIRE', 'OUTRO'] }
  }]
}, { timestamps: true });

// --- USER SCHEMA (Main) ---
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Auth
  
  role: { 
    type: String, 
    enum: ['CLIENT', 'THERAPIST', 'ADMIN', 'SUPER_ADMIN'], 
    default: 'CLIENT' 
  },
  
  //clinicId: { type: Schema.Types.ObjectId, ref: 'Clinic',default:null },
  clinicId: { type: String,default:null },
  mfaCode: { type: String },
  phoneNumber: { type: String },
  profileImage: { type: String }, 
  hasConsented: { type: Boolean, default: false },
  consentTimestamp: { type: Date },
  
  // Client Clinical Progress
  currentSession: { type: Number, default: 1 },
  assignedTherapistId: { type: Schema.Types.ObjectId, ref: 'User' },
  
  // Data Arrays
  intakeResponses: [QuestionResponseSchema],
  sessionData: [QuestionResponseSchema],
  sessionHistory: [SessionResultSchema],
  assessmentHistory: [PsychometricTestSchema],
  clinicalNotes: [ClinicalNoteSchema],
  
  intakeSnapshot: {
    age: Number,
    gender: String,
    medicalHistory: String,
    updatedAt: Date
  },

  currentClinicalSnapshot: {
    lastMood: Number,
    pcl5Total: Number,
    dersTotal: Number,
    aaqTotal: Number,
    lastUpdate: Date
  }
}, { timestamps: true });

// Indices for performance

UserSchema.index({ clinicId: 1, role: 1 });

/**
 * ==========================================
 * 3. CREATE MODELS & EXPORT
 * ==========================================
 */

export const User = mongoose.model('User', UserSchema);
export const Clinic = mongoose.model('Clinic', ClinicSchema);
export const AssessmentTemplate = mongoose.model('AssessmentTemplate', AssessmentTemplateSchema);
export const SessionTemplate = mongoose.model('SessionTemplate', SessionTemplateSchema);