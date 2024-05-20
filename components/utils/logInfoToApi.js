
export async function logInfoToApi(message) {
    console.log("trying to send error to api")
    try {
        const response = await fetch('/api/infoLoggerApi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        });
    
        if (!response.ok) {
          console.error('Failed to log info to API');
        } else {
          console.log('Error logged successfully');
        }
      } catch (err) {
        console.error('Network error while logging error:', err);
      }
    }