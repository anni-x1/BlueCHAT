export const fetchData = (prompt, respond) => {
    const data = {
        message: prompt.usr_input
    };

        return  fetch('http://127.0.0.1:59000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  // Assuming the response is JSON
        })
        .then(json => {
            respond(json.message);  // Assuming the server response contains a 'message' field
        });
};
