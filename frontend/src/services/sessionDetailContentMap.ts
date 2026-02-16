/**
 * Session Detail Content Mapper
 * Stores descriptions, objectives, and grounding exercise info for the detail view
 */

export interface SessionDetailContent {
    description: string;
    objective: string;
    groundingExercise: string;
  }
  
  export const sessionDetailContent: Record<number, SessionDetailContent> = {
    1: {
      description: 'Examining the agenda of control and opening up to a new way of relating to pain. In this session, we explore the concept of "creative hopelessness"—the realization that trying to control or eliminate painful thoughts and feelings often makes them worse. This isn\'t about giving up hope, but about opening to a different kind of hope: the hope that comes from choosing a different path.',
      objective: 'Identify the "workability" of current coping strategies. Recognize patterns of experiential avoidance and begin to see alternative ways of responding to psychological pain.',
      groundingExercise: 'Dropping the Anchor - A grounding meditation to connect with the present moment through body awareness and the five senses.'
    },
  
    2: {
      description: 'Learning to drop the struggle with difficult emotions and sensations. Acceptance doesn\'t mean liking or wanting difficult experiences—it means making space for them without fighting. We practice noticing internal experiences (thoughts, feelings, sensations) with a quality of openness rather than resistance.',
      objective: 'Practice the "Making Room" exercise. Learn to observe difficult internal experiences without getting hooked by them or trying to push them away.',
      groundingExercise: 'Leaves on a Stream - Observing thoughts without getting hooked. Watch thoughts float by like leaves on a gentle stream, practicing detachment and acceptance.'
    },
  
    3: {
      description: 'Starting to see thoughts as just thoughts, rather than objective truths. Cognitive defusion helps us step back from our thinking and see thoughts as mental events—just words and images—rather than facts. This creates psychological distance and reduces their power over us.',
      objective: 'Learn basic cognitive defusion techniques. Practice the "Thanks Mind" and "Singing the Thought" exercises to create distance from automatic thinking.',
      groundingExercise: 'Watching the Sky - Thoughts as clouds passing through awareness. Visualize yourself as the vast, unchanging sky while thoughts drift like clouds.'
    },
  
    4: {
      description: 'Advanced defusion for deeply held beliefs and intrusive PTSD memories. Some thoughts are particularly sticky—core beliefs about ourselves, the world, or others. This session focuses on defusing from these deeply rooted narratives and seeing them as stories the mind tells, not absolute truths.',
      objective: 'Apply the "Labeling the Story" technique to specific triggers. Identify your mind\'s favorite stories (e.g., "the I\'m not enough story," "the danger is everywhere story") and practice naming them.',
      groundingExercise: 'Floating Clouds - Labeling stories to create distance. Practice softly naming thought patterns as they arise, watching them shift and change.'
    },
  
    5: {
      description: 'Grounding yourself in the here and now through mindfulness. The present moment is the only place we can actually live, yet we spend so much time lost in past regrets or future worries. This session cultivates present-moment awareness as a refuge and anchor.',
      objective: 'Complete a focused grounding and awareness scan. Practice bringing full attention to immediate sensory experience, noticing the richness of the present.',
      groundingExercise: 'Mindful Breathing - Anchoring in the breath. Use the breath as a touchstone for returning to the present moment, again and again.'
    },
  
    6: {
      description: 'Exploring what truly matters in different domains of your life. Values are chosen directions, not destinations. They\'re about how we want to show up in the world, what we want to stand for. This session helps clarify your personal values across life domains.',
      objective: 'Complete the initial Values Compass assessment. Identify core values in relationships, work, health, personal growth, and other domains that matter to you.',
      groundingExercise: 'Values Compass - Connecting with what truly matters. A guided reflection to help you tune into your deepest values and what makes life meaningful.'
    },
  
    7: {
      description: 'Refining your life direction and identifying specific value-led goals. Once we know our values, we can translate them into committed actions—small, concrete steps we can take today and this week that move us in valued directions.',
      objective: 'Draft 3 committed actions aligned with core values. Turn abstract values into specific, doable behaviors you can practice.',
      groundingExercise: 'Committed Actions - Planning value-driven steps. Visualize yourself taking action on what matters, noticing obstacles and choosing willingness anyway.'
    },
  
    8: {
      description: 'Moving toward difficult situations while staying connected to your values. Exposure isn\'t about forcing yourself to suffer—it\'s about choosing to experience discomfort in service of what matters. This session creates a hierarchy of valued actions that may evoke anxiety or other difficult emotions.',
      objective: 'Create a value-based exposure hierarchy. Identify avoided situations and rank them, planning to approach them gradually while staying connected to your values.',
      groundingExercise: 'The Willingness Breath - Opening to discomfort. Practice breathing into difficult sensations, creating space for them, and choosing willingness over struggle.'
    },
  
    9: {
      description: 'Integrating the past into a coherent story of growth and resilience. Trauma can fragment our sense of self and story. This session helps you begin to weave traumatic experiences into a larger narrative that includes not just pain, but also your strength, values, and growth.',
      objective: 'Begin processing traumatic memories with a values-lens. Tell your story at your own pace, noticing how you\'ve survived and what you\'ve learned.',
      groundingExercise: 'Trauma Narrative - Processing memories with compassion. A gentle, paced approach to facing difficult memories while staying grounded in safety and self-compassion.'
    },
  
    10: {
      description: 'Processing loss and practicing compassion for yourself and others. Trauma often involves loss—loss of safety, innocence, trust, relationships, or the life we thought we\'d have. Grief work allows us to honor these losses. Forgiveness (of self or others) isn\'t required, but is offered as a possibility.',
      objective: 'Practice self-compassion and forgiveness meditations. Explore what it might mean to hold your pain with tenderness rather than judgment.',
      groundingExercise: 'Self-Compassion Meditation - Offering kindness to yourself. Place your hand on your heart and offer yourself the same warmth you\'d give a dear friend.'
    },
  
    11: {
      description: 'Addressing wounds to the soul and navigating complex feelings of guilt. Moral injury occurs when our actions, or actions we witnessed, violate our deeply held moral or ethical beliefs. This creates a profound sense of guilt, shame, or betrayal of self. This session explores these wounds with compassion.',
      objective: 'Identify moral conflict points and apply ACT flexibility. Recognize where your values were violated (by self or others) and explore paths toward self-forgiveness and moral repair.',
      groundingExercise: 'Moral Injury Processing - Addressing wounds to the soul. A compassionate exploration of actions that violated your values, with space for guilt, accountability, and self-forgiveness.'
    },
  
    12: {
      description: 'Building a sustainable plan for long-term psychological flexibility. This final session consolidates everything you\'ve learned and creates a personalized toolkit for maintaining flexibility when life gets hard again. Because it will—and you\'ll be ready.',
      objective: 'Create a "Flexibility Survival Kit" for future stressors. Identify your warning signs, most helpful practices, support people, and commitments to yourself.',
      groundingExercise: 'Flexibility Survival Kit - Building your long-term plan. Reflect on your journey, celebrate your growth, and prepare for the challenges and opportunities ahead.'
    }
  };
  
  /**
   * Helper function to get detail content for a session
   * Returns default content if session not found
   */
  export function getSessionDetailContent(sessionNumber: number): SessionDetailContent {
    return sessionDetailContent[sessionNumber] || {
      description: 'This ACT therapy session focuses on building psychological flexibility and values-based living.',
      objective: 'Complete the session exercises with openness and curiosity.',
      groundingExercise: 'Mindfulness practice for this session.'
    };
  }
  
  /**
   * Short descriptions for use in cards or lists
   */
  export const sessionShortDescriptions: Record<number, string> = {
    1: 'Realizing the cost of control',
    2: 'Making space for pain',
    3: 'Seeing thoughts as thoughts',
    4: 'Unhooking from stories',
    5: 'Being present here and now',
    6: 'Finding your compass',
    7: 'Taking value-based action',
    8: 'Moving toward what matters',
    9: 'Weaving your story',
    10: 'Holding pain with kindness',
    11: 'Healing moral wounds',
    12: 'Your path forward'
  };
  
  /**
   * Get short description for a session
   */
  export function getSessionShortDescription(sessionNumber: number): string {
    return sessionShortDescriptions[sessionNumber] || 'ACT therapy session';
  }