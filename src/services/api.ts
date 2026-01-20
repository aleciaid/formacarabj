import { EventData } from '../types';

// Simulasi API service - dalam implementasi real, ini akan terhubung ke backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async createEvent(eventData: EventData): Promise<void> {
    // Simulasi API call dengan delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simpan ke localStorage untuk simulasi
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    existingEvents.push(eventData);
    localStorage.setItem('events', JSON.stringify(existingEvents));
    
    // Untuk implementasi real, gunakan fetch:
    /*
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    */
  },
  
  async getEvents(): Promise<EventData[]> {
    // Simulasi get events dari localStorage
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    return events.sort((a: EventData, b: EventData) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  
  async deleteEvent(eventId: string): Promise<void> {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const filteredEvents = events.filter((event: EventData) => event.id !== eventId);
    localStorage.setItem('events', JSON.stringify(filteredEvents));
  }
};import { EventData } from '../types';

// Simulasi API service - dalam implementasi real, ini akan terhubung ke backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async createEvent(eventData: EventData): Promise<void> {
    // Simulasi API call dengan delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    //test
    // Simpan ke localStorage untuk simulasi
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    existingEvents.push(eventData);
    localStorage.setItem('events', JSON.stringify(existingEvents));
    
    // Untuk implementasi real, gunakan fetch:
    /*
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    */
  },
  
  async getEvents(): Promise<EventData[]> {
    // Simulasi get events dari localStorage
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    return events.sort((a: EventData, b: EventData) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  
  async deleteEvent(eventId: string): Promise<void> {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const filteredEvents = events.filter((event: EventData) => event.id !== eventId);
    localStorage.setItem('events', JSON.stringify(filteredEvents));
  }
};