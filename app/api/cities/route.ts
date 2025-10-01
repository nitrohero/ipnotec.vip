import { NextRequest, NextResponse } from 'next/server'
import citiesData from '@/public/data/city-iata.json'

// Transform and cache the cities data once, removing duplicates
const citiesMap = new Map()
citiesData.forEach((item: any) => {
    const code = item['city code']
    const name = item['city name']
    // Keep first occurrence of each city code
    if (!citiesMap.has(code)) {
        citiesMap.set(code, { code, name })
    }
})
const cities = Array.from(citiesMap.values())

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    try {
        // Filter cities based on search
        let filtered = cities

        if (search && search.length >= 2) {
            const searchLower = search.toLowerCase()
            filtered = cities.filter((city: any) =>
                city.name.toLowerCase().includes(searchLower) ||
                city.code.toLowerCase().includes(searchLower)
            )

            // Sort with priority for matches at start
            filtered.sort((a: any, b: any) => {
                const aStartsWith = a.name.toLowerCase().startsWith(searchLower) || 
                                   a.code.toLowerCase().startsWith(searchLower)
                const bStartsWith = b.name.toLowerCase().startsWith(searchLower) || 
                                   b.code.toLowerCase().startsWith(searchLower)
                if (aStartsWith && !bStartsWith) return -1
                if (!aStartsWith && bStartsWith) return 1
                return a.name.localeCompare(b.name)
            })
        } else if (search && search.length > 0) {
            // If search is only 1 character, return empty to avoid showing all cities
            filtered = []
        } else {
            // Sort alphabetically when no search
            filtered = [...cities].sort((a: any, b: any) => a.name.localeCompare(b.name))
        }

        // Paginate results
        const total = filtered.length
        const results = filtered.slice(offset, offset + limit)

        return NextResponse.json({
            results,
            total,
            hasMore: offset + limit < total
        })
    } catch (error) {
        console.error('Error fetching cities:', error)
        return NextResponse.json(
            { error: 'Failed to fetch cities' },
            { status: 500 }
        )
    }
}
