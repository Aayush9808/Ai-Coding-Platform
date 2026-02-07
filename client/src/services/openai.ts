import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const fetchOpenAIResponse = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        throw error;
    }
};