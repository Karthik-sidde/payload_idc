// Frontend Integration Guide
// Example using fetch (works in any JavaScript environment)

const CMS_URL = 'http://localhost:3000'; // Change to your deployed CMS URL
const API_BASE = `${CMS_URL}/api`;

// ============================================================================
// EVENTS
// ============================================================================

// Get all events
export async function getEvents(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.append('where[status][equals]', filters.status);
  if (filters.limit) params.append('limit', filters.limit);
  
  const response = await fetch(`${API_BASE}/events?${params}`);
  return response.json();
}

// Get single event
export async function getEvent(id) {
  const response = await fetch(`${API_BASE}/events/${id}`);
  return response.json();
}

// Create event (requires authentication)
export async function createEvent(eventData, token) {
  const response = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
}

// Update event
export async function updateEvent(id, eventData, token) {
  const response = await fetch(`${API_BASE}/events/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
}

// Delete event
export async function deleteEvent(id, token) {
  const response = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

// ============================================================================
// SPEAKERS
// ============================================================================

export async function getSpeakers(limit = 100) {
  const response = await fetch(`${API_BASE}/speakers?limit=${limit}`);
  return response.json();
}

export async function getSpeaker(id) {
  const response = await fetch(`${API_BASE}/speakers/${id}`);
  return response.json();
}

export async function createSpeaker(speakerData, token) {
  const response = await fetch(`${API_BASE}/speakers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(speakerData),
  });
  return response.json();
}

// ============================================================================
// VENUES
// ============================================================================

export async function getVenues(limit = 100) {
  const response = await fetch(`${API_BASE}/venues?limit=${limit}`);
  return response.json();
}

export async function getVenue(id) {
  const response = await fetch(`${API_BASE}/venues/${id}`);
  return response.json();
}

export async function createVenue(venueData, token) {
  const response = await fetch(`${API_BASE}/venues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(venueData),
  });
  return response.json();
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.token) {
    // Store token securely (consider using httpOnly cookies for production)
    localStorage.setItem('cms_token', data.token);
  }
  return data;
}

export async function logoutUser(token) {
  const response = await fetch(`${API_BASE}/users/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  localStorage.removeItem('cms_token');
  return response.json();
}

export async function getCurrentUser(token) {
  const response = await fetch(`${API_BASE}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

// ============================================================================
// HELPER: Store and retrieve token
// ============================================================================

export function getStoredToken() {
  return localStorage.getItem('cms_token');
}

export function setStoredToken(token) {
  localStorage.setItem('cms_token', token);
}

export function clearStoredToken() {
  localStorage.removeItem('cms_token');
}

// ============================================================================
// EXAMPLE USAGE IN REACT COMPONENT
// ============================================================================

/*
import { useEffect, useState } from 'react';
import { getEvents, loginUser, getStoredToken } from './cms-api';

export function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents({ status: 'published' })
      .then(data => setEvents(data.docs))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Events</h1>
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Date: {new Date(event.startDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.token) {
      console.log('Login successful!');
      // Redirect to dashboard
    } else {
      console.error('Login failed:', result.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
*/
