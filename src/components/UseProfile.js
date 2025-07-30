import { useEffect, useState } from "react";

export function useProfile() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/profile')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(profile => {
        if (!profile || !profile.email) {
          setData({}); // fallback to empty object
        } else {
          setData(profile);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
        setLoading(false);
      });
  }, []);


  return { loading, data, error };
}
