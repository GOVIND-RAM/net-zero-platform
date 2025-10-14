// Knowledge Base Service for Infaira Chatbot

import { KnowledgeBaseEntry } from '../types/chatbot.types';

export class KnowledgeBaseService {
  private kb: KnowledgeBaseEntry[];

  constructor() {
    this.kb = this.buildKnowledgeBase();
  }

  search(query: string): KnowledgeBaseEntry[] {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(' ').filter(w => w.length > 3);

    // Score each entry
    const scored = this.kb.map(entry => {
      let score = 0;

      // Exact matches in question
      if (entry.question.toLowerCase().includes(queryLower)) {
        score += 10;
      }

      // Keyword matches
      queryWords.forEach(word => {
        if (entry.keywords.some(kw => kw.includes(word))) {
          score += 5;
        }
        if (entry.question.toLowerCase().includes(word)) {
          score += 3;
        }
        if (entry.answer.toLowerCase().includes(word)) {
          score += 1;
        }
      });

      return { entry, score };
    });

    // Return top matches
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.entry);
  }

  getCategorySummary(category: string): string {
    const entries = this.kb.filter(e => e.category === category);
    return `I found ${entries.length} articles about ${category}. Here are some topics: ${entries.map(e => e.question).slice(0, 3).join(', ')}`;
  }

  getRelatedQuestions(questionId: string): KnowledgeBaseEntry[] {
    const entry = this.kb.find(e => e.question === questionId);
    if (!entry || !entry.relatedTopics) return [];

    return this.kb.filter(e =>
      entry.relatedTopics?.some(topic =>
        e.keywords.includes(topic) || e.category.toLowerCase().includes(topic)
      )
    );
  }

  private buildKnowledgeBase(): KnowledgeBaseEntry[] {
    return [
      // Getting Started
      {
        category: 'Getting Started',
        question: 'How do I create an account?',
        answer: 'Click "Get Started" or "Sign Up" on the homepage. You can register using your email or Google account. Fill in your name, email, organization (optional), and create a password. After verification, you can immediately start creating projects.',
        keywords: ['signup', 'register', 'account', 'create account', 'get started', 'new user'],
        relatedTopics: ['login', 'password', 'verification']
      },
      {
        category: 'Getting Started',
        question: 'How do I start a certification project?',
        answer: 'After logging in, select your certification type (Building, Portfolio, Business, etc.) from the dashboard. Click "Create new project" and fill out the registration form with project details including name, location, size, and owner information.',
        keywords: ['start project', 'new project', 'create project', 'begin certification', 'register project'],
        relatedTopics: ['certification types', 'project registration', 'questionnaire']
      },

      // Certification Process
      {
        category: 'Certification Process',
        question: 'What are the three phases of certification?',
        answer: 'Phase 1 - ASSESS: Calculate your Scope 1, 2, and 3 emissions and receive an assessment certificate. Phase 2 - PLAN: Develop a net zero transition plan with expert support and receive a plan certificate. Phase 3 - CERTIFY: Achieve net zero status and maintain it with annual documentation.',
        keywords: ['phases', 'process', 'steps', 'assess', 'plan', 'certify', 'certification process'],
        relatedTopics: ['timeline', 'emissions', 'documentation']
      },
      {
        category: 'Certification Process',
        question: 'How long does certification take?',
        answer: 'Timeline varies by project complexity: Assessment phase takes 2-4 weeks, Planning phase takes 4-8 weeks, and Final certification review takes 6-12 weeks after submission. Total process typically ranges from 3-6 months.',
        keywords: ['timeline', 'duration', 'how long', 'time frame', 'process time'],
        relatedTopics: ['phases', 'review', 'submission']
      },

      // Emissions
      {
        category: 'Emissions',
        question: 'What are Scope 1, 2, and 3 emissions?',
        answer: 'Scope 1: Direct emissions from owned sources like boilers, furnaces, and company vehicles. Scope 2: Indirect emissions from purchased energy like electricity, steam, heating, and cooling. Scope 3: All other indirect emissions in your value chain including supply chain, business travel, waste, and employee commuting.',
        keywords: ['scope 1', 'scope 2', 'scope 3', 'emissions', 'carbon', 'ghg', 'greenhouse gas'],
        relatedTopics: ['assessment', 'calculation', 'baseline']
      },

      // LEED Categories
      {
        category: 'LEED Credits',
        question: 'What are the LEED credit categories?',
        answer: 'There are 7 main categories totaling 100 points: Integrative Process (1 pt), Location & Transportation (16 pts), Water Efficiency (11 pts), Energy & Atmosphere (33 pts), Materials & Resources (13 pts), Indoor Environmental Quality (16 pts), and Innovation & Regional Priority (10 pts).',
        keywords: ['leed', 'categories', 'credits', 'points', 'scoring'],
        relatedTopics: ['certification levels', 'questionnaire', 'requirements']
      },
      {
        category: 'LEED Credits',
        question: 'How many points do I need for each certification level?',
        answer: 'Certified: 40-49 points, Silver: 50-59 points, Gold: 60-79 points, Platinum: 80+ points out of 100 total possible points.',
        keywords: ['points', 'levels', 'certified', 'silver', 'gold', 'platinum', 'score', 'rating'],
        relatedTopics: ['categories', 'credits', 'requirements']
      },

      // Location & Transportation
      {
        category: 'Location & Transportation',
        question: 'What counts as diverse uses?',
        answer: 'Diverse uses include: food retail, community services, civic/government uses, medical care, banks, gyms, laundries, pharmacies, restaurants, and places of worship. Each must be in a different category and within 400 meters walking distance.',
        keywords: ['diverse uses', 'location', 'transit', 'walkability', 'amenities'],
        relatedTopics: ['site selection', 'transit access', 'location credit']
      },
      {
        category: 'Location & Transportation',
        question: 'How do I measure transit distance?',
        answer: 'Measure walking distance (not straight line) from the main building entrance to the nearest transit stop. Use mapping tools like Google Maps with walking directions. Distance must be less than 400 meters for points.',
        keywords: ['transit', 'distance', 'measurement', 'transportation', 'bus', 'rail'],
        relatedTopics: ['transit access', 'location credit', 'walkability']
      },

      // Water Efficiency
      {
        category: 'Water Efficiency',
        question: 'What is a baseline for water reduction?',
        answer: 'Baseline is calculated using EPAct 1992 fixture performance requirements or local plumbing code, whichever is stricter. Your fixtures must perform better than this baseline to earn points. Use fixture flow rates and occupancy data to calculate.',
        keywords: ['water', 'baseline', 'reduction', 'fixtures', 'calculation'],
        relatedTopics: ['water efficiency', 'fixtures', 'flow rates']
      },
      {
        category: 'Water Efficiency',
        question: 'Do I need WaterSense fixtures?',
        answer: 'WaterSense fixtures help but aren\'t mandatory. You can achieve water reduction through any combination of efficient fixtures, flow restrictors, dual-flush systems, waterless urinals, and sensor-activated faucets. Calculate total reduction percentage.',
        keywords: ['watersense', 'fixtures', 'efficient', 'low flow', 'water saving'],
        relatedTopics: ['water efficiency', 'baseline', 'reduction']
      },

      // Energy & Atmosphere
      {
        category: 'Energy & Atmosphere',
        question: 'What is commissioning?',
        answer: 'Commissioning (Cx) is a quality assurance process where an independent authority verifies that building systems (HVAC, lighting, controls) are designed, installed, and operate as intended. It\'s required for LEED certification and improves energy performance.',
        keywords: ['commissioning', 'cx', 'cxa', 'verification', 'quality assurance'],
        relatedTopics: ['energy', 'systems', 'hvac', 'prerequisites']
      },
      {
        category: 'Energy & Atmosphere',
        question: 'How is energy improvement calculated?',
        answer: 'Energy improvement is measured as percentage cost savings compared to ASHRAE 90.1-2010 baseline. Requires energy modeling software like EnergyPlus, eQUEST, or IES-VE. Model both baseline and proposed design to calculate percentage improvement.',
        keywords: ['energy', 'modeling', 'calculation', 'ashrae', 'improvement', 'baseline'],
        relatedTopics: ['energy performance', 'simulation', 'commissioning']
      },

      // Materials & Resources
      {
        category: 'Materials & Resources',
        question: 'What is an EPD?',
        answer: 'Environmental Product Declaration - a standardized document that communicates transparent, verified environmental information about a product\'s life-cycle impacts. EPDs help earn Material Disclosure credits in LEED.',
        keywords: ['epd', 'environmental product declaration', 'materials', 'disclosure'],
        relatedTopics: ['materials', 'products', 'sourcing', 'documentation']
      },
      {
        category: 'Materials & Resources',
        question: 'How do I calculate waste diversion?',
        answer: 'Waste diversion = (weight of recycled/salvaged materials ÷ total waste generated) × 100%. Track all construction waste by type and weight. Get receipts from haulers showing materials recycled vs. landfilled. 50% diversion = 1 point, 75% = 2 points.',
        keywords: ['waste', 'diversion', 'recycling', 'construction waste', 'calculation'],
        relatedTopics: ['waste management', 'recycling', 'materials']
      },

      // Indoor Environmental Quality
      {
        category: 'Indoor Environmental Quality',
        question: 'What are low-emitting materials?',
        answer: 'Materials that have low VOC (Volatile Organic Compounds) emissions including paints, adhesives, sealants, flooring, and furniture. Look for products with VOC testing data, GreenGuard certification, or manufacturer declarations showing compliance with LEED limits.',
        keywords: ['voc', 'low-emitting', 'materials', 'indoor air quality', 'emissions'],
        relatedTopics: ['indoor air quality', 'materials', 'health']
      },

      // Technical Support
      {
        category: 'Technical Support',
        question: 'I can\'t upload documents',
        answer: 'Ensure files are in accepted formats: PDF, JPG, PNG, XLS, XLSX. Maximum file size is 25MB. Try compressing large files or uploading as ZIP. Check your internet connection. Clear browser cache if issues persist.',
        keywords: ['upload', 'documents', 'files', 'error', 'technical issue'],
        relatedTopics: ['documentation', 'submission', 'support']
      },
      {
        category: 'Technical Support',
        question: 'Form won\'t save my progress',
        answer: 'Check that all required fields (marked with *) are filled correctly. Ensure stable internet connection. Try using "Save as Draft" button. If problem persists, copy your data, refresh the page, and paste it back.',
        keywords: ['save', 'draft', 'form', 'error', 'not saving'],
        relatedTopics: ['questionnaire', 'registration', 'support']
      },

      // Pricing & Payment
      {
        category: 'Pricing',
        question: 'How much does certification cost?',
        answer: 'Certification fees vary by project type and size. Building certification typically starts at $2,500 for registration plus review fees based on square footage. Contact our team for a detailed quote specific to your project.',
        keywords: ['cost', 'price', 'fee', 'payment', 'pricing'],
        relatedTopics: ['registration', 'payment', 'project types']
      },

      // Documentation
      {
        category: 'Documentation',
        question: 'What documents do I need to provide?',
        answer: 'Required documents vary by credit but typically include: site plans, energy models, fixture schedules, commissioning reports, material specifications, EPDs/HPDs, waste tracking logs, and photos. Each questionnaire section lists specific requirements.',
        keywords: ['documents', 'documentation', 'requirements', 'upload', 'files'],
        relatedTopics: ['questionnaire', 'submission', 'review']
      },

      // Certification Types
      {
        category: 'Certification Types',
        question: 'What certification types are available?',
        answer: 'We offer 11 certification types: Building (individual buildings), Portfolio (multiple buildings), Business (enterprise-wide), Campus (educational/corporate), Community (residential), City (municipal-level), Home (individual residential), Product (carbon neutrality), Process (manufacturing), Fleet (vehicle emissions), and Supply Chain (end-to-end carbon).',
        keywords: ['types', 'certification types', 'building', 'portfolio', 'business', 'campus', 'community'],
        relatedTopics: ['getting started', 'project creation', 'requirements']
      }
    ];
  }
}

export const knowledgeBase = new KnowledgeBaseService();

