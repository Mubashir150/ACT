import type { User } from "../../types";

const API_URL = 'http://localhost:5000/api/user'; // Adjust to your backend URL

export const userService = {
    async getProfile() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) throw new Error('Could not fetch profile');
        return response.json();
    },

  async updateProfile(userData: Partial<User>) {
    const token = localStorage.getItem('token'); // Or however you store your JWT
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    return response.json();
  }
};