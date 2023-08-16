

export async function logErrorToApi(error) {
    console.log("trying to send error to api")
    try {
        const response = await fetch('/api/loggerApi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error })
        });
    
        if (!response.ok) {
          console.error('Failed to log error to API');
        } else {
          console.log('Error logged successfully');
        }
      } catch (err) {
        console.error('Network error while logging error:', err);
      }
    }
    
