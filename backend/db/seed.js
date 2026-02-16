/**
 * Database Seed Script - Clinical Template Edition
 * Run: npm run seed
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt to hash passwords
import { Clinic, User, AssessmentTemplate, SessionTemplate } from "./schema.js"; // <--- Added .js extension

// Update DB name to your new project (act_ptsd)
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/act_path_db";

  const OPTIONS_0_4 = [
    { label: "Not at all", value: 0 },
    { label: "A little bit", value: 1 },
    { label: "Moderately", value: 2 },
    { label: "Quite a bit", value: 3 },
    { label: "Extremely", value: 4 },
  ];
  
  const OPTIONS_1_5 = [
    { label: "Almost Never", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Half the Time", value: 3 },
    { label: "Most of Time", value: 4 },
    { label: "Almost Always", value: 5 },
  ];
  
  const OPTIONS_AAQ = [
    { label: "Never true", value: 1 },
    { label: "Very seldom true", value: 2 },
    { label: "Seldom true", value: 3 },
    { label: "Sometimes true", value: 4 },
    { label: "Frequently true", value: 5 },
    { label: "Almost always true", value: 6 },
    { label: "Always true", value: 7 },
  ];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to MongoDB at ${MONGO_URI} for clinical template seeding...`
    );

    // Clear existing data
    await Clinic.deleteMany({});
    await User.deleteMany({});
    await AssessmentTemplate.deleteMany({});
    await SessionTemplate.deleteMany({});

    console.log("Cleared old data.");

    // 0. Prepare a hashed password (so you can actually log in!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // 1. Seed Clinic
    const mainClinic = await Clinic.create({
      name: "Central Wellness Clinic",
      contactEmail: "admin@centralwellnesss.com",
      plan: "Professional",
      status: "Live",
    });

    const pdeqQuestions=[
      "I “blanked out” or “spaced out” or in some way felt that I was not part of what was going on.",
      "Things seemed to be happening in slow motion (very slowly).",
      "What was happening didn’t seem real, like I was in a dream or watching a movie.",
      "I felt like I was watching what was happening to me, like I was floating above the scene or watching it as an outsider (from the outside looking in).",
      "I felt separate or disconnected from my body or like my body was unusually large or small (not normal size—too large or too small).",
      "Things happened that I didn’t notice, even though I normally would have noticed them.",
      "I felt confused or couldn’t make sense of what was happening.",
      "There were moments when I wasn’t sure about where I was or what time it was.",
      "I felt like I was losing my mind or going crazy.",
      "I felt like I was having an out-of-body experience."
    ].map((text, i) => ({ id: `q${i + 1}`, text, type: "LIKERT", options: OPTIONS_1_5 }));

    await AssessmentTemplate.create({
      code: "PDEQ-V1",
      title: "Peritraumatic Dissociative Experiences Questionnaire (PDEQ)",
      description: "Assesses dissociative experiences during or immediately after trauma.",
      questions: pdeqQuestions,
    });

    const pcl5Questions = [
      "Repeated, disturbing, and unwanted memories of the stressful experience?",
      "Repeated, disturbing dreams of the stressful experience?",
      "Suddenly feeling or acting as if the stressful experience were actually happening again?",
      "Feeling very upset when something reminded you of the stressful experience?",
      "Having strong physical reactions when something reminded you of the stressful experience?",
      "Avoiding memories, thoughts, or feelings related to the stressful experience?",
      "Avoiding external reminders of the stressful experience?",
      "Trouble remembering important parts of the stressful experience?",
      "Having strong negative beliefs about yourself, other people, or the world?",
      "Blaming yourself or someone else for the stressful experience?",
      "Having strong negative feelings such as fear, horror, anger, guilt, or shame?",
      "Loss of interest in activities that you used to enjoy?",
      "Feeling distant or cut off from other people?",
      "Trouble experiencing positive feelings?",
      "Irritable behavior, angry outbursts, or acting aggressively?",
      "Taking too many risks or doing things that could cause you harm?",
      "Being “superalert” or watchful or on guard?",
      "Feeling jumpy or easily startled?",
      "Having difficulty concentrating?",
      "Trouble falling or staying asleep?",
    ].map((text, i) => {
      let cluster = "";
      if (i < 5) cluster = "B";
      else if (i < 7) cluster = "C";
      else if (i < 14) cluster = "D";
      else cluster = "E";
    
      return { 
        id: `q${i + 1}`, 
        text, 
        type: "LIKERT", 
        options: OPTIONS_0_4,
        cluster // <--- This was missing!
      };
    });

    // 2. Seed Assessment Templates
    const pcl5Template = await AssessmentTemplate.create({
      code: "PCL5-V1",
      title: "PTSD Checklist for DSM-5",
      description: "Standard clinical assessment for PTSD severity.",
      questions: pcl5Questions,
    });

    const dersQuestions = [
      "I pay attention to how I feel",
      "I have no idea how I am feeling",
      "I have difficulty making sense out of my feelings",
      "I care about what I am feeling",
      "I am confused about how I feel",
      "When I’m upset, I acknowledge my emotions",
      "When I’m upset, I become embarrassed for feeling that way",
      "When I’m upset, I have difficulty getting work done",
      "When I’m upset, I become out of control",
      "When I’m upset, I believe that I will end up feeling very depressed",
      "When I’m upset, I have difficulty focusing on other things",
      "When I’m upset, I feel guilty for feeling that way",
      "When I’m upset, I have difficulty concentrating",
      "When I’m upset, I have difficulty controlling my behaviors",
      "When I’m upset, I believe there is nothing I can do to make myself feel better",
      "When I’m upset, I become irritated with myself for feeling that way",
      "When I’m upset, I lose control over my behavior",
      "When I’m upset, it takes me a long time to feel better",
    ].map((text, i) => ({ id: `q${i + 1}`, text, type: "LIKERT", options: OPTIONS_1_5 }));

    const therapySessionTemplates = [
      {
        sessionNumber: 1,
        title: 'Creative Hopelessness',
        moduleKey: 'ch',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'intro', title: 'Welcome to ACT', type: 'INTRO' },
          { stepId: 'questions', title: 'Avoidance Questionnaire', type: 'QUESTIONNAIRE' },
          { stepId: 'grounding', title: 'Dropping the Anchor', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 2,
        title: 'Acceptance',
        moduleKey: 'acc',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'intro', title: 'Welcome Back', type: 'INTRO' },
          { stepId: 'practice-check', title: 'Reviewing Anchor Practice', type: 'QUESTIONNAIRE' },
          { stepId: 'inner-world', title: 'Inner World Exploration', type: 'EXERCISE' },
          { stepId: 'noticing-conversion', title: 'The Noticing Shift', type: 'EXERCISE' },
          { stepId: 'grounding', title: 'Leaves on a Stream', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 3,
        title: 'Defusion 1',
        moduleKey: 'def1',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'intro', title: 'Cognitive Defusion', type: 'INTRO' },
          { stepId: 'practice-check', title: 'Reviewing Acceptance', type: 'QUESTIONNAIRE' },
          { stepId: 'grounding', title: 'Watching the Sky', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 4,
        title: 'Defusion 2',
        moduleKey: 'def2',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'intro', title: 'Labeling the Story', type: 'INTRO' },
          { stepId: 'questions', title: 'Identifying Core Beliefs', type: 'QUESTIONNAIRE' },
          { stepId: 'grounding', title: 'Floating Clouds', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 5,
        title: 'Present Moment',
        moduleKey: 'pm',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'intro', title: 'The Here and Now', type: 'INTRO' },
          { stepId: 'inner-world', title: 'Body Scan', type: 'EXERCISE' },
          { stepId: 'grounding', title: 'Mindful Breathing', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 6,
        title: 'Values Clarification 1',
        moduleKey: 'val1',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'intro', title: 'The Values Compass', type: 'INTRO' },
          { stepId: 'questions', title: 'What Matters Most?', type: 'QUESTIONNAIRE' }
        ]
      },
      {
        sessionNumber: 7,
        title: 'Values Clarification 2',
        moduleKey: 'val2',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'questions', title: 'Committed Actions', type: 'QUESTIONNAIRE' }
        ]
      },
      {
        sessionNumber: 8,
        title: 'Exposure Through Values',
        moduleKey: 'exp',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'inner-world', title: 'Identifying Triggers', type: 'EXERCISE' },
          { stepId: 'grounding', title: 'The Willingness Breath', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 9,
        title: 'Trauma Narrative',
        moduleKey: 'trauma',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'inner-world', title: 'Coherent Growth', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 10,
        title: 'Grief & Forgiveness',
        moduleKey: 'grief',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'grounding', title: 'Self-Compassion Meditation', type: 'EXERCISE' }
        ]
      },
      {
        sessionNumber: 11,
        title: 'Moral Injury',
        moduleKey: 'moral',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'questions', title: 'Conflict Points', type: 'QUESTIONNAIRE' }
        ]
      },
      {
        sessionNumber: 12,
        title: 'Relapse Prevention',
        moduleKey: 'relapse',
        steps: [
          { stepId: 'mood', title: 'Mood Check-in', type: 'INTRO' },
          { stepId: 'questions', title: 'Survival Kit', type: 'QUESTIONNAIRE' }
        ]
      }
    ];

    await AssessmentTemplate.create({
      code: "DERS18-V1",
      title: "Emotion Regulation (DERS-18)",
      description: "Assessment of emotional awareness and regulation strategies.",
      questions: dersQuestions,
    });

    const aaqQuestions = [
      "My painful experiences and memories make it difficult for me to live a life that I would value.",
      "I’m afraid of my feelings.",
      "I worry about not being able to control my worries and feelings.",
      "My painful memories prevent me from having a fulfilling life.",
      "Emotions cause problems in my life.",
      "It seems like most people are handling their lives better than I am.",
      "Worries get in the way of my success.",
    ].map((text, i) => ({ id: `q${i + 1}`, text, type: "LIKERT", options: OPTIONS_AAQ }));

    await AssessmentTemplate.create({
      code: "AAQ-V1",
      title: "Psychological Inflexibility (AAQ-II)",
      description: "Measures experiential avoidance and psychological inflexibility.",
      questions: aaqQuestions,
    });

    await SessionTemplate.create(therapySessionTemplates);

    // 4. Seed Test Client with question-aware intake
    const testClient = {
      name: "Clinical Test Account",
      email: "test@actpath.com",
      password: hashedPassword, // <--- Added Hashed Password
      role: "CLIENT",
      clinicId: mainClinic._id,
      hasConsented: true,
      consentTimestamp: new Date(),
      currentSession: 2,

      intakeResponses: [
        {
          questionId: "age",
          questionText: "What is your current age?",
          value: 32,
        },
        {
          questionId: "trauma-near-death",
          questionText: "Have you had a near death experience?",
          value: true,
          label: "Yes",
        },
      ],

      assessmentHistory: [
        {
          templateId: pcl5Template._id,
          testType: "PCL5",
          totalScore: 42,
          items: [
            {
              questionId: "q1",
              questionText: "Repeated, disturbing, and unwanted memories...",
              value: 3,
              label: "Quite a bit",
            },
            {
              questionId: "q2",
              questionText: "Repeated, disturbing dreams...",
              value: 2,
              label: "Moderately",
            },
          ],
        },
      ],

      sessionHistory: [
        {
          sessionNumber: 1,
          sessionTitle: "Creative Hopelessness",
          status: "COMPLETED",
          totalDurationMinutes: 22,
          moodBefore: 3,
          moodAfter: 4,
          reflections: { coreCost: "Social Isolation" },
          stepProgress: [
            {
              stepId: "mood-in",
              status: "COMPLETED",
              startTime: new Date(Date.now() - 100000),
            },
          ],
        },
      ],

      currentClinicalSnapshot: {
        lastMood: 3,
        pcl5Total: 42,
        lastUpdate: new Date(),
      },
    };

    await User.create(testClient);

    // 5. Seed Staff
    await User.insertMany([
      {
        name: "Dr. Sarah Smith",
        email: "sarah@clinic.com",
        password: hashedPassword, // <--- Added Hashed Password
        role: "THERAPIST",
        clinicId: mainClinic._id,
        hasConsented: true,
      },
      {
        name: "System Admin",
        email: "super@actsaas.com",
        password: hashedPassword, // <--- Added Hashed Password
        role: "SUPER_ADMIN",
        hasConsented: true,
      },
    ]);

    console.log(
      "Database seeded with clinical templates and question-aware data!"
    );
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
