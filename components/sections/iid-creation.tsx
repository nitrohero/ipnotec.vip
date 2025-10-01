'use client'

import { useState, useEffect, useRef } from 'react'
import { GlassCard, GlassButton, GlassInput, NeonText } from '@/components/ui/glass'
import { generateIID, validateIID } from '@/lib/utils'
import { Check, RefreshCw, User, Shield, Zap, Sparkles, Phone, Mail, Calendar, Target, Users, CreditCard, Shuffle, Search, ChevronDown } from 'lucide-react'

export function IIDCreationSection() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        // Step 1: Identity Authentication
        countryCode: '+91',
        phone: '',
        email: '',
        dateOfBirth: '',
        virtualIP: '',

        // Step 2: Avatar Forging
        purpose: '',
        goal: '',
        personalityType: '',
        callsign: '',
        futureTribe: '',
        cityCode: '',

        // Step 3: Payment & Activation
        generatedID: '',
        isActivated: false
    })
    const [isGenerating, setIsGenerating] = useState(false)
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
    const [countrySearch, setCountrySearch] = useState('')
    const [showCountryDropdown, setShowCountryDropdown] = useState(false)
    const countryDropdownRef = useRef<HTMLDivElement>(null)
    
    // City search and data
    const [citySearch, setCitySearch] = useState('')
    const [showCityDropdown, setShowCityDropdown] = useState(false)
    const [citiesData, setCitiesData] = useState<Array<{ code: string; name: string }>>([])
    const [isLoadingCities, setIsLoadingCities] = useState(true)
    const cityDropdownRef = useRef<HTMLDivElement>(null)
    const [displayedCitiesCount, setDisplayedCitiesCount] = useState(50) // Only render 50 cities initially

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setShowCountryDropdown(false)
                setCountrySearch('')
            }
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
                setShowCityDropdown(false)
                setCitySearch('')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Load cities data from JSON
    useEffect(() => {
        const loadCities = async () => {
            try {
                setIsLoadingCities(true)
                // Fetch initial cities from API (server-side)
                const response = await fetch('/api/cities?limit=100')
                const data = await response.json()
                
                setCitiesData(data.results || [])
            } catch (error) {
                console.error('Error loading cities:', error)
            } finally {
                setIsLoadingCities(false)
            }
        }
        
        loadCities()
    }, [])

    // Fetch cities when search changes (debounced search)
    useEffect(() => {
        if (!showCityDropdown) return

        const searchCities = async () => {
            try {
                setIsLoadingCities(true)
                
                // Build query parameters
                const params = new URLSearchParams()
                if (citySearch) {
                    params.append('search', citySearch)
                }
                params.append('limit', '200') // Increased limit for better results
                
                const response = await fetch(`/api/cities?${params.toString()}`)
                const data = await response.json()
                setCitiesData(data.results || [])
                setDisplayedCitiesCount(50) // Reset display count
            } catch (error) {
                console.error('Error searching cities:', error)
                setCitiesData([])
            } finally {
                setIsLoadingCities(false)
            }
        }

        // Debounce search
        const timer = setTimeout(searchCities, 300)
        return () => clearTimeout(timer)
    }, [citySearch, showCityDropdown])

    const steps = [
        {
            title: 'Identity Authentication',
            description: 'Create your unique digital fingerprint',
            icon: User
        },
        {
            title: 'Avatar Forging',
            description: 'Build your digital persona',
            icon: User
        },
        {
            title: 'Payment & Activation',
            description: 'Unlock the IPNOTEC ecosystem',
            icon: CreditCard
        }
    ]

    const futureTribeOptions = [
        { value: 'VIP', label: 'VIP - Venture & Wealth', description: 'Investment and entrepreneurship focus', color: '#8F00F0' },
        { value: 'IPI', label: 'IPI - IT & Industrialists', description: 'Technology and industrial innovation', color: '#0070B0' },
        { value: 'IPB', label: 'IPB - Branding & Marketing', description: 'Creative and marketing excellence', color: '#00B0F0' },
        { value: 'IPG', label: 'IPG - Green & Environmental', description: 'Sustainability and eco-innovation', color: '#45DE10' },
        { value: 'IPY', label: 'IPY - Youth & Education', description: 'Learning and development focused', color: '#FFF000' },
        { value: 'IPO', label: 'IPO - Culture & Arts', description: 'Creative expression and cultural impact', color: '#FF6900' },
        { value: 'IPR', label: 'IPR - Real Estate & Recreation', description: 'Property and lifestyle ventures', color: '#FF000F' },
        { value: 'IPW', label: 'IPW - Health & Policy', description: 'Health and wellness innovation', color: '#FFFFFF' },
        { value: 'IPGY', label: 'IPGY - Nomads & Curious', description: 'Explorers and knowledge seekers', color: '#707070' },
        { value: 'IPBL', label: 'IPBL - Black Noting', description: 'Exclusive and mysterious network', color: '#000000' }
    ]

    const personalityTypes = [
        { value: 'Personal', label: 'Personal', description: 'Individual growth and self-development' },
        { value: 'Professional', label: 'Professional', description: 'Career advancement and business' },
        { value: 'Spiritual', label: 'Spiritual', description: 'Inner wisdom and consciousness' }
    ]

    const countryCodeOptions = [
        // Popular/Major Countries First
        { value: '+91', label: '+91', country: 'India' },
        { value: '+1', label: '+1', country: 'United States/Canada' },
        { value: '+44', label: '+44', country: 'United Kingdom' },
        { value: '+86', label: '+86', country: 'China' },
        { value: '+81', label: '+81', country: 'Japan' },
        { value: '+49', label: '+49', country: 'Germany' },
        { value: '+33', label: '+33', country: 'France' },
        { value: '+39', label: '+39', country: 'Italy' },
        { value: '+61', label: '+61', country: 'Australia' },
        { value: '+55', label: '+55', country: 'Brazil' },
        { value: '+7', label: '+7', country: 'Russia' },
        { value: '+82', label: '+82', country: 'South Korea' },
        { value: '+65', label: '+65', country: 'Singapore' },
        { value: '+971', label: '+971', country: 'UAE' },
        { value: '+966', label: '+966', country: 'Saudi Arabia' },
        { value: '+31', label: '+31', country: 'Netherlands' },
        { value: '+46', label: '+46', country: 'Sweden' },
        { value: '+47', label: '+47', country: 'Norway' },
        { value: '+41', label: '+41', country: 'Switzerland' },
        { value: '+852', label: '+852', country: 'Hong Kong' },
        // Additional Countries Alphabetically
        { value: '+93', label: '+93', country: 'Afghanistan' },
        { value: '+355', label: '+355', country: 'Albania' },
        { value: '+213', label: '+213', country: 'Algeria' },
        { value: '+1684', label: '+1684', country: 'American Samoa' },
        { value: '+376', label: '+376', country: 'Andorra' },
        { value: '+244', label: '+244', country: 'Angola' },
        { value: '+1264', label: '+1264', country: 'Anguilla' },
        { value: '+54', label: '+54', country: 'Argentina' },
        { value: '+374', label: '+374', country: 'Armenia' },
        { value: '+297', label: '+297', country: 'Aruba' },
        { value: '+43', label: '+43', country: 'Austria' },
        { value: '+994', label: '+994', country: 'Azerbaijan' },
        { value: '+1242', label: '+1242', country: 'Bahamas' },
        { value: '+973', label: '+973', country: 'Bahrain' },
        { value: '+880', label: '+880', country: 'Bangladesh' },
        { value: '+1246', label: '+1246', country: 'Barbados' },
        { value: '+375', label: '+375', country: 'Belarus' },
        { value: '+32', label: '+32', country: 'Belgium' },
        { value: '+501', label: '+501', country: 'Belize' },
        { value: '+229', label: '+229', country: 'Benin' },
        { value: '+1441', label: '+1441', country: 'Bermuda' },
        { value: '+975', label: '+975', country: 'Bhutan' },
        { value: '+591', label: '+591', country: 'Bolivia' },
        { value: '+387', label: '+387', country: 'Bosnia and Herzegovina' },
        { value: '+267', label: '+267', country: 'Botswana' },
        { value: '+673', label: '+673', country: 'Brunei' },
        { value: '+359', label: '+359', country: 'Bulgaria' },
        { value: '+226', label: '+226', country: 'Burkina Faso' },
        { value: '+257', label: '+257', country: 'Burundi' },
        { value: '+855', label: '+855', country: 'Cambodia' },
        { value: '+237', label: '+237', country: 'Cameroon' },
        { value: '+238', label: '+238', country: 'Cape Verde' },
        { value: '+1345', label: '+1345', country: 'Cayman Islands' },
        { value: '+236', label: '+236', country: 'Central African Republic' },
        { value: '+235', label: '+235', country: 'Chad' },
        { value: '+56', label: '+56', country: 'Chile' },
        { value: '+57', label: '+57', country: 'Colombia' },
        { value: '+269', label: '+269', country: 'Comoros' },
        { value: '+242', label: '+242', country: 'Congo' },
        { value: '+243', label: '+243', country: 'Congo (DRC)' },
        { value: '+682', label: '+682', country: 'Cook Islands' },
        { value: '+506', label: '+506', country: 'Costa Rica' },
        { value: '+385', label: '+385', country: 'Croatia' },
        { value: '+53', label: '+53', country: 'Cuba' },
        { value: '+357', label: '+357', country: 'Cyprus' },
        { value: '+420', label: '+420', country: 'Czech Republic' },
        { value: '+45', label: '+45', country: 'Denmark' },
        { value: '+253', label: '+253', country: 'Djibouti' },
        { value: '+1767', label: '+1767', country: 'Dominica' },
        { value: '+1809', label: '+1809', country: 'Dominican Republic' },
        { value: '+593', label: '+593', country: 'Ecuador' },
        { value: '+20', label: '+20', country: 'Egypt' },
        { value: '+503', label: '+503', country: 'El Salvador' },
        { value: '+240', label: '+240', country: 'Equatorial Guinea' },
        { value: '+291', label: '+291', country: 'Eritrea' },
        { value: '+372', label: '+372', country: 'Estonia' },
        { value: '+251', label: '+251', country: 'Ethiopia' },
        { value: '+500', label: '+500', country: 'Falkland Islands' },
        { value: '+298', label: '+298', country: 'Faroe Islands' },
        { value: '+679', label: '+679', country: 'Fiji' },
        { value: '+358', label: '+358', country: 'Finland' },
        { value: '+594', label: '+594', country: 'French Guiana' },
        { value: '+689', label: '+689', country: 'French Polynesia' },
        { value: '+241', label: '+241', country: 'Gabon' },
        { value: '+220', label: '+220', country: 'Gambia' },
        { value: '+995', label: '+995', country: 'Georgia' },
        { value: '+233', label: '+233', country: 'Ghana' },
        { value: '+350', label: '+350', country: 'Gibraltar' },
        { value: '+30', label: '+30', country: 'Greece' },
        { value: '+299', label: '+299', country: 'Greenland' },
        { value: '+1473', label: '+1473', country: 'Grenada' },
        { value: '+590', label: '+590', country: 'Guadeloupe' },
        { value: '+1671', label: '+1671', country: 'Guam' },
        { value: '+502', label: '+502', country: 'Guatemala' },
        { value: '+224', label: '+224', country: 'Guinea' },
        { value: '+245', label: '+245', country: 'Guinea-Bissau' },
        { value: '+592', label: '+592', country: 'Guyana' },
        { value: '+509', label: '+509', country: 'Haiti' },
        { value: '+504', label: '+504', country: 'Honduras' },
        { value: '+36', label: '+36', country: 'Hungary' },
        { value: '+354', label: '+354', country: 'Iceland' },
        { value: '+62', label: '+62', country: 'Indonesia' },
        { value: '+98', label: '+98', country: 'Iran' },
        { value: '+964', label: '+964', country: 'Iraq' },
        { value: '+353', label: '+353', country: 'Ireland' },
        { value: '+972', label: '+972', country: 'Israel' },
        { value: '+225', label: '+225', country: 'Ivory Coast' },
        { value: '+1876', label: '+1876', country: 'Jamaica' },
        { value: '+962', label: '+962', country: 'Jordan' },
        { value: '+7-kz', label: '+7', country: 'Kazakhstan' },
        { value: '+254', label: '+254', country: 'Kenya' },
        { value: '+686', label: '+686', country: 'Kiribati' },
        { value: '+965', label: '+965', country: 'Kuwait' },
        { value: '+996', label: '+996', country: 'Kyrgyzstan' },
        { value: '+856', label: '+856', country: 'Laos' },
        { value: '+371', label: '+371', country: 'Latvia' },
        { value: '+961', label: '+961', country: 'Lebanon' },
        { value: '+266', label: '+266', country: 'Lesotho' },
        { value: '+231', label: '+231', country: 'Liberia' },
        { value: '+218', label: '+218', country: 'Libya' },
        { value: '+423', label: '+423', country: 'Liechtenstein' },
        { value: '+370', label: '+370', country: 'Lithuania' },
        { value: '+352', label: '+352', country: 'Luxembourg' },
        { value: '+853', label: '+853', country: 'Macau' },
        { value: '+389', label: '+389', country: 'Macedonia' },
        { value: '+261', label: '+261', country: 'Madagascar' },
        { value: '+265', label: '+265', country: 'Malawi' },
        { value: '+60', label: '+60', country: 'Malaysia' },
        { value: '+960', label: '+960', country: 'Maldives' },
        { value: '+223', label: '+223', country: 'Mali' },
        { value: '+356', label: '+356', country: 'Malta' },
        { value: '+692', label: '+692', country: 'Marshall Islands' },
        { value: '+596', label: '+596', country: 'Martinique' },
        { value: '+222', label: '+222', country: 'Mauritania' },
        { value: '+230', label: '+230', country: 'Mauritius' },
        { value: '+52', label: '+52', country: 'Mexico' },
        { value: '+691', label: '+691', country: 'Micronesia' },
        { value: '+373', label: '+373', country: 'Moldova' },
        { value: '+377', label: '+377', country: 'Monaco' },
        { value: '+976', label: '+976', country: 'Mongolia' },
        { value: '+382', label: '+382', country: 'Montenegro' },
        { value: '+1664', label: '+1664', country: 'Montserrat' },
        { value: '+212', label: '+212', country: 'Morocco' },
        { value: '+258', label: '+258', country: 'Mozambique' },
        { value: '+95', label: '+95', country: 'Myanmar' },
        { value: '+264', label: '+264', country: 'Namibia' },
        { value: '+674', label: '+674', country: 'Nauru' },
        { value: '+977', label: '+977', country: 'Nepal' },
        { value: '+687', label: '+687', country: 'New Caledonia' },
        { value: '+64', label: '+64', country: 'New Zealand' },
        { value: '+505', label: '+505', country: 'Nicaragua' },
        { value: '+227', label: '+227', country: 'Niger' },
        { value: '+234', label: '+234', country: 'Nigeria' },
        { value: '+683', label: '+683', country: 'Niue' },
        { value: '+672', label: '+672', country: 'Norfolk Island' },
        { value: '+850', label: '+850', country: 'North Korea' },
        { value: '+1670', label: '+1670', country: 'Northern Mariana Islands' },
        { value: '+968', label: '+968', country: 'Oman' },
        { value: '+92', label: '+92', country: 'Pakistan' },
        { value: '+680', label: '+680', country: 'Palau' },
        { value: '+970', label: '+970', country: 'Palestine' },
        { value: '+507', label: '+507', country: 'Panama' },
        { value: '+675', label: '+675', country: 'Papua New Guinea' },
        { value: '+595', label: '+595', country: 'Paraguay' },
        { value: '+51', label: '+51', country: 'Peru' },
        { value: '+63', label: '+63', country: 'Philippines' },
        { value: '+48', label: '+48', country: 'Poland' },
        { value: '+351', label: '+351', country: 'Portugal' },
        { value: '+1787', label: '+1787', country: 'Puerto Rico' },
        { value: '+974', label: '+974', country: 'Qatar' },
        { value: '+262', label: '+262', country: 'Reunion' },
        { value: '+40', label: '+40', country: 'Romania' },
        { value: '+250', label: '+250', country: 'Rwanda' },
        { value: '+1869', label: '+1869', country: 'Saint Kitts and Nevis' },
        { value: '+1758', label: '+1758', country: 'Saint Lucia' },
        { value: '+1784', label: '+1784', country: 'Saint Vincent and the Grenadines' },
        { value: '+685', label: '+685', country: 'Samoa' },
        { value: '+378', label: '+378', country: 'San Marino' },
        { value: '+239', label: '+239', country: 'Sao Tome and Principe' },
        { value: '+221', label: '+221', country: 'Senegal' },
        { value: '+381', label: '+381', country: 'Serbia' },
        { value: '+248', label: '+248', country: 'Seychelles' },
        { value: '+232', label: '+232', country: 'Sierra Leone' },
        { value: '+421', label: '+421', country: 'Slovakia' },
        { value: '+386', label: '+386', country: 'Slovenia' },
        { value: '+677', label: '+677', country: 'Solomon Islands' },
        { value: '+252', label: '+252', country: 'Somalia' },
        { value: '+27', label: '+27', country: 'South Africa' },
        { value: '+34', label: '+34', country: 'Spain' },
        { value: '+94', label: '+94', country: 'Sri Lanka' },
        { value: '+249', label: '+249', country: 'Sudan' },
        { value: '+597', label: '+597', country: 'Suriname' },
        { value: '+268', label: '+268', country: 'Swaziland' },
        { value: '+963', label: '+963', country: 'Syria' },
        { value: '+886', label: '+886', country: 'Taiwan' },
        { value: '+992', label: '+992', country: 'Tajikistan' },
        { value: '+255', label: '+255', country: 'Tanzania' },
        { value: '+66', label: '+66', country: 'Thailand' },
        { value: '+228', label: '+228', country: 'Togo' },
        { value: '+690', label: '+690', country: 'Tokelau' },
        { value: '+676', label: '+676', country: 'Tonga' },
        { value: '+1868', label: '+1868', country: 'Trinidad and Tobago' },
        { value: '+216', label: '+216', country: 'Tunisia' },
        { value: '+90', label: '+90', country: 'Turkey' },
        { value: '+993', label: '+993', country: 'Turkmenistan' },
        { value: '+1649', label: '+1649', country: 'Turks and Caicos Islands' },
        { value: '+688', label: '+688', country: 'Tuvalu' },
        { value: '+256', label: '+256', country: 'Uganda' },
        { value: '+380', label: '+380', country: 'Ukraine' },
        { value: '+598', label: '+598', country: 'Uruguay' },
        { value: '+998', label: '+998', country: 'Uzbekistan' },
        { value: '+678', label: '+678', country: 'Vanuatu' },
        { value: '+379', label: '+379', country: 'Vatican City' },
        { value: '+58', label: '+58', country: 'Venezuela' },
        { value: '+84', label: '+84', country: 'Vietnam' },
        { value: '+1284', label: '+1284', country: 'Virgin Islands (British)' },
        { value: '+1340', label: '+1340', country: 'Virgin Islands (US)' },
        { value: '+681', label: '+681', country: 'Wallis and Futuna' },
        { value: '+967', label: '+967', country: 'Yemen' },
        { value: '+260', label: '+260', country: 'Zambia' },
        { value: '+263', label: '+263', country: 'Zimbabwe' }
    ]

    // Enhanced name components for massive combinations (80,000+ unique callsigns)
    const nameComponents = {
        prefixes: [
            'QUANTUM', 'NEURAL', 'CYBER', 'DIGITAL', 'VIRTUAL', 'CRYPTO', 'BINARY', 'MATRIX',
            'NANO', 'MEGA', 'ULTRA', 'HYPER', 'META', 'PROTO', 'ALPHA', 'BETA', 'GAMMA',
            'DELTA', 'OMEGA', 'ZERO', 'PRIME', 'CORE', 'EDGE', 'FLUX', 'VOID', 'NEXUS',
            'APEX', 'ZENITH', 'TITAN', 'NOVA', 'AURA', 'ECHO', 'PULSE', 'WAVE', 'BEAM',
            'STORM', 'FIRE', 'ICE', 'LIGHT', 'SHADOW', 'CRYSTAL', 'STEEL', 'GOLD', 'PLASMA',
            'FUSION', 'ATOMIC', 'COSMIC', 'STELLAR', 'LUNAR', 'SOLAR'
        ],

        middles: [
            'FORGE', 'BUILD', 'CODE', 'HACK', 'CRAFT', 'DESIGN', 'CREATE', 'BREAK', 'MAKE',
            'WEAVE', 'SHAPE', 'BEND', 'TWIST', 'FLOW', 'RUSH', 'DASH', 'LEAP', 'SOAR',
            'DIVE', 'CLIMB', 'RISE', 'FALL', 'SHIFT', 'MOVE', 'DANCE', 'SPIN', 'TURN',
            'BURN', 'FREEZE', 'MELT', 'GLOW', 'SHINE', 'SPARK', 'FLASH', 'BLAST', 'STRIKE',
            'GUARD', 'SHIELD', 'SWORD', 'BLADE', 'ARROW', 'BOLT', 'STORM', 'WIND', 'EARTH',
            'WATER', 'FLAME', 'STEEL', 'IRON', 'TECH', 'DATA', 'NET', 'WEB', 'CLOUD',
            'LINK', 'NODE', 'SYNC', 'FLOW', 'STREAM'
        ],

        suffixes: [
            'MASTER', 'LORD', 'SAGE', 'WIZARD', 'MAGE', 'KNIGHT', 'WARRIOR', 'HUNTER',
            'SCOUT', 'GUARDIAN', 'KEEPER', 'WATCHER', 'SEEKER', 'FINDER', 'WALKER', 'RUNNER',
            'RIDER', 'PILOT', 'CAPTAIN', 'CHIEF', 'LEADER', 'GUIDE', 'MENTOR', 'TEACHER',
            'CREATOR', 'BUILDER', 'MAKER', 'DESIGNER', 'ARCHITECT', 'ENGINEER', 'ARTIST',
            'PIONEER', 'VISIONARY', 'EXPLORER', 'NAVIGATOR', 'CATALYST', 'INNOVATOR', 'THINKER',
            'HACKER', 'CODER', 'DEVELOPER'
        ]
    }

    // Enhanced purpose templates and vocabulary (200+ combinations)
    const purposeTemplates = [
        'AI {field} and {action}',
        '{type} collaboration and {skill}',
        '{industry} {outcome} and {direction}',
        'Revolutionary {technology} {application}',
        'Next-generation {domain} {solution}',
        'Cutting-edge {field} {innovation}',
        'Advanced {system} {development}',
        'Future-ready {platform} {creation}',
        'Intelligent {process} {optimization}',
        'Sustainable {approach} {implementation}',
        'Collaborative {framework} building',
        'Strategic {domain} transformation'
    ]

    const purposeVocabulary = {
        field: ['development', 'research', 'innovation', 'design', 'architecture', 'analytics', 'intelligence', 'automation'],
        action: ['innovation', 'transformation', 'evolution', 'advancement', 'breakthrough', 'revolution', 'disruption', 'optimization'],
        type: ['Technical', 'Strategic', 'Creative', 'Analytical', 'Innovative', 'Collaborative', 'Visionary', 'Disruptive'],
        skill: ['mentorship', 'leadership', 'expertise', 'guidance', 'consulting', 'coaching', 'training', 'development'],
        industry: ['Business', 'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Media'],
        outcome: ['growth', 'success', 'excellence', 'optimization', 'efficiency', 'scalability', 'sustainability', 'innovation'],
        direction: ['forward', 'upward', 'globally', 'strategically', 'systematically', 'innovatively', 'collaboratively', 'efficiently'],
        technology: ['blockchain', 'AI/ML', 'IoT', 'cloud', 'edge computing', 'quantum', 'AR/VR', '5G'],
        application: ['solutions', 'platforms', 'systems', 'frameworks', 'architectures', 'ecosystems', 'networks', 'services'],
        domain: ['fintech', 'healthtech', 'edtech', 'cleantech', 'biotech', 'proptech', 'agritech', 'insurtech'],
        solution: ['innovation', 'disruption', 'transformation', 'optimization', 'automation', 'intelligence', 'integration', 'deployment'],
        innovation: ['breakthrough', 'advancement', 'revolution', 'evolution', 'transformation', 'paradigm', 'disruption', 'milestone'],
        system: ['ecosystem', 'platform', 'infrastructure', 'architecture', 'network', 'framework', 'environment', 'foundation'],
        development: ['engineering', 'creation', 'building', 'construction', 'implementation', 'deployment', 'execution', 'delivery'],
        platform: ['ecosystem', 'infrastructure', 'architecture', 'foundation', 'framework', 'environment', 'network', 'hub'],
        creation: ['development', 'innovation', 'design', 'engineering', 'building', 'construction', 'crafting', 'forging'],
        process: ['workflow', 'system', 'operation', 'procedure', 'methodology', 'framework', 'protocol', 'pipeline'],
        optimization: ['enhancement', 'improvement', 'refinement', 'advancement', 'evolution', 'transformation', 'acceleration', 'boost'],
        approach: ['methodology', 'strategy', 'framework', 'system', 'process', 'solution', 'model', 'paradigm'],
        implementation: ['deployment', 'execution', 'integration', 'application', 'realization', 'actualization', 'rollout', 'launch'],
        framework: ['architecture', 'infrastructure', 'platform', 'ecosystem', 'foundation', 'structure', 'system', 'model']
    }

    // Enhanced goal templates and vocabulary (300+ combinations)
    const goalTemplates = [
        'Build {adjective} {product} {solutions}',
        'Connect with {industry} {professionals}',
        'Launch {type} {venture}',
        'Create {characteristic} {technology} {outcomes}',
        'Lead {domain} {initiatives}',
        'Develop {innovation} {technologies}',
        'Foster {community} {networks}',
        'Drive {impact} through {method}',
        'Establish {position} in {field}',
        'Pioneer {future} of {sector}',
        'Transform {industry} through {approach}',
        'Revolutionize {process} with {technology}',
        'Accelerate {outcome} via {method}',
        'Scale {solution} across {market}',
        'Optimize {system} for {benefit}',
        'Democratize {resource} through innovation'
    ]

    const goalVocabulary = {
        adjective: ['revolutionary', 'groundbreaking', 'innovative', 'cutting-edge', 'next-generation', 'intelligent', 'sustainable', 'transformative'],
        product: ['AI applications', 'platforms', 'solutions', 'systems', 'tools', 'services', 'experiences', 'products'],
        solutions: ['globally', 'efficiently', 'sustainably', 'scalably', 'intelligently', 'collaboratively', 'rapidly', 'seamlessly'],
        industry: ['technology', 'business', 'creative', 'scientific', 'academic', 'startup', 'corporate', 'enterprise'],
        professionals: ['leaders', 'innovators', 'pioneers', 'experts', 'visionaries', 'entrepreneurs', 'creators', 'thinkers'],
        type: ['next-generation', 'disruptive', 'sustainable', 'scalable', 'intelligent', 'collaborative', 'innovative', 'breakthrough'],
        venture: ['startup', 'platform', 'ecosystem', 'network', 'community', 'marketplace', 'solution', 'enterprise'],
        characteristic: ['sustainable', 'intelligent', 'adaptive', 'scalable', 'secure', 'efficient', 'innovative', 'transformative'],
        technology: ['tech', 'AI', 'blockchain', 'cloud', 'IoT', 'quantum', 'biotech', 'nanotech'],
        outcomes: ['worldwide', 'at scale', 'efficiently', 'sustainably', 'intelligently', 'collaboratively', 'rapidly', 'successfully'],
        domain: ['transformation', 'innovation', 'development', 'research', 'consulting', 'education', 'entrepreneurship', 'leadership'],
        initiatives: ['programs', 'projects', 'strategies', 'frameworks', 'methodologies', 'solutions', 'systems', 'movements'],
        innovation: ['breakthrough', 'disruptive', 'transformative', 'revolutionary', 'cutting-edge', 'advanced', 'intelligent', 'pioneering'],
        technologies: ['solutions', 'platforms', 'systems', 'frameworks', 'architectures', 'ecosystems', 'networks', 'applications'],
        community: ['innovation', 'technology', 'startup', 'creative', 'collaborative', 'learning', 'development', 'entrepreneur'],
        networks: ['ecosystems', 'communities', 'platforms', 'hubs', 'clusters', 'alliances', 'partnerships', 'collaborations'],
        impact: ['social change', 'innovation', 'transformation', 'progress', 'advancement', 'evolution', 'revolution', 'disruption'],
        method: ['technology', 'collaboration', 'innovation', 'education', 'research', 'development', 'entrepreneurship', 'automation'],
        position: ['thought leadership', 'market presence', 'industry expertise', 'innovation leadership', 'technical authority', 'domain mastery'],
        field: ['technology', 'innovation', 'business', 'education', 'research', 'development', 'entrepreneurship', 'sustainability'],
        future: ['the future', 'next chapter', 'evolution', 'transformation', 'revolution', 'advancement', 'progress', 'innovation'],
        sector: ['digital identity', 'technology', 'innovation', 'business', 'education', 'sustainability', 'healthcare', 'finance'],
        approach: ['innovation', 'technology', 'collaboration', 'automation', 'intelligence', 'sustainability', 'efficiency', 'transformation'],
        process: ['workflows', 'operations', 'systems', 'experiences', 'interactions', 'transactions', 'communications', 'processes'],
        outcome: ['growth', 'innovation', 'efficiency', 'sustainability', 'accessibility', 'connectivity', 'intelligence', 'scalability'],
        market: ['industries', 'sectors', 'regions', 'communities', 'organizations', 'enterprises', 'ecosystems', 'markets'],
        system: ['processes', 'workflows', 'operations', 'infrastructures', 'platforms', 'architectures', 'frameworks', 'environments'],
        benefit: ['efficiency', 'scalability', 'sustainability', 'accessibility', 'security', 'performance', 'usability', 'reliability'],
        resource: ['technology', 'knowledge', 'tools', 'services', 'opportunities', 'innovations', 'solutions', 'platforms']
    }

    // Random generation functions
    // Helper function to fill template with random vocabulary
    const fillTemplate = (template: string, vocabulary: any): string => {
        let result = template
        const placeholderRegex = /\{(\w+)\}/g

        result = result.replace(placeholderRegex, (match, key) => {
            const options = vocabulary[key]
            if (options && options.length > 0) {
                return options[Math.floor(Math.random() * options.length)]
            }
            return match
        })

        return result
    }

    // Enhanced random generation with massive vocabulary
    const generateRandomPurpose = () => {
        const template = purposeTemplates[Math.floor(Math.random() * purposeTemplates.length)]
        return fillTemplate(template, purposeVocabulary)
    }

    const generateRandomGoal = () => {
        const template = goalTemplates[Math.floor(Math.random() * goalTemplates.length)]
        return fillTemplate(template, goalVocabulary)
    }

    const generateRandomCallsign = () => {
        // Multi-strategy approach for diversity
        const strategy = Math.random()

        if (strategy < 0.7) {
            // Strategy 1: Prefix + Middle + Suffix (70% - 120,000 combinations)
            const prefix = nameComponents.prefixes[Math.floor(Math.random() * nameComponents.prefixes.length)]
            const middle = nameComponents.middles[Math.floor(Math.random() * nameComponents.middles.length)]
            const suffix = nameComponents.suffixes[Math.floor(Math.random() * nameComponents.suffixes.length)]
            return `${prefix} ${middle} ${suffix}`
        } else if (strategy < 0.9) {
            // Strategy 2: Prefix + Suffix with number (20% - 2,050 combinations)
            const prefix = nameComponents.prefixes[Math.floor(Math.random() * nameComponents.prefixes.length)]
            const suffix = nameComponents.suffixes[Math.floor(Math.random() * nameComponents.suffixes.length)]
            const number = Math.floor(Math.random() * 999) + 1
            return `${prefix} ${suffix} ${number}`
        } else {
            // Strategy 3: Two middles (10% - 3,600 combinations)
            const middle1 = nameComponents.middles[Math.floor(Math.random() * nameComponents.middles.length)]
            const middle2 = nameComponents.middles[Math.floor(Math.random() * nameComponents.middles.length)]
            return `${middle1} ${middle2}`
        }
    }

    const generateRandomPersonality = () => {
        const randomIndex = Math.floor(Math.random() * personalityTypes.length)
        return personalityTypes[randomIndex].value
    }

    const generateRandomTribe = () => {
        const randomIndex = Math.floor(Math.random() * futureTribeOptions.length)
        return futureTribeOptions[randomIndex].value
    }

    const generateRandomCity = () => {
        if (citiesData.length === 0) return ''
        const randomIndex = Math.floor(Math.random() * citiesData.length)
        return citiesData[randomIndex].code
    }

    const generateBiometricAlgorithm = (countryCode: string, phone: string, dob: string) => {
        // Helper function to reduce digits to single root digit
        const reduceToSingleDigit = (num: number): number => {
            while (num >= 10) {
                num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
            }
            return num
        }

        // Get all phone digits (country code + phone number)
        const allPhoneDigits = (countryCode + phone).replace(/\D/g, '')
        const phoneSum = allPhoneDigits.split('').reduce((sum, digit) => sum + parseInt(digit), 0)
        const phoneRoot = reduceToSingleDigit(phoneSum)

        // Get DOB digits and reduce to single digit
        const dobDigits = dob.replace(/\D/g, '') // Remove dashes, keep only digits
        const dobSum = dobDigits.split('').reduce((sum, digit) => sum + parseInt(digit), 0)
        const dobRoot = reduceToSingleDigit(dobSum)

        // Calculate difference: DOB root - Phone root
        let difference = dobRoot - phoneRoot
        // If negative, add 9 to make it positive single digit
        if (difference < 0) {
            difference += 9
        }
        // Ensure it's still a single digit
        if (difference >= 10) {
            difference = reduceToSingleDigit(difference)
        }

        // Create I-ID: Full phone digits + difference
        const iid = allPhoneDigits + difference.toString()

        return iid
    }

    const handleGenerateVirtualIP = () => {
        if (!formData.phone || !formData.dateOfBirth) {
            return
        }

        setIsGenerating(true)

        setTimeout(() => {
            const virtualIP = generateBiometricAlgorithm(formData.countryCode, formData.phone, formData.dateOfBirth)
            setFormData({ ...formData, virtualIP })
            setIsAvailable(true) // Assume generated IPs are always available for demo
            setIsGenerating(false)
        }, 2000) // Simulate processing time
    }

    const generateFinalID = () => {
        // Convert spaces to underscores and clean callsign: allow A-Z a-z 0-9 _ -
        const cleanCallsign = formData.callsign
            .replace(/\s+/g, '_')  // Convert spaces to underscores
            .replace(/[^A-Za-z0-9_-]/g, '')  // Remove any other special characters
            .toUpperCase()  // Convert to uppercase

        // Create Avatar ID: {tribe}.{city}.{callsign} - All uppercase
        const avatarID = `${formData.futureTribe}.${formData.cityCode}.${cleanCallsign}`.toUpperCase()

        setFormData({ ...formData, generatedID: avatarID })
    }

    // Auto-generate final ID when reaching step 2 (Payment & Activation)
    useEffect(() => {
        if (currentStep === 2 && !formData.generatedID && formData.futureTribe && formData.cityCode && formData.callsign) {
            generateFinalID()
        }
    }, [currentStep])

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <section id="iid" className="py-20 relative overflow-hidden">
            {/* Background Effects - OPTIMIZED: Reduced blur from blur-3xl to blur-2xl */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Create Your <NeonText>Digital DNA</NeonText>
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Transform your personal data into a unique digital identity. Join your Future Tribe and unlock the IPNOTEC ecosystem.
                    </p>
                </div>

                {/* Progress Steps - Top */}
                <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
                    {/* Mobile & Tablet - Enhanced Compact Horizontal Stepper */}
                    <div className="md:hidden">
                        <div className="relative px-4 sm:px-6">
                            {/* Progress Line Background */}
                            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 mx-[15%]" />
                            
                            {/* Active Progress Line */}
                            <div 
                                className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-green-400 to-green-500 mx-[15%] transition-all duration-500 ease-out"
                                style={{ 
                                    width: `${(currentStep / (steps.length - 1)) * 70}%`,
                                }}
                            />

                            {/* Steps */}
                            <div className="relative flex items-start justify-between">
                                {steps.map((step, index) => {
                                    const isActive = index === currentStep
                                    const isCompleted = index < currentStep

                                    return (
                                        <div 
                                            key={index} 
                                            className="flex flex-col items-center"
                                            style={{ zIndex: 10 }}
                                        >
                                            {/* Circle with animation */}
                                            <div className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                                                isActive 
                                                    ? 'bg-green-400 text-black shadow-lg shadow-green-400/50 scale-110' 
                                                    : isCompleted 
                                                    ? 'bg-green-400/30 text-green-400 border-2 border-green-400' 
                                                    : 'bg-black/40 backdrop-blur-sm text-white/40 border-2 border-white/20'
                                            }`}>
                                                {isCompleted ? (
                                                    <Check className="w-5 h-5 sm:w-5.5 sm:h-5.5 animate-in zoom-in duration-300" />
                                                ) : (
                                                    <span className={`text-sm sm:text-base font-bold ${isActive ? 'animate-pulse' : ''}`}>
                                                        {index + 1}
                                                    </span>
                                                )}
                                                
                                                {/* Glow effect for active step */}
                                                {isActive && (
                                                    <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
                                                )}
                                            </div>
                                            
                                            {/* Label */}
                                            <div className="text-center max-w-[70px] sm:max-w-[80px]">
                                                <p className={`text-xs sm:text-sm font-medium leading-tight transition-all duration-300 ${
                                                    isActive 
                                                        ? 'text-white font-semibold' 
                                                        : isCompleted 
                                                        ? 'text-green-400/90' 
                                                        : 'text-white/40'
                                                }`}>
                                                    {step.title.split(' ')[0]}
                                                </p>
                                                
                                                {/* Optional subtitle for active step */}
                                                {isActive && (
                                                    <p className="text-[10px] text-white/60 mt-0.5 hidden sm:block animate-in fade-in duration-300">
                                                        {step.title.split(' ').slice(1).join(' ')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Desktop - Full Cards */}
                    <div className="hidden md:grid grid-cols-3 gap-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = index === currentStep
                            const isCompleted = index < currentStep

                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 border border-green-400/30' :
                                        isCompleted ? 'bg-green-400/5 border border-green-400/20' : 'bg-white/5 border border-white/10'
                                        }`}
                                >
                                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${isActive ? 'bg-green-400 text-black' :
                                        isCompleted ? 'bg-green-400/20 text-green-400' :
                                            'bg-white/10 text-white/50'
                                        }`}>
                                        {isCompleted ? (
                                            <Check className="w-8 h-8" />
                                        ) : (
                                            <Icon className="w-8 h-8" />
                                        )}
                                    </div>

                                    <h4 className={`font-semibold mb-2 ${isActive ? 'text-white' :
                                        isCompleted ? 'text-green-400' : 'text-white/70'
                                        }`}>
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-white/60">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Main Form - Centered and Narrowed */}
                <div className="max-w-2xl mx-auto">
                    {/* Main Form */}
                    <div className="w-full">
                        <GlassCard className="p-4 sm:p-6 md:p-8">
                            {currentStep === 0 && (
                                <div className="space-y-5 sm:space-y-6">
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4">Identity Authentication</h4>
                                        <p className="text-white/60 text-sm mb-4 sm:mb-6">
                                            The system collects core personal data to create your unique digital fingerprint
                                        </p>
                                    </div>

                                    <div className="space-y-4 sm:space-y-5">
                                        {/* Country Code & Phone */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                            <div className="space-y-2 relative" ref={countryDropdownRef}>
                                                <label className="text-sm text-white/80 block">Country Code</label>
                                                <div className="relative">
                                                    <div
                                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                        className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white cursor-pointer flex items-center justify-between focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-400/20 transition-all backdrop-blur-sm text-sm sm:text-base"
                                                    >
                                                        <span className="truncate">{formData.countryCode}</span>
                                                        <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                                                    </div>

                                                    {showCountryDropdown && (
                                                        <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 backdrop-blur-lg border border-white/20 rounded-xl max-h-80 sm:max-h-96 overflow-hidden z-50 shadow-2xl">
                                                            <div className="p-2 sm:p-3 border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur-lg">
                                                                <div className="relative">
                                                                    <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search..."
                                                                        value={countrySearch}
                                                                        onChange={(e) => setCountrySearch(e.target.value)}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === 'Escape') {
                                                                                setShowCountryDropdown(false)
                                                                                setCountrySearch('')
                                                                            }
                                                                        }}
                                                                        className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/50 focus:border-green-400 focus:outline-none"
                                                                        autoFocus
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="max-h-60 sm:max-h-72 overflow-y-auto overscroll-contain">
                                                                {countryCodeOptions
                                                                    .filter(option => {
                                                                        const searchLower = countrySearch.toLowerCase()
                                                                        return option.country.toLowerCase().includes(searchLower) ||
                                                                            option.value.toLowerCase().includes(searchLower) ||
                                                                            option.label.toLowerCase().includes(searchLower)
                                                                    })
                                                                    .sort((a, b) => {
                                                                        // Popular countries first
                                                                        const popular = ['+91', '+1', '+44', '+86', '+81', '+49', '+33', '+39', '+61', '+55']
                                                                        const aPopular = popular.includes(a.value)
                                                                        const bPopular = popular.includes(b.value)
                                                                        if (aPopular && !bPopular) return -1
                                                                        if (!aPopular && bPopular) return 1
                                                                        return a.country.localeCompare(b.country)
                                                                    })
                                                                    .map((option) => (
                                                                        <div
                                                                            key={option.value}
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, countryCode: option.value })
                                                                                setShowCountryDropdown(false)
                                                                                setCountrySearch('')
                                                                            }}
                                                                            className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/10 active:bg-white/15 cursor-pointer flex items-center justify-between touch-manipulation"
                                                                        >
                                                                            <span className="text-white text-sm sm:text-base">{option.value}</span>
                                                                            <span className="text-white/60 text-xs sm:text-sm truncate ml-2">{option.country}</span>
                                                                        </div>
                                                                    ))
                                                                }
                                                                {countryCodeOptions.filter(option => {
                                                                    const searchLower = countrySearch.toLowerCase()
                                                                    return option.country.toLowerCase().includes(searchLower) ||
                                                                        option.value.toLowerCase().includes(searchLower) ||
                                                                        option.label.toLowerCase().includes(searchLower)
                                                                }).length === 0 && countrySearch && (
                                                                        <div className="px-3 sm:px-4 py-4 text-white/50 text-center text-xs sm:text-sm">
                                                                            No countries found matching "{countrySearch}"
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <GlassInput
                                                    label="Phone Number"
                                                    placeholder="Enter your phone number"
                                                    value={formData.phone}
                                                    onChange={(value) => setFormData({ ...formData, phone: value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Email Address */}
                                        <GlassInput
                                            label="Email Address"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={(value) => setFormData({ ...formData, email: value })}
                                        />

                                        {/* Date of Birth - Prevents future dates */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-white/80 flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                Date of Birth
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={formData.dateOfBirth}
                                                    max={(() => {
                                                        const yesterday = new Date()
                                                        yesterday.setDate(yesterday.getDate() - 1)
                                                        return yesterday.toISOString().split('T')[0]
                                                    })()}
                                                    min="1900-01-01"
                                                    onChange={(e) => {
                                                        // Ensure the value is in yyyy-MM-dd format
                                                        const value = e.target.value
                                                        if (value) {
                                                            setFormData({ ...formData, dateOfBirth: value })
                                                        }
                                                    }}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all backdrop-blur-sm [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                                    placeholder="YYYY-MM-DD"
                                                />
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <Calendar className="w-4 h-4 text-white/50" />
                                                </div>
                                            </div>
                                            <div className="text-xs text-white/60">
                                                {formData.dateOfBirth && (
                                                    <div className="flex items-center text-green-400">
                                                        <Check className="w-3 h-3 mr-1" />
                                                        Valid date selected: {new Date(formData.dateOfBirth + 'T00:00:00').toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Generate Virtual IP Button - Only show if Virtual IP not generated */}
                                        {!formData.virtualIP && (
                                            <div className="pt-2 sm:pt-4">
                                                <GlassButton
                                                    onClick={handleGenerateVirtualIP}
                                                    disabled={!formData.phone || !formData.email || !formData.dateOfBirth || isGenerating}
                                                    className="w-full text-sm sm:text-base py-3 sm:py-4"
                                                >
                                                    {isGenerating ? (
                                                        <>
                                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin flex-shrink-0" />
                                                            <span className="truncate">Processing...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Zap className="w-4 h-4 mr-2 flex-shrink-0" />
                                                            <span className="truncate">Generate Virtual IP (I-D)</span>
                                                        </>
                                                    )}
                                                </GlassButton>
                                            </div>
                                        )}

                                        {/* Generated Virtual IP Display */}
                                        {formData.virtualIP && (
                                            <div className="p-4 sm:p-5 rounded-xl bg-green-400/10 border border-green-400/30">
                                                <div className="text-xs sm:text-sm text-white/80 mb-2">Your Virtual IP (I-D):</div>
                                                <div className="text-xl sm:text-2xl font-heading font-bold text-green-400 mb-2 break-all">
                                                    {formData.virtualIP}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Check className="w-4 h-4 text-green-400" />
                                                    <span className="text-green-400 text-sm">Digital Identity Created Successfully!</span>
                                                </div>
                                                <p className="text-xs text-white/60 mt-2">
                                                    This is your permanent digital identity key generated from your biometric data.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className="space-y-5 sm:space-y-6">
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4">Avatar Forging</h4>
                                        <p className="text-white/60 text-sm mb-4 sm:mb-6">
                                            Create your personalized digital persona for the IPNOTEC ecosystem
                                        </p>
                                    </div>

                                    <div className="space-y-4 sm:space-y-5">
                                        {/* Purpose Selection */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm text-white/80">Avatar Purpose</label>
                                                <GlassButton
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setFormData({ ...formData, purpose: generateRandomPurpose() })}
                                                    className="text-xs px-2 py-1"
                                                >
                                                    <RefreshCw className="w-3 h-3 mr-1" />
                                                    Random
                                                </GlassButton>
                                            </div>
                                            <GlassInput
                                                placeholder="e.g., AI development, technical collaboration, business networking"
                                                value={formData.purpose}
                                                onChange={(value) => setFormData({ ...formData, purpose: value })}
                                            />
                                        </div>

                                        {/* Goal Definition */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm text-white/80">Primary Goal</label>
                                                <GlassButton
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setFormData({ ...formData, goal: generateRandomGoal() })}
                                                    className="text-xs px-2 py-1"
                                                >
                                                    <RefreshCw className="w-3 h-3 mr-1" />
                                                    Random
                                                </GlassButton>
                                            </div>
                                            <GlassInput
                                                placeholder="What does your avatar seek to achieve?"
                                                value={formData.goal}
                                                onChange={(value) => setFormData({ ...formData, goal: value })}
                                            />
                                        </div>

                                        {/* Personality Type Selection */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-white/80">Personality Type</label>
                                            <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                                                {personalityTypes.map((type) => (
                                                    <div
                                                        key={type.value}
                                                        onClick={() => setFormData({ ...formData, personalityType: type.value })}
                                                        className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all touch-manipulation ${formData.personalityType === type.value
                                                            ? 'border-green-400 bg-green-400/10'
                                                            : 'border-white/20 bg-white/5 hover:border-white/40 active:bg-white/10'
                                                            }`}
                                                    >
                                                        <div className="font-medium text-white text-sm sm:text-base">{type.label}</div>
                                                        <div className="text-xs text-white/60 mt-1">{type.description}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Callsign */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm text-white/80">Callsign</label>
                                                <GlassButton
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setFormData({ ...formData, callsign: generateRandomCallsign() })}
                                                    className="text-xs px-2 py-1"
                                                >
                                                    <RefreshCw className="w-3 h-3 mr-1" />
                                                    Random
                                                </GlassButton>
                                            </div>
                                            <GlassInput
                                                placeholder="Your unique identifier name"
                                                value={formData.callsign}
                                                onChange={(value) => setFormData({ ...formData, callsign: value })}
                                            />
                                        </div>

                                        {/* City Selection */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-white/80">City Code</label>
                                            <div className="relative" ref={cityDropdownRef}>
                                                <div
                                                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                                                    className="w-full px-3 sm:px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white cursor-pointer hover:border-white/40 transition-all backdrop-blur-sm touch-manipulation flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {formData.cityCode ? (
                                                            <>
                                                                <span className="bg-gradient-primary text-black px-2 py-1 rounded text-xs font-bold flex-shrink-0">
                                                                    {formData.cityCode}
                                                                </span>
                                                                <span className="text-sm sm:text-base truncate">
                                                                    {citiesData.find(c => c.code === formData.cityCode)?.name || 'Select city'}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-white/50 text-sm sm:text-base">
                                                                {isLoadingCities ? 'Loading cities...' : 'Select your city code'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <ChevronDown className={`w-4 h-4 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                                                </div>

                                                {showCityDropdown && (
                                                    <div className="absolute z-50 w-full mt-2 rounded-lg border border-white/20 bg-black/90 backdrop-blur-md shadow-xl">
                                                        <div className="p-3 border-b border-white/10">
                                                            <div className="relative">
                                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search by city name or code..."
                                                                    value={citySearch}
                                                                    onChange={(e) => {
                                                                        setCitySearch(e.target.value)
                                                                        setDisplayedCitiesCount(50) // Reset to 50 on new search
                                                                    }}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 text-sm"
                                                                    autoFocus
                                                                />
                                                            </div>
                                                        </div>
                                                        <div 
                                                            className="max-h-60 sm:max-h-72 overflow-y-auto overscroll-contain"
                                                            onScroll={(e) => {
                                                                const target = e.target as HTMLDivElement
                                                                const scrollPercentage = (target.scrollTop + target.clientHeight) / target.scrollHeight
                                                                
                                                                // Load more when scrolled 80% down
                                                                if (scrollPercentage > 0.8 && displayedCitiesCount < citiesData.length) {
                                                                    setDisplayedCitiesCount(prev => Math.min(prev + 50, citiesData.length))
                                                                }
                                                            }}
                                                        >
                                                            {/* Only render the displayed subset */}
                                                            {citiesData.slice(0, displayedCitiesCount).map((city) => (
                                                                <div
                                                                    key={`${city.code}-${city.name}`}
                                                                    onClick={() => {
                                                                        setFormData({ ...formData, cityCode: city.code })
                                                                        setShowCityDropdown(false)
                                                                        setCitySearch('')
                                                                        setDisplayedCitiesCount(50)
                                                                    }}
                                                                    className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/10 active:bg-white/15 cursor-pointer flex items-center gap-3 touch-manipulation"
                                                                >
                                                                    <span className="bg-gradient-primary text-black px-2 py-1 rounded text-xs font-bold flex-shrink-0">
                                                                        {city.code}
                                                                    </span>
                                                                    <span className="text-white text-sm sm:text-base truncate">{city.name}</span>
                                                                </div>
                                                            ))}
                                                            
                                                            {/* Show loading indicator when more cities available */}
                                                            {displayedCitiesCount < citiesData.length && !isLoadingCities && (
                                                                <div className="px-3 sm:px-4 py-3 text-white/50 text-center text-xs">
                                                                    Showing {displayedCitiesCount} of {citiesData.length} cities. Scroll for more...
                                                                </div>
                                                            )}
                                                            
                                                            {/* No results message */}
                                                            {citiesData.length === 0 && citySearch && citySearch.length >= 2 && !isLoadingCities && (
                                                                <div className="px-3 sm:px-4 py-4 text-white/50 text-center text-xs sm:text-sm">
                                                                    No cities found matching "{citySearch}"
                                                                </div>
                                                            )}
                                                            
                                                            {/* Message for search less than 2 characters */}
                                                            {citySearch && citySearch.length < 2 && !isLoadingCities && (
                                                                <div className="px-3 sm:px-4 py-4 text-white/50 text-center text-xs sm:text-sm">
                                                                    Type at least 2 characters to search
                                                                </div>
                                                            )}
                                                            
                                                            {/* Tip for no search */}
                                                            {!citySearch && citiesData.length > 0 && !isLoadingCities && (
                                                                <div className="px-3 sm:px-4 py-3 text-white/50 text-center text-xs">
                                                                    💡 Type to search by city name or code (e.g., "Mumbai" or "BOM")
                                                                </div>
                                                            )}
                                                            
                                                            {/* Loading state */}
                                                            {isLoadingCities && (
                                                                <div className="px-3 sm:px-4 py-4 text-white/50 text-center text-xs sm:text-sm flex items-center justify-center gap-2">
                                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                                    <span>Searching cities...</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Future Tribe Selection */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm text-white/80">Future Tribe</label>
                                                <GlassButton
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setFormData({ ...formData, futureTribe: generateRandomTribe() })}
                                                    className="text-xs px-2 py-1"
                                                >
                                                    <RefreshCw className="w-3 h-3 mr-1" />
                                                    Random
                                                </GlassButton>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2.5 sm:gap-3 max-h-72 sm:max-h-80 overflow-y-auto overscroll-contain rounded-lg border border-white/10 p-2">
                                                {futureTribeOptions.map((tribe) => (
                                                    <div
                                                        key={tribe.value}
                                                        onClick={() => setFormData({ ...formData, futureTribe: tribe.value })}
                                                        className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all touch-manipulation ${formData.futureTribe === tribe.value
                                                            ? 'bg-white/10 shadow-lg border-2'
                                                            : 'bg-white/5 hover:bg-white/10 active:bg-white/15 border-2'
                                                            }`}
                                                        style={{ 
                                                            borderColor: tribe.color,
                                                            borderStyle: formData.futureTribe === tribe.value ? 'dashed' : 'solid',
                                                            borderWidth: '2px'
                                                        }}
                                                    >
                                                        <div className="font-medium text-white flex flex-col sm:flex-row sm:items-center text-sm sm:text-base">
                                                            <span 
                                                                className="text-black px-2 py-1 rounded text-xs font-bold mr-0 sm:mr-2 mb-1 sm:mb-0 inline-block self-start"
                                                                style={{ backgroundColor: tribe.color }}
                                                            >
                                                                {tribe.value}
                                                            </span>
                                                            <span className="break-words">{tribe.label}</span>
                                                        </div>
                                                        <div className="text-xs text-white/60 mt-1.5 sm:mt-1">{tribe.description}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Avatar Summary */}
                                        {formData.callsign && formData.futureTribe && formData.cityCode && (
                                            <div className="p-4 sm:p-5 rounded-xl bg-blue-400/10 border border-blue-400/30">
                                                <div className="text-xs sm:text-sm text-white/80 mb-2">Avatar Preview:</div>
                                                <div className="text-base sm:text-lg font-heading font-bold text-blue-400 break-all uppercase">
                                                    {formData.futureTribe}.{formData.cityCode}.{formData.callsign.replace(/\s+/g, '_')}
                                                </div>
                                                <div className="text-sm text-white/60 mt-1">
                                                    {personalityTypes.find(t => t.value === formData.personalityType)?.label} Avatar from {citiesData.find(c => c.code === formData.cityCode)?.name}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-5 sm:space-y-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6">
                                            <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
                                        </div>

                                        <h4 className="text-xl sm:text-2xl font-heading font-bold mb-2">Payment & Activation</h4>
                                        <p className="text-white/60 text-sm sm:text-base">
                                            Unlock the full IPNOTEC ecosystem and activate your digital identity
                                        </p>
                                    </div>

                                    {/* Display Generated Unique ID - Auto-generated from step 2 */}
                                    {formData.generatedID && (
                                        <div className="p-4 sm:p-6 rounded-xl bg-black/40 border border-white/20 text-center">
                                            <div className="text-xs sm:text-sm text-white/80 mb-2">Your Unique Digital Identity Code:</div>
                                            <div className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2 break-all px-2 uppercase">
                                                {formData.generatedID}
                                            </div>
                                            <div className="text-xs text-white/60">
                                                This is your permanent key to the IPNOTEC ecosystem
                                            </div>
                                        </div>
                                    )}

                                    {/* Registration Summary */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-sm sm:text-base text-white/60 mb-3">Complete Registration Summary:</div>
                                        <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                                            <div className="flex justify-between gap-2">
                                                <span className="flex-shrink-0">Virtual IP (I-D):</span>
                                                <span className="font-mono text-green-400 break-all text-right">{formData.virtualIP}</span>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="flex-shrink-0">Avatar Callsign:</span>
                                                <span className="text-blue-400 break-all text-right">{formData.callsign.replace(/_/g, ' ')}</span>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="flex-shrink-0">Future Tribe:</span>
                                                <span className="text-purple-400 break-words text-right">
                                                    {futureTribeOptions.find(t => t.value === formData.futureTribe)?.label || formData.futureTribe}
                                                </span>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="flex-shrink-0">City Code:</span>
                                                <span className="text-cyan-400 break-words text-right">
                                                    {citiesData.find(c => c.code === formData.cityCode)?.name || formData.cityCode}
                                                </span>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="flex-shrink-0">Personality Type:</span>
                                                <span className="text-right">{formData.personalityType}</span>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="flex-shrink-0">Email:</span>
                                                <span className="break-all text-right text-xs sm:text-sm">{formData.email}</span>
                                            </div>
                                            <div className="border-t border-white/10 pt-2.5 sm:pt-3 mt-3">
                                                <div className="flex justify-between font-bold text-base sm:text-lg gap-2">
                                                    <span className="flex-shrink-0">IPNOTEC Access:</span>
                                                    <span className="text-green-400">₹1,001</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* What You Get */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 border border-purple-400/30">
                                        <div className="text-sm sm:text-base font-semibold text-white mb-3">🚀 What You Get:</div>
                                        <div className="grid grid-cols-1 gap-2.5 sm:gap-3 text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Check className="w-4 h-4 text-green-400" />
                                                <span>Unique Digital DNA from personal data</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Check className="w-4 h-4 text-green-400" />
                                                <span>Customized Avatar for your Future Tribe</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Check className="w-4 h-4 text-green-400" />
                                                <span>Exclusive access to IPNOTEC network</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Check className="w-4 h-4 text-green-400" />
                                                <span>AI-powered matching & premium features</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Check className="w-4 h-4 text-green-400" />
                                                <span>Future 11 event exclusive access</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-6 sm:pt-8">
                                {currentStep > 0 && (
                                    <GlassButton 
                                        variant="ghost" 
                                        onClick={handleBack}
                                        className="w-full sm:w-auto order-2 sm:order-1"
                                    >
                                        Back
                                    </GlassButton>
                                )}

                                <div className={`${currentStep > 0 ? 'order-1 sm:order-2 sm:ml-auto' : 'ml-auto'} w-full sm:w-auto`}>
                                    {currentStep < steps.length - 1 ? (
                                        <>
                                            {/* Only show "Proceed to Avatar Forging" button if Virtual IP is generated on step 0 */}
                                            {(currentStep === 0 && formData.virtualIP) || currentStep > 0 ? (
                                                <GlassButton
                                                    onClick={handleNext}
                                                    disabled={
                                                        (currentStep === 1 && (!formData.purpose || !formData.callsign || !formData.futureTribe || !formData.personalityType || !formData.cityCode))
                                                    }
                                                    className="w-full sm:w-auto text-sm sm:text-base"
                                                >
                                                    <span className="truncate">
                                                        {currentStep === 0 ? 'Proceed to Avatar Forging' : 'Proceed to Payment'}
                                                    </span>
                                                </GlassButton>
                                            ) : null}
                                        </>
                                    ) : (
                                        <GlassButton
                                            size="lg"
                                            className="px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
                                            disabled={!formData.generatedID}
                                            onClick={() => setFormData({ ...formData, isActivated: true })}
                                        >
                                            <CreditCard className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">Pay ₹1,001 & Activate</span>
                                        </GlassButton>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Process Features - Bottom */}
                <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
                    <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4">The Complete Process</h3>
                        <p className="text-white/60 text-sm sm:text-base px-4">Advanced algorithms and personalized features for your digital identity</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        {[
                            { icon: Zap, text: 'Biometric identity algorithm' },
                            { icon: User, text: 'Personalized avatar creation' },
                            { icon: Users, text: 'Future tribe network access' },
                            { icon: Shield, text: 'AI-powered matching system' },
                            { icon: Sparkles, text: 'Premium ecosystem features' }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                            >
                                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mb-2 sm:mb-3 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-white/70 leading-tight">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}