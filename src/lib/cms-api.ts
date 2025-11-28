/**
 * Payload CMS REST API Integration
 * Use this in your frontend to fetch and display event data
 */

// Type definitions
interface EventFilters {
  status?: string
  limit?: number
  page?: number
  sort?: string
}

// Configuration
const CMS_API_URL = process.env.REACT_APP_CMS_URL || 'http://localhost:3000/api'

// ============================================================================
// EVENTS API
// ============================================================================

/**
 * Get all published events
 */
export async function fetchEvents(filters: EventFilters = {}) {
  try {
    const params = new URLSearchParams()

    // Filter by status
    if (filters.status) {
      params.append('where[status][equals]', filters.status)
    }

    // Pagination
    if (filters.limit) params.append('limit', filters.limit.toString())
    if (filters.page) params.append('page', filters.page.toString())

    // Sorting
    if (filters.sort) params.append('sort', filters.sort)

    const response = await fetch(`${CMS_API_URL}/events?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

/**
 * Get single event by ID
 */
export async function fetchEventById(eventId: string) {
  try {
    const response = await fetch(`${CMS_API_URL}/events/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching event:', error)
    throw error
  }
}

/**
 * Get events by date range
 */
export async function fetchEventsByDateRange(startDate: string, endDate: string) {
  try {
    const params = new URLSearchParams()
    params.append('where[startDate][greater_than_equal]', startDate)
    params.append('where[endDate][less_than_equal]', endDate)
    params.append('where[status][equals]', 'published')

    const response = await fetch(`${CMS_API_URL}/events?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching events by date range:', error)
    throw error
  }
}

// ============================================================================
// SPEAKERS API
// ============================================================================

/**
 * Get all speakers
 */
export async function fetchSpeakers(limit: number = 100) {
  try {
    const response = await fetch(`${CMS_API_URL}/speakers?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch speakers: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching speakers:', error)
    throw error
  }
}

/**
 * Get single speaker by ID
 */
export async function fetchSpeakerById(speakerId: string) {
  try {
    const response = await fetch(`${CMS_API_URL}/speakers/${speakerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch speaker: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching speaker:', error)
    throw error
  }
}

// ============================================================================
// VENUES API
// ============================================================================

/**
 * Get all venues
 */
export async function fetchVenues(limit: number = 100) {
  try {
    const response = await fetch(`${CMS_API_URL}/venues?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch venues: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching venues:', error)
    throw error
  }
}

/**
 * Get single venue by ID
 */
export async function fetchVenueById(venueId: string) {
  try {
    const response = await fetch(`${CMS_API_URL}/venues/${venueId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch venue: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching venue:', error)
    throw error
  }
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

/**
 * Login user
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${CMS_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`)
    }

    const data = await response.json()

    // Store token
    if (data.token) {
      localStorage.setItem('cms_token', data.token)
      localStorage.setItem('cms_user', JSON.stringify(data.user))
    }

    return data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

/**
 * Logout user
 */
export async function logoutUser() {
  try {
    const token = localStorage.getItem('cms_token')

    if (!token) {
      console.warn('No token found')
      localStorage.removeItem('cms_token')
      localStorage.removeItem('cms_user')
      return
    }

    const response = await fetch(`${CMS_API_URL}/users/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    // Clear local storage regardless of response
    localStorage.removeItem('cms_token')
    localStorage.removeItem('cms_user')

    return response.ok
  } catch (error) {
    console.error('Error logging out:', error)
    localStorage.removeItem('cms_token')
    localStorage.removeItem('cms_user')
    throw error
  }
}

/**
 * Get current user info
 */
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('cms_token')

    if (!token) {
      return null
    }

    const response = await fetch(`${CMS_API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('cms_token')
        return null
      }
      throw new Error('Failed to fetch current user')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

/**
 * Get stored token
 */
export function getToken() {
  return localStorage.getItem('cms_token')
}

/**
 * Set token
 */
export function setToken(token: string) {
  localStorage.setItem('cms_token', token)
}

/**
 * Clear token
 */
export function clearToken() {
  localStorage.removeItem('cms_token')
  localStorage.removeItem('cms_user')
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!localStorage.getItem('cms_token')
}

// ============================================================================
// HELPER: Format event data for display
// ============================================================================

export function formatEvent(event: Record<string, unknown>) {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    startDate: new Date(event.startDate as string).toLocaleDateString(),
    endDate: event.endDate ? new Date(event.endDate as string).toLocaleDateString() : null,
    startTime: event.startTime || 'TBA',
    endTime: event.endTime || 'TBA',
    venue: event.venue,
    speakers: event.speakers || [],
    capacity: event.capacity,
    registeredCount: event.registeredCount || 0,
    featuredImage: event.featuredImage,
    status: event.status,
    tags: event.tags || [],
  }
}

export function formatSpeaker(speaker: Record<string, unknown>) {
  return {
    id: speaker.id,
    name: speaker.name,
    email: speaker.email,
    bio: speaker.bio,
    photo: speaker.photo,
    role: speaker.role,
    company: speaker.company,
    social: speaker.social || [],
  }
}

export function formatVenue(venue: Record<string, unknown>) {
  return {
    id: venue.id,
    name: venue.name,
    address: venue.address,
    city: venue.city,
    state: venue.state,
    country: venue.country,
    zipCode: venue.zipCode,
    capacity: venue.capacity,
    mapLink: venue.mapLink,
    image: venue.image,
    amenities: venue.amenities || [],
  }
}
