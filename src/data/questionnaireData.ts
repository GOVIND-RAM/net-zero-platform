import { QuestionnaireCategory } from '../types';

export const questionnaireData: QuestionnaireCategory[] = [
  {
    id: 'integrative-process',
    title: 'Integrative Process',
    description: 'Design and development process that includes early analysis of interconnections among building systems',
    kpis: [
      {
        id: 'integrative-process-credit',
        title: 'Integrative Process Credit',
        description: 'Achieve integrative process through early analysis and planning',
        maxPoints: 1,
        questions: [
          {
            id: 'integrative-team-formation',
            label: 'When was the integrative team first assembled?',
            type: 'dropdown',
            options: [
              'Before project initiation',
              'During pre-design phase',
              'During design phase',
              'During construction phase',
              'Not yet assembled'
            ],
            required: true,
            description: 'Select when the multidisciplinary team was first brought together'
          },
          {
            id: 'energy-modeling-approach',
            label: 'What energy modeling approach is being used?',
            type: 'dropdown',
            options: [
              'Whole building energy simulation',
              'Simplified energy analysis',
              'Energy modeling not applicable',
              'Planning to implement energy modeling'
            ],
            required: true
          },
          {
            id: 'water-systems-integration',
            label: 'Are water systems integrated with energy systems analysis?',
            type: 'yes-no',
            required: true,
            description: 'Integration includes water heating, pumping, and treatment systems'
          }
        ],
        uploads: [
          {
            id: 'integrative-process-documentation',
            label: 'Integrative Process Documentation',
            description: 'Documentation showing early team assembly and analysis process',
            fileTypes: ['pdf', 'doc', 'docx'],
            maxSize: 10
          },
          {
            id: 'energy-water-integration-analysis',
            label: 'Energy-Water Integration Analysis',
            description: 'Analysis showing interconnection between energy and water systems',
            fileTypes: ['pdf', 'xlsx', 'docx'],
            maxSize: 15
          }
        ]
      }
    ]
  },
  {
    id: 'location-transportation',
    title: 'Location and Transportation',
    description: 'Sustainable site selection and transportation access',
    kpis: [
      {
        id: 'surrounding-density-diverse-uses',
        title: 'Surrounding Density & Diverse Uses',
        description: 'Encourage development in areas with existing infrastructure and diverse uses',
        maxPoints: 5,
        questions: [
          {
            id: 'development-density',
            label: 'What is the development density (FAR)?',
            type: 'dropdown',
            options: [
              'Greater than 1.5 FAR',
              'Between 1.0 and 1.5 FAR',
              'Between 0.5 and 1.0 FAR',
              'Less than 0.5 FAR',
              'Rural development (< 0.25 FAR)'
            ],
            required: true
          },
          {
            id: 'diverse-uses-within-quarter-mile',
            label: 'How many diverse uses are within 1/4 mile?',
            type: 'multiselect',
            options: [
              'Residential',
              'Office/Commercial',
              'Retail/Services',
              'Entertainment/Recreation',
              'Educational',
              'Healthcare',
              'Government/Civic',
              'None within 1/4 mile'
            ],
            required: true
          },
          {
            id: 'walkable-streets',
            label: 'Are there walkable streets with pedestrian amenities?',
            type: 'yes-no',
            required: true,
            description: 'Includes sidewalks, crosswalks, and pedestrian-scale lighting'
          }
        ],
        uploads: [
          {
            id: 'site-analysis-map',
            label: 'Site Analysis Map',
            description: 'Map showing surrounding density and land uses',
            fileTypes: ['pdf', 'jpg', 'png', 'dwg'],
            maxSize: 20
          },
          {
            id: 'density-calculations',
            label: 'Density Calculations',
            description: 'Floor area ratio and density calculations',
            fileTypes: ['pdf', 'xlsx', 'docx'],
            maxSize: 5
          }
        ]
      },
      {
        id: 'access-quality-transit',
        title: 'Access to Quality Transit',
        description: 'Provide access to frequent, convenient, and safe transit service',
        maxPoints: 5,
        questions: [
          {
            id: 'transit-stop-distance',
            label: 'Distance to nearest transit stop',
            type: 'dropdown',
            options: [
              'Within 1/4 mile of high-frequency transit',
              'Within 1/4 mile of regular transit',
              'Within 1/2 mile of high-frequency transit',
              'Within 1/2 mile of regular transit',
              'No transit within 1/2 mile'
            ],
            required: true
          },
          {
            id: 'transit-frequency',
            label: 'Transit frequency during peak hours',
            type: 'dropdown',
            options: [
              'Every 10 minutes or less',
              'Every 15 minutes or less',
              'Every 30 minutes or less',
              'Every hour or less',
              'Less than hourly'
            ],
            required: true
          },
          {
            id: 'transit-amenities',
            label: 'What transit amenities are available?',
            type: 'multiselect',
            options: [
              'Shelter from weather',
              'Seating',
              'Real-time arrival information',
              'Bicycle parking',
              'Lighting',
              'None of the above'
            ],
            required: false
          }
        ],
        uploads: [
          {
            id: 'transit-analysis',
            label: 'Transit Access Analysis',
            description: 'Analysis of transit access and frequency',
            fileTypes: ['pdf', 'docx'],
            maxSize: 10
          },
          {
            id: 'transit-schedule-documentation',
            label: 'Transit Schedule Documentation',
            description: 'Current transit schedules and frequency data',
            fileTypes: ['pdf', 'xlsx'],
            maxSize: 5
          }
        ]
      },
      {
        id: 'bicycle-facilities',
        title: 'Bicycle Facilities',
        description: 'Provide bicycle storage and changing facilities',
        maxPoints: 1,
        questions: [
          {
            id: 'bicycle-storage-type',
            label: 'What type of bicycle storage is provided?',
            type: 'dropdown',
            options: [
              'Secure indoor storage',
              'Covered outdoor storage',
              'Uncovered outdoor storage',
              'No bicycle storage provided'
            ],
            required: true
          },
          {
            id: 'bicycle-capacity',
            label: 'How many bicycle parking spaces are provided?',
            type: 'dropdown',
            options: [
              '5% of building occupants',
              '10% of building occupants',
              '15% of building occupants',
              '20% or more of building occupants',
              'Less than 5% of building occupants'
            ],
            required: true
          },
          {
            id: 'shower-facilities',
            label: 'Are shower and changing facilities provided?',
            type: 'yes-no',
            required: true,
            description: 'Required for buildings with 100+ occupants'
          }
        ],
        uploads: [
          {
            id: 'bicycle-facility-plan',
            label: 'Bicycle Facility Plan',
            description: 'Plan showing bicycle storage and changing facilities',
            fileTypes: ['pdf', 'dwg', 'jpg', 'png'],
            maxSize: 15
          }
        ]
      }
    ]
  },
  {
    id: 'water-efficiency',
    title: 'Water Efficiency',
    description: 'Reduce water consumption and improve water quality',
    kpis: [
      {
        id: 'outdoor-water-use-reduction',
        title: 'Outdoor Water Use Reduction',
        description: 'Reduce outdoor water consumption through efficient landscaping and irrigation',
        maxPoints: 2,
        questions: [
          {
            id: 'landscaping-type',
            label: 'What type of landscaping is used?',
            type: 'dropdown',
            options: [
              'Native/adapted plants only',
              'Mixed native and non-native plants',
              'Non-native plants with efficient irrigation',
              'Traditional landscaping',
              'No landscaping'
            ],
            required: true
          },
          {
            id: 'irrigation-system-type',
            label: 'What type of irrigation system is used?',
            type: 'dropdown',
            options: [
              'No irrigation system',
              'Drip irrigation',
              'High-efficiency sprinklers',
              'Smart irrigation controller',
              'Traditional sprinkler system'
            ],
            required: true
          },
          {
            id: 'water-use-reduction-percentage',
            label: 'What is the outdoor water use reduction percentage?',
            type: 'dropdown',
            options: [
              '50% or more reduction',
              '30-49% reduction',
              '10-29% reduction',
              'Less than 10% reduction',
              'No reduction'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'landscape-design-plan',
            label: 'Landscape Design Plan',
            description: 'Plan showing plant selection and irrigation system',
            fileTypes: ['pdf', 'dwg', 'jpg', 'png'],
            maxSize: 20
          },
          {
            id: 'water-use-calculations',
            label: 'Water Use Calculations',
            description: 'Calculations showing baseline and proposed water use',
            fileTypes: ['pdf', 'xlsx'],
            maxSize: 10
          }
        ]
      },
      {
        id: 'indoor-water-use-reduction',
        title: 'Indoor Water Use Reduction',
        description: 'Reduce indoor water consumption through efficient fixtures and fittings',
        maxPoints: 6,
        questions: [
          {
            id: 'fixture-efficiency-level',
            label: 'What efficiency level are the fixtures?',
            type: 'dropdown',
            options: [
              'WaterSense labeled fixtures',
              '20% more efficient than baseline',
              '30% more efficient than baseline',
              '40% more efficient than baseline',
              '50% or more efficient than baseline'
            ],
            required: true
          },
          {
            id: 'fixture-types-included',
            label: 'Which fixture types are included in efficiency measures?',
            type: 'multiselect',
            options: [
              'Toilets',
              'Urinals',
              'Lavatory faucets',
              'Showerheads',
              'Kitchen faucets',
              'Pre-rinse spray valves',
              'All applicable fixtures'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'fixture-specifications',
            label: 'Fixture Specifications',
            description: 'Specifications for all water-efficient fixtures',
            fileTypes: ['pdf', 'docx'],
            maxSize: 10
          },
          {
            id: 'water-use-calculations-indoor',
            label: 'Indoor Water Use Calculations',
            description: 'Calculations showing baseline vs. efficient fixture water use',
            fileTypes: ['pdf', 'xlsx'],
            maxSize: 10
          }
        ]
      }
    ]
  },
  {
    id: 'energy-atmosphere',
    title: 'Energy and Atmosphere',
    description: 'Optimize energy performance and renewable energy use',
    kpis: [
      {
        id: 'fundamental-commissioning',
        title: 'Fundamental Commissioning and Verification',
        description: 'Verify that building systems are installed and perform according to design',
        maxPoints: 6,
        questions: [
          {
            id: 'commissioning-agent-qualification',
            label: 'What is the qualification level of the commissioning agent?',
            type: 'dropdown',
            options: [
              'LEED AP with Commissioning specialty',
              'Professional Engineer with commissioning experience',
              'Certified Commissioning Professional (CCP)',
              'Other relevant certification',
              'No formal certification'
            ],
            required: true
          },
          {
            id: 'commissioning-scope',
            label: 'Which systems are included in commissioning scope?',
            type: 'multiselect',
            options: [
              'HVAC systems',
              'Lighting and daylighting controls',
              'Renewable energy systems',
              'Domestic hot water systems',
              'Building envelope',
              'All applicable systems'
            ],
            required: true
          },
          {
            id: 'commissioning-timeline',
            label: 'When will commissioning activities begin?',
            type: 'dropdown',
            options: [
              'During design phase',
              'During construction phase',
              'After construction completion',
              'Not yet planned'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'commissioning-plan',
            label: 'Commissioning Plan',
            description: 'Detailed commissioning plan and schedule',
            fileTypes: ['pdf', 'docx'],
            maxSize: 15
          },
          {
            id: 'commissioning-agent-resume',
            label: 'Commissioning Agent Resume',
            description: 'Resume and qualifications of commissioning agent',
            fileTypes: ['pdf', 'docx'],
            maxSize: 5
          }
        ]
      },
      {
        id: 'minimum-energy-performance',
        title: 'Minimum Energy Performance',
        description: 'Establish minimum energy efficiency requirements',
        maxPoints: 4,
        questions: [
          {
            id: 'energy-modeling-approach',
            label: 'What energy modeling approach is being used?',
            type: 'dropdown',
            options: [
              'Whole building energy simulation',
              'Prescriptive compliance path',
              'Energy modeling not applicable',
              'Planning to implement energy modeling'
            ],
            required: true
          },
          {
            id: 'baseline-building-performance',
            label: 'What is the baseline building performance rating?',
            type: 'dropdown',
            options: [
              'ASHRAE 90.1-2019',
              'ASHRAE 90.1-2016',
              'ASHRAE 90.1-2013',
              'Local energy code',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'proposed-performance-improvement',
            label: 'What is the proposed performance improvement over baseline?',
            type: 'dropdown',
            options: [
              '5% improvement',
              '10% improvement',
              '15% improvement',
              '20% or more improvement',
              'Meets minimum requirements only'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'energy-model-report',
            label: 'Energy Model Report',
            description: 'Complete energy modeling analysis and results',
            fileTypes: ['pdf'],
            maxSize: 25
          },
          {
            id: 'energy-model-input-files',
            label: 'Energy Model Input Files',
            description: 'Energy modeling software input files',
            fileTypes: ['inp', 'idf', 'gbxml'],
            maxSize: 50
          }
        ]
      }
    ]
  },
  {
    id: 'materials-resources',
    title: 'Materials and Resources',
    description: 'Use sustainable materials and reduce waste',
    kpis: [
      {
        id: 'storage-collection-recyclables',
        title: 'Storage and Collection of Recyclables',
        description: 'Provide dedicated areas for recyclable material collection',
        maxPoints: 1,
        questions: [
          {
            id: 'recycling-storage-location',
            label: 'Where is recycling storage located?',
            type: 'dropdown',
            options: [
              'Designated indoor area',
              'Designated outdoor area',
              'Mixed indoor and outdoor areas',
              'No dedicated recycling storage'
            ],
            required: true
          },
          {
            id: 'recyclable-materials-collected',
            label: 'Which recyclable materials are collected?',
            type: 'multiselect',
            options: [
              'Paper and cardboard',
              'Glass',
              'Plastic',
              'Metal',
              'Organic waste/composting',
              'Electronics',
              'Construction waste',
              'All major recyclable materials'
            ],
            required: true
          },
          {
            id: 'recycling-program-implementation',
            label: 'Is there a recycling program implementation plan?',
            type: 'yes-no',
            required: true,
            description: 'Includes collection schedules and occupant education'
          }
        ],
        uploads: [
          {
            id: 'recycling-storage-plan',
            label: 'Recycling Storage Plan',
            description: 'Plan showing recycling storage locations and capacities',
            fileTypes: ['pdf', 'dwg', 'jpg', 'png'],
            maxSize: 15
          },
          {
            id: 'recycling-program-plan',
            label: 'Recycling Program Plan',
            description: 'Implementation plan for recycling program',
            fileTypes: ['pdf', 'docx'],
            maxSize: 10
          }
        ]
      },
      {
        id: 'construction-waste-management',
        title: 'Construction and Demolition Waste Management',
        description: 'Divert construction and demolition debris from disposal',
        maxPoints: 2,
        questions: [
          {
            id: 'waste-diversion-target',
            label: 'What is the waste diversion target?',
            type: 'dropdown',
            options: [
              '75% diversion from landfill',
              '50% diversion from landfill',
              '25% diversion from landfill',
              'No specific target set'
            ],
            required: true
          },
          {
            id: 'waste-streams-included',
            label: 'Which waste streams are included in diversion program?',
            type: 'multiselect',
            options: [
              'Concrete and masonry',
              'Wood and engineered wood products',
              'Metal',
              'Drywall',
              'Carpet and flooring',
              'Insulation',
              'All major construction materials'
            ],
            required: true
          },
          {
            id: 'waste-tracking-system',
            label: 'What waste tracking system will be used?',
            type: 'dropdown',
            options: [
              'LEED Online waste tracking',
              'Third-party waste tracking service',
              'Contractor waste tracking system',
              'Manual tracking system',
              'No formal tracking system'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'waste-management-plan',
            label: 'Waste Management Plan',
            description: 'Comprehensive construction waste management plan',
            fileTypes: ['pdf', 'docx'],
            maxSize: 15
          },
          {
            id: 'waste-tracking-reports',
            label: 'Waste Tracking Reports',
            description: 'Ongoing waste diversion tracking reports',
            fileTypes: ['pdf', 'xlsx'],
            maxSize: 10
          }
        ]
      }
    ]
  },
  {
    id: 'indoor-environmental-quality',
    title: 'Indoor Environmental Quality',
    description: 'Enhance indoor air quality and occupant comfort',
    kpis: [
      {
        id: 'minimum-indoor-air-quality-performance',
        title: 'Minimum Indoor Air Quality Performance',
        description: 'Establish minimum indoor air quality requirements',
        maxPoints: 2,
        questions: [
          {
            id: 'ventilation-standard-compliance',
            label: 'Which ventilation standard is being followed?',
            type: 'dropdown',
            options: [
              'ASHRAE 62.1-2019',
              'ASHRAE 62.1-2016',
              'ASHRAE 62.1-2013',
              'Local ventilation code',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'outdoor-air-delivery-rate',
            label: 'What is the outdoor air delivery rate?',
            type: 'dropdown',
            options: [
              'Meets or exceeds ASHRAE 62.1 requirements',
              '30% more than ASHRAE 62.1 minimum',
              'Meets minimum ASHRAE 62.1 requirements',
              'Below ASHRAE 62.1 minimum',
              'Not calculated yet'
            ],
            required: true
          },
          {
            id: 'air-filtration-efficiency',
            label: 'What is the minimum air filtration efficiency?',
            type: 'dropdown',
            options: [
              'MERV 13 or higher',
              'MERV 11-12',
              'MERV 8-10',
              'MERV 6-7',
              'No minimum filtration specified'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'ventilation-calculations',
            label: 'Ventilation Calculations',
            description: 'Detailed ventilation rate calculations',
            fileTypes: ['pdf', 'xlsx'],
            maxSize: 15
          },
          {
            id: 'hvac-system-specifications',
            label: 'HVAC System Specifications',
            description: 'Specifications for air handling and filtration systems',
            fileTypes: ['pdf', 'docx'],
            maxSize: 20
          }
        ]
      },
      {
        id: 'environmental-tobacco-smoke-control',
        title: 'Environmental Tobacco Smoke Control',
        description: 'Prohibit smoking in the building and minimize exposure to environmental tobacco smoke',
        maxPoints: 1,
        questions: [
          {
            id: 'smoking-policy-type',
            label: 'What type of smoking policy is implemented?',
            type: 'dropdown',
            options: [
              'Complete smoking prohibition',
              'Designated smoking areas outside building',
              'Smoking allowed in designated indoor areas',
              'No smoking policy in place'
            ],
            required: true
          },
          {
            id: 'smoking-area-distance',
            label: 'Distance from smoking areas to building entrances',
            type: 'dropdown',
            options: [
              '25 feet or more',
              '15-24 feet',
              '10-14 feet',
              'Less than 10 feet',
              'No designated smoking areas'
            ],
            required: false
          }
        ],
        uploads: [
          {
            id: 'smoking-policy-documentation',
            label: 'Smoking Policy Documentation',
            description: 'Written smoking policy and enforcement procedures',
            fileTypes: ['pdf', 'docx'],
            maxSize: 5
          }
        ]
      }
    ]
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Innovative strategies that go beyond standard certification requirements',
    kpis: [
      {
        id: 'innovation-design',
        title: 'Innovation in Design',
        description: 'Implement innovative strategies that go beyond LEED requirements',
        maxPoints: 4,
        questions: [
          {
            id: 'innovation-strategy-type',
            label: 'What type of innovation strategy is being pursued?',
            type: 'dropdown',
            options: [
              'Performance-based innovation',
              'Process-based innovation',
              'Technology-based innovation',
              'Multiple innovation strategies',
              'No specific innovation strategy'
            ],
            required: true
          },
          {
            id: 'innovation-categories',
            label: 'Which innovation categories are addressed?',
            type: 'multiselect',
            options: [
              'Energy performance beyond requirements',
              'Water efficiency innovations',
              'Material selection innovations',
              'Indoor environmental quality innovations',
              'Sustainable site innovations',
              'Multiple categories'
            ],
            required: true
          },
          {
            id: 'innovation-documentation-approach',
            label: 'How will innovation be documented?',
            type: 'dropdown',
            options: [
              'Comprehensive performance analysis',
              'Comparative analysis with baseline',
              'Third-party verification',
              'Pilot program documentation',
              'Not yet planned'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'innovation-strategy-documentation',
            label: 'Innovation Strategy Documentation',
            description: 'Detailed documentation of innovation approach and expected outcomes',
            fileTypes: ['pdf', 'docx'],
            maxSize: 20
          },
          {
            id: 'innovation-performance-analysis',
            label: 'Innovation Performance Analysis',
            description: 'Analysis showing performance improvements from innovation',
            fileTypes: ['pdf', 'xlsx'],
            maxSize: 15
          }
        ]
      }
    ]
  },
  {
    id: 'regional-priority',
    title: 'Regional Priority',
    description: 'Address environmental priorities specific to the project region',
    kpis: [
      {
        id: 'regional-priority-credit',
        title: 'Regional Priority Credit',
        description: 'Address environmental priorities specific to the project region',
        maxPoints: 4,
        questions: [
          {
            id: 'regional-priority-category',
            label: 'Which regional priority category is being addressed?',
            type: 'dropdown',
            options: [
              'Water efficiency',
              'Energy efficiency',
              'Material selection',
              'Indoor environmental quality',
              'Sustainable site development',
              'Multiple categories'
            ],
            required: true
          },
          {
            id: 'regional-priority-approach',
            label: 'How is the regional priority being addressed?',
            type: 'dropdown',
            options: [
              'Exceeding LEED credit requirements',
              'Implementing additional sustainable practices',
              'Addressing local environmental concerns',
              'Supporting regional sustainability goals',
              'Combination of approaches'
            ],
            required: true
          }
        ],
        uploads: [
          {
            id: 'regional-priority-analysis',
            label: 'Regional Priority Analysis',
            description: 'Analysis of regional environmental priorities and project response',
            fileTypes: ['pdf', 'docx'],
            maxSize: 15
          }
        ]
      }
    ]
  }
];
