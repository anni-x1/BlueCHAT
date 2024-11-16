export const fetchData = async (username, prompt, respond) => {
    const data = {
        username: username,
        message: prompt.usr_input
    };
    console.log(prompt.usr_input)

    try {
        const response = await fetch('http://localhost:56000/api/chat/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        respond(json.message);
    } catch (error) {
        console.error('Error fetching data:', error);
        respond(`Error: ${error.message}`);
    }
};