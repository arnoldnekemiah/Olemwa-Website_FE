import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API service object
const api = {
    // About page
    about: {
        get: () => apiClient.get('/api/v1/about'),
    },

    // Blog posts
    blog: {
        list: (page = 1, perPage = 10) =>
            apiClient.get(`/api/v1/blogs?page=${page}&per_page=${perPage}`),
        getBySlug: (slug) => apiClient.get(`/api/v1/blogs/${slug}`),
    },

    // Projects
    projects: {
        list: (page = 1, perPage = 10) =>
            apiClient.get(`/api/v1/projects?page=${page}&per_page=${perPage}`),
        getById: (id) => apiClient.get(`/api/v1/projects/${id}`),
    },

    // Leadership profiles
    leadership: {
        list: () => apiClient.get('/api/v1/leadership_profiles'),
    },

    // Contact
    contact: {
        getInfo: () => apiClient.get('/api/v1/contact'),
        submit: (data) => apiClient.post('/api/contact_inquiries', data),
    },

    // Events
    events: {
        list: (page = 1, perPage = 10) =>
            apiClient.get(`/api/v1/events?page=${page}&per_page=${perPage}`),
        getById: (id) => apiClient.get(`/api/v1/events/${id}`),
    },

    // Homepage
    homepage: {
        get: () => apiClient.get('/api/v1/homepage'),
    },
};

export default api;
