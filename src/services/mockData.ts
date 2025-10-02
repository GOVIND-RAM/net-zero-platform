// Mock data for projects and form options

export interface Project {
  id: string;
  name: string;
  organization: string;
  certificationType: string;
  status: 'Certified' | 'In Progress' | 'Pending Review' | 'Draft' | 'Under Review';
  createdAt: string;
  lastUpdated: string;
  progress: number;
  location: string;
  description: string;
}

export interface FormOption {
  value: string;
  label: string;
}

// Mock projects data
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Green Office Complex',
    organization: 'EcoBuild India Pvt Ltd',
    certificationType: 'building',
    status: 'Certified',
    createdAt: '2024-01-15',
    lastUpdated: '2024-03-20',
    progress: 100,
    location: 'Mumbai, Maharashtra',
    description: 'IGBC Platinum certified office building with solar panels and rainwater harvesting.'
  },
  {
    id: '2',
    name: 'Sustainable Manufacturing Plant',
    organization: 'GreenTech Industries India',
    certificationType: 'manufacturing',
    status: 'In Progress',
    createdAt: '2024-02-10',
    lastUpdated: '2024-03-18',
    progress: 65,
    location: 'Bangalore, Karnataka',
    description: 'Zero-waste manufacturing facility with renewable energy integration.'
  },
  {
    id: '3',
    name: 'Electric Fleet Transportation',
    organization: 'CleanMove Logistics Pvt Ltd',
    certificationType: 'transportation',
    status: 'Pending Review',
    createdAt: '2024-02-28',
    lastUpdated: '2024-03-15',
    progress: 80,
    location: 'Delhi, NCR',
    description: 'Complete transition to electric vehicle fleet for last-mile delivery.'
  },
  {
    id: '4',
    name: 'Solar Farm Project',
    organization: 'Renewable Energy India Ltd',
    certificationType: 'energy',
    status: 'Under Review',
    createdAt: '2024-03-01',
    lastUpdated: '2024-03-12',
    progress: 45,
    location: 'Ahmedabad, Gujarat',
    description: '100MW solar farm with battery storage and grid integration.'
  },
  {
    id: '5',
    name: 'Net Zero Residential Complex',
    organization: 'EcoHomes India Pvt Ltd',
    certificationType: 'building',
    status: 'Draft',
    createdAt: '2024-03-05',
    lastUpdated: '2024-03-10',
    progress: 25,
    location: 'Pune, Maharashtra',
    description: 'Mixed-use residential development targeting net zero energy consumption.'
  },
  {
    id: '6',
    name: 'Hydrogen Production Facility',
    organization: 'Future Energy India Inc',
    certificationType: 'manufacturing',
    status: 'In Progress',
    createdAt: '2024-01-20',
    lastUpdated: '2024-03-08',
    progress: 70,
    location: 'Chennai, Tamil Nadu',
    description: 'Green hydrogen production using renewable energy sources.'
  },
  {
    id: '7',
    name: 'Smart Campus Development',
    organization: 'IIT Delhi',
    certificationType: 'campus',
    status: 'Certified',
    createdAt: '2024-01-10',
    lastUpdated: '2024-03-22',
    progress: 100,
    location: 'Delhi, NCR',
    description: 'GRIHA 5-star certified smart campus with renewable energy integration.'
  },
  {
    id: '8',
    name: 'Community Center Project',
    organization: 'Tata Trust Foundation',
    certificationType: 'community-center',
    status: 'In Progress',
    createdAt: '2024-02-15',
    lastUpdated: '2024-03-19',
    progress: 75,
    location: 'Kolkata, West Bengal',
    description: 'Sustainable community center with solar power and water conservation systems.'
  },
  {
    id: '9',
    name: 'Smart City Initiative',
    organization: 'Pune Municipal Corporation',
    certificationType: 'city',
    status: 'Under Review',
    createdAt: '2024-02-20',
    lastUpdated: '2024-03-14',
    progress: 60,
    location: 'Pune, Maharashtra',
    description: 'Smart city development with focus on renewable energy and waste management.'
  },
  {
    id: '10',
    name: 'Warehouse Modernization',
    organization: 'Reliance Industries Ltd',
    certificationType: 'warehouse',
    status: 'Pending Review',
    createdAt: '2024-03-01',
    lastUpdated: '2024-03-16',
    progress: 85,
    location: 'Hyderabad, Telangana',
    description: 'Modern warehouse facility with solar panels and energy-efficient systems.'
  },
  {
    id: '11',
    name: 'Green Business Complex',
    organization: 'Infosys Technologies Ltd',
    certificationType: 'business',
    status: 'Certified',
    createdAt: '2024-01-05',
    lastUpdated: '2024-03-21',
    progress: 100,
    location: 'Mysore, Karnataka',
    description: 'IGBC Gold certified business complex with comprehensive sustainability features.'
  },
  {
    id: '12',
    name: 'Eco-Friendly Product Line',
    organization: 'Godrej & Boyce Mfg Co Ltd',
    certificationType: 'product',
    status: 'In Progress',
    createdAt: '2024-02-25',
    lastUpdated: '2024-03-17',
    progress: 55,
    location: 'Mumbai, Maharashtra',
    description: 'Development of eco-friendly consumer products with sustainable packaging.'
  }
];

// Mock form options
export const organizationOptions: FormOption[] = [
  { value: 'ecobuild-india', label: 'EcoBuild India Pvt Ltd' },
  { value: 'greentech-india', label: 'GreenTech Industries India' },
  { value: 'cleanmove-india', label: 'CleanMove Logistics Pvt Ltd' },
  { value: 'renewable-energy-india', label: 'Renewable Energy India Ltd' },
  { value: 'ecohomes-india', label: 'EcoHomes India Pvt Ltd' },
  { value: 'future-energy-india', label: 'Future Energy India Inc' },
  { value: 'tata-trust', label: 'Tata Trust Foundation' },
  { value: 'reliance-industries', label: 'Reliance Industries Ltd' },
  { value: 'infosys', label: 'Infosys Technologies Ltd' },
  { value: 'godrej-boyce', label: 'Godrej & Boyce Mfg Co Ltd' },
  { value: 'iit-delhi', label: 'IIT Delhi' },
  { value: 'pune-municipal', label: 'Pune Municipal Corporation' },
  { value: 'mahindra-group', label: 'Mahindra Group' },
  { value: 'wipro-limited', label: 'Wipro Limited' }
];

export const projectTypeOptions: FormOption[] = [
  { value: 'new-construction', label: 'New Construction' },
  { value: 'renovation', label: 'Renovation/Retrofit' },
  { value: 'expansion', label: 'Expansion' },
  { value: 'upgrade', label: 'Technology Upgrade' }
];

export const certificationLevelOptions: FormOption[] = [
  { value: 'basic', label: 'IGBC Basic' },
  { value: 'standard', label: 'IGBC Silver' },
  { value: 'premium', label: 'IGBC Gold' },
  { value: 'platinum', label: 'IGBC Platinum' },
  { value: 'griha-3', label: 'GRIHA 3-Star' },
  { value: 'griha-4', label: 'GRIHA 4-Star' },
  { value: 'griha-5', label: 'GRIHA 5-Star' }
];

export const industryOptions: FormOption[] = [
  { value: 'construction', label: 'Construction' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'logistics', label: 'Logistics & Transportation' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' }
];

export const countryOptions: FormOption[] = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'au', label: 'Australia' },
  { value: 'sg', label: 'Singapore' },
  { value: 'ae', label: 'UAE' }
];

export const stateOptions: FormOption[] = [
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'west-bengal', label: 'West Bengal' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'kerala', label: 'Kerala' }
];

// Helper function to get projects by certification type
export const getProjectsByType = (certificationType: string): Project[] => {
  return mockProjects.filter(project => 
    project.certificationType === certificationType
  );
};

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

